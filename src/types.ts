export type PresetStyle = 'Auto' | 'Bold' | 'Circular' | 'Flat Colors' | 'Monotone' | 'Outline';

export interface IconGenerationRequest {
  prompt: string;
  style: PresetStyle;
  colors?: string[];
}

export interface GeneratedIcon {
  id: number;
  url: string;
  prompt: string;
}

export interface GenerationState {
  isLoading: boolean;
  icons: GeneratedIcon[];
  error: string | null;
}

