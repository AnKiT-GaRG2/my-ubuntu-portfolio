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

export function useSpeechSynthesis(): UseSpeechSynthesisReturn {
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Load voices function with Indian voice priority
  const loadVoices = useCallback(() => {
    if (!synthesisRef.current) return;

    const availableVoices = synthesisRef.current.getVoices();
    
    if (availableVoices.length === 0) {
      console.log('⏳ Voices not loaded yet, waiting...');
      return;
    }

    console.log(`🔊 Loaded ${availableVoices.length} voices`);
    setVoices(availableVoices);

    // Auto-select Indian/male voice if none selected
    if (!selectedVoice && availableVoices.length > 0) {
      // Priority list for Indian and male voices
      const voicePreferences = [
        // Indian voices (Microsoft)
        'Microsoft Ravi',
        'Microsoft Hemant',
        'Ravi',
        'Hemant',
        // British English (closer to Indian accent)
        'Google UK English Male',
        'Daniel', // British
        'Alex', // Natural sounding
        // US/International male voices as fallback
        'Google US English Male',
        'Microsoft David',
        'Microsoft Mark',
        'James',
      ];

      let defaultVoice = null;
      
      // Try preferred voices first
      for (const preference of voicePreferences) {
        defaultVoice = availableVoices.find(voice => 
          voice.name.includes(preference)
        );
        if (defaultVoice) {
          console.log(`✅ Auto-selected voice: ${defaultVoice.name}`);
          break;
        }
      }

      // Fallback: Any male voice
      if (!defaultVoice) {
        defaultVoice = availableVoices.find(voice => 
          voice.name.toLowerCase().includes('male') ||
          voice.name.toLowerCase().includes('ravi') ||
          voice.name.toLowerCase().includes('hemant')
        );
      }

      // Fallback: British English
      if (!defaultVoice) {
        defaultVoice = availableVoices.find(voice => 
          voice.lang.startsWith('en-GB')
        );
      }

      // Fallback: Any English voice
      if (!defaultVoice) {
        defaultVoice = availableVoices.find(voice => 
          voice.lang.startsWith('en')
        );
      }

      if (defaultVoice) {
        setSelectedVoice(defaultVoice);
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

    // Multiple attempts to load voices (Chrome needs this)
    const timers = [
      setTimeout(loadVoices, 100),
      setTimeout(loadVoices, 500),
      setTimeout(loadVoices, 1000),
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

    synthesisRef.current.cancel();

    // Clean text - remove emojis
    let cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');

    // Remove URLs/links (http://, https://, www., email addresses)
    cleanText = cleanText.replace(/https?:\/\/[^\s]+/g, ''); // Remove http(s) URLs
    cleanText = cleanText.replace(/www\.[^\s]+/g, ''); // Remove www URLs
    cleanText = cleanText.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, ''); // Remove emails
    cleanText = cleanText.replace(/\s+/g, ' ').trim(); // Clean up extra spaces

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Settings for Indian male voice
    utterance.rate = 0.95;    // Natural pace
    utterance.pitch = 0.85;   // Lower for male
    utterance.volume = 1.0;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      console.log(`🔊 Speaking with: ${selectedVoice.name}`);
    }

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = (e) => {
      console.error('Speech error:', e.error);
      setSpeaking(false);
    };

    setTimeout(() => synthesisRef.current?.speak(utterance), 50);
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