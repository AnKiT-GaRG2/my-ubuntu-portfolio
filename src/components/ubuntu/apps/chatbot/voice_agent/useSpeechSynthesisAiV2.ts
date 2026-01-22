import { useState, useEffect, useRef, useCallback } from 'react';

interface UseSpeechSynthesisV2Return {
  speak: (text: string) => void;
  speaking: boolean;
  supported: boolean;
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  setSelectedVoice: (voice: SpeechSynthesisVoice | null) => void;
  cancel: () => void;
  clearCache: () => void;
}

// V2: AI Pronunciation Cache
const pronunciationCache = new Map<string, string>();

// Detect if text contains Hindi (Devanagari script)
function containsHindi(text: string): boolean {
  // Devanagari Unicode range: \u0900-\u097F
  return /[\u0900-\u097F]/.test(text);
}

// Detect if text is Hinglish (mixed Hindi-English)
function isHinglish(text: string): boolean {
  const hasHindi = containsHindi(text);
  const hasEnglish = /[a-zA-Z]/.test(text);
  return hasHindi && hasEnglish;
}

/**
 * V2 BILINGUAL AI-POWERED PRONUNCIATION ENGINE
 * Supports: English, Hindi (Devanagari), and Hinglish (mixed)
 */
async function getAIPronunciation(word: string, apiKey: string): Promise<string> {
  const cacheKey = word.toLowerCase();
  if (pronunciationCache.has(cacheKey)) {
    console.log(`💾 [V2] Cache hit: "${word}"`);
    return pronunciationCache.get(cacheKey)!;
  }

  if (!apiKey) {
    console.warn('⚠️ [V2] No API key');
    return word;
  }

  try {
    const hasHindi = containsHindi(word);
    console.log(`🤖 [V2] Getting AI pronunciation: "${word}" ${hasHindi ? '(Hindi detected)' : '(English)'}`);
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `You are an expert in BILINGUAL INDIAN pronunciation (Hindi + English). Make TTS sound like a REAL INDIAN PERSON speaking naturally - whether in Hindi, English, or Hinglish (code-switching).

🎯 GOAL: Sound like a real Indian guy talking naturally in whatever language - Hindi, English, or mixed!

🇮🇳 LANGUAGE DETECTION:
- If text is in DEVANAGARI (Hindi script): Provide TRANSLITERATION for English TTS
- If text is in ROMAN (English): Provide phonetic Indian pronunciation
- If MIXED (Hinglish): Handle both seamlessly

📱 HINDI WORDS (Devanagari → Roman transliteration):

COMMON HINDI WORDS:
- "नमस्ते" → "na-mas-tay" (greeting)
- "धन्यवाद" → "dhun-ya-vaad" (thank you)
- "हाँ" → "haan" (yes)
- "नहीं" → "na-heen" (no)
- "क्या" → "kyaa" (what)
- "कैसे" → "kai-say" (how)
- "अच्छा" → "ach-chaa" (good)
- "ठीक है" → "theek hai" (okay)
- "चलो" → "cha-lo" (let's go)
- "समझ" → "sa-majh" (understand)
- "काम" → "kaam" (work)
- "बात" → "baat" (talk/thing)
- "जी" → "jee" (respectful yes/sir)
- "भाई" → "bhai" (brother/bro)
- "यार" → "yaar" (friend/dude)

HINDI NAMES (Devanagari):
- "अंकित" → "Un-kit"
- "गर्ग" → "Gaarg"
- "शर्मा" → "Shur-maa"
- "कुमार" → "Koo-maar"
- "सिंह" → "Sing"
- "पटेल" → "Puh-tel"

📝 ENGLISH NAMES & WORDS (Indian pronunciation):
- "Ankit" → "Un-kit"
- "Garg" → "Gaarg"
- "Sharma" → "Shur-maa"
- "API" → "ay pee ai"
- "IT" → "ai tee"
- "GitHub" → "git hub"

🎭 HINGLISH (CODE-SWITCHING):
Indians naturally mix Hindi & English. Handle both smoothly!

Examples:
- "Theek hai, I'll do it" → "theek hai, I'll do it"
- "Bas yaar, don't worry" → "bas yaar, don't worry"
- "Accha, show me your GitHub" → "ach-chaa, show me your git hub"
- "Haan bhai, API ready hai" → "haan bhai, ay pee ai ready hai"

🗣️ HINDI PRONUNCIATION RULES:

VOWELS (स्वर):
- अ (a) → "uh" (short)
- आ (aa) → "aa" (long, like "father")
- इ (i) → "i" (short, like "bit")
- ई (ee) → "ee" (long, like "feet")
- उ (u) → "u" (short, like "put")
- ऊ (oo) → "oo" (long, like "food")
- ए (e) → "ay" (like "say")
- ओ (o) → "oh" (like "go")

CONSONANTS (व्यंजन):
- क → "k" (unaspirated)
- ख → "kh" (aspirated)
- ग → "g" (hard)
- घ → "gh" (aspirated)
- च → "ch" (like "chair")
- छ → "chh" (aspirated)
- ज → "j" (like "job")
- झ → "jh" (aspirated)
- ट → "t" (retroflex)
- ठ → "th" (retroflex aspirated)
- ड → "d" (retroflex)
- ढ → "dh" (retroflex aspirated)
- त → "t" (dental)
- थ → "th" (dental aspirated)
- द → "d" (dental)
- ध → "dh" (dental aspirated)
- न → "n"
- प → "p"
- फ → "ph" or "f"
- ब → "b"
- भ → "bh"
- म → "m"
- य → "y"
- र → "r" (rolled)
- ल → "l"
- व → "v" or "w"
- श → "sh"
- ष → "sh"
- स → "s"
- ह → "h"

SPECIAL:
- ं (anusvara) → nasal sound "n" or "m"
- ः (visarga) → "ha"
- ्  (halant) → suppresses vowel

🎭 EMOTIONAL CONTEXT (works in ALL languages):

EXCITED (!, 🎉):
- Faster, upbeat
- "बहुत बढ़िया!" → "ba-hut ba-dhee-yaa!" (very good!)
- "Great!" → "Gray-t!"

SERIOUS (⚠️, ❌):
- Slower, firm
- "रुको!" → "ru-ko!" (stop!)
- "Warning" → "War-ning"

CASUAL/FRIENDLY:
- Natural pace
- "चलो यार" → "cha-lo yaar" (let's go dude)
- "Theek hai bhai" → "theek hai bhai" (okay bro)

🔤 TECHNICAL TERMS (in any language context):
- "API" → "ay pee ai"
- "GitHub" → "git hub"
- "JavaScript" → "ja-vaa script"
- "B.Tech" → "bee-tek"
- "IIT" → "ai ai tee"

🌐 HINGLISH EXAMPLES (Real Indian speech):

"Yaar, mera GitHub check kar" 
→ "yaar, may-raa git hub check kar"

"API integration theek hai kya?"
→ "ay pee ai integration theek hai kyaa"

"Bas bhai, I'll handle it"
→ "bas bhai, I'll handle it"

"Accha, toh React use karte hain"
→ "ach-chaa, toh ree-ekt use kar-tay hain"

🎯 SPEECH PATTERNS (ALL LANGUAGES):

1. NATURAL RHYTHM:
   - Syllable-timed for Hindi
   - Stress-timed for English
   - Mixed for Hinglish

2. PRONUNCIATION:
   - Hindi: Exact transliteration
   - English: Indian accent
   - Hinglish: Seamless switching

3. TONE:
   - Conversational, friendly
   - Like talking to a friend
   - Natural code-switching

⚡ EXAMPLES:

Pure Hindi:
"मुझे प्रोग्रामिंग पसंद है"
→ "mu-jhay pro-gram-ming pa-sand hai"

Pure English:
"I love programming"
→ "I love pro-gram-ming"

Hinglish (Natural Indian):
"Yaar, programming bahut maza aati hai"
→ "yaar, pro-gram-ming ba-hut ma-zaa aa-tee hai"

"Check karo mere GitHub pe"
→ "check ka-ro may-ray git hub pay"

🎯 YOUR TASK:
Given ANY word/phrase (Hindi/English/Hinglish), provide ONLY the phonetic spelling that makes English TTS sound like a REAL INDIAN PERSON saying it naturally.

Rules:
1. If Devanagari (Hindi script): TRANSLITERATE to Roman with proper pronunciation
2. If Roman (English): Give Indian pronunciation
3. If Mixed (Hinglish): Handle both naturally
4. Use hyphens for syllable breaks
5. No explanations, just phonetics
6. Sound conversational and natural

Remember: Indians code-switch naturally between Hindi and English. Make it sound authentic!`
          },
          {
            role: 'user',
            content: `Phonetic for TTS: ${word}`
          }
        ],
        temperature: 0.2,
        max_tokens: 50, // Increased for Hindi transliteration
      }),
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    const pronunciation = data.choices[0]?.message?.content?.trim() || word;
    
    pronunciationCache.set(cacheKey, pronunciation);
    console.log(`✨ [V2] "${word}" → "${pronunciation}"`);
    
    return pronunciation;
  } catch (error) {
    console.error('❌ [V2] Error:', error);
    return word;
  }
}

async function processTextWithAI(text: string, apiKey: string): Promise<string> {
  // Common Hindi words that might appear in Hinglish
  const hindiWords = [
    'नमस्ते', 'धन्यवाद', 'हाँ', 'नहीं', 'क्या', 'कैसे', 'अच्छा', 'ठीक', 'चलो',
    'यार', 'भाई', 'जी', 'बस', 'काम', 'बात', 'समझ',
    // Romanized Hindi words
    'yaar', 'bhai', 'theek', 'accha', 'chalo', 'bas', 'kya', 'hai'
  ];

  // English problematic words
  const englishWords = [
    'Ankit', 'Garg', 'Sharma', 'Kumar', 'Singh', 'Patel', 'Gupta', 'Verma',
    'API', 'UI', 'UX', 'URL', 'HTML', 'CSS', 'SQL', 'JSON', 'XML',
    'GitHub', 'GitLab', 'VS Code', 'VSCode', 'Chrome', 'Firefox',
    'JavaScript', 'TypeScript', 'Python', 'React', 'Angular', 'Vue', 'Node'
  ];

  // Check if text contains Hindi script
  if (containsHindi(text)) {
    console.log('🇮🇳 [V2] Hindi/Hinglish detected, processing with AI...');
    // For Hindi or Hinglish, process the entire text as one unit
    return await getAIPronunciation(text, apiKey);
  }

  // For pure English or Romanized Hinglish, process word by word
  let enhancedText = text;

  // Step 1: Handle IT acronym
  enhancedText = enhancedText.replace(/\bIT\b/g, '__AI_TEE__');

  // Step 2: Process Hindi words (Romanized)
  for (const word of hindiWords) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    if (regex.test(enhancedText)) {
      const pronunciation = await getAIPronunciation(word, apiKey);
      enhancedText = enhancedText.replace(regex, pronunciation);
    }
  }

  // Step 3: Process English problematic words
  for (const word of englishWords) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    if (regex.test(enhancedText)) {
      const pronunciation = await getAIPronunciation(word, apiKey);
      enhancedText = enhancedText.replace(regex, pronunciation);
    }
  }

  // Step 4: Replace IT placeholder
  if (enhancedText.includes('__AI_TEE__')) {
    const aiTee = await getAIPronunciation('IT', apiKey);
    enhancedText = enhancedText.replace(/__AI_TEE__/g, aiTee);
  }

  return enhancedText;
}

function analyzeEmotion(text: string): { rate: number; pitch: number; volume: number } {
  // Excited/Happy (works in Hindi & English)
  if (text.includes('!') || /\b(great|awesome|amazing|sure|yes|बढ़िया|शानदार)\b/i.test(text)) {
    return { rate: 1.1, pitch: 1.05, volume: 1.0 };
  }
  
  // Warning/Serious
  if (text.includes('⚠️') || text.includes('❌') || /\b(warning|stop|blocked|error|रुको)\b/i.test(text)) {
    return { rate: 0.9, pitch: 0.95, volume: 1.0 };
  }
  
  // Question (works in Hindi & English)
  if (text.includes('?') || text.includes('क्या')) {
    return { rate: 0.95, pitch: 1.0, volume: 1.0 };
  }
  
  // Default: Natural conversation
  return { rate: 1.0, pitch: 1.0, volume: 1.0 };
}

const isMaleVoice = (voice: SpeechSynthesisVoice): boolean => {
  const name = voice.name.toLowerCase();
  const uri = voice.voiceURI.toLowerCase();
  
  if (name.includes('male') && !name.includes('female')) return true;
  
  const maleNames = [
    'ravi', 'hemant', 'prabhat', 'ajit', 'vijay',
    'david', 'mark', 'james', 'daniel', 'alex', 'george', 'thomas', 'richard'
  ];
  
  if (maleNames.some(male => name.includes(male) || uri.includes(male))) return true;
  
  return false;
};

export function useSpeechSynthesisV2AI(): UseSpeechSynthesisV2Return {
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  
  const apiKey = import.meta.env.VITE_GROQ_API_KEY || '';
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const loadVoices = useCallback(() => {
    if (!synthesisRef.current) return;

    const availableVoices = synthesisRef.current.getVoices();
    if (availableVoices.length === 0) return;

    const maleVoices = availableVoices.filter(isMaleVoice);
    console.log(`🔊 [V2 Bilingual] ${availableVoices.length} voices (${maleVoices.length} male)`);
    setVoices(maleVoices);

    if (!selectedVoice && maleVoices.length > 0) {
      let bestVoice = null;
      
      // Prioritize Hindi voices for better Indian pronunciation
      const checks = [
        (v: SpeechSynthesisVoice) => v.lang === 'hi-IN' && v.name.includes('Hemant'),
        (v: SpeechSynthesisVoice) => v.lang.startsWith('hi') && isMaleVoice(v),
        (v: SpeechSynthesisVoice) => v.name.includes('Ravi'),
        (v: SpeechSynthesisVoice) => v.lang === 'en-IN' && isMaleVoice(v),
        (v: SpeechSynthesisVoice) => v.lang.startsWith('en-GB') && isMaleVoice(v),
        (v: SpeechSynthesisVoice) => !v.localService && v.lang.startsWith('en') && isMaleVoice(v),
        (v: SpeechSynthesisVoice) => v.lang.startsWith('en') && isMaleVoice(v),
      ];

      for (const check of checks) {
        bestVoice = maleVoices.find(check);
        if (bestVoice) {
          console.log(`✅ [V2 Bilingual] Voice: "${bestVoice.name}" (${bestVoice.lang})`);
          console.log(`   Supports: ${bestVoice.lang.startsWith('hi') ? 'Hindi + English' : 'English (with Hindi transliteration)'}`);
          break;
        }
      }

      setSelectedVoice(bestVoice || maleVoices[0]);
    }
  }, [selectedVoice]);

  useEffect(() => {
    if (!supported) return;

    synthesisRef.current = window.speechSynthesis;
    loadVoices();

    if (synthesisRef.current.onvoiceschanged !== undefined) {
      synthesisRef.current.onvoiceschanged = loadVoices;
    }

    const timers = [100, 500, 1000, 2000].map(delay => setTimeout(loadVoices, delay));

    return () => {
      if (synthesisRef.current) synthesisRef.current.cancel();
      timers.forEach(clearTimeout);
    };
  }, [supported, loadVoices]);

  const speak = useCallback(async (text: string) => {
    if (!synthesisRef.current || !supported || !text?.trim()) return;

    synthesisRef.current.cancel();

    const cleanText = text
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/https?:\/\/[^\s]+/g, '')
      .replace(/www\.[^\s]+/g, '')
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return;

    const hasHindi = containsHindi(cleanText);
    const isHinglishText = isHinglish(cleanText);
    
    console.log(`🎤 [V2] Original: "${cleanText.substring(0, 60)}..."`);
    if (hasHindi) {
      console.log(`🇮🇳 [V2] ${isHinglishText ? 'Hinglish' : 'Hindi'} detected`);
    }

    const enhancedText = await processTextWithAI(cleanText, apiKey);
    
    if (enhancedText !== cleanText) {
      console.log(`✨ [V2] Enhanced: "${enhancedText.substring(0, 60)}..."`);
    }

    const utterance = new SpeechSynthesisUtterance(enhancedText);
    const emotion = analyzeEmotion(text);
    
    utterance.rate = emotion.rate;
    utterance.pitch = emotion.pitch;
    utterance.volume = emotion.volume;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      setSpeaking(true);
      console.log(`🎙️ [V2 Bilingual] Speaking (AI-enhanced)`);
    };
    
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = (e) => {
      console.error('❌ [V2] Error:', e.error);
      setSpeaking(false);
    };

    setTimeout(() => synthesisRef.current?.speak(utterance), 50);
  }, [selectedVoice, supported, apiKey]);

  const cancel = useCallback(() => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setSpeaking(false);
    }
  }, []);

  const clearCache = useCallback(() => {
    pronunciationCache.clear();
    console.log('🗑️ [V2] Cache cleared');
  }, []);

  return {
    speak,
    speaking,
    supported,
    voices,
    selectedVoice,
    setSelectedVoice,
    cancel,
    clearCache,
  };
}