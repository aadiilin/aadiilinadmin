# Search Console & Analytics Setup

## Google Search Console
1. Go to https://search.google.com/search-console
2. Add property → URL prefix → `https://aadiilin.vercel.app`
3. Download the HTML verification file
4. Place it in `public/` folder and `git push`
5. Click Verify
6. Submit sitemap: `https://aadiilin.vercel.app/sitemap.xml`

## Bing Webmaster Tools
1. Go to https://www.bing.com/webmasters
2. Add site → Import from Google Search Console (easiest)
3. Or add manually and use the same verification method
4. Submit sitemap

## Google Analytics 4
1. Go to https://analytics.google.com
2. Create a new property → Web → `https://aadiilin.vercel.app`
3. Get the Measurement ID (G-XXXXXXXX)
4. Add to `index.html` before `</head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-XXXXXXXX');</script>
```

## Microsoft Clarity
1. Go to https://clarity.microsoft.com
2. Create project → add your site URL
3. Copy the tracking code snippet
4. Add to `index.html` before `</head>`

## Plausible (self-hosted or cloud)
1. Sign up at https://plausible.io
2. Add your domain
3. Insert the script tag into `index.html`

## Vercel Deploy
Auto-deploys from `main` branch. Push to GitHub:
```
git add -A
git commit -m "..."
git push origin main
```
