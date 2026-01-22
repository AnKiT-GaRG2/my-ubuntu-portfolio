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

// Helper function to detect emotion/tone from text and adjust voice
function analyzeEmotion(text: string): { rate: number; pitch: number; volume: number } {
  const lowerText = text.toLowerCase();
  
  // Excited/Happy (!, emojis, positive words)
  if (
    text.includes('!') || 
    text.includes('🎉') || 
    text.includes('😊') ||
    text.includes('🚀') ||
    /\b(great|awesome|amazing|excellent|wonderful|fantastic|yay|yes|sure)\b/i.test(text)
  ) {
    return { rate: 1.15, pitch: 1.0, volume: 1.0 }; // Faster, enthusiastic
  }
  
  // Warning/Serious (⚠️, ❌, warning words)
  if (
    text.includes('⚠️') || 
    text.includes('❌') ||
    /\b(warning|careful|watch|stop|wait|blocked|abuse)\b/i.test(text)
  ) {
    return { rate: 0.95, pitch: 0.85, volume: 1.0 }; // Slower, serious tone
  }
  
  // Question (?)
  if (text.includes('?')) {
    return { rate: 1.05, pitch: 0.95, volume: 1.0 }; // Natural with slight rise
  }
  
  // Thinking/Explaining (long text, technical)
  if (text.length > 100 || /\b(because|however|therefore|basically|actually|let me)\b/i.test(text)) {
    return { rate: 1.0, pitch: 0.88, volume: 1.0 }; // Measured, explanatory
  }
  
  // Default: Natural conversational - like a real person talking
  return { rate: 1.0, pitch: 0.9, volume: 1.0 }; // Human-like pace
}

export function useSpeechSynthesis(): UseSpeechSynthesisReturn {
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Load and select ONE best Indian/natural voice
  const loadVoices = useCallback(() => {
    if (!synthesisRef.current) return;

    const availableVoices = synthesisRef.current.getVoices();
    
    if (availableVoices.length === 0) {
      console.log('⏳ Voices not loaded yet...');
      return;
    }

    console.log(`🔊 Found ${availableVoices.length} voices`);
    setVoices(availableVoices);

    // Select SINGLE best voice if none selected
    if (!selectedVoice && availableVoices.length > 0) {
      let bestVoice = null;
      
      // Priority: Pick FIRST matching voice (most natural for Indian accent)
      const voiceChecks = [
        // 1st choice: Indian English (Microsoft Ravi/Hemant)
        (v: SpeechSynthesisVoice) => v.name.includes('Ravi') && v.lang.startsWith('en'),
        (v: SpeechSynthesisVoice) => v.name.includes('Hemant') && v.lang.startsWith('en'),
        
        // 2nd choice: British English male (closest to Indian accent)
        (v: SpeechSynthesisVoice) => v.name.includes('Google UK English Male'),
        (v: SpeechSynthesisVoice) => v.name === 'Daniel' && v.lang.startsWith('en-GB'),
        
        // 3rd choice: Natural male voices
        (v: SpeechSynthesisVoice) => v.name === 'Alex' && v.lang.startsWith('en'),
        (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes('male') && v.lang.startsWith('en'),
        
        // 4th choice: British English (any)
        (v: SpeechSynthesisVoice) => v.lang.startsWith('en-GB'),
        
        // 5th choice: US English male
        (v: SpeechSynthesisVoice) => v.name.includes('Google US English Male'),
        
        // Last choice: Any English
        (v: SpeechSynthesisVoice) => v.lang.startsWith('en'),
      ];

      // Find first matching voice
      for (const check of voiceChecks) {
        bestVoice = availableVoices.find(check);
        if (bestVoice) {
          console.log(`✅ Using voice: ${bestVoice.name} (${bestVoice.lang})`);
          break;
        }
      }

      if (bestVoice) {
        setSelectedVoice(bestVoice);
      } else {
        console.warn('⚠️ No suitable voice found, using default');
        setSelectedVoice(availableVoices[0]);
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

    // Multiple attempts to load voices (Chrome needs this)
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

  const speak = useCallback((text: string) => {
    if (!synthesisRef.current || !supported || !text?.trim()) return;

    // Cancel any ongoing speech
    synthesisRef.current.cancel();

    // Clean text - remove emojis
    let cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');

    // Remove URLs and email addresses
    cleanText = cleanText.replace(/https?:\/\/[^\s]+/g, '');
    cleanText = cleanText.replace(/www\.[^\s]+/g, '');
    cleanText = cleanText.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '');
    
    // Clean up extra spaces
    cleanText = cleanText.replace(/\s+/g, ' ').trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Analyze text emotion and get voice parameters
    const emotion = analyzeEmotion(text);
    
    // Apply emotional voice settings (like a real person)
    utterance.rate = emotion.rate;       // Human-like pace (1.0-1.15)
    utterance.pitch = emotion.pitch;     // Natural pitch with emotion
    utterance.volume = emotion.volume;   // Full volume

    // Use the selected voice
    if (selectedVoice) {
      utterance.voice = selectedVoice;
      console.log(`🎙️ ${selectedVoice.name} | Rate: ${emotion.rate.toFixed(2)} | Pitch: ${emotion.pitch.toFixed(2)}`);
    }

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = (e) => {
      console.error('❌ Speech error:', e.error);
      setSpeaking(false);
    };

    // Small delay for clean transition
    setTimeout(() => {
      synthesisRef.current?.speak(utterance);
    }, 50);
  }, [selectedVoice, supported]);

  const cancel = useCallback(() => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
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