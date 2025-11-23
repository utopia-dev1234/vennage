import type { StyleOption } from '../types';

interface StyleSelectorProps {
  selectedStyle: StyleOption;
  onStyleChange: (style: StyleOption) => void;
}

const styles: StyleOption[] = [
  'Auto',
  'Bold',
  'Circular',
  'Flat Colors',
  'Monotone',
  'Outline',
  'Sticker',
  'Pastels',
  'Business',
  'Cartoon',
  '3D Model',
  'Gradient',
];

export default function StyleSelector({ selectedStyle, onStyleChange }: StyleSelectorProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Preset Style
      </label>
      <select
        value={selectedStyle}
        onChange={(e) => onStyleChange(e.target.value as StyleOption)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {styles.map((style) => (
          <option key={style} value={style}>
            {style}
          </option>
        ))}
      </select>
    </div>
  );
}

