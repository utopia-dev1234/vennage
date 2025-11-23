import { useState } from 'react';
import { generateIcons } from './services/replicateApi';
import type { StyleOption, GenerateIconsResponse } from './types';
import StyleSelector from './components/StyleSelector';
import ColorInput from './components/ColorInput';
import IconGrid from './components/IconGrid';

function App() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<StyleOption>('Auto');
  const [colors, setColors] = useState<string[]>([]);
  const [icons, setIcons] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt for the icon set');
      return;
    }

    setLoading(true);
    setError(null);
    setIcons([]);

    try {
      const response: GenerateIconsResponse = await generateIcons({
        prompt: prompt.trim(),
        style,
        colors: colors.length > 0 ? colors : undefined,
      });

      if (response.success && response.icons) {
        setIcons(response.icons);
      } else {
        setError(response.error || 'Failed to generate icons');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Icon Generator
          </h1>
          <p className="text-gray-600">
            Generate a set of 4 consistent icons from a single prompt
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prompt for Icon Set
              </label>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Hockey equipment"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              />
            </div>

            <StyleSelector selectedStyle={style} onStyleChange={setStyle} />

            <ColorInput colors={colors} onColorsChange={setColors} />

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating icons...
                </span>
              ) : (
                'Generate Icons'
              )}
            </button>
          </div>
        </div>

        {icons.length > 0 && <IconGrid icons={icons} prompt={prompt} />}
      </div>
    </div>
  );
}

export default App;

