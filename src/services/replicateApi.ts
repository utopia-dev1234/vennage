const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function generateIconSet(
  basePrompt: string,
  style: string,
  colors?: string[]
): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-icons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: basePrompt,
        style,
        colors: colors || [],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.icons;
  } catch (error) {
    console.error('Error generating icon set:', error);
    throw error;
  }
}

