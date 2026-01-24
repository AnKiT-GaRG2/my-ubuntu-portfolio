/**
 * Detects if the user's message indicates an intent to open VS Code
 * Uses Groq AI API for intent detection in multiple languages (English, Hindi, Hinglish)
 * 
 * @param text - The user's message to analyze
 * @param apiKey - The Groq API key for authentication
 * @returns Promise<boolean> - true if VS Code intent is detected, false otherwise
 */
export async function detectVSCodeIntent(text: string, apiKey: string): Promise<boolean> {
  //console.log('🔍 Checking VS Code intent for:', text);
  
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
            content: `You are an intent detection system. Your job is to determine if the user wants to open VS Code application.

IMPORTANT: Only respond YES if the user EXPLICITLY wants to:
- Open VS Code/Visual Studio Code application
- Use the code editor window
- Access the IDE interface

DO NOT respond YES if the user is:
- Just mentioning VS Code, coding, or development in conversation
- Asking about coding skills, experience, or projects
- Asking which IDE/editor you use
- Asking about programming languages or frameworks
- Using "code" in other contexts (like "what's the code for this")
- Asking to see code examples (use chat, not IDE)

Examples that should be YES:
- "open vs code"
- "vs code khol do"
- "visual studio code chahiye"
- "can you open the code editor"
- "I want to use vs code"
- "open vscode"
- "take me to vs code"
- "show me vscode"
- "IDE open karo"

Examples that should be NO:
- "which IDE do you use"
- "tell me about your coding skills"
- "what languages do you code in"
- "show me some code"
- "are you good at coding"
- "do you know VS Code"
- "coding experience kya hai"
- "what's your favorite editor"

Respond with ONLY "YES" if they want to open VS Code, or "NO" if they don't.`
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

   // //console.log('🤖 VS Code intent detection result:', result);

    return result === 'YES';
  } catch (error) {
    //console.error('❌ Error detecting VS Code intent:', error);
    return false;
  }
}
