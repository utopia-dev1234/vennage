export type StyleOption = 
  | 'Auto'
  | 'Bold'
  | 'Circular'
  | 'Flat Colors'
  | 'Monotone'
  | 'Outline'
  | 'Sticker'
  | 'Pastels'
  | 'Business'
  | 'Cartoon'
  | '3D Model'
  | 'Gradient';

export interface GenerateIconsRequest {
  prompt: string;
  style: StyleOption;
  colors?: string[];
}

export interface GenerateIconsResponse {
  success: boolean;
  icons?: string[];
  error?: string;
}

