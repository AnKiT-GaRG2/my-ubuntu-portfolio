/**
 * Result of resume intent detection
 */
export interface ResumeIntentResult {
  hasIntent: boolean;
  action: 'show' | 'info' | null;
  query: string;
}

/**
 * Detects if the user's message indicates an intent related to resume
 * Uses Groq AI API to determine if they want to SHOW the resume or just get INFO
 * 
 * @param text - The user's message to analyze
 * @param apiKey - The Groq API key for authentication
 * @returns Promise<ResumeIntentResult> - Intent details including action
 */
export async function detectResumeIntent(
  text: string, 
  apiKey: string
): Promise<ResumeIntentResult> {
  
  try {
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
            content: `You are a strict intent detection system for resume-related queries. Analyze the user's message and determine:

1. If they want to SHOW/OPEN the resume (view/display/open the PDF file)
2. If they want INFO about the resume (general questions about experience, skills, background)

IMPORTANT - BE STRICT:
- SHOW: ONLY if user explicitly wants to VIEW/OPEN/DISPLAY/SEE the actual resume file
  Keywords: "show resume", "open resume", "display resume", "view resume", "see your resume", "show me your resume", "let me see resume"
  
- INFO: If user asks about details, experience, skills, background WITHOUT explicitly asking to open/show
  Keywords: "what's in your resume", "tell me about your resume", "resume details", "your experience", "your skills"

- NONE: If not resume-related at all

Examples:
- "show me your resume" → SHOW
- "open your resume" → SHOW
- "display resume" → SHOW
- "can I see your resume?" → SHOW
- "show resume" → SHOW
- "let me see your resume" → SHOW
- "view your resume" → SHOW
- "what's in your resume?" → INFO
- "tell me about your resume" → INFO
- "what experience do you have?" → INFO
- "your skills" → INFO
- "resume details" → INFO
- "what's your background?" → INFO
- "hello" → NONE
- "open calculator" → NONE

Respond in this EXACT format:
- For showing resume: "SHOW"
- For info about resume: "INFO"
- If not resume-related: "NONE"`
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.1,
        max_tokens: 20
      })
    });

    if (!response.ok) {
      console.error('❌ Groq API error:', response.status, response.statusText);
      return { hasIntent: false, action: null, query: text };
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content?.trim().toUpperCase();
    
    console.log('🤖 Resume intent detection result:', result);
    
    if (!result || result === 'NONE') {
      return { hasIntent: false, action: null, query: text };
    }

    if (result === 'SHOW') {
      return { 
        hasIntent: true, 
        action: 'show', 
        query: text 
      };
    } else if (result === 'INFO') {
      return { 
        hasIntent: true, 
        action: 'info', 
        query: text 
      };
    }
    
    return { hasIntent: false, action: null, query: text };
    
  } catch (error) {
    console.error('❌ Error detecting Resume intent:', error);
    return { hasIntent: false, action: null, query: text };
  }
}

/**
 * Generate response text for resume info request (without opening)
 */
export function generateResumeInfoResponse(): string {
  return `📄 **My Resume**

My resume contains details about my:
• 🎓 **Education** - Academic background and qualifications
• 💼 **Experience** - Projects and work experience
• 🛠️ **Technical Skills** - Programming languages, frameworks, and tools
• 🏆 **Achievements** - Hackathons, competitions, and certifications
• 📞 **Contact Information** - How to reach me

Would you like to see the actual resume? Just ask me to **"show me your resume"** or **"open resume"**!`;
}

/**
 * Generate response text for showing resume
 */
export function generateShowResumeResponse(): string {
  return `Sure! I've opened my resume for you! 📄✨

You can view it below. Click the ❌ button to close it when you're done.`;
}