Deployment checklist

1) Confirm domain and hosting
   - Choose hosting (Netlify, Vercel, GitHub Pages, shared hosting)
   - Ensure DNS A/CAA/CNAME records point to host

2) SSL / HTTPS
   - Enable Let's Encrypt or provider-managed SSL
   - Verify site loads via https://

3) Upload files
   - Upload site root contents (index.html, CSS/, IMG/, JavaScript/, sitemap.xml, robots.txt)

4) Performance
   - Enable gzip/Brotli on the server
   - Configure caching (Cache-Control) for static assets
   - Use image optimization and set proper Content-Type headers

5) SEO
   - Ensure `sitemap.xml` and `robots.txt` use https://www.molobelatech.com (already updated)
   - Update social links and Open Graph meta if needed

6) Backup
   - Create a zip of current project and store offsite

7) Post-deploy checks
   - Run Lighthouse audit and review accessibility/performance
   - Test contact form (WhatsApp flow) on desktop and mobile

Commands (zip project on Windows PowerShell):

```powershell
Compress-Archive -Path . -DestinationPath molobela-website-prod.zip
```
