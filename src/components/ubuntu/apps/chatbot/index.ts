// Central export file for chatbot utilities
export { detectReviewIntent } from './intents/detectReviewIntent';
export { detectChromeIntent } from './intents/detectChromeIntent';
export { detectTerminalIntent } from './intents/detectTerminalIntent';
export { detectCalculatorIntent } from './intents/detectCalculatorIntent';
export { detectVSCodeIntent } from './intents/detectVSCodeIntent';
export { detectSpotifyIntent } from './intents/detectSpotifyIntent';
export { 
  detectFolderIntent,
  generateAskFolderNameResponse,
  generateFolderCreatedResponse,
  type FolderIntentResult
} from './intents/detectFolderIntent';
export { 
  detectCertificateIntent, 
  generateCertificateInfoResponse,
  generateShowCertificateResponse,
  generateCertificateNotFoundResponse,
  type CertificateIntentResult 
} from './intents/detectCertificateIntent';
export { 
  getAllCertificates, 
  getCertificatesByCategory, 
  findCertificate, 
  formatCertificateList,
  type Certificate 
} from './context/certificatesData';
export { checkForAbuse } from './intents/checkForAbuse';
export { callGroqAPI } from './callGroqAPI';
export { getColorVariants } from './UI/colorUtils';
export { renderMessageWithLinks } from './UI/renderMessageWithLinks';
export { ANKIT_CONTEXT } from './context/ankitContext';

// UI Components
export { ChatHeader } from './UI/ChatHeader';
export { QuickQuestions } from './UI/QuickQuestions';
export { ChatMessage } from './UI/ChatMessage';
export { TypingIndicator } from './UI/TypingIndicator';
export { ChatInput } from './UI/ChatInput';
export { VoiceMicButton } from './UI/VoiceMicButton';
export { LiveTranscription } from './voice_agent/LiveTranscription';

// Voice Hooks
export { useSpeechRecognition } from './voice_agent/useSpeechRecognition';
export { useSpeechSynthesisV2AI } from './voice_agent/useSpeechSynthesisAi';
