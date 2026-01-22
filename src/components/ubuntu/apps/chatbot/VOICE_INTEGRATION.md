# Voice Chatbot Integration

This directory contains the voice-enabled components for the Ubuntu portfolio chatbot.

## Components

### 1. **useSpeechRecognition.ts** (Speech-to-Text Hook)
Custom React hook that handles speech recognition using the Web Speech API.

**Features:**
- Real-time voice-to-text conversion
- Interim results (shows what you're saying as you speak)
- Final transcript capture
- Error handling
- Browser support detection

**Usage:**
```typescript
const {
  isListening,
  transcript,
  interimTranscript,
  startListening,
  stopListening,
  isSupported,
  error
} = useSpeechRecognition();
```

###  2. **useSpeechSynthesis.ts** (Text-to-Speech Hook)
Custom React hook for text-to-speech functionality.

**Features:**
- Converts text to speech
- Voice selection (automatically selects best male voice)
- Speaking state tracking
- Voice customization (rate, pitch, volume)
- Browser support detection

**Usage:**
```typescript
const {
  speak,
  speaking,
  supported,
  voices,
  selectedVoice,
  setSelectedVoice,
  cancel
} = useSpeechSynthesis();

// Speak a message
speak("Hello! How can I help you?");
```

### 3. **VoiceMicButton.tsx** (Microphone UI Component)
Interactive microphone button component.

**Features:**
- Visual feedback when listening (pulse animation)
- Gradient color styling based on accent color
- Disabled state support
- Hover and active animations

**Props:**
```typescript
interface VoiceMicButtonProps {
  isListening: boolean;
  onToggle: () => void;
  accentRgb: string;
  disabled?: boolean;
}
```

### 4. **LiveTranscription.tsx** (Real-time Transcript Display)
Shows live transcription as the user speaks.

**Features:**
- Real-time display of speech recognition results
- Interim results (gray, italic) vs final results (white, bold)
- Blinking cursor animation when listening
- Smooth fade-in animation
- Auto-hide when not in use

**Props:**
```typescript
interface LiveTranscriptionProps {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  accentRgb: string;
}
```

## Integration in ChatBotRefactored.tsx

The voice functionality is integrated into the main chatbot component:

1. **Voice Recognition**: Automatically sends the message when speech recognition completes
2. **Voice Synthesis**: Bot responses are spoken aloud
3. **UI Feedback**: Live transcription shows what you're saying in real-time
4. **Microphone Button**: Located in the chat input area

## Browser Support

The voice features use the Web Speech API which is supported in:
- ✅ Chrome/Edge (Full support)
- ✅ Safari (Full support)
- ⚠️ Firefox (Limited support)
- ❌ Not supported in older browsers

The components gracefully degrade - if voice features aren't supported, the mic button won't appear and the chatbot functions normally with text input only.

## Customization

### Voice Settings
- **Rate**: 0.9 (slightly slower for clarity)
- **Pitch**: 0.8 (lower for male voice)
- **Volume**: 1.0 (full volume)
- **Language**: en-US

### Animations
- **Pulse Animation**: When listening (1.5s infinite)
- **Fade In**: 0.3s ease
- **Blink Cursor**: 1.2s step-end infinite
- **Scale Hover**: 1.1x on hover

## Accessibility

- ARIA labels on microphone button
- Visual feedback for all states
- Keyboard navigation support (inherited from parent components)
- Error messages displayed to user

## Error Handling

The components handle various error scenarios:
- Browser not supported
- Microphone permission denied
- Speech recognition errors
- Network issues

All errors are logged to console and displayed to the user when appropriate.
