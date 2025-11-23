import type { GenerateIconsRequest, GenerateIconsResponse } from '../types';

const API_BASE_URL = '/api';

export async function generateIcons(
  request: GenerateIconsRequest
): Promise<GenerateIconsResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-icons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate icons');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating icons:', error);
    throw error;
  }
}

export async function downloadImage(url: string, filename: string): Promise<void> {
  try {
    // Use proxy endpoint to avoid CORS issues
    const proxyUrl = `${API_BASE_URL}/proxy-image?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error('Failed to download image');
    }
    
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Error downloading image:', error);
    // Fallback: try direct download
    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (fallbackError) {
      throw error;
    }
  }
}

