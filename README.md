# Icon Generator - Vennage Assignment

A web application that generates a set of 4 consistent icons from a single text prompt using the Replicate API (Flux Schnell model).

## Features

- **Prompt-based Generation**: Enter a text prompt (e.g., "Hockey equipment") to generate 4 related icons
- **Style Presets**: Choose from 6 preset styles (Auto, Bold, Circular, Flat Colors, Monotone, Outline)
- **Color Control**: Optionally provide brand colors (HEX values) to steer the color palette
- **Consistent Output**: All 4 icons share the same visual style and theme
- **Download**: Download individual icons or all 4 icons as PNG files

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Backend**: Express.js (Node.js)
- **Image Generation**: Replicate API (Flux Schnell model)

## Project Structure

```
.
├── src/                    # Frontend React application
│   ├── components/         # React components
│   ├── services/          # API service layer
│   └── types.ts           # TypeScript type definitions
├── server/                # Backend Express API
│   └── index.js           # API server with Replicate integration
├── package.json           # Frontend dependencies
└── server/package.json    # Backend dependencies
```

## Setup & Installation

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Install frontend dependencies:**
   ```bash
   npm install
   ```

2. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   cd ..
   ```

### Running Locally

1. **Start the backend server:**
   ```bash
   cd server
   npm start
   # Server runs on http://localhost:3001
   ```

2. **Start the frontend (in a new terminal):**
   ```bash
   npm run dev
   # Frontend runs on http://localhost:3000
   ```

3. Open `http://localhost:3000` in your browser

## Deployment

### Option 1: Vercel (Recommended)

1. **Deploy Frontend:**
   - Connect your repository to Vercel
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Add environment variable: `VITE_API_URL` pointing to your backend URL

2. **Deploy Backend:**
   - Use Vercel Serverless Functions or deploy to Railway/Render
   - Set environment variable: `PORT=3001` (or let the platform assign it)

### Option 2: Railway/Render

1. **Deploy Backend:**
   - Create a new service on Railway or Render
   - Point to `server/` directory
   - Set start command: `npm start`
   - Set PORT environment variable

2. **Deploy Frontend:**
   - Create a static site deployment
   - Set build command: `npm run build`
   - Set `VITE_API_URL` to your backend URL

### Option 3: Combined Deployment

You can also deploy both frontend and backend together:
- Build frontend: `npm run build`
- Serve `dist/` as static files from Express
- Deploy the combined app

## API Endpoints

### POST `/api/generate-icons`

Generates 4 icons based on the provided prompt and style.

**Request Body:**
```json
{
  "prompt": "Hockey equipment",
  "style": "Pastels",
  "colors": ["#FF5733", "#33FF57"]
}
```

**Response:**
```json
{
  "icons": [
    "https://replicate.delivery/...",
    "https://replicate.delivery/...",
    "https://replicate.delivery/...",
    "https://replicate.delivery/..."
  ]
}
```

## How It Works

1. **Prompt Processing**: The user enters a base prompt (e.g., "Hockey equipment")
2. **Style Application**: The selected style adds specific keywords to ensure visual consistency
3. **Variation Generation**: The system creates 4 variations of the prompt to encourage different but related icons
4. **Parallel Generation**: All 4 icons are generated simultaneously using the Replicate API
5. **Consistency**: Style prompts and color palettes ensure all icons share the same visual language

## Style Controls

The application uses prompt engineering to maintain consistency:

- **Style Keywords**: Each preset style adds specific descriptive terms
- **Color Guidance**: HEX colors are incorporated into prompts to steer the palette
- **Consistent Formatting**: All prompts include size, background, and quality specifications

## Error Handling

- Input validation for prompts and HEX colors
- API error handling with user-friendly messages
- Loading states during generation
- Retry capability for failed generations

## Development

```bash
# Frontend development
npm run dev

# Backend development (with auto-reload)
cd server
npm run dev

# Build for production
npm run build
```

## Notes

- The Replicate API token is stored in the backend for security
- Icon generation typically takes 10-30 seconds per icon
- All icons are generated as 512x512 PNG files
- The API uses Flux Schnell model as specified

## License

This project was created for the Vennage assignment.

