/**
 * Detects if the user's message indicates an intent to open VS Code
 * Uses Groq AI API for intent detection in multiple languages (English, Hindi, Hinglish)
 * 
 * @param text - The user's message to analyze
 * @param apiKey - The Groq API key for authentication
 * @returns Promise<boolean> - true if VS Code intent is detected, false otherwise
 */
export async function detectVSCodeIntent(text: string, apiKey: string): Promise<boolean> {
  console.log('🔍 Checking VS Code intent for:', text);
  
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
            content: `You are an intent detection system. Your job is to determine if the user wants to open VS Code (Visual Studio Code) editor.

Analyze the user's message in ANY language (English, Hindi, Hinglish, or mixed) and determine if they are expressing intent to:
- Open VS Code
- Open Visual Studio Code
- Use the code editor
- Start coding
- Access the IDE
- Open the text editor
- Use VS Code

Examples of VS Code intent:
- "open vs code"
- "vs code khol do" (open vs code in Hindi)
- "visual studio code chahiye"
- "let me code"
- "can you open the code editor"
- "I want to use vs code"
- "open vscode"
- "code editor open karo"
- "vs code me kuch karna hai"
- "show me vscode"
- "IDE chahiye"
- "coding karna hai"
- "visual studio code open kar"
- "code editor chahiye"

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
    
    console.log('🤖 VS Code intent detection result:', result);
    
    return result === 'YES';
  } catch (error) {
    console.error('❌ Error detecting VS Code intent:', error);
    return false;
  }
}
