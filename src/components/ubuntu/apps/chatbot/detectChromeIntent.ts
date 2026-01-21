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
            content: `You are an intent detection system. Your job is to determine if the user wants to open Chrome browser or browse the web.

Analyze the user's message in ANY language (English, Hindi, Hinglish, or mixed) and determine if they are expressing intent to:
- Open Chrome
- Open the browser
- Browse the web
- Search something online
- Visit a website
- Use the internet
- Open Google Chrome

Examples of Chrome/browser intent:
- "open chrome"
- "chrome khol do" (open chrome in Hindi)
- "browser open karo"
- "let me browse"
- "can you open the browser"
- "I want to search something"
- "open google chrome"
- "chrome me search karna hai"
- "take me to browser"
- "show me chrome"
- "internet pe dekhna hai"
- "web browser chahiye"

Respond with ONLY "YES" if they want to open Chrome/browser, or "NO" if they don't.`
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
