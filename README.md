# 🎹 EqualPlay - Piano Score Generator

A playful, child-friendly web application for creating piano music through an interactive interface. Kids can express their feelings through music by selecting emotions, keys, and speeds to generate unique piano scores.

## ✨ Features

- **Emotional Music Creation:** Choose from Happy, Excited, Calm, or Sad feelings
- **Interactive Mixer:** Select key (Major/Minor) and speed (Slow/Medium/Fast)
- **Visual Score Display:** See your generated music as a colorful piano score
- **Child-Friendly Design:** Neo-brutalism style with bold colors and chunky, tactile UI elements
- **Responsive Design:** Works on desktop and mobile (landscape mode for score viewing)

## 🚀 Quick Start

### Running Locally

This is a static HTML application with no build process required! Simply:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/herman925/piano-score-generator.git
   cd piano-score-generator
   ```

2. **Open in browser:**
   
   **Option A:** Direct file opening
   ```bash
   # Just open index.html in your web browser
   open index.html  # macOS
   start index.html # Windows
   xdg-open index.html # Linux
   ```
   
   **Option B:** Using a local server (recommended)
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Or using Node.js
   npx http-server -p 8000
   ```
   
   Then navigate to `http://localhost:8000` in your browser.

3. **Start creating music!**
   - Click "Let's Go! 🚀" on the landing page
   - Select your feeling, key, and speed
   - Click "Make Music! 🎶" to see your score

## 📱 Usage

### Navigation Flow

1. **Landing Page (index.html):** Welcome screen with the EqualPlay mascot
2. **Music Mixer (mixer.html):** Interactive parameter selection
3. **Score Display (score.html):** View and play your generated music

### Controls

**Music Mixer:**
- **Feeling Buttons:** Select one of four moods (Happy, Excited, Calm, Sad)
- **Key Switch:** Toggle between Major (☀️) and Minor (🌙) keys
- **Speed Buttons:** Choose tempo (Slow 🐢, Medium 🏃, Fast 🐇)

**Score Page:**
- **Play Button:** Play your generated music
- **Stop Button:** Stop playback
- **Volume Slider:** Adjust playback volume
- **Back Button:** Return to the mixer
- **Share/Download/Print:** Share or save your creation

## 🎨 Design Philosophy

EqualPlay uses a **neo-brutalism** design style featuring:
- Bold, chunky borders (2px)
- Strong drop shadows for depth
- Bright, playful color palette
- Large, friendly typography (Poppins, Lora, Space Mono)
- Emoji and visual metaphors for intuitive interaction

The interface is designed to be approachable and fun for children while maintaining visual clarity.

## 🎵 Score Coding Scheme

Piano scores in EqualPlay follow a standardized naming convention:

**Emotion + Speed + Key**

Example: `Happy_Fast_M`, `Sad_Med_m`

- **Emotion:** Happy, Excited, Calm, Sad
- **Speed:** Fast, Med (Medium), Slow
- **Key:** M (Major) or m (minor)

For the complete score inventory and technical details, see [CODING_SCHEME.md](./CODING_SCHEME.md).

## 🛠️ Technology Stack

- **Frontend:** Pure HTML5, CSS3, JavaScript (ES6+)
- **Architecture:** Modular design with separated CSS and JavaScript files
- **Styling:** 
  - Tailwind CSS (via CDN) for utility classes
  - Custom modular CSS with CSS variables for theming
  - Separated page-specific and shared stylesheets
- **JavaScript:**
  - Vanilla ES6+ JavaScript
  - Modular structure with shared translation system
  - Page-specific logic in separate files
- **Icons:** Lucide Icons (via CDN)
- **Fonts:** Google Fonts (Poppins, Lora, Space Mono)

**No build tools or package managers required!** All dependencies are loaded via CDN.

## 📂 Project Structure

```
piano-score-generator/
├── index.html          # Landing/hero page
├── mixer.html          # Parameter selection interface
├── score.html          # Generated score display
├── css/                # Modular styling files
│   ├── piano_theme_child_1.css    # Theme variables and colors
│   ├── common.css                 # Shared styles across all pages
│   ├── index.css                  # Index page specific styles
│   ├── mixer.css                  # Mixer page specific styles
│   ├── score.css                  # Score page specific styles
│   ├── piano_theme_1.css          # Alternative theme
│   ├── piano_score_theme.css      # Legacy score styles
│   └── default_ui_darkmode.css    # Dark mode theme
├── js/                 # Modular JavaScript files
│   ├── translations.js            # Shared translation system
│   ├── index.js                   # Index page logic
│   ├── mixer.js                   # Mixer page logic
│   └── score.js                   # Score page logic
└── assets/             # Score images and data
    ├── scores.json                # Score mapping configuration
    └── *.jpeg                     # Piano score images
```

### Key Features of the Architecture

**🎨 Modular CSS:**
- `common.css` - Shared button styles, animations, and global utilities
- Page-specific CSS files for isolated styling concerns
- Theme variables centralized in `piano_theme_child_1.css`

**⚡ Modular JavaScript:**
- `translations.js` - Centralized bilingual (繁體中文/English) translation system
- Page-specific JavaScript files for maintainable code organization
- Consistent initialization pattern across all pages

**🌐 Translation System:**
- Unified translation management in `translations.js`
- Easy language switching with localStorage persistence
- Shared helper functions: `getCurrentLanguage()`, `toggleLanguage()`, `getTranslations()`
```

## 🤝 Contributing

Contributions are welcome! Whether you're fixing bugs, adding features, or improving documentation, your help makes EqualPlay better for kids everywhere.

### Guidelines

1. **Keep it simple:** This project intentionally avoids build tools to remain accessible
2. **Test thoroughly:** Verify changes work across different browsers and devices
3. **Maintain the style:** Follow the existing neo-brutalism design aesthetic
4. **Think of the users:** Keep the interface child-friendly and intuitive

### Making Changes

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and test thoroughly
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Testing Your Changes

- Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- Verify responsive behavior on mobile devices
- Check that all interactive elements work correctly
- Ensure no console errors appear in browser DevTools

## 👨‍💻 For Developers

### Code Organization

The codebase follows a modular architecture for better maintainability:

**CSS Files:**
- Edit `css/common.css` for shared styles (buttons, animations)
- Edit page-specific CSS files for isolated changes
- Modify `css/piano_theme_child_1.css` for theme-wide color/spacing changes

**JavaScript Files:**
- `js/translations.js` contains all translation strings and language utilities
- Each page has its own JS file with initialization and event handlers
- Follow the established pattern: check DOM ready state, then call `initPage()`

**Adding New Features:**
1. Add HTML elements with semantic IDs
2. Update relevant CSS file (`common.css` for shared, page-specific for isolated)
3. Add JavaScript to appropriate page file in `js/` directory
4. For new translatable text, add keys to both languages in `translations.js`
5. Test across browsers and screen sizes

**Translation System Usage:**
```javascript
// Get current language
const currentLang = getCurrentLanguage();

// Get translations for current language
const t = getTranslations(currentLang);

// Use translation
document.getElementById('element').textContent = t.translationKey;

// Toggle language
document.getElementById('lang-toggle').addEventListener('click', () => {
    currentLang = toggleLanguage();
    applyTranslations();
});
```

For detailed development guidelines, see [AGENTS.md](./AGENTS.md).

## 📝 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Designed with children's music education in mind
- Inspired by playful, accessible design principles
- Built with love for young musicians 🎵

## 📞 Support

For issues, questions, or suggestions, please [open an issue](https://github.com/herman925/piano-score-generator/issues) on GitHub.

---

**Made with ❤️ for young musicians everywhere**
