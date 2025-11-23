import { downloadImage } from '../services/replicateApi';

interface IconGridProps {
  icons: string[];
  prompt: string;
}

export default function IconGrid({ icons, prompt }: IconGridProps) {
  const handleDownload = async (url: string, index: number) => {
    try {
      const filename = `${prompt.replace(/\s+/g, '-').toLowerCase()}-icon-${index + 1}.png`;
      await downloadImage(url, filename);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download image. Please try again.');
    }
  };

  const handleDownloadAll = async () => {
    for (let i = 0; i < icons.length; i++) {
      try {
        await downloadImage(icons[i], `${prompt.replace(/\s+/g, '-').toLowerCase()}-icon-${i + 1}.png`);
        // Small delay between downloads to avoid browser blocking
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        console.error(`Download failed for icon ${i + 1}:`, error);
      }
    }
  };

  if (icons.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Generated Icons</h2>
        <button
          onClick={handleDownloadAll}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Download All
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {icons.map((iconUrl, index) => (
          <div key={index} className="relative group">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
              <img
                src={iconUrl}
                alt={`Icon ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => handleDownload(iconUrl, index)}
              className="absolute bottom-2 right-2 px-3 py-1 bg-blue-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-700"
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

