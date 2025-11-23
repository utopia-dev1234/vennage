# Deployment Guide

## Quick Deploy Options

### Option 1: Vercel (Easiest)

1. **Deploy Backend:**
   - Go to [Vercel](https://vercel.com)
   - Import your repository
   - Set root directory to `server`
   - Add environment variable: `PORT=3001` (optional, Vercel assigns automatically)
   - Deploy

2. **Deploy Frontend:**
   - Create a new Vercel project
   - Set root directory to project root
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Add environment variable: `VITE_API_URL` = your backend URL (e.g., `https://your-backend.vercel.app`)

### Option 2: Railway

1. **Deploy Backend:**
   - Create new project on Railway
   - Connect GitHub repo
   - Set root directory to `server`
   - Set start command: `npm start`
   - Railway will auto-detect Node.js

2. **Deploy Frontend:**
   - Create new static site on Railway or use Vercel/Netlify
   - Set build command: `npm run build`
   - Set `VITE_API_URL` to backend URL

### Option 3: Render

1. **Deploy Backend:**
   - Create new Web Service on Render
   - Connect repo, set root to `server`
   - Build: `npm install`
   - Start: `npm start`

2. **Deploy Frontend:**
   - Create new Static Site on Render
   - Build: `npm install && npm run build`
   - Publish: `dist`
   - Set `VITE_API_URL` environment variable

## Environment Variables

### Backend
- `PORT` (optional, defaults to 3001)
- Replicate API token is hardcoded in `server/index.js` (consider moving to env var for production)

### Frontend
- `VITE_API_URL` - Backend API URL (defaults to `http://localhost:3001` in development)

## Testing Deployment

1. Test backend health: `GET /health`
2. Test icon generation: `POST /api/generate-icons` with test payload
3. Verify frontend can connect to backend
4. Test full flow: generate icons, download

## Notes

- Backend must be deployed first
- Frontend needs backend URL in `VITE_API_URL`
- CORS is enabled on backend for cross-origin requests
- API token usage is monitored through Replicate dashboard

