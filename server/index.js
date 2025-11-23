import express from 'express';
import cors from 'cors';
import Replicate from 'replicate';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const REPLICATE_API_TOKEN = 'r8_N66Wxoi7DNfuLDi41QHPt7ZnD8Cn2Rh30pWRF';
const MODEL = 'black-forest-labs/flux-schnell';

const replicate = new Replicate({
  auth: REPLICATE_API_TOKEN,
});

// Style-specific prompt enhancements
const STYLE_PROMPTS = {
  'Auto': '',
  'Bold': 'bold, vibrant colors, strong contrast, thick lines',
  'Circular': 'circular icon, rounded, contained within a circle',
  'Flat Colors': 'flat design, solid colors, no gradients, minimal shading',
  'Monotone': 'monochrome, single color palette, grayscale or single hue',
  'Outline': 'outline style, line art, no fill, clean lines',
};

const EXTENDED_STYLE_PROMPTS = {
  'Sticker': 'sticker style, outlined, vibrant colors, playful',
  'Pastels': 'pastel colors, soft muted palette, gentle shading',
  'Business': 'professional, clean, corporate style, minimalist',
  'Cartoon': 'cartoon style, rounded, playful, friendly',
  '3D Model': '3D rendered, realistic shading, depth, metallic',
  'Gradient': 'gradient colors, smooth color transitions',
};

function buildPrompt(basePrompt, style, colors, variation = '') {
  let prompt = basePrompt;
  
  if (variation) {
    prompt = `${prompt}, ${variation}`;
  }
  
  const stylePrompt = STYLE_PROMPTS[style] || EXTENDED_STYLE_PROMPTS[style] || '';
  if (stylePrompt) {
    prompt = `${prompt}, ${stylePrompt}`;
  }
  
  if (colors && colors.length > 0) {
    const colorList = colors.join(', ');
    prompt = `${prompt}, color palette: ${colorList}`;
  }
  
  prompt = `${prompt}, icon, 512x512, clean background, centered, high quality`;
  
  return prompt;
}

async function generateIcon(prompt, style, colors, variation = '') {
  const enhancedPrompt = buildPrompt(prompt, style, colors, variation);
  
  try {
    const output = await replicate.run(
      `${MODEL}:latest`,
      {
        input: {
          prompt: enhancedPrompt,
          num_outputs: 1,
          aspect_ratio: '1:1',
          output_format: 'png',
          output_quality: 90,
        }
      }
    );
    
    if (!output || output.length === 0) {
      throw new Error('No output received from Replicate API');
    }
    
    return output[0];
  } catch (error) {
    console.error('Error generating icon:', error);
    throw error;
  }
}

// Generate 4 different icons with variations
// Strategy: Use descriptive variations to encourage diversity while maintaining
// consistency through shared style and color palette. The model will interpret
// these as different related items within the theme (e.g., for "Hockey equipment"
// it might generate: goal, helmet, stick, glove)
async function generateIconSet(basePrompt, style, colors) {
  // Create variations that encourage different but related icons
  // Using numbered items and descriptive terms to guide the model
  const variations = [
    'item 1',
    'item 2', 
    'item 3',
    'item 4',
  ];
  
  // Generate all icons in parallel for faster results
  // Each variation helps the model generate a different related item
  const iconPromises = variations.map((variation, index) => {
    const promptWithVariation = `${basePrompt}, ${variation}`;
    
    return generateIcon(promptWithVariation, style, colors, '').catch(error => {
      console.error(`Error generating icon ${index + 1}:`, error);
      throw error;
    });
  });
  
  return Promise.all(iconPromises);
}

app.post('/api/generate-icons', async (req, res) => {
  try {
    const { prompt, style, colors } = req.body;
    
    if (!prompt || !style) {
      return res.status(400).json({ error: 'Prompt and style are required' });
    }
    
    console.log(`Generating icons for prompt: "${prompt}", style: "${style}"`);
    
    const iconUrls = await generateIconSet(prompt, style, colors || []);
    
    res.json({ icons: iconUrls });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to generate icons. Please try again.' 
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

