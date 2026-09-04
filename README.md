# Aman Gulyani — Personal Digital Resume & Portfolio

A clean, modern, and recruiter-friendly single-page digital resume and portfolio built with pure semantic **HTML5**, **CSS3**, and **vanilla JavaScript** — zero build tools, zero external dependencies.

---

## 🚀 Quick Start: How to Open & Run

You can run this website instantly using any of the methods below:

### Option 1: Direct File Open (Fastest)
Simply double-click `index.html` in your file explorer (Finder on macOS) or open it directly in any browser:
- **Chrome / Safari / Edge**: Press `Cmd + O` and select `index.html`, or drag and drop `index.html` into a new browser tab.
- Or open directly from terminal:
  ```bash
  open /Users/amangulyani/.gemini/antigravity-ide/scratch/digital-resume/index.html
  ```

### Option 2: Local HTTP Server (Optional)
If you prefer running via a local server:
```bash
# macOS default Python (or any simple server)
cd /Users/amangulyani/.gemini/antigravity-ide/scratch/digital-resume
python3 -m http.server 8000
# Then open http://localhost:8000 in your browser
```

---

## 📂 File Structure

```
digital-resume/
├── index.html           # Main semantic HTML5 structure with section edit guides
├── css/
│   └── styles.css       # Design tokens, CSS variables, responsive layout, lightbox & animations
├── js/
│   └── script.js        # Vanilla JS: sticky header, scroll spy, mobile drawer, lightbox & copy email
├── images/
│   ├── headshot.svg     # Placeholder avatar (drop in headshot.jpg here)
│   ├── conference-1.svg # Conference keynote photo placeholder
│   ├── conference-2.svg # Panel discussion photo placeholder
│   ├── conference-3.svg # Strategy workshop photo placeholder
│   ├── conference-4.svg # Fireside chat photo placeholder
│   └── resume.pdf       # Sample downloadable PDF resume
└── README.md            # Documentation and customization guide
```

---

## ✏️ How to Customize Your Content

All sections have explicit HTML comment tags formatted like `<!-- RESUME EDIT: ... -->` to show you exactly where to paste your content:

### 1. Hero Section & Headshot
- **LinkedIn Link**: Already pre-configured to `https://www.linkedin.com/in/aman-gulyani-a6665677/`.
- **Headshot Photo**: Place your headshot photo in `images/headshot.jpg`. In `index.html` (around line 105), update:
  ```html
  <img src="images/headshot.jpg" alt="Aman Gulyani — Professional Headshot" ...>
  ```
- **Title & Tagline**: Edit the `<p class="hero-subtitle">` and `<p class="hero-tagline">` text in `index.html`.

### 2. Professional Summary (`#about`)
- In `index.html`, look for `<!-- RESUME EDIT: Paste your 3-4 sentence professional summary here -->` (around line 133) and paste your resume summary.
- You can also adjust the 4 quick metric badges (Years of Experience, Projects Led, Conferences, etc.).

### 3. Work Experience (`#experience`)
- In `index.html`, find `<!-- SECTION 3: WORK EXPERIENCE -->` (around line 170).
- Each role is enclosed in a `<div class="timeline-item">...</div>`.
- Replace the Company Name, Title, Date Range, Location, and 2–4 bullet points with your actual resume bullets.
- Add or remove timeline items as needed by copying a `<div class="timeline-item">` block.

### 4. Education (`#education`)
- In `index.html`, find `<!-- SECTION 4: EDUCATION -->` (around line 300).
- Update your upcoming MBA program details (institution name, expected graduation year, focus areas) and your undergraduate degree.

### 5. Skills (`#skills`)
- In `index.html`, find `<!-- SECTION 5: SKILLS -->` (around line 370).
- Skills are grouped into 4 cards:
  1. *Analytics & Data Strategy*
  2. *Product Marketing & Growth*
  3. *Leadership & Execution*
  4. *Tools & Platforms*
- Simply edit or add `<span class="skill-pill">Skill Name</span>` pills.

### 6. Conferences & Speaking (`#conferences`)
- Place your event photos in `images/` (e.g. `images/conference-1.jpg`, `conference-2.jpg`, etc.).
- In `index.html`, update the `data-full-image` attribute, `src` attribute, and the caption tags (`Event Title`, `Year`, `Description`).
- The responsive lightbox automatically picks up the image and captions when clicked!

### 7. Contact & Resume Download (`#contact`)
- In `index.html`, find `<!-- SECTION 7: CONTACT -->` (around line 520).
- Update `mailto:aman.gulyani@example.com` and `data-email="..."` to your actual email address.
- Replace `images/resume.pdf` with your real resume PDF file (or keep the name `resume.pdf` so the download buttons point to it automatically).

---

## 🎨 Color Palette & Theming (CSS Variables)

You can easily adjust colors in `css/styles.css` under the `:root` block:
- `--accent-primary`: Primary brand color (default: executive blue `#2563eb`).
- `--bg-primary`: Background color (default: `#f8fafc`).
- `--text-primary`: Heading & high-contrast text color (default: `#0f172a`).
- Dark mode colors are similarly configured under `[data-theme="dark"]`.
