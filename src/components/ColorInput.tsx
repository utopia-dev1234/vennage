import React, { useState } from 'react';

interface ColorInputProps {
  colors: string[];
  onChange: (colors: string[]) => void;
}

export default function ColorInput({ colors, onChange }: ColorInputProps) {
  const [colorInput, setColorInput] = useState('');

  const addColor = () => {
    const trimmed = colorInput.trim();
    if (trimmed && /^#[0-9A-Fa-f]{6}$/.test(trimmed)) {
      if (!colors.includes(trimmed.toUpperCase())) {
        onChange([...colors, trimmed.toUpperCase()]);
        setColorInput('');
      }
    } else if (trimmed) {
      alert('Please enter a valid HEX color (e.g., #FF5733)');
    }
  };

  const removeColor = (colorToRemove: string) => {
    onChange(colors.filter(c => c !== colorToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addColor();
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Optional: Brand Colors (HEX)
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={colorInput}
          onChange={(e) => setColorInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="#FF5733"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addColor}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Add
        </button>
      </div>
      {colors.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {colors.map((color) => (
            <div
              key={color}
              className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg"
            >
              <div
                className="w-6 h-6 rounded border border-gray-300"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm font-mono">{color}</span>
              <button
                onClick={() => removeColor(color)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

