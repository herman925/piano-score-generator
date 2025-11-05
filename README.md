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

## 🛠️ Technology Stack

- **Frontend:** Pure HTML5, CSS3, JavaScript (ES6+)
- **Styling:** 
  - Tailwind CSS (via CDN)
  - Custom CSS with CSS variables for theming
- **Icons:** Lucide Icons (via CDN)
- **Fonts:** Google Fonts (Poppins, Lora, Space Mono)

**No build tools or package managers required!** All dependencies are loaded via CDN.

## 📂 Project Structure

```
piano-score-generator/
├── index.html          # Landing/hero page
├── mixer.html          # Parameter selection interface
├── score.html          # Generated score display
└── css/                # Theme and styling files
    ├── piano_theme_child_1.css    # Main application theme
    ├── piano_theme_1.css          # Alternative theme
    ├── piano_score_theme.css      # Score-specific styles
    └── default_ui_darkmode.css    # Dark mode theme
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
