import { findCertificate, formatCertificateList, Certificate } from '../context/certificatesData';

/**
 * Result of certificate intent detection
 */
export interface CertificateIntentResult {
  hasIntent: boolean;
  action: 'list' | 'show' | 'info' | null;
  certificate: Certificate | null;
  query: string;
}

/**
 * Detects if the user's message indicates an intent related to certificates
 * Uses Groq AI API to determine the action and which certificate is being referenced
 * 
 * @param text - The user's message to analyze
 * @param apiKey - The Groq API key for authentication
 * @param conversationContext - Optional previous messages for context
 * @returns Promise<CertificateIntentResult> - Intent details including action and certificate
 */
export async function detectCertificateIntent(
  text: string, 
  apiKey: string,
  conversationContext?: string
): Promise<CertificateIntentResult> {
  //console.log('🔍 Checking Certificate intent for:', text);
  
  try {
    const contextPrompt = conversationContext 
      ? `\n\nRecent conversation context:\n${conversationContext}\n\nUse this context to understand which certificate they're referring to if they say "the certificate" or "it".`
      : '';
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `You are an intent detection system for certificate-related queries. Analyze the user's message and determine:

1. If they want to LIST all certificates (show all certificates)
2. If they want to SHOW/OPEN a specific certificate (view/display/open the PDF file)
3. If they want INFO about a certificate (details like date, description, when it was won - WITHOUT opening it)

IMPORTANT DISTINCTIONS:
- SHOW: User wants to VIEW/OPEN/DISPLAY the actual PDF certificate file
  Keywords: "show", "open", "display", "view", "see the certificate"
- INFO: User wants TEXT INFORMATION about when/what/why certificate was received
  Keywords: "when", "what", "tell me about", "details", "describe", "info"

Available certificates:
- Academic: Adobe, Meta Hacker Cup, SIH (Smart India Hackathon), Hackaway, Ideathon, NSTSE, Sankalp
- Extracurricular: Badminton State, Badminton District U-16, Badminton District U-13, Craft Competition, Painting

Examples:
- "show me all certificates" → LIST|none
- "list all my certificates" → LIST|none
- "show me hackaway certificate" → SHOW|hackaway
- "show hackaway certificate" → SHOW|hackaway
- "show the certificate" → SHOW|certificate (will be inferred from context)
- "show me the certificate" → SHOW|certificate
- "show it" → SHOW|certificate
- "open my adobe certificate" → SHOW|adobe
- "display badminton state certificate" → SHOW|badminton state
- "let me see the hackaway certificate" → SHOW|hackaway
- "what is hackaway certificate" → INFO|hackaway
- "when did you win hackaway?" → INFO|hackaway
- "tell me about meta hacker cup" → INFO|meta hacker cup
- "what is SIH certificate?" → INFO|sih
- "details of painting certificate" → INFO|painting
- "hackaway certificate information" → INFO|hackaway

Respond in this EXACT format:
- For listing all: "LIST|none"
- For showing specific: "SHOW|<certificate_name>"
- For info/details: "INFO|<certificate_name>"
- If not certificate-related: "NONE|none"

Use lowercase for certificate names. Extract the certificate name from the query.${contextPrompt}`
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.1,
        max_tokens: 50
      })
    });

    if (!response.ok) {
      console.error('❌ Groq API error:', response.status, response.statusText);
      return { hasIntent: false, action: null, certificate: null, query: text };
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content?.trim().toUpperCase();
    
    console.log('🤖 Certificate intent detection result:', result);
    
    if (!result || result.startsWith('NONE')) {
      return { hasIntent: false, action: null, certificate: null, query: text };
    }

    // Parse the result
    const [action, certificateName] = result.split('|').map(s => s.trim());
    
    let certificate: Certificate | null = null;
    if (certificateName && certificateName !== 'NONE') {
      certificate = findCertificate(certificateName);
      
      // If not found by name, try to extract from original query
      if (!certificate) {
        certificate = findCertificate(text);
      }
    }
    
    if (action === 'LIST') {
      return { 
        hasIntent: true, 
        action: 'list', 
        certificate: null, 
        query: text 
      };
    } else if (action === 'SHOW') {
      return { 
        hasIntent: true, 
        action: 'show', 
        certificate, 
        query: text 
      };
    } else if (action === 'INFO') {
      return { 
        hasIntent: true, 
        action: 'info', 
        certificate, 
        query: text 
      };
    }
    
    return { hasIntent: false, action: null, certificate: null, query: text };
    
  } catch (error) {
    console.error('❌ Error detecting Certificate intent:', error);
    return { hasIntent: false, action: null, certificate: null, query: text };
  }
}

/**
 * Generate response text for certificate info request
 */
export function generateCertificateInfoResponse(certificate: Certificate): string {
  return `📜 **${certificate.displayName}**

📅 **Date:** ${certificate.date}
📂 **Category:** ${certificate.category === 'academic' ? '🎓 Academic' : '🏆 Extracurricular'}
📝 **Description:** ${certificate.description}

Would you like me to open and show this certificate? Just ask me to "show ${certificate.displayName}" or "open ${certificate.name} certificate"!`;
}

/**
 * Generate response text for showing a certificate
 */
export function generateShowCertificateResponse(certificate: Certificate): string {
  return `Sure! I've opened the **${certificate.displayName}** for you! 📜✨

You can view it below. Click the ❌ button to close it when you're done.`;
}

/**
 * Generate response when certificate is not found
 */
export function generateCertificateNotFoundResponse(query: string): string {
  return `I couldn't find a certificate matching "${query}". 😕

Here's a list of all my certificates:\n\n${formatCertificateList()}`;
}
