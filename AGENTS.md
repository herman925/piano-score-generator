# AGENTS.md

This document provides context and guidelines specifically for coding agents working on the piano-score-generator project.

**IMPORTANT:** Do NOT create new documentation files. Only update existing documentation when code changes require it and directions have changed/updated.

## Project Overview

This is a static HTML/CSS/JavaScript web application called "EqualPlay" - an interactive piano score generator designed for children. The application allows users to create music by selecting different feelings, keys, and speeds, then displays the generated score.

## Project Structure

```
piano-score-generator/
├── index.html          # Hero/landing page
├── mixer.html          # Parameter selection page (feeling, key, speed)
├── score.html          # Generated score display page
├── css/                # Styling files (all styles now externalized)
│   ├── piano_theme_child_1.css      # Main theme with CSS variables
│   ├── common.css                   # Shared styles (buttons, animations)
│   ├── index.css                    # Index page specific styles
│   ├── mixer.css                    # Mixer page specific styles
│   ├── score.css                    # Score page specific styles
│   ├── piano_theme_1.css            # Alternative theme
│   ├── piano_score_theme.css        # Legacy score styling
│   └── default_ui_darkmode.css      # Dark mode styling
├── js/                 # JavaScript files (all scripts now externalized)
│   ├── translations.js              # Shared translation system
│   ├── index.js                     # Index page logic
│   ├── mixer.js                     # Mixer page logic (parameter selection)
│   └── score.js                     # Score page logic (loading & display)
├── assets/             # Score images and data files
│   ├── scores.json                  # Score mapping configuration
│   └── *.jpeg                       # Piano score images
├── .gitignore          # Git ignore patterns
├── AGENTS.md           # Guidelines for coding agents (this file)
├── CLAUDE.md           # Configuration for design extension
├── CODING_SCHEME.md    # Score naming convention reference
└── README.md           # User-facing documentation
```

## Development Environment

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A local web server (optional but recommended for testing)
- Text editor or IDE

### Local Development
Since this is a static HTML project with no build process:

1. **No build system required** - The project uses CDN-loaded dependencies:
   - Tailwind CSS (via CDN)
   - Lucide icons (via CDN)
   - Google Fonts (via CDN)

2. **Running locally:**
   ```bash
   # Option 1: Using Python's built-in server
   python -m http.server 8000
   # Then open http://localhost:8000 in your browser
   
   # Option 2: Using Node.js http-server
   npx http-server -p 8000
   
   # Option 3: Just open index.html directly in a browser
   # (may have CORS issues with some browsers)
   ```

3. **File watching:**
   - No compilation needed - changes to HTML/CSS are immediately visible on refresh
   - Use browser DevTools for live CSS editing and debugging

## Code Conventions

### HTML Structure
- Follow semantic HTML5 practices
- Use clear, descriptive IDs and classes
- Maintain accessibility with proper ARIA labels and alt text
- Keep inline styles minimal; prefer CSS classes

### CSS Styling
- **Modular Structure:** CSS is now organized into separate files for maintainability
  - `css/piano_theme_child_1.css` - CSS custom properties (variables) and theme definitions
  - `css/common.css` - Shared styles used across all pages (buttons, animations)
  - `css/index.css` - Index page specific styles
  - `css/mixer.css` - Mixer page specific styles (feeling buttons, switches, sliders)
  - `css/score.css` - Score page specific styles (landscape warning, print styles)
- **Key CSS Variables:**
  - Colors: `--background`, `--foreground`, `--primary`, `--accent`, etc.
  - Typography: `--font-sans`, `--font-serif`, `--font-mono`
  - Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`, etc.
  - Spacing: `--spacing`, `--radius`
- **Design Style:** Neo-brutalism with chunky borders (2px), bold shadows, and playful colors
- **Usage:** Use Tailwind utility classes for layout, custom CSS files for component-specific styles
- **Adding New Styles:** Place shared styles in `common.css`, page-specific styles in respective CSS files

### JavaScript
- **Modular Structure:** JavaScript is now organized into separate files for clarity and reusability
  - `js/translations.js` - Shared translation system (all language strings and helper functions)
  - `js/index.js` - Index page logic (language toggle, page initialization)
  - `js/mixer.js` - Mixer page logic (parameter selection, prompt generation, loading animation)
  - `js/score.js` - Score page logic (score loading, display, download/print/share functionality)
- **Architecture:** Use vanilla JavaScript (no frameworks)
- **Code Organization:**
  - Place shared utilities in `translations.js`
  - Keep page-specific logic in respective JS files
  - Use event delegation where appropriate
  - Initialize code when DOM is ready using `DOMContentLoaded` or readyState check
- **Conventions:** Follow ES6+ (const/let, arrow functions, template literals, async/await)
- **Comments:** Add JSDoc-style comments for functions and complex logic

### Fonts
- Primary: Poppins (sans-serif)
- Secondary: Lora (serif)
- Monospace: Space Mono
- All fonts loaded from Google Fonts CDN

## Modular Architecture

### Translation System
The application uses a centralized translation system defined in `js/translations.js`:

**Key Functions:**
- `translations` - Object containing all translation strings for both languages (zh-TW and en)
- `getCurrentLanguage()` - Get current language from localStorage
- `setCurrentLanguage(lang)` - Save language preference to localStorage
- `toggleLanguage()` - Switch between languages
- `getTranslations(lang)` - Get translation object for specified language

**Usage in Pages:**
```javascript
const t = getTranslations(currentLang);
document.title = t.indexTitle;
```

### Page Initialization Pattern
All page scripts follow a consistent initialization pattern:

```javascript
// Get current language
let currentLang = getCurrentLanguage();

// Define page-specific functions
function applyTranslations() { /* ... */ }
function initPage() { /* ... */ }

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}
```

### CSS Loading Order
Pages load CSS in this order for proper cascade:
1. Tailwind CSS (CDN)
2. `css/piano_theme_child_1.css` - Theme variables
3. `css/common.css` - Shared styles
4. Page-specific CSS (`css/index.css`, `css/mixer.css`, or `css/score.css`)

### JavaScript Loading Order
Pages load JavaScript in this order:
1. External libraries (Tailwind, Lucide icons)
2. `js/translations.js` - Must load first as other scripts depend on it
3. Page-specific script (`js/index.js`, `js/mixer.js`, or `js/score.js`)

## Testing Guidelines

Since this is a static HTML project without a test framework:

### Manual Testing Checklist
1. **Cross-browser testing:**
   - Test in Chrome, Firefox, Safari, and Edge
   - Verify all pages load correctly
   - Check that all interactive elements work

2. **Responsive design:**
   - Test on mobile devices (portrait and landscape)
   - Verify the landscape warning appears on mobile portrait
   - Check tablet and desktop layouts

3. **User interactions:**
   - **index.html:** Click "Let's Go!" button navigates to mixer.html
   - **mixer.html:** 
     - Feeling buttons: Only one can be selected at a time
     - Background color changes based on selected feeling
     - Speed buttons: Only one can be selected at a time
     - Key switch toggles between major/minor
   - **score.html:**
     - Play/stop buttons are functional
     - Back button returns to mixer.html
     - Share, download, and print buttons are present

4. **Visual testing:**
   - Verify button hover effects (transform, shadow changes)
   - Check button active states (scale, shadow)
   - Ensure proper spacing and alignment
   - Validate color contrast for accessibility

5. **Console checking:**
   - Open browser DevTools Console
   - Check for JavaScript errors
   - Verify no 404 errors for resources

### Validation
- Use W3C HTML validator: https://validator.w3.org/
- Check CSS validity: https://jigsaw.w3.org/css-validator/
- Test accessibility with browser DevTools Lighthouse

## Making Changes

### Before Starting
1. Review the existing code to understand the current implementation
2. Test the current functionality in a browser
3. Plan minimal changes that don't break existing features

### During Development
1. Make incremental changes
2. Test in browser after each change
3. Use browser DevTools for debugging
4. Verify responsive behavior at different screen sizes

### Before Committing
1. Test all three pages thoroughly
2. Verify no console errors
3. Check that navigation between pages works
4. Ensure responsive design is maintained
5. Validate HTML/CSS if structural changes were made

## Common Tasks

### Adding a New Page
1. Create new HTML file in root directory
2. Include the same `<head>` setup:
   ```html
   <script src="https://cdn.tailwindcss.com"></script>
   <link rel="stylesheet" href="css/piano_theme_child_1.css">
   <link rel="stylesheet" href="css/common.css">
   <link rel="stylesheet" href="css/your-page.css">
   ```
3. Create corresponding CSS file in `css/` directory for page-specific styles
4. Create corresponding JS file in `js/` directory for page-specific logic
5. Include scripts at end of `<body>`:
   ```html
   <script src="js/translations.js"></script>
   <script src="js/your-page.js"></script>
   ```
6. Use consistent button styles (`.btn` class from `common.css`)
7. Add navigation links from existing pages
8. Test navigation flow

### Modifying Theme
1. Edit CSS variables in `css/piano_theme_child_1.css`
2. Changes will apply across all pages automatically
3. Test color contrast for accessibility
4. Verify readability on all pages

### Adding Interactive Features
1. Add HTML elements with appropriate IDs
2. Add JavaScript to the appropriate page file in `js/` directory
3. For shared functionality, add to `js/translations.js` or create a new shared utility file
4. Use `addEventListener` for interactions
5. Follow the initialization pattern (check `DOMContentLoaded`)
6. Test across different browsers
7. Ensure mobile compatibility

### Updating Styling
1. **For shared styles:** Edit `css/common.css`
2. **For page-specific styles:** Edit the corresponding CSS file (`css/index.css`, `css/mixer.css`, `css/score.css`)
3. **For theme variables:** Edit `css/piano_theme_child_1.css`
4. Prefer Tailwind utility classes for layout
5. Use CSS custom properties from theme for colors, shadows, spacing
6. Maintain the neo-brutalism design aesthetic
7. Keep borders bold (2px) and shadows chunky

### Adding Translations
1. Open `js/translations.js`
2. Add new translation keys to both language objects (`zh-TW` and `en`)
3. Use the translation in your page JavaScript:
   ```javascript
   const t = getTranslations(currentLang);
   element.textContent = t.yourNewKey;
   ```
4. For dynamic content, use `data-i18n` attributes in HTML:
   ```html
   <span data-i18n="yourKey">Default Text</span>
   ```
5. Update the translation in your page's `applyTranslations()` function

## Score Coding Scheme

The application uses a standardized naming convention for scores:

**Emotion + Speed + Key**

Example: `Happy_Fast_M`, `Sad_Med_m`, `Calm_Slow_M`

Where:
- **Emotion**: Happy, Excited, Calm, Sad
- **Speed**: Fast, Med (Medium), Slow
- **Key**: M (Major) or m (minor)

See `CODING_SCHEME.md` for the complete mapping reference and score inventory.

## Important Notes

- **No Build Process:** This is intentional - the project is designed to be simple and accessible
- **No Package Manager:** All dependencies loaded via CDN
- **No Version Control for Dependencies:** Using `@latest` or unversioned CDN links
- **Mobile First:** The score page requires landscape orientation on mobile
- **Design Philosophy:** Playful, child-friendly, with bold colors and chunky UI elements
- **Score Naming:** All scores follow the Emotion_Speed_Key format defined in CODING_SCHEME.md

## Troubleshooting

### Common Issues

1. **Styles not loading:**
   - Check CSS file paths are correct
   - Verify CSS files exist in `/css/` directory
   - Check browser console for 404 errors

2. **JavaScript not working:**
   - Check browser console for errors
   - Verify script is placed after DOM elements
   - Ensure IDs match between HTML and JavaScript

3. **CDN resources not loading:**
   - Check internet connection
   - Verify CDN URLs are correct and active
   - Check browser console Network tab for failed requests

4. **Layout issues:**
   - Use browser DevTools to inspect elements
   - Check Tailwind classes are correct
   - Verify CSS custom properties are defined

## Documentation Updates

Remember: **Only update documentation when code changes cause directions or structure to change significantly.** Do not create new documentation files unless explicitly requested.
