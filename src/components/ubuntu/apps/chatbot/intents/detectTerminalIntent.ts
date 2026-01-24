/**
 * Detects if the user's message indicates an intent to open Terminal
 * Uses Groq AI API for intent detection in multiple languages (English, Hindi, Hinglish)
 * 
 * @param text - The user's message to analyze
 * @param apiKey - The Groq API key for authentication
 * @returns Promise<boolean> - true if Terminal intent is detected, false otherwise
 */
export async function detectTerminalIntent(text: string, apiKey: string): Promise<boolean> {
  //console.log('🔍 Checking Terminal intent for:', text);
  
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
            content: `You are an intent detection system. Your job is to determine if the user wants to open Terminal application.

IMPORTANT: Only respond YES if the user EXPLICITLY wants to:
- Open Terminal/command line application
- Access the terminal window
- Use the shell/CLI interface
- Run terminal commands

DO NOT respond YES if the user is:
- Just mentioning terminal, commands, or CLI in conversation
- Asking about terminal skills or experience
- Asking what commands you know
- Using "command" in other contexts (like "command me to do something")
- Asking about coding or development in general

Examples that should be YES:
- "open terminal"
- "terminal khol do"
- "command line chahiye"
- "can you open the terminal"
- "I want to use terminal"
- "open command prompt"
- "take me to terminal"
- "show me terminal"
- "terminal access chahiye"

Examples that should be NO:
- "do you know terminal commands"
- "tell me about your CLI skills"
- "what commands can you run"
- "are you good with terminal"
- "command me to do something"
- "terminal experience kya hai"
- "which shell do you prefer"

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
    
   // console.log('🤖 Terminal intent detection result:', result);
    
    return result === 'YES';
  } catch (error) {
    //console.error('❌ Error detecting Terminal intent:', error);
    return false;
  }
}
