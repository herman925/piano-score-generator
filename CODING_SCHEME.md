# Piano Score Coding Scheme

## Overview

The piano score naming convention follows a standardized three-part system:

**Emotion + Speed + Key**

where:
- **Emotion**: Happy, Excited, Calm, Sad
- **Speed**: Fast, Medium (Med), Slow
- **Key**: Major (M) or minor (m)

## Naming Format

```
{Emotion}_{Speed}_{Key}
```

### Components

#### 1. Emotion (情緒)
- `Happy` - 開心 / Happy
- `Excited` - 興奮 / Excited
- `Calm` - 平靜 / Calm
- `Sad` - 悲傷 / Sad

#### 2. Speed (快慢)
- `Fast` - 快 / Fast (快板, Allegro, 130-160 BPM)
- `Med` - 中 / Medium (中板, Moderato, 90-120 BPM)
- `Slow` - 慢 / Slow (行板, Andante, 60-80 BPM)

#### 3. Key (調性)
- `M` - Major / 大調 (☀️) - Bright and uplifting tonality
- `m` - minor / 小調 (🌙) - Melancholic and introspective tonality

## Score Mapping Reference

### Current Scores in Assets

| File | Song Name | Codes | Key Types |
|------|-----------|-------|-----------|
| `Hot_Cross_Buns.jpeg` | Hot Cross Buns | `Happy_Fast_M`, `Happy_Fast_m`, `Happy_Med_M`, `Happy_Med_m` | Major & minor |
| `Rain_Rain_Go_Away.jpeg` | Rain Rain Go Away | `Happy_Slow_M`, `Happy_Slow_m` | Major & minor |
| `The_Wheels_On_The_Bus.jpeg` | The Wheels on the Bus | `Excited_Fast_M`, `Excited_Fast_m`, `Excited_Med_M`, `Excited_Med_m`, `Excited_Slow_M`, `Excited_Slow_m` | Major & minor |
| `Twinkle_Twinkle_Little_Star.jpeg` | Twinkle Twinkle Little Star | `Calm_Fast_M`, `Calm_Fast_m`, `Calm_Med_M`, `Calm_Med_m` | Major & minor |
| `The_Ants_Go_Marching.jpeg` | The Ants Go Marching | `Calm_Slow_M`, `Calm_Slow_m` | Major & minor |
| `The_Bear_Went_Over_The_Mountain.jpeg` | The Bear Went Over the Mountain | `Sad_Fast_M`, `Sad_Fast_m`, `Sad_Med_M`, `Sad_Med_m`, `Sad_Slow_M`, `Sad_Slow_m` | Major & minor |

**Note:** All 24 possible combinations (4 emotions × 3 speeds × 2 keys) are now mapped to scores.

## Examples

### Valid Score Names
- `Happy_Fast_M` - Happy emotion, fast tempo, Major key (開心、快、大調)
- `Sad_Med_m` - Sad emotion, medium tempo, minor key (悲傷、中、小調)
- `Calm_Slow_M` - Calm emotion, slow tempo, Major key (平靜、慢、大調)
- `Excited_Fast_m` - Excited emotion, fast tempo, minor key (興奮、快、小調)

### Usage in Code

The application uses these coded names to:
1. Determine which physical score file to display
2. Display score metadata to the user
3. Match scores based on mixer parameters (feeling, speed, key)

**Lookup System:**
- A JSON mapping file (`assets/scores.json`) contains the relationship between score codes and actual file names
- When a user selects parameters, the code generates the corresponding score code (e.g., `Happy_Fast_M`)
- The code then looks up the file name in the mapping (e.g., `thewheelsonthebus.jpeg`)
- The application loads and displays the correct score image

**Example Mapping:**
```
Code: Happy_Fast_M → File: Hot_Cross_Buns.jpeg
Code: Calm_Slow_M → File: The_Ants_Go_Marching.jpeg
Code: Sad_Med_m → File: The_Bear_Went_Over_The_Mountain.jpeg
Code: Excited_Slow_m → File: The_Wheels_On_The_Bus.jpeg
```

## Implementation Notes

- Score files have descriptive names (e.g., `hotcrossbun.jpeg`, `rainraingoaway.jpeg`)
- Score codes follow the pattern: `{Emotion}_{Speed}_{Key}` (e.g., `Happy_Fast_M`)
- A JSON lookup file (`assets/scores.json`) maps codes to actual file names
- The mixer UI allows users to select emotion, speed (via icons/buttons), and key (via toggle)
- When a user creates music, the system generates the appropriate code, looks up the file, and displays it
- User-facing labels are translated via the translation system in the HTML/JS

## Future Extensions

Additional emotions or speeds can be added by:
1. Adding new buttons/options in `mixer.html`
2. Creating corresponding score files following this naming convention
3. Adding translations to the translation objects
4. Updating this documentation
