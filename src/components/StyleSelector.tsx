import React from 'react';
import { PresetStyle } from '../types';

interface StyleSelectorProps {
  selectedStyle: PresetStyle;
  onChange: (style: PresetStyle) => void;
}

const STYLES: PresetStyle[] = ['Auto', 'Bold', 'Circular', 'Flat Colors', 'Monotone', 'Outline'];

export default function StyleSelector({ selectedStyle, onChange }: StyleSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Preset Style *
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {STYLES.map((style) => (
          <button
            key={style}
            onClick={() => onChange(style)}
            className={`px-4 py-3 rounded-lg border-2 transition-all ${
              selectedStyle === style
                ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
            }`}
          >
            {style}
          </button>
        ))}
      </div>
    </div>
  );
}

