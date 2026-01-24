/**
 * Detects if the user's message indicates an intent to change appearance/UI settings
 * Uses Groq AI API for intent detection in multiple languages (English, Hindi, Hinglish)
 * 
 * @param text - The user's message to analyze
 * @param apiKey - The Groq API key for authentication
 * @returns Promise<boolean> - true if appearance change intent is detected, false otherwise
 */
export async function detectAppearanceIntent(text: string, apiKey: string): Promise<boolean> {
  //console.log('🔍 Checking Appearance intent for:', text);
  
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
            content: `You are an intent detection system. Your job is to determine if the user wants to change the appearance/UI settings of the application.

IMPORTANT DISTINCTION:
- "change appearance" = YES (user wants to modify settings)
- "how does the UI look" = NO (user is asking about/discussing the UI)
- "what do you think of the UI" = NO (user is asking for opinion)
- "how was the UI built" = NO (user is asking about development)
- "I want to change the UI" = YES (user wants to modify settings)

Analyze the user's message in ANY language (English, Hindi, Hinglish, or mixed) and determine if they are expressing intent to:
- Change appearance settings
- Modify UI theme/colors
- Change accent color
- Adjust UI settings
- Customize the look and feel
- Change color scheme
- Update theme settings

Examples of APPEARANCE CHANGE intent (YES):
- "change appearance"
- "change UI"
- "appearance settings"
- "I want to change the theme"
- "modify the appearance"
- "change color scheme"
- "change accent color"
- "appearance badlo"
- "UI change karna hai"
- "theme change karo"
- "color scheme change chahiye"
- "appearance settings kholo"
- "mujhe UI customize karna hai"
- "customize appearance"
- "change the look"

Examples of UI DISCUSSION (NO - just talking):
- "how does the UI look"
- "what do you think about the UI"
- "how was the UI built"
- "your UI is nice"
- "tell me about the UI"
- "UI kaisa hai"
- "UI kaise banaya"
- "what's your opinion on the UI"
- "how did you design the UI"
- "is the UI good"

Respond with ONLY "YES" if they want to CHANGE/MODIFY appearance settings, or "NO" if they are just discussing/asking about the UI.`
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
    
    //console.log('🤖 Appearance intent detection result:', result);
    
    return result === 'YES';
  } catch (error) {
   // console.error('❌ Error detecting Appearance intent:', error);
    return false;
  }
}