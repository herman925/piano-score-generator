/**
 * Shared Translation System for EqualPlay
 * Provides multi-language support across all pages
 */

const translations = {
    'zh-TW': {
        // Common translations
        langButton: 'English',
        backText: '返回',
        
        // Musical terms
        happy: '開心',
        excited: '興奮',
        calm: '平靜',
        sad: '悲傷',
        major: '大調',
        minor: '小調',
        slow: '慢',
        medium: '中',
        fast: '快',
        
        // Index page
        indexTitle: 'EqualPlay - 首頁',
        heroSubtitle: '讓我們一起創作音樂！',
        heroCta: '開始創作！🚀',
        imgAlt: '一隻可愛的卡通熊正在彈奏彩色玩具鋼琴',
        
        // Mixer page
        mixerTitle: '音樂創作器 - 參數設定',
        pageTitle: '🎹 音樂創作器 🎹',
        mascotText: '"調整參數來創作你的歌曲！"',
        mascotAlt: '友善的熊寶寶吉祥物',
        feelingHeader: '情緒',
        keyHeader: '調性',
        speedHeader: '速度',
        promptHeader: '🤖 AI 提示預覽',
        promptPlaceholder: '請在上方選擇參數以生成 AI 提示...',
        makeMusicBtn: '創作音樂！🎶',
        loadingTitle: '🎵 AI 正在創作你的音樂... 🎵',
        loadingStatus: [
            '初始化 AI 作曲器...', 
            '分析音樂參數...', 
            '生成旋律結構...', 
            '創作和聲進行...', 
            '在五線譜上排列音符...', 
            '完成你的作品！'
        ],
        
        // Score page
        scoreTitle: '我的樂譜 - EqualPlay',
        landscapeText: '請將你的裝置旋轉至橫向模式！',
        songTitlePrefix: '我的',
        songTitleSuffix: '歌曲',
        shareTitle: '分享',
        downloadTitle: '下載',
        printTitle: '列印',
        loadingText: '載入樂譜中...',
        errorTitle: '⚠️ 找不到對應的樂譜',
        errorDetails: '很抱歉，目前還沒有符合這些參數的樂譜。請返回選擇其他參數。',
        backButton: '返回重新選擇'
    },
    'en': {
        // Common translations
        langButton: '繁體中文',
        backText: 'Back',
        
        // Musical terms
        happy: 'Happy',
        excited: 'Excited',
        calm: 'Calm',
        sad: 'Sad',
        major: 'Major',
        minor: 'Minor',
        slow: 'Slow',
        medium: 'Medium',
        fast: 'Fast',
        
        // Index page
        indexTitle: 'EqualPlay - Hero',
        heroSubtitle: "Let's Make Some Music!",
        heroCta: "Let's Go! 🚀",
        imgAlt: 'A cute cartoon bear playing a colorful toy piano',
        
        // Mixer page
        mixerTitle: 'Music Mixer - Parameters',
        pageTitle: '🎹 Music Mixer 🎹',
        mascotText: '"Turn the dials to create your song!"',
        mascotAlt: 'Friendly Bear Mascot',
        feelingHeader: 'FEELING',
        keyHeader: 'KEY',
        speedHeader: 'SPEED',
        promptHeader: '🤖 AI PROMPT PREVIEW',
        promptPlaceholder: 'Select your parameters above to generate an AI prompt...',
        makeMusicBtn: 'Make Music! 🎶',
        loadingTitle: '🎵 AI is creating your music... 🎵',
        loadingStatus: [
            'Initializing AI composer...', 
            'Analyzing musical parameters...', 
            'Generating melody structure...', 
            'Creating harmonic progressions...', 
            'Arranging notes on the staff...', 
            'Finalizing your composition!'
        ],
        
        // Score page
        scoreTitle: 'My Score - EqualPlay',
        landscapeText: 'Please rotate your device to landscape mode!',
        songTitlePrefix: 'My',
        songTitleSuffix: 'Song',
        shareTitle: 'Share',
        downloadTitle: 'Download',
        printTitle: 'Print',
        loadingText: 'Loading score...',
        errorTitle: '⚠️ Score Not Found',
        errorDetails: 'Sorry, there is no score available for these parameters yet. Please go back and select different parameters.',
        backButton: 'Go Back to Mixer'
    }
};

/**
 * Get current language from localStorage or default to zh-TW
 */
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'zh-TW';
}

/**
 * Set current language and save to localStorage
 */
function setCurrentLanguage(lang) {
    localStorage.setItem('language', lang);
}

/**
 * Toggle between English and Traditional Chinese
 */
function toggleLanguage() {
    const current = getCurrentLanguage();
    const newLang = current === 'zh-TW' ? 'en' : 'zh-TW';
    setCurrentLanguage(newLang);
    return newLang;
}

/**
 * Get translation for the current language
 */
function getTranslations(lang = null) {
    const currentLang = lang || getCurrentLanguage();
    return translations[currentLang];
}
