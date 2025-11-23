import express from 'express';
import cors from 'cors';
import Replicate from 'replicate';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || 'r8_N66Wxoi7DNfuLDi41QHPt7ZnD8Cn2Rh30pWRF',
});

// Style prompt modifiers for consistency
const styleModifiers = {
  'Auto': '',
  'Bold': 'bold, vibrant colors, strong contrast, graphic design style',
  'Circular': 'circular icon, rounded, contained within a circle, minimalist',
  'Flat Colors': 'flat design, solid colors, no gradients, no shadows, modern flat icon style',
  'Monotone': 'monochrome, single color, minimalist, simple',
  'Outline': 'outline style, line art, no fill, clean lines, vector style',
  'Sticker': 'sticker style, thick outline, glossy, raised appearance, vibrant colors',
  'Pastels': 'pastel colors, soft, gentle shading, light and airy',
  'Business': 'professional, clean, corporate style, light colors, contained in circle',
  'Cartoon': 'cartoon style, friendly, rounded design, vibrant simple shading',
  '3D Model': '3D rendered, metallic reflections, angular, depth, realistic lighting',
  'Gradient': 'gradient colors, smooth color transitions, modern, dynamic',
};

// Generate variations of the prompt for 4 different icons
function generateIconPrompts(basePrompt, style, colors = []) {
  const styleModifier = styleModifiers[style] || '';
  const colorModifier = colors.length > 0 
    ? `, color palette: ${colors.join(', ')}` 
    : '';
  
  const baseStylePrompt = `${basePrompt}${styleModifier ? ', ' + styleModifier : ''}${colorModifier}, icon, 512x512, PNG, transparent background`;
  
  // Create 4 variations - you might want to use an LLM API here for better variations
  // For now, using simple variations
  const variations = [
    `${baseStylePrompt}, first item`,
    `${baseStylePrompt}, second item`,
    `${baseStylePrompt}, third item`,
    `${baseStylePrompt}, fourth item`,
  ];
  
  return variations;
}

app.post('/api/generate-icons', async (req, res) => {
  try {
    const { prompt, style, colors } = req.body;
    
    if (!prompt || !style) {
      return res.status(400).json({ error: 'Prompt and style are required' });
    }
    
    const iconPrompts = generateIconPrompts(prompt, style, colors || []);
    
    // Generate all 4 icons in parallel
    const generationPromises = iconPrompts.map(async (iconPrompt) => {
      try {
        const output = await replicate.run("black-forest-labs/flux-schnell", {
          input: {
            prompt: iconPrompt,
          }
        });
        
        // Get the URL from the output
        // Replicate returns an array of FileOutput objects with a url() method
        let url;
        if (Array.isArray(output) && output.length > 0) {
          // Handle FileOutput object with url() method
          if (typeof output[0]?.url === 'function') {
            url = output[0].url();
          } else if (typeof output[0] === 'string') {
            url = output[0];
          } else {
            url = output[0];
          }
        } else if (output && typeof output.url === 'function') {
          url = output.url();
        } else if (typeof output === 'string') {
          url = output;
        } else {
          url = output;
        }
        
        if (!url) {
          throw new Error('No URL returned from Replicate API');
        }
        
        // Ensure URL is a string
        if (typeof url !== 'string') {
          url = String(url);
        }
        
        return { success: true, url };
      } catch (error) {
        console.error('Error generating icon:', error);
        return { success: false, error: error.message };
      }
    });
    
    const results = await Promise.all(generationPromises);
    
    // Check if all generations were successful
    const failed = results.filter(r => !r.success);
    if (failed.length > 0) {
      return res.status(500).json({ 
        error: 'Some icons failed to generate',
        results 
      });
    }
    
    res.json({ 
      success: true,
      icons: results.map(r => r.url)
    });
    
  } catch (error) {
    console.error('Error in /api/generate-icons:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Proxy endpoint for downloading images (avoids CORS issues)
app.get('/api/proxy-image', async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch image' });
    }
    
    const buffer = await response.arrayBuffer();
    res.setHeader('Content-Type', response.headers.get('content-type') || 'image/png');
    res.setHeader('Content-Disposition', `attachment; filename="icon.png"`);
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error('Error proxying image:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

