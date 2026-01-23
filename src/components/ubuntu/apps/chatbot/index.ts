// Central export file for chatbot utilities
export { detectReviewIntent } from './detectReviewIntent';
export { detectChromeIntent } from './detectChromeIntent';
export { detectTerminalIntent } from './detectTerminalIntent';
export { detectCalculatorIntent } from './detectCalculatorIntent';
export { detectVSCodeIntent } from './detectVSCodeIntent';
export { detectSpotifyIntent } from './detectSpotifyIntent';
export { 
  detectFolderIntent,
  generateAskFolderNameResponse,
  generateFolderCreatedResponse,
  type FolderIntentResult
} from './detectFolderIntent';
export { 
  detectCertificateIntent, 
  generateCertificateInfoResponse,
  generateShowCertificateResponse,
  generateCertificateNotFoundResponse,
  type CertificateIntentResult 
} from './detectCertificateIntent';
export { 
  getAllCertificates, 
  getCertificatesByCategory, 
  findCertificate, 
  formatCertificateList,
  type Certificate 
} from './certificatesData';
export { checkForAbuse } from './checkForAbuse';
export { callGroqAPI } from './callGroqAPI';
export { getColorVariants } from './colorUtils';
export { renderMessageWithLinks } from './renderMessageWithLinks';
export { ANKIT_CONTEXT } from './ankitContext';

// UI Components
export { ChatHeader } from './ChatHeader';
export { QuickQuestions } from './QuickQuestions';
export { ChatMessage } from './ChatMessage';
export { TypingIndicator } from './TypingIndicator';
export { ChatInput } from './ChatInput';
export { VoiceMicButton } from './voice_agent/VoiceMicButton';
export { LiveTranscription } from './voice_agent/LiveTranscription';

// Voice Hooks
export { useSpeechRecognition } from './voice_agent/useSpeechRecognition';
export { useSpeechSynthesisV2AI } from './voice_agent/useSpeechSynthesisAi';
