# Deployment Guide

## Local Development

1. Install dependencies (installs both client and server dependencies in shared node_modules):
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Create `server/.env` with `REPLICATE_API_TOKEN` and `PORT`

3. Run both servers:
   - Backend: `cd server && npm start` (runs on port 3001)
   - Frontend: `npm start` (runs on port 3000, Create React App will auto-open browser)

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Deploy Backend:**
   - Create a new Vercel project
   - Set root directory to `server`
   - Add environment variable: `REPLICATE_API_TOKEN`
   - Deploy

2. **Deploy Frontend:**
   - Update `src/services/replicateApi.ts` to use your backend URL (or use the proxy in package.json)
   - Build: `npm run build`
   - Deploy the `build` folder to Vercel or any static hosting

### Option 2: Railway/Render

1. **Backend:**
   - Create a new Node.js service
   - Set root directory to `server`
   - Add environment variable: `REPLICATE_API_TOKEN=r8_N66Wxoi7DNfuLDi41QHPt7ZnD8Cn2Rh30pWRF`
   - Deploy

2. **Frontend:**
   - Update API_BASE_URL in `src/services/replicateApi.ts` to your backend URL (or configure proxy in package.json)
   - Build: `npm run build`
   - Deploy the `build` folder to static hosting

### Option 3: Combined Deployment

For a simpler deployment, you can serve the frontend from the Express server:

1. Build the frontend: `npm run build`
2. Add static file serving to `server/index.js`:
   ```javascript
   import { fileURLToPath } from 'url';
   import { dirname, join } from 'path';
   import express from 'express';
   
   const __filename = fileURLToPath(import.meta.url);
   const __dirname = dirname(__filename);
   
   // Serve static files from the React app
   app.use(express.static(join(__dirname, '../build')));
   
   // Handle React routing, return all requests to React app
   app.get('*', (req, res) => {
     res.sendFile(join(__dirname, '../build/index.html'));
   });
   ```

3. Deploy the entire project as a single Node.js application

## Environment Variables

Required:
- `REPLICATE_API_TOKEN`: Your Replicate API token
- `PORT`: Server port (default: 3001)

## Notes

- Make sure CORS is properly configured if frontend and backend are on different domains
- The Replicate API may have rate limits - implement retry logic if needed
- Consider adding caching for generated icons to reduce API costs

