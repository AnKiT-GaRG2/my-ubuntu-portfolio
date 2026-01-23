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

/**
 * V2 AI-POWERED PRONUNCIATION ENGINE
 * Ultra-refined prompt for natural Indian English speech
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
    console.log(`🤖 [V2] Getting AI pronunciation: "${word}"`);
    
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
            content: `You are an expert in NATURAL INDIAN ENGLISH pronunciation. Make TTS sound like a REAL INDIAN PERSON talking - conversational, natural, with proper accent and emotion.

IMPORTANT: Always answer in ENGLISH ONLY, even if the input is in Hindi or Hinglish. Never reply in Hindi or Hinglish. Only use English phonetic spelling and pronunciation.

🎯 GOAL: Sound like a real Indian guy chatting, NOT a robot.

📱 INDIAN NAMES (CRITICAL):
- "Ankit" → "Un-kit" (short 'u' like "under", stress first syllable)
- "Garg" → "Gerg" (guttural 'g', short 'e' like "father", stress on 'gaa')
- "Sharma" → "Shur-maa" (rolling 'r', long 'aa')
- "Kumar" → "Koo-maar" (long 'oo' like "food", long 'aa')
- "Singh" → "Sing" (silent 'h', hard 'g')
- "Patel" → "Puh-tel" 
- "Gupta" → "Goop-taa"
- "Verma" → "Vur-maa"
- "Agarwal" → "Ug-gar-waal"

🎭 EMOTIONAL CONTEXT (Make it HUMAN):
EXCITED (!, positive words):
- Faster, enthusiastic
- "Great!" → "Gray-t" (quick, upbeat)
- "Awesome!" → "Aw-sum" (stress 'aw')

SERIOUS (⚠️, warning):
- Slower, firm
- "Warning" → "War-ning" (deliberate)
- "Stop" → "Stawp" (firm)

QUESTIONS (?):
- Slight rise
- "Really?" → "Ree-lee"

🔤 TECHNICAL TERMS (Indian style):
ACRONYMS (Indians say "ai" not "eye"):
- "API" → "ay pee ai" (NEVER "eye")
- "UI" → "yoo ai"
- "URL" → "yoo aar el"
- "HTML" → "aych tee em el"
- "CSS" → "see ess ess"
- "IT" (acronym, for Information Technology) → "ai tee"

WORD "it" (as in 'it is', 'get it', etc):
- Pronounce as "it" (short 'i', like "bit")

PROGRAMMING:
- "JavaScript" → "ja-vaa script" (stress 'vaa')
- "Python" → "py-thawn"
- "React" → "ree-ekt"
- "GitHub" → "git hub" (two words)

EDUCATION:
- "B.Tech" → "bee-tek" (very common in India)
- "IIT" → "ai ai tee"
- "MBA" → "em bee ay"

🗣️ INDIAN SPEECH PATTERNS:
1. Syllable-timed rhythm (equal time per syllable)
2. 'R' always pronounced, slightly rolled
3. 'A' sounds like 'aa' (father)
4. Clear syllable breaks
5. First syllable often stressed
6. Conversational, like explaining to a friend

⚡ EXAMPLES:
Robotic: "I am Ankit Garg"
Natural: "I'm Un-kit Grg"

Robotic: "Check my API"
Natural: "Check my ay pee ai"

Robotic: "IT is important"
Natural: "ai tee is important" (if acronym)
Natural: "it is important" (if word)

🎯 YOUR TASK:
Given a word, provide ONLY the phonetic spelling that makes TTS sound like a REAL INDIAN PERSON. Use hyphens for syllable breaks. No explanations.

Sound natural, conversational, human - like a friend talking!`
          },
          {
            role: 'user',
            content: `Phonetic for TTS: ${word}`
          }
        ],
        temperature: 0.2,
        max_tokens: 30,
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
  const problematicWords = [
    'Ankit', 'Garg', 'Sharma', 'Kumar', 'Singh', 'Patel', 'Gupta', 'Verma',
    'API', 'UI', 'UX', 'URL', 'HTML', 'CSS', 'SQL', 'JSON', 'XML',
    'GitHub', 'GitLab', 'VS Code', 'VSCode', 'Chrome', 'Firefox',
    'JavaScript', 'TypeScript', 'Python', 'React', 'Angular', 'Vue', 'Node'
    // DO NOT include 'IT' here, handle separately
  ];

  // Step 1: Replace 'IT' acronym with a placeholder
  let enhancedText = text.replace(/\bIT\b/g, '__AI_TEE__');

  // Step 2: Process other problematic words
  for (const word of problematicWords) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    if (regex.test(enhancedText)) {
      const pronunciation = await getAIPronunciation(word, apiKey);
      enhancedText = enhancedText.replace(regex, pronunciation);
    }
  }

  // Step 3: Replace placeholder with AI pronunciation for 'IT' acronym
  if (enhancedText.includes('__AI_TEE__')) {
    const aiTee = await getAIPronunciation('IT', apiKey);
    enhancedText = enhancedText.replace(/__AI_TEE__/g, aiTee);
  }

  return enhancedText;
}

function analyzeEmotion(text: string): { rate: number; pitch: number; volume: number } {
  // Excited/Happy
  if (text.includes('!') || /\b(great|awesome|amazing|sure|yes)\b/i.test(text)) {
    return { rate: 1.1, pitch: 1.05, volume: 1.0 };
  }
  
  // Warning/Serious
  if (text.includes('⚠️') || text.includes('❌') || /\b(warning|stop|blocked|error)\b/i.test(text)) {
    return { rate: 0.9, pitch: 0.95, volume: 1.0 };
  }
  
  // Question
  if (text.includes('?')) {
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
    console.log(`🔊 [V2] ${availableVoices.length} voices (${maleVoices.length} male)`);
    setVoices(maleVoices);

    if (!selectedVoice && maleVoices.length > 0) {
      let bestVoice = null;
      
      const checks = [
        (v: SpeechSynthesisVoice) => v.lang === 'hi-IN' && v.name.includes('Hemant'),
        (v: SpeechSynthesisVoice) => v.lang.startsWith('hi'),
        (v: SpeechSynthesisVoice) => v.name.includes('Ravi'),
        (v: SpeechSynthesisVoice) => v.lang === 'en-IN',
        (v: SpeechSynthesisVoice) => v.lang.startsWith('en-GB'),
        (v: SpeechSynthesisVoice) => !v.localService && v.lang.startsWith('en'),
        (v: SpeechSynthesisVoice) => v.lang.startsWith('en'),
      ];

      for (const check of checks) {
        bestVoice = maleVoices.find(check);
        if (bestVoice) {
          console.log(`✅ [V2 AI] Voice: "${bestVoice.name}" (${bestVoice.lang})`);
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

  // 2️⃣ Remove URLs & emails
      .replace(/https?:\/\/\S+/gi, '')
      .replace(/www\.\S+/gi, '')
      .replace(/\S+@\S+\.\S+/gi, '')

  // 3️⃣ Remove code blocks & inline code
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`[^`]*`/g, '')

  // 4️⃣ Remove markdown syntax
      .replace(/[*_~^=#|<>[\]{}()]/g, '')

  // 5️⃣ Remove leftover symbols (keep . , ? !)
      .replace(/[^\w\s.,?!]/g, '')

  // 6️⃣ Normalize spaces
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return;

    console.log(`🎤 [V2] Original: "${cleanText.substring(0, 60)}..."`);

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
      console.log(`🎙️ [V2] Speaking (AI-enhanced)`);
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