/**
 * Mixer page JavaScript
 * Handles parameter selection, AI prompt generation, and music creation
 */

// Get current language
let currentLang = getCurrentLanguage();

// DOM elements
const feelingButtons = document.querySelectorAll('.feeling-btn');
const speedButtons = document.querySelectorAll('.speed-btn');
const keySwitch = document.getElementById('key-switch');
const promptPreview = document.getElementById('prompt-preview');
const makeMusicBtn = document.getElementById('make-music-btn');
const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.getElementById('progress-bar');
const statusText = document.getElementById('status-text');

// Background colors for each feeling
const feelingColors = {
    'feeling-happy': 'oklch(0.97 0.05 110)',      // Light yellow-green
    'feeling-excited': 'oklch(0.96 0.06 320)',    // Light pink
    'feeling-calm': 'oklch(0.96 0.04 240)',       // Light blue
    'feeling-sad': 'oklch(0.94 0.02 260)'         // Light purple-gray
};

/**
 * Get selected parameters from UI
 */
function getSelectedParameters() {
    const selectedFeeling = document.querySelector('.feeling-btn.selected');
    const selectedSpeed = document.querySelector('.speed-btn.selected');
    const t = getTranslations(currentLang);
    const keyMode = keySwitch.checked ? t.minor : t.major;
    
    return {
        feeling: selectedFeeling ? selectedFeeling.querySelector('[data-i18n]').textContent.trim() : t.happy,
        speed: selectedSpeed ? selectedSpeed.querySelector('[data-i18n]').textContent.trim() : t.medium,
        key: keyMode
    };
}

/**
 * Generate AI prompt based on selected parameters
 */
function generatePrompt() {
    const params = getSelectedParameters();
    const t = getTranslations(currentLang);
    
    if (currentLang === 'zh-TW') {
        const feeling = params.feeling;
        const keyDescription = params.key === t.major ? '明亮且振奮的音調' : '憂鬱且內省的音調';
        let tempoDesc = '';
        if (params.speed === t.slow) {
            tempoDesc = '行板 (60-80 BPM) - 緩慢而從容的節奏';
        } else if (params.speed === t.medium) {
            tempoDesc = '中板 (90-120 BPM) - 舒適的行走節奏';
        } else {
            tempoDesc = '快板 (130-160 BPM) - 快速且充滿活力的節奏';
        }
        
        return `生成具有以下特徵的鋼琴作品：

情緒：${feeling}
- 創作一個${feeling}且情感豐富的旋律
- 使用能喚起${feeling}感覺的和弦進行

調性：${params.key}
- 以${params.key}創作
- ${keyDescription}

速度：${params.speed}
- ${tempoDesc}

風格要求：
- 創作一個適合初級到中級演奏者的簡單、可演奏的鋼琴譜
- 包含高音譜號和低音譜號記譜
- 長度：16-32 小節
- 使用適當的力度和演奏記號

以 MIDI 格式輸出標準樂譜。`;
    } else {
        const feelingLower = params.feeling.toLowerCase();
        const keyDescription = params.key === t.major ? 'Bright and uplifting tonality' : 'Melancholic and introspective tonality';
        let tempoDesc = '';
        if (params.speed === t.slow) {
            tempoDesc = 'Andante (60-80 BPM) - slow and deliberate pacing';
        } else if (params.speed === t.medium) {
            tempoDesc = 'Moderato (90-120 BPM) - comfortable walking pace';
        } else {
            tempoDesc = 'Allegro (130-160 BPM) - quick and energetic tempo';
        }
        
        return `Generate a piano composition with the following characteristics:

Mood: ${params.feeling}
- Create a ${feelingLower} and emotionally resonant melody
- Use chord progressions that evoke a ${feelingLower} feeling

Key: ${params.key}
- Compose in ${params.key} key
- ${keyDescription}

Tempo: ${params.speed}
- ${tempoDesc}

Style Requirements:
- Create a simple, playable piano score suitable for beginners to intermediate players
- Include both treble and bass clef notation
- Length: 16-32 measures
- Use appropriate dynamics and articulation markings

Output the composition as standard music notation in MIDI format.`;
    }
}

/**
 * Update prompt preview based on selected parameters
 */
function updatePromptPreview() {
    const t = getTranslations(currentLang);
    const selectedFeeling = document.querySelector('.feeling-btn.selected');
    if (!selectedFeeling) {
        promptPreview.textContent = t.promptPlaceholder;
    } else {
        promptPreview.textContent = generatePrompt();
    }
}

/**
 * Apply translations to the mixer page
 */
function applyTranslations() {
    const t = getTranslations(currentLang);
    document.documentElement.lang = currentLang;
    document.title = t.mixerTitle;
    document.getElementById('page-title').textContent = t.pageTitle;
    document.getElementById('mascot-text').textContent = t.mascotText;
    document.querySelector('img').alt = t.mascotAlt;
    document.getElementById('feeling-header').textContent = t.feelingHeader;
    document.getElementById('key-header').textContent = t.keyHeader;
    document.getElementById('speed-header').textContent = t.speedHeader;
    document.getElementById('prompt-header').textContent = t.promptHeader;
    document.getElementById('make-music-btn').textContent = t.makeMusicBtn;
    document.getElementById('loading-title').textContent = t.loadingTitle;
    document.getElementById('lang-toggle').textContent = t.langButton;
    document.getElementById('back-text').textContent = t.backText;
    
    // Update all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.textContent = t[key];
    });
    
    updatePromptPreview();
}

/**
 * Initialize feeling button event listeners
 */
function initFeelingButtons() {
    feelingButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove selected from all
            feelingButtons.forEach(btn => btn.classList.remove('selected'));
            // Add selected to clicked
            button.classList.add('selected');
            // Change background color
            document.body.style.backgroundColor = feelingColors[button.id];
            // Update prompt preview
            updatePromptPreview();
        });
    });
}

/**
 * Initialize speed button event listeners
 */
function initSpeedButtons() {
    speedButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove selected from all
            speedButtons.forEach(btn => btn.classList.remove('selected'));
            // Add selected to clicked
            button.classList.add('selected');
            // Update prompt preview
            updatePromptPreview();
        });
    });
}

/**
 * Initialize key switch event listener
 */
function initKeySwitch() {
    keySwitch.addEventListener('change', () => {
        updatePromptPreview();
    });
}

/**
 * Initialize make music button
 */
function initMakeMusicButton() {
    makeMusicBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Save parameters to session storage
        const params = getSelectedParameters();
        sessionStorage.setItem('musicParams', JSON.stringify(params));
        
        // Show loading screen
        loadingScreen.classList.remove('hidden');
        
        // Get loading statuses for current language
        const t = getTranslations(currentLang);
        const loadingStatuses = [
            { progress: 0, text: t.loadingStatus[0] },
            { progress: 20, text: t.loadingStatus[1] },
            { progress: 40, text: t.loadingStatus[2] },
            { progress: 60, text: t.loadingStatus[3] },
            { progress: 80, text: t.loadingStatus[4] },
            { progress: 100, text: t.loadingStatus[5] }
        ];
        
        // Animate loading with status updates
        let currentStatus = 0;
        const statusInterval = setInterval(() => {
            if (currentStatus < loadingStatuses.length) {
                const status = loadingStatuses[currentStatus];
                progressBar.style.width = status.progress + '%';
                statusText.textContent = status.text;
                currentStatus++;
            } else {
                clearInterval(statusInterval);
                // Navigate to score page after loading completes
                setTimeout(() => {
                    window.location.href = 'score.html';
                }, 300);
            }
        }, 833); // Update every 833ms (5 seconds / 6 statuses ≈ 833ms)
    });
}

/**
 * Initialize the mixer page
 */
function initPage() {
    // Set initial selections
    document.getElementById('feeling-happy').classList.add('selected');
    document.body.style.backgroundColor = feelingColors['feeling-happy'];
    document.getElementById('speed-medium').classList.add('selected');
    
    // Apply initial translations
    applyTranslations();
    
    // Initialize event listeners
    initFeelingButtons();
    initSpeedButtons();
    initKeySwitch();
    initMakeMusicButton();
    
    // Setup language toggle
    document.getElementById('lang-toggle').addEventListener('click', () => {
        currentLang = toggleLanguage();
        applyTranslations();
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}
