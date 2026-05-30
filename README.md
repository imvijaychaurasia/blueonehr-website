# BlueOneHR Website

Marketing website for [blueonehr.com](https://blueonehr.com), hosted on **GitHub Pages** from the `main` branch.

---

## Project structure

```
BlueOneHR-website/
├── index.html                  # Homepage (hero, features, modules, CTA)
├── pricing.html                # Pricing page
├── demo.html                   # Demo / live-access page
├── about.html                  # About & contact page
├── css/
│   └── styles.css              # Custom styles (Tailwind used via CDN)
├── js/
│   └── main.js                 # Navigation, scroll effects
└── assets/
    ├── img/
    │   ├── logo.svg            # Brand logo
    │   ├── icon.svg            # Favicon
    │   └── screenshots/        # ← Slideshow images (see below)
    │       ├── 1_dashboard.png
    │       ├── 2_employee_dashboard.png
    │       ├── 3_dashboard.png
    │       ├── 4_dashboard_analytics.png
    │       ├── 5_policies.png
    │       ├── 6_letters.png
    │       └── 7_reports.png
    └── video/
        └── blueonehr-demo.mp4  # Product demo video (not in slideshow)
```

---

## Deployment

The site deploys automatically to GitHub Pages on every push to `main`.

**Workflow:**
1. Make changes locally (Mac) or on the server
2. Commit and push to `main`
3. GitHub Actions builds and deploys — live within ~60 seconds

**Mac → Server sync (when editing locally on Mac):**
```bash
# Copy a single file
scp BlueOneHR-website/index.html tantra:~/apps/BlueOneHR/blueonehr-website/

# Copy a whole folder
scp -r BlueOneHR-website/assets/img/screenshots tantra:~/apps/BlueOneHR/blueonehr-website/assets/img/
```

**Commit on server:**
```bash
cd ~/apps/BlueOneHR/blueonehr-website
git add .
git commit -m "your message"
git push
```

---

## Adding or removing slideshow screenshots

The hero slideshow cycles through all images defined in the `SLIDES` array inside `index.html`. The images live in `assets/img/screenshots/`.

### Add a new screenshot

1. **Copy the file** to `assets/img/screenshots/` (use a numbered prefix to control order, e.g. `8_payroll.png`)
2. **Register it** in the `SLIDES` array near the bottom of `index.html`:

```js
/* ── SLIDE CONFIG ── add/remove lines here ── */
const SLIDES = [
  { src: 'assets/img/screenshots/1_dashboard.png',           label: '📊 Dashboard'            },
  { src: 'assets/img/screenshots/2_employee_dashboard.png',  label: '👥 Employee Dashboard'   },
  // ... existing entries ...
  { src: 'assets/img/screenshots/8_payroll.png',             label: '💰 Payroll'              }, // ← new
];
```

3. **Commit and push** — the slideshow updates live immediately.

### Remove a screenshot

1. Delete the line from the `SLIDES` array in `index.html`
2. Remove the file from git:
```bash
git rm assets/img/screenshots/FILENAME.png
```
3. Commit and push.

### Reorder slides

Change the numeric prefix of the filename (e.g. rename `5_policies.png` → `3_policies.png`) **and** move its entry in the `SLIDES` array to match. Both must stay in sync.

---

## Updating page content

All pages are plain HTML — open the file, edit the text, save and deploy.

| What to change | File | Look for |
|---|---|---|
| Hero headline / subtext | `index.html` | `<h1>` and `<p>` inside `<!-- ── Hero` |
| Stats (17+ modules, 99.9%) | `index.html` | `<!-- Stats row -->` |
| Feature cards | `index.html` | `<!-- ── Features` section |
| Module pills & descriptions | `index.html` | `const moduleData = {` in `<script>` |
| Pricing plans | `pricing.html` | — |
| Demo / trial links | Any page | `href="https://demo.blueonehr.com"` |
| Footer links | `index.html` | `<!-- ── Footer` section |

---

## Remotion video project

The animated product video is generated with [Remotion](https://remotion.dev) from the `remotion/` folder at the project root.

```
remotion/
├── src/
│   ├── Root.tsx          # Composition config (fps, dimensions, duration)
│   └── Composition.tsx   # Video scenes and animation code
└── public/               # Assets used in the video (screenshots, logo)
```

### Preview the video
```bash
cd remotion
npx remotion studio
# Opens http://localhost:3000
```

### Re-render after changes
```bash
cd remotion
npx remotion render BlueOneHR out/blueonehr-demo.mp4
cp out/blueonehr-demo.mp4 ../BlueOneHR-website/assets/video/
```

### Add a new screenshot to the video
1. Copy the PNG to `remotion/public/`
2. Add a `<Sequence>` block in `remotion/src/Composition.tsx` using the `<ScreenScene>` component
3. Adjust `S_*` frame constants and the total `durationInFrames` in `Root.tsx`
4. Re-render and copy the MP4 to the website

---

## GitHub Actions warning (Node.js 20 deprecation)

The deployment workflow uses `actions/checkout` and `actions/upload-artifact`. GitHub will enforce Node.js 24 from **June 16 2026** and remove Node 20 on **September 16 2026**.

To silence the warning and opt in early, add this to `.github/workflows/pages.yml` (or whichever workflow file exists):

```yaml
env:
  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true
```

Place it at the top level of the workflow (same indentation as `jobs:`).

---

## Local development

The site uses Tailwind CSS via CDN — no build step required. Open any HTML file directly in a browser, or serve locally:

```bash
cd BlueOneHR-website
npx serve .          # http://localhost:3000
# or
python3 -m http.server 8080
```
