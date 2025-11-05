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
├── css/                # Theme and styling files
│   ├── piano_theme_child_1.css      # Main theme with CSS variables
│   ├── piano_theme_1.css            # Alternative theme
│   ├── piano_score_theme.css        # Score-specific styling
│   └── default_ui_darkmode.css      # Dark mode styling
├── .gitignore          # Git ignore patterns
└── CLAUDE.md           # AI assistant guidelines
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
- **Theme System:** The project uses CSS custom properties (variables) defined in `piano_theme_child_1.css`
- **Key CSS Variables:**
  - Colors: `--background`, `--foreground`, `--primary`, `--accent`, etc.
  - Typography: `--font-sans`, `--font-serif`, `--font-mono`
  - Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`, etc.
  - Spacing: `--spacing`, `--radius`
- **Design Style:** Neo-brutalism with chunky borders, bold shadows, and playful colors
- Use Tailwind utility classes for layout
- Add custom styles in `<style>` tags when component-specific

### JavaScript
- Use vanilla JavaScript (no frameworks)
- Keep scripts inline in `<script>` tags for this simple project
- Use event delegation where appropriate
- Add comments for complex logic
- Follow ES6+ conventions (const/let, arrow functions, etc.)

### Fonts
- Primary: Poppins (sans-serif)
- Secondary: Lora (serif)
- Monospace: Space Mono
- All fonts loaded from Google Fonts CDN

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
2. Include the same `<head>` setup (Tailwind, theme CSS, fonts)
3. Use consistent button styles (`.btn` class)
4. Add navigation links from existing pages
5. Test navigation flow

### Modifying Theme
1. Edit CSS variables in `css/piano_theme_child_1.css`
2. Changes will apply across all pages
3. Test color contrast for accessibility
4. Verify readability on all pages

### Adding Interactive Features
1. Add HTML elements with appropriate IDs
2. Write JavaScript in inline `<script>` tag
3. Use `addEventListener` for interactions
4. Test across different browsers
5. Ensure mobile compatibility

### Updating Styling
1. Prefer Tailwind utility classes for layout
2. Use CSS custom properties from theme
3. Add custom styles in page `<style>` tag if component-specific
4. Maintain the neo-brutalism design aesthetic
5. Keep borders bold (2px) and shadows chunky

## Important Notes

- **No Build Process:** This is intentional - the project is designed to be simple and accessible
- **No Package Manager:** All dependencies loaded via CDN
- **No Version Control for Dependencies:** Using `@latest` or unversioned CDN links
- **Mobile First:** The score page requires landscape orientation on mobile
- **Design Philosophy:** Playful, child-friendly, with bold colors and chunky UI elements

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
