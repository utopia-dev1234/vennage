# Quick Deployment Guide

## 🚀 Fastest Option: Vercel (Recommended)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login
```bash
vercel login
```

### Step 3: Deploy
```bash
vercel
```

### Step 4: Set Environment Variable
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add: `REPLICATE_API_TOKEN` = `r8_N66Wxoi7DNfuLDi41QHPt7ZnD8Cn2Rh30pWRF`
3. Redeploy: `vercel --prod`

**That's it!** Your app will be live at `https://your-project.vercel.app`

---

## 🐳 Alternative: Railway (Simple)

### Step 1: Build Frontend
```bash
npm run build
```

### Step 2: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Connect your repository
4. Set **Root Directory**: Leave as root
5. Set **Start Command**: `cd server && npm start`
6. Add Environment Variable: `REPLICATE_API_TOKEN=r8_N66Wxoi7DNfuLDi41QHPt7ZnD8Cn2Rh30pWRF`

**Done!** Your app will be live at `https://your-project.railway.app`

---

## 📋 Pre-Deployment Checklist

- [ ] Run `npm run build` to create the `build` folder
- [ ] Test locally: `cd server && npm start` (should serve frontend)
- [ ] Set `REPLICATE_API_TOKEN` environment variable
- [ ] Push code to Git (if using CI/CD)

---

## 🔧 Testing Locally Before Deploy

1. **Build frontend:**
   ```bash
   npm run build
   ```

2. **Start server (serves both frontend and backend):**
   ```bash
   cd server && npm start
   ```

3. **Visit:** `http://localhost:3001`

If this works locally, it will work in production!

---

## 📝 Notes

- The server now automatically serves the React app from the `build` folder
- API routes are at `/api/*`
- All other routes serve the React app
- CORS is already configured
- Environment variables are read from `.env` or platform settings

