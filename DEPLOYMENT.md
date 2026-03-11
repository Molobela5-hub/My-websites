# Deployment Guide

## Current Status

The site is **not yet live**. A GitHub Actions workflow (`deploy.yml`) has been added to
this branch to deploy the site to GitHub Pages automatically whenever changes are merged
into `main`. Two steps are still required before the site goes live:

1. Enable GitHub Pages (GitHub Actions source) in the repository settings.
2. Merge this branch / PR into `main`.

---

## Step 1 — Enable GitHub Pages (one-time, done by the repo owner)

1. Open the repository on GitHub: https://github.com/Molobela5-hub/Molobela-Web-Tech
2. Click **Settings** → **Pages** (left sidebar).
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Save. No branch or folder needs to be selected — the workflow handles everything.

---

## Step 2 — Merge the PR into `main`

Once GitHub Pages is enabled, merge PR #1
(`copilot/host-website-setup` → `main`).

The `Deploy to GitHub Pages` workflow will run automatically and the site will be
published at:

```
https://molobela5-hub.github.io/Molobela-Web-Tech/
```

The workflow also runs on every future push to `main`, so the live site stays up to date
with each change.

---

## Custom Domain (optional)

If you want the site served at `https://www.molobelatech.com` instead of the default
GitHub Pages URL:

1. Buy / verify the domain with your DNS registrar.
2. In **Settings → Pages → Custom domain**, enter `www.molobelatech.com` and save.
3. Add a `CNAME` DNS record pointing `www` → `molobela5-hub.github.io`.
4. Tick **Enforce HTTPS** once the certificate is issued (usually a few minutes).
5. Update `sitemap.xml` and `robots.txt` to use `https://www.molobelatech.com`.

---

## Post-Deploy Checks

- [ ] Open the published URL and verify the site loads correctly.
- [ ] Test the contact form (WhatsApp redirect) on desktop and mobile.
- [ ] Run a Lighthouse audit (Chrome DevTools → Lighthouse) and review the results.
- [ ] Confirm all images and fonts load without errors.
- [ ] Check `sitemap.xml` and `robots.txt` are accessible at the live URL.
- [ ] Verify all social media links in the footer (WhatsApp, Facebook, Instagram, TikTok).
  - The Facebook link currently uses `https://www.facebook.com/Hlogi%20Molobela` — replace
    with your actual profile URL (e.g. `https://www.facebook.com/your.username` or
    `https://www.facebook.com/profile.php?id=NUMERIC_ID`).

---

## Backup

```powershell
# Windows PowerShell — create a local zip of the project
Compress-Archive -Path . -DestinationPath molobela-website-prod.zip
```
