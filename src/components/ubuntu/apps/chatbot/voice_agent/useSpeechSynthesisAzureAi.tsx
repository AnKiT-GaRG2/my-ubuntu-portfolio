import { useState, useEffect, useRef, useCallback } from 'react';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

interface UseSpeechSynthesisAzureReturn {
  speak: (text: string) => void;
  speaking: boolean;
  supported: boolean;
  voices: string[];
  selectedVoice: string;
  setSelectedVoice: (voice: string) => void;
  cancel: () => void;
  clearCache: () => void;
}

// AI Pronunciation Cache
const pronunciationCache = new Map<string, string>();

/**
 * AI-POWERED PRONUNCIATION ENGINE
 * Optimized for Azure Speech Service with Indian voices
 */
async function getAIPronunciation(word: string, apiKey: string): Promise<string> {
  const cacheKey = word.toLowerCase();
  if (pronunciationCache.has(cacheKey)) {
    console.log(`💾 [Azure] Cache hit: "${word}"`);
    return pronunciationCache.get(cacheKey)!;
  }

  if (!apiKey) {
    console.warn('⚠️ [Azure] No API key');
    return word;
  }

  try {
    console.log(`🤖 [Azure] Getting AI pronunciation: "${word}"`);
    
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
            content: `You are an expert in optimizing text for Azure Neural TTS with Indian voices. Your goal is to make Azure's Indian English voices sound natural and conversational.

IMPORTANT: Always answer in ENGLISH ONLY. Never use Hindi, Hinglish, or Devanagari script. Only provide English text/phonetic spelling.

🎯 CONTEXT: You're optimizing text for Azure Speech Service using Indian neural voices (like en-IN-PrabhatNeural, hi-IN-MadhurNeural). These voices already have good Indian pronunciation, but need help with:
1. Technical terms and acronyms
2. Ensuring natural flow for technical content

📱 TECHNICAL TERMS & ACRONYMS:
Azure voices may mispronounce these - provide phonetic alternatives:

ACRONYMS (use spelled-out versions with spaces):
- "API" → "A P I" (spaces important for Azure to pronounce letter-by-letter)
- "UI" → "U I"
- "URL" → "U R L"
- "HTML" → "H T M L"
- "CSS" → "C S S"
- "SQL" → "S Q L"
- "JSON" → "J SON" or "Jason"
- "XML" → "X M L"
- "AI" (artificial intelligence) → "A I"
- "ML" (machine learning) → "M L"
- "IT" (information technology) → "I T"

WORD "it" (as pronoun/word in sentence):
- Keep as "it" - Azure handles this correctly
- Example: "it is working" stays "it is working"

PROGRAMMING TERMS (use spaces to help Azure):
- "JavaScript" → "Java Script" (space helps pronunciation)
- "TypeScript" → "Type Script"
- "GitHub" → "Git Hub"
- "GitLab" → "Git Lab"
- "VS Code" → "V S Code" or "Visual Studio Code"
- "React" → "React" (Azure handles well)
- "Python" → "Python" (Azure handles well)
- "Node.js" → "Node J S" or "Node"
- "npm" → "N P M"

🎓 INDIAN EDUCATION TERMS:
- "B.Tech" → "B Tech" or "Bachelor of Technology"
- "M.Tech" → "M Tech"
- "IIT" → "I I T"
- "MBA" → "M B A"
- "JEE" → "J E E"
- "NEET" → "N E E T"

💡 AZURE-SPECIFIC OPTIMIZATION RULES:
1. ✅ Use spaces in acronyms: "A P I" not "API"
2. ✅ Break compound tech words: "Git Hub" not "GitHub"
3. ✅ Azure's Indian voices handle Indian names well naturally - don't modify them
4. ✅ Keep punctuation - Azure uses it for prosody
5. ✅ Use natural English - Azure's neural voices are sophisticated
6. ✅ For "IT" as acronym: use "I T"
7. ✅ For "it" as word: keep as "it"

⚡ EXAMPLES:

Input: "API"
Output: "A P I"

Input: "GitHub"
Output: "Git Hub"

Input: "IT department"
Output: "I T department"

Input: "it is working"
Output: "it is working"

Input: "JavaScript and React"
Output: "Java Script and React"

Input: "HTML and CSS"
Output: "H T M L and C S S"

Input: "JSON API"
Output: "J SON A P I"

Input: "UI/UX"
Output: "U I U X"

🎯 YOUR TASK:
Given a technical term or acronym, provide ONLY the Azure-optimized version that will sound natural when spoken by Azure's Indian neural voices. Use spaces for letter-by-letter pronunciation of acronyms. Keep it simple. No explanations or extra commentary.

Remember: Azure's Indian neural voices are already excellent - you're just helping with technical terms and acronyms!`
          },
          {
            role: 'user',
            content: `Optimize for Azure TTS: ${word}`
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
    console.log(`✨ [Azure] "${word}" → "${pronunciation}"`);
    
    return pronunciation;
  } catch (error) {
    console.error('❌ [Azure] Error:', error);
    return word;
  }
}

async function processTextWithAI(text: string, apiKey: string): Promise<string> {
  // Technical terms that Azure voices commonly mispronounce
  const problematicWords = [
    // Core tech acronyms
    'API', 'UI', 'UX', 'URL', 'HTML', 'CSS', 'SQL', 'JSON', 'XML',
    'AI', 'ML', 'IoT', 'SaaS', 'PaaS', 'IaaS',
    
    // Development tools
    'GitHub', 'GitLab', 'VS Code', 'VSCode',
    
    // Programming languages & frameworks
    'JavaScript', 'TypeScript', 'Node.js', 'React.js', 'Angular', 'Vue.js',
    
    // Package managers
    'npm', 'yarn', 'pip',
    
    // Indian education
    'B.Tech', 'M.Tech', 'IIT', 'MBA', 'JEE', 'NEET',
  ];

  // Step 1: Replace 'IT' acronym (when it appears as standalone or with specific context)
  // This regex looks for IT as a standalone word or in common acronym contexts
  let enhancedText = text.replace(/\bIT\b(?=\s+(department|sector|industry|field|professional|engineer|support))/gi, 'I T');

  // Step 2: Process other problematic words
  for (const word of problematicWords) {
    const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    if (regex.test(enhancedText)) {
      const pronunciation = await getAIPronunciation(word, apiKey);
      enhancedText = enhancedText.replace(regex, pronunciation);
    }
  }

  return enhancedText;
}

function analyzeEmotion(text: string): { rate: string; pitch: string } {
  // Excited/Happy
  // if (text.includes('!') || /\b(great|awesome|amazing|excellent|wonderful|fantastic|sure|yes)\b/i.test(text)) {
  //   return { rate: '+10%', pitch: '+5%' };
  // }
  
  // // Warning/Serious
  // if (text.includes('⚠️') || text.includes('❌') || /\b(warning|caution|stop|blocked|error|critical|urgent)\b/i.test(text)) {
  //   return { rate: '-10%', pitch: '-5%' };
  // }
  
  // // Question (slightly slower, more thoughtful)
  // if (text.includes('?')) {
  //   return { rate: '', pitch: 'default' };
  // }
  
  // Default: Natural conversation
  return { rate: '+5%', pitch: 'default' };
}

// Top Indian male voices from Azure (Neural voices)
const INDIAN_MALE_VOICES = [
  'en-IN-PrabhatNeural',     // Male, English (India) - Professional, clear
  'hi-IN-MadhurNeural',      // Male, Hindi (India) - Natural and warm
  'ta-IN-ValluvarNeural',    // Male, Tamil (India) - Regional accent
  'te-IN-MohanNeural',       // Male, Telugu (India) - Regional accent
  'mr-IN-ManoharNeural',     // Male, Marathi (India) - Regional accent
];

export function useSpeechSynthesisAzure(): UseSpeechSynthesisAzureReturn {
  const [speaking, setSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<string>(INDIAN_MALE_VOICES[0]);
  const synthesizerRef = useRef<sdk.SpeechSynthesizer | null>(null);
  const speechConfigRef = useRef<sdk.SpeechConfig | null>(null);
  
  const azureKey = import.meta.env.VITE_AZURE_SPEECH_KEY || '';
  const azureRegion = import.meta.env.VITE_AZURE_SPEECH_REGION || 'centralindia';
  const groqApiKey = import.meta.env.VITE_GROQ_API_KEY || '';
  
  const supported = Boolean(azureKey && azureRegion);

  useEffect(() => {
    if (!supported) {
      console.error('❌ [Azure] Missing credentials');
      return;
    }

    try {
      speechConfigRef.current = sdk.SpeechConfig.fromSubscription(azureKey, azureRegion);
      speechConfigRef.current.speechSynthesisVoiceName = selectedVoice;
      
      // Set output format for better quality
      speechConfigRef.current.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio24Khz48KBitRateMonoMp3;
      
      const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
      synthesizerRef.current = new sdk.SpeechSynthesizer(speechConfigRef.current, audioConfig);
      
      console.log(`✅ [Azure] Initialized with voice: ${selectedVoice}`);
    } catch (error) {
      console.error('❌ [Azure] Initialization error:', error);
    }

    return () => {
      if (synthesizerRef.current) {
        synthesizerRef.current.close();
      }
    };
  }, [azureKey, azureRegion, selectedVoice, supported]);

  const cancel = useCallback(() => {
    if (synthesizerRef.current) {
      try {
        synthesizerRef.current.close();
        // Reinitialize
        if (speechConfigRef.current) {
          const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
          synthesizerRef.current = new sdk.SpeechSynthesizer(speechConfigRef.current, audioConfig);
        }
      } catch (error) {
        console.error('❌ [Azure] Cancel error:', error);
      }
      setSpeaking(false);
    }
  }, []);

  const speak = useCallback(async (text: string) => {
    if (!synthesizerRef.current || !supported || !text?.trim()) return;

    // Stop any ongoing speech
    cancel();

    const cleanText = text
      // Remove emojis (except ⚠️ ❌ for emotion detection)
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      // Remove URLs & emails
      .replace(/https?:\/\/\S+/gi, '')
      .replace(/www\.\S+/gi, '')
      .replace(/\S+@\S+\.\S+/gi, '')
      // Remove code blocks & inline code
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`[^`]*`/g, '')
      // Remove markdown bold/italic
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/__([^_]+)__/g, '$1')
      .replace(/_([^_]+)_/g, '$1')
      // Remove other markdown
      .replace(/[~^=#|<>[\]{}()]/g, '')
      // Clean up extra symbols (keep . , ? ! - ')
      .replace(/[^\w\s.,?!\-'⚠️❌]/g, '')
      // Normalize spaces
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return;

    console.log(`🎤 [Azure] Original: "${cleanText.substring(0, 80)}..."`);

    // Process with AI for technical terms
    const enhancedText = await processTextWithAI(cleanText, groqApiKey);
    
    if (enhancedText !== cleanText) {
      console.log(`✨ [Azure] Enhanced: "${enhancedText.substring(0, 80)}..."`);
    }

    const emotion = analyzeEmotion(text);

    // Build SSML for Azure with prosody control
    const ssml = `
      <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-IN">
        <voice name="${selectedVoice}">
          <prosody rate="${emotion.rate}" pitch="${emotion.pitch}">
            ${enhancedText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}
          </prosody>
        </voice>
      </speak>
    `;

    setSpeaking(true);

    synthesizerRef.current.speakSsmlAsync(
      ssml,
      (result) => {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          console.log('🎙️ [Azure] Speech completed successfully');
        } else if (result.reason === sdk.ResultReason.Canceled) {
          const cancellation = sdk.CancellationDetails.fromResult(result);
          console.error('❌ [Azure] Speech canceled:', cancellation.reason);
          if (cancellation.reason === sdk.CancellationReason.Error) {
            console.error('❌ [Azure] Error details:', cancellation.errorDetails);
          }
        }
        setSpeaking(false);
      },
      (error) => {
        console.error('❌ [Azure] Speech error:', error);
        setSpeaking(false);
      }
    );
  }, [selectedVoice, supported, groqApiKey, cancel]);

  const clearCache = useCallback(() => {
    pronunciationCache.clear();
    console.log('🗑️ [Azure] Pronunciation cache cleared');
  }, []);

  return {
    speak,
    speaking,
    supported,
    voices: INDIAN_MALE_VOICES,
    selectedVoice,
    setSelectedVoice,
    cancel,
    clearCache,
  };
}