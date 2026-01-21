/**
 * Detects if the user's message indicates an intent to open Terminal
 * Uses Groq AI API for intent detection in multiple languages (English, Hindi, Hinglish)
 * 
 * @param text - The user's message to analyze
 * @param apiKey - The Groq API key for authentication
 * @returns Promise<boolean> - true if Terminal intent is detected, false otherwise
 */
export async function detectTerminalIntent(text: string, apiKey: string): Promise<boolean> {
  console.log('🔍 Checking Terminal intent for:', text);
  
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
            content: `You are an intent detection system. Your job is to determine if the user wants to open Terminal or command line.

Analyze the user's message in ANY language (English, Hindi, Hinglish, or mixed) and determine if they are expressing intent to:
- Open Terminal
- Open command line
- Open command prompt
- Access the terminal
- Use the shell
- Run commands
- Access CLI
- Open bash/zsh

Examples of Terminal intent:
- "open terminal"
- "terminal khol do" (open terminal in Hindi)
- "command line chahiye"
- "let me use terminal"
- "can you open the terminal"
- "I want to run commands"
- "open command prompt"
- "terminal me kuch karna hai"
- "take me to terminal"
- "show me terminal"
- "CLI open karo"
- "bash terminal chahiye"
- "terminal access chahiye"
- "command line open kar"

Respond with ONLY "YES" if they want to open Terminal, or "NO" if they don't.`
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
    
    console.log('🤖 Terminal intent detection result:', result);
    
    return result === 'YES';
  } catch (error) {
    console.error('❌ Error detecting Terminal intent:', error);
    return false;
  }
}
