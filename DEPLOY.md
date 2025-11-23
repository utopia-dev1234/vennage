# Deployment Guide

This guide covers multiple deployment options for the Icon Generator application.

## Prerequisites

- Node.js (v18 or higher)
- Git repository (optional, for CI/CD)
- Account on your chosen hosting platform

## Option 1: Vercel Deployment (Recommended - Easiest)

Vercel supports both frontend and backend in a single deployment.

### Steps:

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project root**:
   ```bash
   vercel
   ```

4. **Set Environment Variables** in Vercel Dashboard:
   - Go to your project settings → Environment Variables
   - Add: `REPLICATE_API_TOKEN` = `r8_N66Wxoi7DNfuLDi41QHPt7ZnD8Cn2Rh30pWRF`

5. **Build Configuration**:
   - The `vercel.json` file is already configured
   - Build Command: `npm run build` (runs automatically)
   - Output Directory: `build`

6. **Redeploy**:
   ```bash
   vercel --prod
   ```

**Note:** The `vercel.json` configuration handles both API routes and static files automatically.

---

## Option 2: Railway/Render Deployment (Combined)

Deploy as a single Node.js application serving both frontend and backend.

### Steps:

1. **Build the frontend**:
   ```bash
   npm run build
   ```

2. **Create a start script** in `server/package.json`:
   ```json
   {
     "scripts": {
       "start": "node index.js"
     }
   }
   ```

3. **Deploy to Railway**:
   - Create new project
   - Connect your Git repository
   - Set root directory to project root
   - Set start command: `cd server && npm start`
   - Add environment variable: `REPLICATE_API_TOKEN`

4. **Deploy to Render**:
   - Create new Web Service
   - Connect your Git repository
   - Build Command: `npm install && npm run build`
   - Start Command: `cd server && npm start`
   - Add environment variable: `REPLICATE_API_TOKEN`

---

## Option 3: Separate Frontend & Backend Deployment

Deploy frontend and backend separately for better scalability.

### Backend Deployment (Railway/Render/Heroku):

1. **Deploy Backend**:
   - Set root directory to `server`
   - Start command: `npm start`
   - Environment variables:
     - `REPLICATE_API_TOKEN=r8_N66Wxoi7DNfuLDi41QHPt7ZnD8Cn2Rh30pWRF`
     - `PORT` (usually auto-set by platform)

2. **Get Backend URL**: e.g., `https://your-app.railway.app`

### Frontend Deployment (Vercel/Netlify):

1. **Update API URL** in `src/services/replicateApi.ts`:
   ```typescript
   const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';
   ```

2. **Set Environment Variable**:
   - `REACT_APP_API_URL=https://your-backend-url.railway.app/api`

3. **Build and Deploy**:
   ```bash
   npm run build
   ```
   - Deploy the `build` folder to your static hosting

---

## Option 4: Docker Deployment

### Create Dockerfile:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build frontend
RUN npm run build

# Expose port
EXPOSE 3001

# Start server
WORKDIR /app/server
CMD ["node", "index.js"]
```

### Build and Run:

```bash
docker build -t icon-generator .
docker run -p 3001:3001 -e REPLICATE_API_TOKEN=r8_N66Wxoi7DNfuLDi41QHPt7ZnD8Cn2Rh30pWRF icon-generator
```

---

## Environment Variables

### Required:
- `REPLICATE_API_TOKEN`: Your Replicate API token

### Optional:
- `PORT`: Server port (default: 3001)
- `REACT_APP_API_URL`: Frontend API URL (for separate deployments)

---

## Pre-Deployment Checklist

- [ ] Build frontend: `npm run build`
- [ ] Test locally: `cd server && npm start`
- [ ] Verify environment variables are set
- [ ] Check CORS settings (already configured)
- [ ] Test API endpoints
- [ ] Verify static files are being served

---

## Post-Deployment

1. **Test the deployed application**:
   - Visit your deployment URL
   - Test icon generation
   - Verify downloads work

2. **Monitor**:
   - Check server logs
   - Monitor API usage (Replicate API)
   - Watch for errors

3. **Update**:
   - Push changes to trigger new deployment
   - Or manually redeploy

---

## Troubleshooting

### Frontend can't connect to backend:
- Check `REACT_APP_API_URL` environment variable
- Verify CORS is enabled (already configured)
- Check backend is running

### Build fails:
- Ensure all dependencies are installed
- Check Node.js version (v18+)
- Review build logs

### API errors:
- Verify `REPLICATE_API_TOKEN` is set
- Check Replicate API status
- Review server logs

---

## Quick Deploy Commands

**Vercel:**
```bash
vercel --prod
```

**Railway:**
```bash
railway up
```

**Render:**
```bash
# Push to Git, Render auto-deploys
git push
```

