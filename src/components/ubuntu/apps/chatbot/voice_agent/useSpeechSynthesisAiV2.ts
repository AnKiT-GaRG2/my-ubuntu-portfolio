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

// Simple cache
const pronunciationCache = new Map<string, string>();

// Detect Hindi script
function containsHindi(text: string): boolean {
  return /[\u0900-\u097F]/.test(text);
}

/**
 * SIMPLIFIED V2 - Just fix what needs fixing, don't overthink
 */
async function getAIPronunciation(word: string, apiKey: string): Promise<string> {
  const cacheKey = word.toLowerCase();
  if (pronunciationCache.has(cacheKey)) {
    //console.log(`💾 [V2] Cache: "${word}"`);
    return pronunciationCache.get(cacheKey)!;
  }

  if (!apiKey) return word;

  try {
   // console.log(`🤖 [V2] AI: "${word}"`);
    
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
            content: `You fix pronunciation for English TTS to sound natural with Indian accent. Keep it SIMPLE and NATURAL.

CRITICAL - ANKIT'S NAME:
"Ankit" → "Ankit" (pronounce: UNN-kit, rhymes with "fun-kit")
"Garg" → "Garg" (pronounce: Garrg, hard G's, like "car" + "g")

INDIAN NAMES:
"Sharma" → "Sharma" 
"Kumar" → "Kumar"
"Singh" → "Singh"
"Garg" → "Grg"
Keep names as-is but Indians pronounce them naturally.

HINDI WORDS (transliterate to English):
"नमस्ते" → "namaste"
"यार" → "yaar"
"भाई" → "bhai"
"अच्छा" → "accha"
"ठीक है" → "theek hai"
"चलो" → "chalo"

TECHNICAL (how Indians say them):
"API" → "A P I" (separate letters)
"UI" → "U I"
"GitHub" → "git hub"
"JavaScript" → "javascript"
"React" → "react"
"Python" → "python"

RULES:
1. Keep English words as-is (TTS handles them fine)
2. Transliterate Hindi script to English
3. For acronyms, space out letters: "API" → "A P I"
4. Don't over-process - SIMPLE is better
5. Return ONLY the fixed word, nothing else

Examples:
"Ankit" → "Un-kit"
"API" → "A P I"
"नमस्ते" → "namaste"
"GitHub" → "git hub"
"यार" → "yaar"`
          },
          {
            role: 'user',
            content: `Fix: ${word}`
          }
        ],
        temperature: 0.1,
        max_tokens: 30,
      }),
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    let pronunciation = data.choices[0]?.message?.content?.trim() || word;
    
    // Clean up any quotes or extra formatting
    pronunciation = pronunciation.replace(/['"]/g, '').trim();
    
    pronunciationCache.set(cacheKey, pronunciation);
    console.log(`✨ [V2] "${word}" → "${pronunciation}"`);
    
    return pronunciation;
  } catch (error) {
    console.error('❌ [V2] Error:', error);
    return word;
  }
}

async function processTextWithAI(text: string, apiKey: string): Promise<string> {
  // If Hindi script detected, process entire text
  if (containsHindi(text)) {
    console.log('🇮🇳 [V2] Hindi detected');
    return await getAIPronunciation(text, apiKey);
  }

  // For English/Hinglish, only fix specific words
  const wordsToFix = [
    // Names
    'Ankit', 'Garg', 'Sharma', 'Kumar', 'Singh', 'Patel',
    // Tech acronyms
    'API', 'UI', 'UX', 'URL', 'HTML', 'CSS', 'SQL', 'JSON', 'XML',
    // Apps
    'GitHub', 'GitLab', 'VSCode', 'VS Code',
    // Hindi words in English script
    'yaar', 'bhai', 'accha', 'theek', 'chalo', 'bas', 'hai'
  ];

  let enhanced = text;

  for (const word of wordsToFix) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    if (regex.test(enhanced)) {
      const fixed = await getAIPronunciation(word, apiKey);
      enhanced = enhanced.replace(regex, fixed);
    }
  }

  return enhanced;
}

function analyzeEmotion(text: string): { rate: number; pitch: number; volume: number } {
  // Excited
  if (text.includes('!') || /\b(great|awesome|amazing)\b/i.test(text)) {
    return { rate: 1.05, pitch: 1.0, volume: 1.0 };
  }
  
  // Serious
  if (text.includes('⚠️') || text.includes('❌')) {
    return { rate: 0.95, pitch: 0.95, volume: 1.0 };
  }
  
  // Default
  return { rate: 1.0, pitch: 1.0, volume: 1.0 };
}

const isMaleVoice = (voice: SpeechSynthesisVoice): boolean => {
  const name = voice.name.toLowerCase();
  
  if (name.includes('male') && !name.includes('female')) return true;
  
  const maleNames = ['ravi', 'hemant', 'david', 'mark', 'james', 'daniel', 'alex', 'george'];
  if (maleNames.some(male => name.includes(male))) return true;
  
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
    //console.log(`🔊 [V2] ${maleVoices.length} male voices`);
    setVoices(maleVoices);

    if (!selectedVoice && maleVoices.length > 0) {
      // Prefer Hindi/Indian voices, then English
      let best = maleVoices.find(v => v.lang.startsWith('hi'));
      if (!best) best = maleVoices.find(v => v.lang === 'en-IN');
      if (!best) best = maleVoices.find(v => v.lang.startsWith('en-GB'));
      if (!best) best = maleVoices.find(v => v.lang.startsWith('en'));
      
      if (best) {
       // console.log(`✅ [V2] Voice: ${best.name} (${best.lang})`);
        setSelectedVoice(best);
      }
    }
  }, [selectedVoice]);

  useEffect(() => {
    if (!supported) return;

    synthesisRef.current = window.speechSynthesis;
    loadVoices();

    if (synthesisRef.current.onvoiceschanged !== undefined) {
      synthesisRef.current.onvoiceschanged = loadVoices;
    }

    const timers = [100, 500, 1000].map(d => setTimeout(loadVoices, d));
    return () => {
      synthesisRef.current?.cancel();
      timers.forEach(clearTimeout);
    };
  }, [supported, loadVoices]);

  const speak = useCallback(async (text: string) => {
    if (!synthesisRef.current || !supported || !text?.trim()) return;

    synthesisRef.current.cancel();

    const clean = text
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/https?:\/\/[^\s]+/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!clean) return;

    console.log(`🎤 [V2] "${clean.substring(0, 50)}..."`);

    const enhanced = await processTextWithAI(clean, apiKey);
    
    if (enhanced !== clean) {
      console.log(`✨ [V2] → "${enhanced.substring(0, 50)}..."`);
    }

    const utterance = new SpeechSynthesisUtterance(enhanced);
    const emotion = analyzeEmotion(text);
    
    utterance.rate = emotion.rate;
    utterance.pitch = emotion.pitch;
    utterance.volume = emotion.volume;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      setSpeaking(true);
      console.log(`🎙️ [V2] Speaking`);
    };
    
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = (e) => {
      console.error('❌ [V2]:', e.error);
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