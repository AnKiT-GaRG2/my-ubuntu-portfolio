import { useState, useEffect, useRef, useCallback } from 'react';

interface UseSpeechSynthesisV2Return {
  speak: (text: string) => void;
  speaking: boolean;
  supported: boolean;
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  setSelectedVoice: (voice: SpeechSynthesisVoice | null) => void;
  cancel: () => void;
  clearCache: () => void; // V2 feature: clear pronunciation cache
}

// V2: AI Pronunciation Cache
const pronunciationCache = new Map<string, string>();

/**
 * V2 AI-POWERED PRONUNCIATION ENGINE
 * Uses Groq API to get perfect pronunciation for any word
 */
async function getAIPronunciation(word: string, apiKey: string): Promise<string> {
  // Check cache first
  const cacheKey = word.toLowerCase();
  if (pronunciationCache.has(cacheKey)) {
    console.log(`💾 [V2] Cache hit: "${word}"`);
    return pronunciationCache.get(cacheKey)!;
  }

  if (!apiKey) {
    console.warn('⚠️ [V2] No API key, using original word');
    return word;
  }

  try {
    console.log(`🤖 [V2] Asking AI for pronunciation of: "${word}"`);
    
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
            content: `You are an INDIAN ENGLISH pronunciation expert for text-to-speech systems. Your goal is to make words sound natural with an Indian accent.

For INDIAN NAMES (Hindi/Sanskrit/Punjabi origin):
- Use phonetic spelling that matches INDIAN pronunciation
- Keep Hindi/Punjabi sounds authentic
- "Ankit" → "Unkit" (short 'u' as in "under", not "ahn")
- "Garg" → "Gaarag" (guttural 'G', stress on 'gaa')
- "Sharma" → "Shur-maa" (rolling 'r', long 'aa')
- "Kumar" → "Koo-maar" (long 'aa')
- "Singh" → "Sing" (silent 'h', hard 'g')
- "Patel" → "Puh-tel" (soft 't')
- "Gupta" → "Goop-taa"
- "Verma" → "Vur-maa"

For TECHNICAL TERMS/ACRONYMS (Indian English pronunciation):
- Spell them out with Indian accent patterns
- "API" → "ay pee ai" (not "eye")
- "UI" → "yoo ai"
- "UX" → "yoo ex"
- "URL" → "yoo aar el"
- "HTML" → "aych tee em el"
- "CSS" → "see ess ess"
- "SQL" → "ess kyoo el"
- "JSON" → "jay-son"
- "XML" → "ex em el"
- "IT" → "ai tee"
- "BIT" → "bee ai tee" (Birla Institute of Technology)

For BRAND/APP NAMES (Indian pronunciation):
- "GitHub" → "git-hub"
- "GitLab" → "git-lab"
- "VS Code" → "vee ess code"
- "Chrome" → "chrome"
- "Firefox" → "fire-fox"
- "Linux" → "lin-ucks"
- "Ubuntu" → "oo-boon-too"

For DEGREES/EDUCATION (Indian style):
- "B.Tech" → "bee-tek"
- "B.E." → "bee-ee"
- "M.Tech" → "em-tek"
- "IIT" → "ai ai tee"
- "NIT" → "en ai tee"
- "BITS" → "bits"

For PROGRAMMING LANGUAGES:
- "JavaScript" → "java-script"
- "TypeScript" → "type-script"
- "Python" → "py-thon"
- "React" → "ree-act"
- "Angular" → "ang-yoo-lar"
- "Vue" → "vyoo"

IMPORTANT RULES:
1. Use Indian English pronunciation patterns (not American/British)
2. Keep 'r' sounds rolled when natural for Indians
3. Use clear syllable breaks with hyphens
4. For 'I' in acronyms, use "ai" not "eye"
5. Respond with ONLY the phonetic respelling
6. No explanations, no extra text, just the pronunciation
7. Make it sound natural for Indian speakers`
          },
          {
            role: 'user',
            content: `Phonetic spelling for English TTS: ${word}`
          }
        ],
        temperature: 0.2, // Low temperature for consistent pronunciation
        max_tokens: 30,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const pronunciation = data.choices[0]?.message?.content?.trim() || word;
    
    // Cache the result
    pronunciationCache.set(cacheKey, pronunciation);
    console.log(`✨ [V2] AI pronunciation: "${word}" → "${pronunciation}"`);
    
    return pronunciation;
  } catch (error) {
    console.error('❌ [V2] AI pronunciation error:', error);
    return word; // Fallback to original
  }
}

/**
 * V2: Smart text processing with AI pronunciation
 */
async function processTextWithAI(text: string, apiKey: string): Promise<string> {
  // Words that commonly need pronunciation help
  const problematicWords = [
    // Indian names (customize this list)
    'Ankit', 'Garg', 'Sharma', 'Kumar', 'Singh', 'Patel',
    
    // Technical terms
    'API', 'UI', 'UX', 'URL', 'HTML', 'CSS', 'SQL', 'JSON', 'XML',
    
    // Apps/Tools
    'GitHub', 'GitLab', 'VS Code', 'VSCode', 'Chrome', 'Firefox',
    
    // Common tech
    'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue'
  ];

  let enhancedText = text;

  // Process each problematic word
  for (const word of problematicWords) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    
    if (regex.test(text)) {
      const pronunciation = await getAIPronunciation(word, apiKey);
      enhancedText = enhancedText.replace(regex, pronunciation);
    }
  }

  return enhancedText;
}

// Emotion analysis
function analyzeEmotion(text: string): { rate: number; pitch: number; volume: number } {
  if (text.includes('!') || /\b(great|awesome|amazing|sure)\b/i.test(text)) {
    return { rate: 1.1, pitch: 1.05, volume: 1.0 };
  }
  
  if (text.includes('⚠️') || text.includes('❌') || /\b(warning|stop|blocked)\b/i.test(text)) {
    return { rate: 0.9, pitch: 0.95, volume: 1.0 };
  }
  
  if (text.includes('?')) {
    return { rate: 0.95, pitch: 1.0, volume: 1.0 };
  }
  
  return { rate: 1.0, pitch: 1.0, volume: 1.0 };
}

// Male voice detection - WHITELIST APPROACH (only accept explicit male voices)
const isMaleVoice = (voice: SpeechSynthesisVoice): boolean => {
  const name = voice.name.toLowerCase();
  const uri = voice.voiceURI.toLowerCase();
  
  // First check: Voice explicitly labeled as "male" (but not "female")
  if (name.includes('male') && !name.includes('female')) return true;
  
  // Second check: Known male voice names (exhaustive list)
  const knownMaleNames = [
    // Indian male voices
    'ravi', 'hemant', 'prabhat', 'ajit', 'vijay',
    
    // English male voices
    'david', 'mark', 'james', 'daniel', 'alex', 'george', 
    'thomas', 'richard', 'fred', 
  ];
  
  if (knownMaleNames.some(male => name.includes(male) || uri.includes(male))) {
    return true;
  }
  
  // DEFAULT: If not explicitly male, reject it
  // This ensures we ONLY use voices we know are male
  return false;
};

/**
 * V2: AI-POWERED SPEECH SYNTHESIS HOOK
 */
export function useSpeechSynthesisV2AI(): UseSpeechSynthesisV2Return {
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  
  // Get API key from environment
  const apiKey = import.meta.env.VITE_GROQ_API_KEY || '';

  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Load male voices
  const loadVoices = useCallback(() => {
    if (!synthesisRef.current) return;

    const availableVoices = synthesisRef.current.getVoices();
    if (availableVoices.length === 0) {
      console.log('⏳ [V2] Loading voices...');
      return;
    }

    const maleVoices = availableVoices.filter(isMaleVoice);
    console.log(`🔊 [V2] Found ${availableVoices.length} voices (${maleVoices.length} male)`);
    
    // Log all male voices found
    console.log('📋 [V2] Male voices available:');
    maleVoices.forEach((v, i) => {
      console.log(`   ${i + 1}. ${v.name} (${v.lang}) - ${v.localService ? 'Local' : 'Cloud'}`);
    });
    
    setVoices(maleVoices);

    if (!selectedVoice && maleVoices.length > 0) {
      let bestVoice = null;
      
      const voiceChecks = [
        (v: SpeechSynthesisVoice) => v.lang === 'hi-IN' && v.name.includes('Hemant'),
        (v: SpeechSynthesisVoice) => v.lang.startsWith('hi') && isMaleVoice(v),
        (v: SpeechSynthesisVoice) => v.name.includes('Ravi'),
        (v: SpeechSynthesisVoice) => v.lang === 'en-IN' && isMaleVoice(v),
        (v: SpeechSynthesisVoice) => v.lang.startsWith('en-GB') && isMaleVoice(v),
        (v: SpeechSynthesisVoice) => !v.localService && v.lang.startsWith('en') && isMaleVoice(v),
        (v: SpeechSynthesisVoice) => v.lang.startsWith('en') && isMaleVoice(v),
      ];

      for (const check of voiceChecks) {
        bestVoice = maleVoices.find(check);
        if (bestVoice) {
          console.log(`✅ [V2 AI MODE] Selected voice: "${bestVoice.name}"`);
          console.log(`   Language: ${bestVoice.lang}`);
          console.log(`   Type: ${bestVoice.localService ? 'Local' : 'Cloud-based'}`);
          console.log(`   URI: ${bestVoice.voiceURI}`);
          break;
        }
      }

      setSelectedVoice(bestVoice || maleVoices[0]);
      
      if (!bestVoice && maleVoices.length > 0) {
        console.log(`⚠️ [V2] No preferred voice found, using fallback: "${maleVoices[0].name}"`);
      }
    }
  }, [selectedVoice]);

  useEffect(() => {
    if (!supported) {
      console.warn('⚠️ [V2] Speech synthesis not supported');
      return;
    }

    synthesisRef.current = window.speechSynthesis;
    loadVoices();

    if (synthesisRef.current.onvoiceschanged !== undefined) {
      synthesisRef.current.onvoiceschanged = loadVoices;
    }

    const timers = [
      setTimeout(loadVoices, 100),
      setTimeout(loadVoices, 500),
      setTimeout(loadVoices, 1000),
      setTimeout(loadVoices, 2000),
    ];

    return () => {
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [supported, loadVoices]);

  /**
   * V2 SPEAK FUNCTION - WITH AI PRONUNCIATION
   */
  const speak = useCallback(async (text: string) => {
    if (!synthesisRef.current || !supported || !text?.trim()) return;

    synthesisRef.current.cancel();

    // Clean text
    const cleanText = text
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/https?:\/\/[^\s]+/g, '')
      .replace(/www\.[^\s]+/g, '')
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return;

    console.log(`🎤 [V2] Original: "${cleanText.substring(0, 80)}..."`);

    // 🚀 V2 MAGIC: AI-POWERED PRONUNCIATION
    const enhancedText = await processTextWithAI(cleanText, apiKey);
    
    if (enhancedText !== cleanText) {
      console.log(`✨ [V2] Enhanced: "${enhancedText.substring(0, 80)}..."`);
    }

    const utterance = new SpeechSynthesisUtterance(enhancedText);
    const emotion = analyzeEmotion(text);
    
    utterance.rate = emotion.rate;
    utterance.pitch = emotion.pitch;
    utterance.volume = emotion.volume;

    // FORCE the male voice to be used
    if (selectedVoice) {
      utterance.voice = selectedVoice;
      console.log(`🎯 [V2] Force setting voice to: "${selectedVoice.name}"`);
    } else {
      console.warn('⚠️ [V2] No selectedVoice available! Will use browser default.');
      // Get male voices and force the first one
      const availableVoices = synthesisRef.current.getVoices();
      const maleVoices = availableVoices.filter(isMaleVoice);
      if (maleVoices.length > 0) {
        utterance.voice = maleVoices[0];
        console.log(`🎯 [V2] Forcing fallback voice: "${maleVoices[0].name}"`);
      }
    }
    
    // Verify what voice will actually be used
    console.log(`🔍 [V2] Utterance voice set to: "${utterance.voice?.name || 'null'}"`);

    utterance.onstart = () => {
      setSpeaking(true);
      console.log(`🎙️ [V2] Speaking with AI-enhanced pronunciation`);
      console.log(`   Using voice: "${selectedVoice?.name || 'Default'}"`);
      console.log(`   Actual utterance voice: "${utterance.voice?.name || 'null'}"`);
    };
    
    utterance.onend = () => {
      setSpeaking(false);
      console.log(`✅ [V2] Finished speaking`);
    };
    
    utterance.onerror = (e) => {
      console.error('❌ [V2] Speech error:', e.error);
      setSpeaking(false);
    };

    setTimeout(() => {
      synthesisRef.current?.speak(utterance);
    }, 50);
  }, [selectedVoice, supported, apiKey]);

  const cancel = useCallback(() => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setSpeaking(false);
      console.log('🛑 [V2] Speech cancelled');
    }
  }, []);

  // V2 FEATURE: Clear pronunciation cache
  const clearCache = useCallback(() => {
    pronunciationCache.clear();
    console.log('🗑️ [V2] Pronunciation cache cleared');
  }, []);

  return {
    speak,
    speaking,
    supported,
    voices,
    selectedVoice,
    setSelectedVoice,
    cancel,
    clearCache, // New V2 feature
  };
}