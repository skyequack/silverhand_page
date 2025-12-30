# SilverHand: EMG-Controlled Hand Exoskeleton

A low-cost, open-source hand exoskeleton that uses surface electromyography (EMG) to assist individuals with arthritis and neuromuscular impairments.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- For building the physical device: see [Build Instructions](https://silverhand.dev/build-instructions)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/silverhand.git
cd silverhand

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
# Create optimized production build
npm run build

# The static site will be output to the `out/` directory
# Deploy the contents of `out/` to any static hosting service
```

## 📁 Project Structure

```
silverhand/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with header/footer
│   ├── page.tsx             # Home page
│   ├── motivation/          # Motivation page
│   ├── how-it-works/        # Technical overview
│   ├── deep-dive/           # Engineering deep dive subsections
│   │   ├── mechanical/
│   │   ├── electronics/
│   │   ├── power/
│   │   ├── control/
│   │   └── software/
│   ├── build-instructions/  # Step-by-step build guide
│   ├── results/             # Demo videos and performance data
│   ├── future/              # Roadmap and future work
│   ├── contact/             # Contact and research interest
│   ├── projects/            # Project portfolio
│   ├── downloads/           # All downloadable files
│   ├── publications/        # Academic publications
│   ├── license/             # MIT License
│   └── changelog/           # Version history
├── components/              # Reusable React components
│   ├── StarsBackground.tsx  # Animated star field
│   ├── ShootingStars.tsx    # Shooting star effects
│   ├── Header.tsx           # Navigation header
│   ├── Footer.tsx           # Site footer
│   ├── Hero.tsx             # Hero section component
│   ├── ProjectCard.tsx      # Project card with modal
│   └── Section.tsx          # Section wrapper utilities
├── public/                  # Static assets
│   ├── img/                 # Images and diagrams
│   ├── videos/              # Demo videos
│   └── files/               # Downloadable files
├── content/                 # Markdown content files
├── tailwind.config.js       # Tailwind CSS configuration
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies
├── PLACEHOLDERS.md          # Guide to replacing placeholders
└── README.md                # This file
```

## 🎨 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: lucide-react
- **Language**: TypeScript

## 🔧 Replacing Placeholders

This site is generated with placeholder images, videos, and files. Before deploying to production:

1. Review `PLACEHOLDERS.md` for a complete list of placeholders
2. Replace each placeholder with actual content (photos, videos, CAD files, etc.)
3. Update file paths if needed
4. Run `npm run build` to verify all assets load correctly

## 📝 Content Management

All long-form content is located in the `content/` directory as Markdown files. To edit:

1. Locate the relevant `.md` file in `content/`
2. Edit using any text editor
3. Rebuild the site with `npm run build`

## 🧪 Development

### Run Development Server

```bash
npm run dev
```

The site will hot-reload as you make changes.

### Linting

```bash
npm run lint
```

### Type Checking

```bash
npx tsc --noEmit
```

## 📦 Deployment

This is a static Next.js site configured for export. Deploy the `out/` directory to:

- **Vercel**: Automatic deployment via GitHub integration
- **Netlify**: Drag-and-drop the `out/` folder
- **GitHub Pages**: Copy `out/` to `gh-pages` branch
- **Any static host**: Upload `out/` contents via FTP/SFTP

## 🔗 Links

- **Live Site**: https://silverhand.dev (placeholder)
- **GitHub**: https://github.com/yourusername/silverhand
- **Documentation**: See `/content` directory
- **Issues**: https://github.com/yourusername/silverhand/issues

## 📄 License

MIT License - see [LICENSE](/license) page or `LICENSE` file for details.

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

For questions, collaboration inquiries, or research opportunities:

- **Email**: contact@silverhand.dev
- **GitHub Issues**: https://github.com/yourusername/silverhand/issues

## ✅ Pre-Publication Checklist

Before deploying to production, verify:

- [ ] All placeholder images replaced with actual photos/renders
- [ ] All demo videos uploaded and linked correctly
- [ ] All downloadable files (STLs, schematics, firmware) uploaded
- [ ] Lighthouse score: Performance >90, Accessibility >95
- [ ] Test on mobile devices (iOS Safari, Android Chrome)
- [ ] Verify all links work (internal and external)
- [ ] Check console for errors in browser dev tools
- [ ] Add analytics (Google Analytics, Plausible, etc.)
- [ ] Set up custom domain and SSL certificate
- [ ] Create `robots.txt` and submit sitemap to Google Search Console

---

**Made with ❤️ for accessible assistive technology**
