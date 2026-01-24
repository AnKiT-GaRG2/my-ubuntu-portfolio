/**
 * Detects if the user's message indicates an intent to power off/shutdown the system
 * Uses Groq AI API for intent detection in multiple languages (English, Hindi, Hinglish)
 * 
 * @param text - The user's message to analyze
 * @param apiKey - The Groq API key for authentication
 * @returns Promise<boolean> - true if power off intent is detected, false otherwise
 */
export async function detectPowerOffIntent(text: string, apiKey: string): Promise<boolean> {
  //console.log('🔍 Checking Power Off intent for:', text);
  
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
            content: `You are an intent detection system. Your job is to determine if the user wants to power off, shutdown, or logout from the system.

Analyze the user's message in ANY language (English, Hindi, Hinglish, or mixed) and determine if they are expressing intent to:
- Power off the system
- Shutdown the computer
- Turn off the system
- Logout
- Exit the system
- Close/end the session

Examples of POWER OFF intent (YES):
- "power off"
- "shutdown"
- "turn off"
- "shut down"
- "logout"
- "log out"
- "power off karo"
- "shutdown kardo"
- "band karo system"
- "power off chahiye"
- "logout ho jao"
- "system off karo"
- "turn off the system"
- "I want to power off"
- "please shutdown"
- "can you power off"


Examples of NON-POWER OFF (NO):
- "what is power"
- "tell me about shutdown"
- "how to power off"
- "power settings"
- "power management"
- "shutdown command kya hai"
- "how does logout work"
- "band kar do"
- "off karo"
Respond with ONLY "YES" if they want to POWER OFF/SHUTDOWN/LOGOUT, or "NO" otherwise.`
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
    
    console.log('🤖 Power Off intent detection result:', result);
    
    return result === 'YES';
  } catch (error) {
    console.error('❌ Error detecting Power Off intent:', error);
    return false;
  }
}