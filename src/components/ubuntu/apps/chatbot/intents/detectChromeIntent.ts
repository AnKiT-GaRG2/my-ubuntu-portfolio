/**
 * Detects if the user's message indicates an intent to open Chrome browser
 * Uses Groq AI API for intent detection in multiple languages (English, Hindi, Hinglish)
 * 
 * @param text - The user's message to analyze
 * @param apiKey - The Groq API key for authentication
 * @returns Promise<boolean> - true if Chrome intent is detected, false otherwise
 */
export async function detectChromeIntent(text: string, apiKey: string): Promise<boolean> {
  console.log('🔍 Checking Chrome intent for:', text);
  
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
            content: `You are an intent detection system. Your job is to determine if the user wants to open Chrome browser.

IMPORTANT: Only respond YES if the user EXPLICITLY wants to:
- Open Chrome browser/app
- Open a web browser
- Browse/search the internet
- Visit a specific website

DO NOT respond YES if the user is:
- Just mentioning Chrome or browser in conversation
- Asking about browser features or specifications
- Asking general questions about the web
- Using words like "browse" in other contexts

Examples that should be YES:
- "open chrome"
- "chrome khol do"
- "browser open karo"
- "can you open the browser"
- "open google chrome"
- "take me to browser"
- "show me chrome"
- "internet browser chahiye"

Examples that should be NO:
- "what browser do you use"
- "tell me about chrome"
- "do you support chrome"
- "chrome is good"
- "browsing through your projects"
- "let me browse your skills"

Respond with ONLY "YES" if they want to open Chrome, or "NO" if they don't.`
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.1,
        max_tokens: 10
      })
    });

    if (!response.ok) {
      console.error('❌ Groq API error:', response.status, response.statusText);
      return false;
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content?.trim().toUpperCase();
    
    console.log('🤖 Chrome intent detection result:', result);
    
    return result === 'YES';
  } catch (error) {
    console.error('❌ Error detecting Chrome intent:', error);
    return false;
  }
}
