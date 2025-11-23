import React from 'react';
import { GeneratedIcon } from '../types';

interface IconGridProps {
  icons: GeneratedIcon[];
  isLoading: boolean;
}

export default function IconGrid({ icons, isLoading }: IconGridProps) {
  const downloadIcon = async (icon: GeneratedIcon) => {
    try {
      const response = await fetch(icon.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `icon-${icon.id}-${icon.prompt.replace(/\s+/g, '-').toLowerCase()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading icon:', error);
      alert('Failed to download icon. Please try again.');
    }
  };

  const downloadAll = async () => {
    for (const icon of icons) {
      await downloadIcon(icon);
      // Small delay between downloads to avoid overwhelming the browser
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="aspect-square bg-gray-200 rounded-lg animate-pulse flex items-center justify-center"
          >
            <div className="text-gray-400">Loading...</div>
          </div>
        ))}
      </div>
    );
  }

  if (icons.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Generated Icons</h2>
        {icons.length > 0 && (
          <button
            onClick={downloadAll}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Download All
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {icons.map((icon) => (
          <div
            key={icon.id}
            className="relative group aspect-square bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200"
          >
            <img
              src={icon.url}
              alt={`Icon ${icon.id}: ${icon.prompt}`}
              className="w-full h-full object-contain p-2"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button
                onClick={() => downloadIcon(icon)}
                className="px-4 py-2 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

