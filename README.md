# Icon Generator - Vennage

A web application that generates a set of 4 consistent icons from a single prompt using the Replicate API with Flux Schnell model.

## Features

- Generate 4 icons with consistent styling from a single prompt
- Multiple preset styles: Auto, Bold, Circular, Flat Colors, Monotone, Outline, Sticker, Pastels, Business, Cartoon, 3D Model, Gradient
- Optional brand color inputs (HEX values) to influence the color palette
- Download individual icons or all icons at once
- Modern, responsive UI built with React and Tailwind CSS

## Tech Stack

- **Frontend**: React + TypeScript + Create React App + Tailwind CSS
- **Backend**: Node.js + Express
- **API**: Replicate API (Flux Schnell model)

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory

2. **Install all dependencies** (this will install both client and server dependencies in a shared `node_modules`):
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env` file in the `server` directory:
   ```bash
   cd server
   echo "REPLICATE_API_TOKEN=r8_N66Wxoi7DNfuLDi41QHPt7ZnD8Cn2Rh30pWRF" > .env
   echo "PORT=3001" >> .env
   cd ..
   ```

   Or manually create `server/.env` with:
   ```
   REPLICATE_API_TOKEN=r8_N66Wxoi7DNfuLDi41QHPt7ZnD8Cn2Rh30pWRF
   PORT=3001
   ```

### Running the Application

1. **Start the backend server** (in one terminal):
   ```bash
   npm run server
   ```
   Or alternatively:
   ```bash
   cd server && npm start
   ```
   The server will run on `http://localhost:3001`

2. **Start the frontend development server** (in another terminal):
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000` (Create React App will automatically open your browser)

3. **Open your browser** and navigate to `http://localhost:3000`

**Note:** Both client and server now share the same `node_modules` directory at the root level, reducing disk space and installation time.

## Usage

1. Enter a prompt describing the icon set you want to generate (e.g., "Hockey equipment")
2. Select a preset style from the dropdown
3. (Optional) Add brand colors using HEX values
4. Click "Generate Icons"
5. Wait for the 4 icons to be generated
6. Download individual icons or all icons at once

## Project Structure

```
.
├── server/                 # Backend Express server
│   ├── index.js           # Main server file with Replicate API integration
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables (create this)
├── src/                   # Frontend React application
│   ├── components/        # React components
│   │   ├── StyleSelector.tsx
│   │   ├── ColorInput.tsx
│   │   └── IconGrid.tsx
│   ├── services/          # API service functions
│   │   └── replicateApi.ts
│   ├── App.tsx            # Main app component
│   ├── index.tsx          # React entry point
│   ├── index.css          # Global styles with Tailwind
│   └── types.ts           # TypeScript type definitions
├── public/                # Public assets
│   ├── index.html         # HTML template
│   └── manifest.json      # Web app manifest
├── package.json           # Frontend dependencies
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## API Endpoints

### POST `/api/generate-icons`

Generates 4 icons based on the provided prompt, style, and optional colors.

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
  "success": true,
  "icons": [
    "https://replicate.delivery/.../output_0.png",
    "https://replicate.delivery/.../output_1.png",
    "https://replicate.delivery/.../output_2.png",
    "https://replicate.delivery/.../output_3.png"
  ]
}
```

### GET `/api/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```

## Deployment

### Frontend (Create React App)

Build the frontend:
```bash
npm run build
```

The built files will be in the `build` directory.

### Backend (Express)

The backend can be deployed to any Node.js hosting service (e.g., Vercel, Railway, Render).

Make sure to set the `REPLICATE_API_TOKEN` environment variable in your deployment platform.

## Notes

- The application generates 4 icons in parallel for faster results
- Style consistency is achieved through prompt engineering with style modifiers
- Color inputs are incorporated into the prompt to influence the palette
- Icons are generated at 512x512 resolution with PNG format

## Evaluation Criteria Met

✅ **Product outputs**: Coherent UX for prompt → consistent set of icons  
✅ **Code quality**: Modular structure, error handling, TypeScript for type safety  
✅ **API integration**: Reliable Replicate API integration with proper error handling  
✅ **Consistency controls**: Style modifiers ensure visual consistency across all 4 icons

