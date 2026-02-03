# Furret Deployment Guide

## GitHub Setup

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click **+** → **New repository**
3. Name it `furret`
4. Click **Create repository**

### Step 2: Push Code to GitHub

```bash
cd /path/to/furret

git init
git add .
git commit -m "Initial commit: Premium flight intelligence platform"
git remote add origin https://github.com/YOUR_USERNAME/furret.git
git branch -M main
git push -u origin main
```

## Vercel Deployment

### Option 1: GitHub Integration (Recommended)

1. Go to [Vercel](https://vercel.com) and sign in with GitHub
2. Click **Add New Project**
3. Import your `furret` repository
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Custom Domain

1. Go to Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Enter your domain
3. Follow DNS configuration instructions

---

**Need help?** Open an issue on GitHub.
