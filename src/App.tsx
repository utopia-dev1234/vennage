import React, { useState } from 'react';
import StyleSelector from './components/StyleSelector';
import ColorInput from './components/ColorInput';
import IconGrid from './components/IconGrid';
import { PresetStyle, GeneratedIcon } from './types';
import { generateIconSet } from './services/replicateApi';

function App() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<PresetStyle>('Auto');
  const [colors, setColors] = useState<string[]>([]);
  const [icons, setIcons] = useState<GeneratedIcon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt for the icon set');
      return;
    }

    setIsLoading(true);
    setError(null);
    setIcons([]);

    try {
      const iconUrls = await generateIconSet(prompt.trim(), style, colors.length > 0 ? colors : undefined);
      
      const generatedIcons: GeneratedIcon[] = iconUrls.map((url, index) => ({
        id: index + 1,
        url,
        prompt: prompt.trim(),
      }));

      setIcons(generatedIcons);
    } catch (err) {
      console.error('Generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate icons. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Icon Generator
          </h1>
          <p className="text-gray-600">
            Generate a set of 4 consistent icons from a single prompt
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prompt for Icon Set *
              </label>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Hockey equipment"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>

            <StyleSelector selectedStyle={style} onChange={setStyle} />

            <ColorInput colors={colors} onChange={setColors} />

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Generating Icons...' : 'Generate Icons'}
            </button>
          </div>
        </div>

        <IconGrid icons={icons} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;

