# BlueOneHR Website

Marketing website for [blueonehr.com](https://blueonehr.com), hosted on **GitHub Pages** from the `main` branch.

A product of **तन्त्र Stack Private Limited** — registered owner of BlueOneHR and the BlueOne product line.

---

## Project structure

```
BlueOneHR-website/
├── index.html                  # Homepage (hero slideshow, features, per-module explorer, CTA)
├── pricing/
│   └── index.html              # Pricing page — Starter / Standard / Enterprise
├── demo/
│   └── index.html              # Demo / live-access page
├── about/
│   └── index.html              # About, तन्त्र Stack Pvt Ltd, values, WhatsApp contact form
├── css/
│   └── styles.css              # Custom styles (Tailwind used via CDN)
├── js/
│   └── main.js                 # Navigation, scroll effects, fade-in observers
└── assets/
    ├── img/
    │   ├── logo.svg            # Brand logo
    │   ├── icon.svg            # Favicon
    │   └── screenshots/        # 23 module screenshots (hero slideshow + per-module panels)
    └── video/
        └── blueonehr-demo.mp4  # Product demo video
```

---

## Deployment

The site deploys automatically to GitHub Pages on every push to `main`.

**Workflow:**
1. Edit files on Mac (`BlueOneHR-website/`)
2. `scp` changed files to the server
3. Commit and push on the server — live within ~60 seconds

**Mac → Server:**
```bash
# Single file
scp BlueOneHR-website/index.html tantra:~/apps/BlueOneHR/blueonehr-website/

# New screenshots
scp BlueOneHR-website/assets/img/screenshots/<new>.png \
    tantra:~/apps/BlueOneHR/blueonehr-website/assets/img/screenshots/
```

**Commit on server:**
```bash
cd ~/apps/BlueOneHR/blueonehr-website
git add .
git commit -m "website: describe change"
git push
```

---

## Screenshots

Screenshots live in `assets/img/screenshots/` and are used in two places:

1. **Hero slideshow** — auto-rotating carousel at the top of the homepage
2. **Per-module panels** — shown when a module pill is clicked in the module explorer

### Current screenshot inventory

| File | Module | Hero slideshow |
|---|---|---|
| 1_dashboard.png | Dashboard | ✅ |
| 2_recruitment-dashboard.png | Recruitment | ✅ |
| 3_employees.png | Employees | ✅ |
| 4_employee.png | Employee Profile | ✅ |
| 5_attendance_dashboard.png | Attendance | ✅ |
| 6_leave_dashboard.png | Leave | ✅ |
| 7_payroll_dashboard.png | Payroll | ✅ |
| 8_assets_dashboard.png | Assets | ✅ |
| 9_performance_dashboard.png | Performance | ✅ |
| 10_offboarding_dashboard.png | Offboarding | ✅ |
| 11_project_dashboard.png | Projects | ✅ |
| 12_payroll_compliance_dashboard.png | Payroll Compliance | ✅ |
| 13_payroll_compliance_settings.png | Payroll Compliance Settings | — |
| 14_workspace_apps.png | Workspace Apps | ✅ |
| 15_inventory_sync.png | Inventory Sync | ✅ |
| 16_reports.png | Reports | ✅ |
| 17_HR_Letters.png | HR Letters | ✅ |
| 18_HR_Letters_Issue_Letters.png | HR Letters — Issue Letters | — |
| 19_HR_Letters_Bulk_Issue.png | HR Letters — Bulk Issue | — |
| 20_HR_Letters_Analytics.png | HR Letters — Analytics | ✅ |
| 21_HR_Letters_Manage_Templates.png | HR Letters — Templates | — |
| 22_HR_Letters_LetterHead.png | HR Letters — Letterhead | — |
| 23_Employee_KYC.png | Employee KYC | ✅ |

### Add a new screenshot

1. Copy the PNG to `assets/img/screenshots/` (numbered prefix controls sort order)
2. To add to the **hero slideshow**, add a line to the `SLIDES` array in `index.html`:

```js
const SLIDES = [
  // ... existing entries ...
  { src: 'assets/img/screenshots/24_new_feature.png', label: '🆕 New Feature' }, // ← new
];
```

3. To add to a **module panel**, find the module in the `moduleData` object in `index.html` and add to its `shots` array:

```js
'Payroll': {
  // ...
  shots: [
    { src: SS+'7_payroll_dashboard.png', label: 'Payroll Dashboard' },
    { src: SS+'24_new_feature.png',      label: 'New Feature' },  // ← new
  ]
},
```

4. `scp` the file to the server, commit, and push.

### Remove a screenshot

1. Remove its entry from `SLIDES` and/or the relevant `shots` array in `index.html`
2. On the server: `git rm assets/img/screenshots/FILENAME.png`
3. Commit and push.

---

## Updating page content

All pages are plain HTML — edit the file, `scp` to server, commit and push.

| What to change | File | Look for |
|---|---|---|
| Hero headline / subtext | `index.html` | `<!-- ── Hero` section |
| Stats (17+ modules, 99.9%) | `index.html` | `<!-- Stats row -->` |
| Feature cards | `index.html` | `<!-- ── Features` section |
| Module pills & descriptions | `index.html` | `const moduleData = {` |
| Module screenshots | `index.html` | `shots: [...]` inside each module in `moduleData` |
| Hero slideshow images | `index.html` | `const SLIDES = [` |
| Pricing plans | `pricing/index.html` | — |
| About / company text | `about/index.html` | तन्त्र Stack section + mission section |
| Footer copyright | All pages | `© 2026 <strong>तन्त्र</strong> Stack Private Limited` |
| Demo / trial links | Any page | `href="https://demo.blueonehr.com"` |

---

## Remotion video project

The animated product video is generated with [Remotion](https://remotion.dev) from the `remotion/` folder at the project root.

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

---

## GitHub Actions warning (Node.js 20 deprecation)

GitHub enforces Node.js 24 from **June 16 2026**. To silence the warning, add to `.github/workflows/pages.yml`:

```yaml
env:
  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true
```

---

## Local development

No build step required — Tailwind is loaded via CDN.

```bash
cd BlueOneHR-website
python3 -m http.server 8080   # http://localhost:8080
# or
npx serve .                   # http://localhost:3000
```
