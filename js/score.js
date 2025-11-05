/**
 * Score page JavaScript
 * Handles score loading, display, and interaction
 */

// Get current language
let currentLang = getCurrentLanguage();

// Canonical score mapping
const canonicalScoreMap = {
    'Happy_Fast_M': 'The_Wheels_On_The_Bus.jpeg',
    'Excited_Fast_M': 'The_Wheels_On_The_Bus.jpeg',
    'Happy_Med_M': 'Hot_Cross_Buns.jpeg',
    'Calm_Med_M': 'Twinkle_Twinkle_Little_Star.jpeg',
    'Calm_Slow_M': 'Twinkle_Twinkle_Little_Star.jpeg',
    'Sad_Med_M': 'Rain_Rain_Go_Away.jpeg',
    'Sad_Slow_M': 'Rain_Rain_Go_Away.jpeg',
    'Calm_Slow_m': 'The_Bear_Went_Over_The_Mountain.jpeg',
    'Sad_Slow_m': 'The_Bear_Went_Over_The_Mountain.jpeg',
    'Happy_Fast_m': 'The_Ants_Go_Marching.jpeg',
    'Happy_Med_m': 'The_Ants_Go_Marching.jpeg',
    'Excited_Fast_m': 'The_Ants_Go_Marching.jpeg',
    'Excited_Med_m': 'The_Ants_Go_Marching.jpeg'
};

const canonicalScores = [
    {
        file: 'Hot_Cross_Buns.jpeg',
        songName: 'Hot Cross Buns',
        codes: ['Happy_Med_M']
    },
    {
        file: 'The_Wheels_On_The_Bus.jpeg',
        songName: 'The Wheels on the Bus',
        codes: ['Happy_Fast_M', 'Excited_Fast_M']
    },
    {
        file: 'Twinkle_Twinkle_Little_Star.jpeg',
        songName: 'Twinkle Twinkle Little Star',
        codes: ['Calm_Med_M', 'Calm_Slow_M']
    },
    {
        file: 'Rain_Rain_Go_Away.jpeg',
        songName: 'Rain Rain Go Away',
        codes: ['Sad_Med_M', 'Sad_Slow_M']
    },
    {
        file: 'The_Bear_Went_Over_The_Mountain.jpeg',
        songName: 'The Bear Went Over the Mountain',
        codes: ['Calm_Slow_m', 'Sad_Slow_m']
    },
    {
        file: 'The_Ants_Go_Marching.jpeg',
        songName: 'The Ants Go Marching',
        codes: ['Happy_Fast_m', 'Happy_Med_m', 'Excited_Fast_m', 'Excited_Med_m']
    }
];

/**
 * Merge canonical scores with loaded data
 */
function mergeCanonicalScores(data) {
    const mergedScores = Array.isArray(data.scores) ? [...data.scores] : [];
    canonicalScores.forEach(canonical => {
        const existingIndex = mergedScores.findIndex(entry => entry.songName === canonical.songName);
        if (existingIndex >= 0) {
            mergedScores[existingIndex] = canonical;
        } else {
            mergedScores.push(canonical);
        }
    });

    return {
        scores: mergedScores,
        codeToFile: { ...(data.codeToFile || {}), ...canonicalScoreMap }
    };
}

/**
 * Translate parameter value between languages
 */
function translateParam(paramValue, paramType) {
    const t = getTranslations(currentLang);
    const enTrans = getTranslations('en');
    const zhTrans = getTranslations('zh-TW');
    
    // Create lookup table for all possible values
    const lookupTable = {
        feeling: {
            [enTrans.happy]: [t.happy, enTrans.happy, zhTrans.happy],
            [zhTrans.happy]: [t.happy, enTrans.happy, zhTrans.happy],
            [enTrans.excited]: [t.excited, enTrans.excited, zhTrans.excited],
            [zhTrans.excited]: [t.excited, enTrans.excited, zhTrans.excited],
            [enTrans.calm]: [t.calm, enTrans.calm, zhTrans.calm],
            [zhTrans.calm]: [t.calm, enTrans.calm, zhTrans.calm],
            [enTrans.sad]: [t.sad, enTrans.sad, zhTrans.sad],
            [zhTrans.sad]: [t.sad, enTrans.sad, zhTrans.sad]
        },
        key: {
            [enTrans.major]: [t.major, enTrans.major, zhTrans.major],
            [zhTrans.major]: [t.major, enTrans.major, zhTrans.major],
            [enTrans.minor]: [t.minor, enTrans.minor, zhTrans.minor],
            [zhTrans.minor]: [t.minor, enTrans.minor, zhTrans.minor]
        },
        speed: {
            [enTrans.slow]: [t.slow, enTrans.slow, zhTrans.slow],
            [zhTrans.slow]: [t.slow, enTrans.slow, zhTrans.slow],
            [enTrans.medium]: [t.medium, enTrans.medium, zhTrans.medium],
            [zhTrans.medium]: [t.medium, enTrans.medium, zhTrans.medium],
            [enTrans.fast]: [t.fast, enTrans.fast, zhTrans.fast],
            [zhTrans.fast]: [t.fast, enTrans.fast, zhTrans.fast]
        }
    };
    
    // Find matching value in lookup table
    const typeTable = lookupTable[paramType];
    for (const key in typeTable) {
        if (typeTable[key].includes(paramValue)) {
            return typeTable[key][0]; // Return translation for current language
        }
    }
    
    return paramValue; // Return original if not found
}

/**
 * Update song info based on saved parameters
 */
function updateSongInfo() {
    const savedParams = sessionStorage.getItem('musicParams');
    const t = getTranslations(currentLang);
    
    if (savedParams) {
        const params = JSON.parse(savedParams);
        const songTitle = document.getElementById('song-title');
        const songDetails = document.getElementById('song-details');
        
        // Translate parameters using helper function
        const feeling = translateParam(params.feeling, 'feeling');
        const key = translateParam(params.key, 'key');
        const speed = translateParam(params.speed, 'speed');
        
        // Update title and details
        songTitle.textContent = `${t.songTitlePrefix}${feeling}${t.songTitleSuffix}`;
        songDetails.textContent = `C ${key} - ${speed}`;
    }
}

/**
 * Generate score code from parameters
 */
function generateScoreCode(params) {
    const t = getTranslations(currentLang);
    const enTrans = getTranslations('en');
    
    // Map feeling to English emotion name
    let emotion = 'Happy'; // default
    if (params.feeling === t.happy || params.feeling === enTrans.happy) emotion = 'Happy';
    else if (params.feeling === t.excited || params.feeling === enTrans.excited) emotion = 'Excited';
    else if (params.feeling === t.calm || params.feeling === enTrans.calm) emotion = 'Calm';
    else if (params.feeling === t.sad || params.feeling === enTrans.sad) emotion = 'Sad';
    
    // Map speed to code format
    let speed = 'Med'; // default
    if (params.speed === t.slow || params.speed === enTrans.slow) speed = 'Slow';
    else if (params.speed === t.medium || params.speed === enTrans.medium) speed = 'Med';
    else if (params.speed === t.fast || params.speed === enTrans.fast) speed = 'Fast';
    
    // Map key to code format
    let keyCode = 'M'; // default Major
    if (params.key === t.minor || params.key === enTrans.minor) keyCode = 'm';
    
    return `${emotion}_${speed}_${keyCode}`;
}

/**
 * Show error message
 */
function showError() {
    document.getElementById('score-loading').style.display = 'none';
    document.getElementById('score-image').style.display = 'none';
    document.getElementById('score-error').style.display = 'block';
}

/**
 * Load and display the score
 */
async function loadScore() {
    const savedParams = sessionStorage.getItem('musicParams');
    
    if (!savedParams) {
        console.error('No parameters found');
        showError();
        return;
    }
    
    const params = JSON.parse(savedParams);
    const scoreCode = generateScoreCode(params);
    console.log('[EqualPlay] Generated score code:', scoreCode, 'from params:', params);
    
    try {
        // Fetch the scores mapping
        const response = await fetch('assets/scores.json', { cache: 'no-store' });
        const rawData = await response.json();
        const data = mergeCanonicalScores(rawData);
        console.log('[EqualPlay] Loaded codes:', Object.keys(data.codeToFile || {}));
        
        // Look up the file for this code
        let scoreFile = data.codeToFile[scoreCode];
        console.log('[EqualPlay] Direct lookup result:', scoreFile);

        // Fall back to scanning the scores list so missing codeToFile entries still resolve
        if (!scoreFile && Array.isArray(data.scores)) {
            const match = data.scores.find(entry =>
                Array.isArray(entry.codes) && entry.codes.includes(scoreCode)
            );
            if (match) {
                scoreFile = match.file;
                console.log('[EqualPlay] Fallback lookup matched file:', scoreFile);
            }
        }
        
        if (!scoreFile || scoreFile === null) {
            console.error('[EqualPlay] No score found for code:', scoreCode);
            showError();
            return;
        }
        
        // Load and display the score image
        const scoreImage = document.getElementById('score-image');
        const scoreLoading = document.getElementById('score-loading');
        const scoreError = document.getElementById('score-error');
        
        scoreImage.onload = function() {
            console.log('[EqualPlay] Score image loaded:', scoreImage.src);
            scoreLoading.style.display = 'none';
            scoreError.style.display = 'none';
            scoreImage.style.display = 'block';
        };
        
        scoreImage.onerror = function() {
            console.error('[EqualPlay] Failed to load score image:', scoreImage.src);
            showError();
        };
        
        scoreImage.src = `assets/${scoreFile}`;
        console.log('[EqualPlay] Attempting to load image at path:', scoreImage.src);
        
    } catch (error) {
        console.error('[EqualPlay] Error loading score:', error);
        showError();
    }
}

/**
 * Apply translations to the score page
 */
function applyTranslations() {
    const t = getTranslations(currentLang);
    document.documentElement.lang = currentLang;
    document.title = t.scoreTitle;
    document.getElementById('landscape-text').textContent = t.landscapeText;
    document.getElementById('lang-toggle').textContent = t.langButton;
    document.getElementById('share-btn').title = t.shareTitle;
    document.getElementById('download-btn').title = t.downloadTitle;
    document.getElementById('print-btn').title = t.printTitle;
    document.getElementById('loading-text').textContent = t.loadingText;
    document.getElementById('error-text').textContent = t.errorTitle;
    document.getElementById('error-details').textContent = t.errorDetails;
    
    // Update button text in error container
    const backButton = document.querySelector('#score-error a');
    if (backButton) {
        backButton.textContent = t.backButton;
    }
    
    // Update song title and details from saved params
    updateSongInfo();
}

/**
 * Initialize download button
 */
function initDownloadButton() {
    document.getElementById('download-btn').addEventListener('click', () => {
        const scoreImage = document.getElementById('score-image');
        if (scoreImage.src) {
            const link = document.createElement('a');
            link.href = scoreImage.src;
            // Extract filename more reliably
            try {
                const url = new URL(scoreImage.src, window.location.origin);
                link.download = url.pathname.split('/').pop();
            } catch (e) {
                link.download = scoreImage.src.split('/').pop();
            }
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });
}

/**
 * Initialize print button
 */
function initPrintButton() {
    document.getElementById('print-btn').addEventListener('click', () => {
        window.print();
    });
}

/**
 * Initialize share button
 */
function initShareButton() {
    document.getElementById('share-btn').addEventListener('click', async () => {
        const shareText = currentLang === 'zh-TW' 
            ? '來看看我用 EqualPlay 創作的樂譜！' 
            : 'Check out my score created with EqualPlay!';
        
        try {
            await navigator.clipboard.writeText(shareText + ' ' + window.location.href);
            alert(currentLang === 'zh-TW' ? '已複製分享連結！' : 'Share link copied!');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });
}

/**
 * Initialize the score page
 */
function initPage() {
    // Apply initial translations
    applyTranslations();
    
    // Initialize event listeners
    initDownloadButton();
    initPrintButton();
    initShareButton();
    
    // Setup language toggle
    document.getElementById('lang-toggle').addEventListener('click', () => {
        currentLang = toggleLanguage();
        applyTranslations();
    });
    
    // Try to create Lucide icons
    try {
        lucide.createIcons();
    } catch (e) {
        console.log('Lucide icons not loaded');
    }
    
    // Load the score
    loadScore();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}
