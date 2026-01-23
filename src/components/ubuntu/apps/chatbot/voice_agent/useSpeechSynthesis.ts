import { useState, useEffect, useRef, useCallback } from 'react';

interface UseSpeechSynthesisReturn {
  speak: (text: string) => void;
  speaking: boolean;
  supported: boolean;
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  setSelectedVoice: (voice: SpeechSynthesisVoice | null) => void;
  cancel: () => void;
}

// Add natural pauses and breathing to make it sound more human
function addNaturalPauses(text: string): string {
  let natural = text;
  
  // Add slight pause after commas (natural breath)
  natural = natural.replace(/,/g, ', ');
  
  // Add pause after periods but before next sentence
  natural = natural.replace(/\.\s+/g, '. ');
  
  // Add pause after question marks
  natural = natural.replace(/\?\s+/g, '? ');
  
  // Add pause after exclamation marks
  natural = natural.replace(/!\s+/g, '! ');
  
  // Add emphasis on important words (ALL CAPS or bold markers)
  natural = natural.replace(/\*\*(.*?)\*\*/g, '$1'); // Remove markdown bold but keep word
  
  return natural;
}

// Fix common pronunciation issues
function fixPronunciation(text: string): string {
  let fixed = text;
  
  // Indian names - phonetic corrections
  fixed = fixed.replace(/\bAnkit\b/g, 'Unkit');
  fixed = fixed.replace(/\bGarg\b/g, 'Gaarag'); // Guttural G with emphasis on 'arg'
  
  // Common abbreviations that sound robotic
  fixed = fixed.replace(/\bAPI\b/g, 'ay pee eye');
  fixed = fixed.replace(/\bUI\b/g, 'yoo eye');
  fixed = fixed.replace(/\bURL\b/g, 'yoo are ell');
  fixed = fixed.replace(/\bHTML\b/g, 'h t m l');
  fixed = fixed.replace(/\bCSS\b/g, 'c s s');
  fixed = fixed.replace(/\bJS\b/g, 'javascript');
  fixed = fixed.replace(/\bVS Code\b/g, 'visual studio code');
  fixed = fixed.replace(/\bGitHub\b/g, 'git hub');
  
  // Numbers - make them sound more natural
  fixed = fixed.replace(/\b(\d+)\b/g, (match) => {
    // Add slight pause after numbers
    return match + ' ';
  });
  
  return fixed;
}

// Analyze emotion with more nuanced parameters for natural speech
function analyzeEmotion(text: string): { rate: number; pitch: number; volume: number; emphasis: boolean } {
  const lowerText = text.toLowerCase();
  
  // Very Excited/Enthusiastic (multiple !, caps, celebrations)
  if (
    (text.match(/!/g) || []).length >= 2 || 
    text.includes('🎉') || 
    text.includes('🚀') ||
    /\b(amazing|awesome|fantastic|excellent)\b/i.test(text)
  ) {
    return { rate: 1.1, pitch: 1.1, volume: 1.0, emphasis: true };
  }
  
  // Moderately Excited (single !, positive words)
  if (
    text.includes('!') || 
    text.includes('😊') ||
    /\b(great|sure|wonderful|nice|yay|yes)\b/i.test(text)
  ) {
    return { rate: 1.05, pitch: 1.05, volume: 1.0, emphasis: true };
  }
  
  // Warning/Serious (slow, lower, clear)
  if (
    text.includes('⚠️') || 
    text.includes('❌') ||
    /\b(warning|careful|watch|stop|blocked|abuse|error)\b/i.test(text)
  ) {
    return { rate: 0.85, pitch: 0.9, volume: 1.0, emphasis: true };
  }
  
  // Questions (natural questioning tone)
  if (text.includes('?')) {
    return { rate: 1.0, pitch: 1.05, volume: 1.0, emphasis: false };
  }
  
  // Long explanations (measured pace)
  if (text.length > 150) {
    return { rate: 0.95, pitch: 1.0, volume: 1.0, emphasis: false };
  }
  
  // Technical/Listing (clear articulation)
  if (
    text.includes('✓') || 
    text.includes('•') ||
    /\b(first|second|third|step|number)\b/i.test(text)
  ) {
    return { rate: 0.9, pitch: 1.0, volume: 1.0, emphasis: false };
  }
  
  // Default: Natural conversational
  return { rate: 1.0, pitch: 1.0, volume: 1.0, emphasis: false };
}

// Split long text into natural chunks (sentences)
function splitIntoNaturalChunks(text: string): string[] {
  // Split by sentence endings but keep the punctuation
  const chunks = text.match(/[^.!?]+[.!?]+/g) || [text];
  return chunks.map(chunk => chunk.trim()).filter(chunk => chunk.length > 0);
}

export function useSpeechSynthesis(): UseSpeechSynthesisReturn {
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const queueRef = useRef<string[]>([]);
  const isProcessingRef = useRef(false);
  const processQueueRef = useRef<(() => void) | null>(null);

  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Helper function to check if voice is EXPLICITLY male
  const isMaleVoice = (voice: SpeechSynthesisVoice): boolean => {
    const name = voice.name.toLowerCase();
    const uri = voice.voiceURI.toLowerCase();
    
    // ONLY accept voices that are EXPLICITLY male
    
    // 1. Has "male" in name (but not "female")
    if (name.includes('male') && !name.includes('female')) {
      //console.log(`✅ Male voice found (has 'male'): ${voice.name}`);
      return true;
    }
    
    // 2. Known male voice names
    const maleNames = [
      'ravi', 'hemant', 'david', 'mark', 'james', 'daniel', 
      'alex', 'george', 'thomas', 'richard', 'fred', 'gordon',
      'michael', 'paul', 'lee', 'martin', 'oliver', 'oscar'
    ];
    if (maleNames.some(male => name.includes(male))) {
      //console.log(`✅ Male voice found (known name): ${voice.name}`);
      return true;
    }
    
    // If not explicitly male, REJECT it
    //console.log(`❌ Rejecting (not explicitly male): ${voice.name}`);
    return false;
  };

  // Load and select the BEST MALE voice available
  const loadVoices = useCallback(() => {
    if (!synthesisRef.current) return;

    const availableVoices = synthesisRef.current.getVoices();
    
    if (availableVoices.length === 0) {
      //console.log('⏳ Loading voices...');
      return;
    }

    //console.log(`🔊 Found ${availableVoices.length} voices`);
    
    // Filter to ONLY male voices
    const maleVoices = availableVoices.filter(isMaleVoice);
    //console.log(`👨 Found ${maleVoices.length} male voices`);
    
    setVoices(maleVoices);

    if (!selectedVoice && maleVoices.length > 0) {
      let bestVoice = null;
      
      // Priority for NATURAL-sounding MALE voices
      const voiceChecks = [
        // Premium/Natural Hindi MALE voices
        (v: SpeechSynthesisVoice) => 
          !v.localService && 
          v.lang.startsWith('hi-IN') && 
          (v.name.includes('Neural') || v.name.includes('Natural')) &&
          isMaleVoice(v),
        
        // Hindi MALE voices (best for Indian names)
        (v: SpeechSynthesisVoice) => 
          v.lang === 'hi-IN' && 
          v.name.toLowerCase().includes('hemant'),
        
        (v: SpeechSynthesisVoice) => 
          v.lang.startsWith('hi') && 
          isMaleVoice(v),
        
        // Indian English MALE (natural accent)
        (v: SpeechSynthesisVoice) => 
          v.lang === 'en-IN' && 
          isMaleVoice(v) && 
          !v.localService,
        
        (v: SpeechSynthesisVoice) => v.name.includes('Ravi'),
        (v: SpeechSynthesisVoice) => v.name.includes('Hemant'),
        
        // High-quality English MALE voices (Google Enhanced/Neural)
        (v: SpeechSynthesisVoice) => 
          !v.localService && 
          v.lang.startsWith('en') && 
          (v.name.includes('Enhanced') || v.name.includes('Neural') || v.name.includes('Premium')) &&
          isMaleVoice(v),
        
        // Google UK MALE
        (v: SpeechSynthesisVoice) => 
          v.name.includes('Google') && 
          v.lang.startsWith('en-GB') &&
          v.name.toLowerCase().includes('male'),
        
        // Any UK MALE
        (v: SpeechSynthesisVoice) => 
          v.lang.startsWith('en-GB') &&
          isMaleVoice(v),
        
        // Cloud-based English MALE
        (v: SpeechSynthesisVoice) => 
          !v.localService && 
          v.lang.startsWith('en') &&
          isMaleVoice(v),
        
        // US English MALE (Google)
        (v: SpeechSynthesisVoice) => 
          v.name.includes('Google') && 
          v.lang.startsWith('en-US') &&
          v.name.toLowerCase().includes('male'),
        
        // Any English MALE
        (v: SpeechSynthesisVoice) => 
          v.lang.startsWith('en') &&
          isMaleVoice(v),
      ];

      for (const check of voiceChecks) {
        bestVoice = maleVoices.find(check);
        if (bestVoice) {
          // console.log('🎤 ===== VOICE SELECTED =====');
          // console.log(`✅ Name: ${bestVoice.name}`);
          // console.log(`🌍 Language: ${bestVoice.lang}`);
          // console.log(`📍 URI: ${bestVoice.voiceURI}`);
          // console.log(`💻 Type: ${bestVoice.localService ? 'Local (Device-based)' : 'Cloud (Online - Better Quality)'}`);
          // console.log(`👨 Gender: MALE`);
          // console.log('============================');
          break;
        }
      }

      if (bestVoice) {
        setSelectedVoice(bestVoice);
      } else {
        console.warn('⚠️ No male voice found, using first available');
        const fallbackVoice = maleVoices[0] || availableVoices[0];
        if (fallbackVoice) {
          console.log('🎤 Fallback voice:', fallbackVoice.name, fallbackVoice.lang);
        }
        setSelectedVoice(fallbackVoice);
      }
    }
  }, [selectedVoice]);

  useEffect(() => {
    if (!supported) {
      console.warn('⚠️ Speech synthesis not supported');
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

  // Process speech queue for natural flow
  const processQueue = useCallback(() => {
    if (isProcessingRef.current || queueRef.current.length === 0) return;
    
    isProcessingRef.current = true;
    const chunk = queueRef.current.shift()!;
    
    if (!synthesisRef.current || !selectedVoice) {
      isProcessingRef.current = false;
      return;
    }

    console.log(`🔊 Queue: Speaking chunk "${chunk.substring(0, 50)}..." with ${selectedVoice.name}`);

    const utterance = new SpeechSynthesisUtterance(chunk);
    const emotion = analyzeEmotion(chunk);
    
    utterance.rate = emotion.rate;
    utterance.pitch = emotion.pitch;
    utterance.volume = emotion.volume;
    utterance.voice = selectedVoice;

    utterance.onend = () => {
      isProcessingRef.current = false;
      
      // Small natural pause between sentences
      setTimeout(() => {
        if (queueRef.current.length > 0) {
          processQueueRef.current?.();
        } else {
          setSpeaking(false);
        }
      }, 150); // 150ms pause between sentences (natural breathing)
    };

    utterance.onerror = () => {
      isProcessingRef.current = false;
      setSpeaking(false);
    };

    synthesisRef.current.speak(utterance);
  }, [selectedVoice]);

  // Store processQueue in ref for recursive calls
  useEffect(() => {
    processQueueRef.current = processQueue;
  }, [processQueue]);

  const speak = useCallback((text: string) => {
    if (!synthesisRef.current || !supported || !text?.trim()) return;

    // Cancel any ongoing speech
    synthesisRef.current.cancel();
    queueRef.current = [];
    isProcessingRef.current = false;

    // Clean text
    let cleanText = text
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/https?:\/\/[^\s]+/g, '')
      .replace(/www\.[^\s]+/g, '')
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '');

    // Apply pronunciation fixes
    cleanText = fixPronunciation(cleanText);
    
    // Add natural pauses
    cleanText = addNaturalPauses(cleanText);
    
    // Clean up spacing
    cleanText = cleanText.replace(/\s+/g, ' ').trim();

    if (!cleanText) return;

    console.log('🎙️ ===== VOICE SPEECH STARTING =====');
    console.log(`📝 Text: "${cleanText.substring(0, 100)}${cleanText.length > 100 ? '...' : ''}"`);
    console.log(`🔊 Voice Name: ${selectedVoice?.name || 'default/system voice'}`);
    console.log(`🌍 Language: ${selectedVoice?.lang || 'unknown'}`);
    console.log(`📍 Voice URI: ${selectedVoice?.voiceURI || 'N/A'}`);
    console.log(`💻 Local/Cloud: ${selectedVoice?.localService ? 'Local (Device)' : 'Cloud-based (Online)'}`);
    console.log('========================================');

    // For short text, speak directly
    if (cleanText.length < 100) {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      const emotion = analyzeEmotion(text);
      
      utterance.rate = emotion.rate;
      utterance.pitch = emotion.pitch;
      utterance.volume = emotion.volume;
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = (e) => {
        console.error('❌ Speech error:', e.error);
        setSpeaking(false);
      };

      setTimeout(() => {
        synthesisRef.current?.speak(utterance);
      }, 50);
    } else {
      // For long text, split into natural chunks for better prosody
      const chunks = splitIntoNaturalChunks(cleanText);
      queueRef.current = chunks;
      setSpeaking(true);
      processQueue();
    }
  }, [selectedVoice, supported, processQueue]);

  const cancel = useCallback(() => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      queueRef.current = [];
      isProcessingRef.current = false;
      setSpeaking(false);
    }
  }, []);

  return {
    speak,
    speaking,
    supported,
    voices,
    selectedVoice,
    setSelectedVoice,
    cancel,
  };
}