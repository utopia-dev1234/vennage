interface ColorInputProps {
  colors: string[];
  onColorsChange: (colors: string[]) => void;
}

export default function ColorInput({ colors, onColorsChange }: ColorInputProps) {
  const addColor = () => {
    onColorsChange([...colors, '#000000']);
  };

  const removeColor = (index: number) => {
    onColorsChange(colors.filter((_, i) => i !== index));
  };

  const updateColor = (index: number, value: string) => {
    const newColors = [...colors];
    newColors[index] = value;
    onColorsChange(newColors);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Optional Brand Colors (HEX)
      </label>
      <div className="space-y-2">
        {colors.map((color, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => updateColor(index, e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => updateColor(index, e.target.value)}
              placeholder="#000000"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              pattern="^#[0-9A-Fa-f]{6}$"
            />
            <button
              onClick={() => removeColor(index)}
              className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addColor}
          className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          + Add Color
        </button>
      </div>
    </div>
  );
}

