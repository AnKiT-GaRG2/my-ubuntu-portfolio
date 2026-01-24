/**
 * Detects if the user's message indicates an intent to change background/wallpaper
 * Uses Groq AI API for intent detection in multiple languages (English, Hindi, Hinglish)
 * 
 * @param text - The user's message to analyze
 * @param apiKey - The Groq API key for authentication
 * @returns Promise<boolean> - true if background change intent is detected, false otherwise
 */
export async function detectBackgroundIntent(text: string, apiKey: string): Promise<boolean> {
  //console.log('🔍 Checking Background intent for:', text);
  
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
            content: `You are an intent detection system. Your job is to determine if the user wants to change the background/wallpaper.

Analyze the user's message in ANY language (English, Hindi, Hinglish, or mixed) and determine if they are expressing intent to:
- Change background
- Change wallpaper
- Set a new background
- Modify the desktop background
- Update wallpaper
- Switch background
- Change desktop image

Examples of background change intent:
- "change background"
- "change wallpaper"
- "background change karo"
- "wallpaper badlo"
- "I want to change the background"
- "can you change my wallpaper"
- "change desktop background"
- "set new background"
- "background change chahiye"
- "wallpaper change karna hai"
- "mujhe background badalna hai"
- "desktop ki background change karo"
- "new wallpaper lagao"
- "background settings"
- "wallpaper settings kholo"

Respond with ONLY "YES" if they want to change background/wallpaper, or "NO" if they don't.`
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
    
   // console.log('🤖 Background intent detection result:', result);
    
    return result === 'YES';
  } catch (error) {
   // console.error('❌ Error detecting Background intent:', error);
    return false;
  }
}