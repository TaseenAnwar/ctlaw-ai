/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Important for Render.com deployment
  output: 'standalone',
  
  // Image optimization settings
  images: {
    domains: ['lh3.googleusercontent.com'], // For Google profile images
    unoptimized: true // Simpler for Render
  },

  // Environment variables that are safe to expose to browser
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },

  // Webpack config for PDF parsing
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
}

module.exports = nextConfig
```

4. Commit changes

---

## **FILE 3: `.gitignore`**

**What it does:** Tells Git which files NOT to upload to GitHub (like secrets and temporary files).

**How to add it:**
1. Click on `.gitignore`
2. Click pencil icon
3. Paste this:
```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files - IMPORTANT: never commit these!
.env
.env*.local
.env.local
.env.development.local
.env.test.local
.env.production.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Data files (don't commit large datasets)
/data/*.pdf
/data/*.txt
!/data/sample-statutes/
/data/embeddings/

# Logs
logs/
*.log
