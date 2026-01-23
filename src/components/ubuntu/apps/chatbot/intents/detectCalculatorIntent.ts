/**
 * Detects if the user's message indicates an intent to open Calculator
 * Uses Groq AI API for intent detection in multiple languages (English, Hindi, Hinglish)
 * 
 * @param text - The user's message to analyze
 * @param apiKey - The Groq API key for authentication
 * @returns Promise<boolean> - true if Calculator intent is detected, false otherwise
 */
export async function detectCalculatorIntent(text: string, apiKey: string): Promise<boolean> {
  //console.log('🔍 Checking Calculator intent for:', text);
  
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
            content: `You are an intent detection system. Your job is to determine if the user wants to open Calculator app or do calculations.

Analyze the user's message in ANY language (English, Hindi, Hinglish, or mixed) and determine if they are expressing intent to:
- Open Calculator
- Do calculations
- Perform math operations
- Use the calculator app
- Calculate something
- Do some math

Examples of Calculator intent:
- "open calculator"
- "calculator khol do" (open calculator in Hindi)
- "calculator chahiye"
- "let me do some calculations"
- "can you open the calculator"
- "I want to calculate"
- "need to do math"
- "calculator open karo"
- "mujhe calculation karni hai"
- "show me calculator"
- "calculator app chahiye"
- "math karna hai"
- "calculator se kuch karna hai"

Respond with ONLY "YES" if they want to open Calculator, or "NO" if they don't.`
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
    
    console.log('🤖 Calculator intent detection result:', result);
    
    return result === 'YES';
  } catch (error) {
    console.error('❌ Error detecting Calculator intent:', error);
    return false;
  }
}
