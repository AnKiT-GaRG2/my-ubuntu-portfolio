/**
 * Checks if the user's message contains abusive, offensive, or inappropriate language
 * Uses Groq AI API for content moderation in multiple languages (English, Hindi, Hinglish)
 * 
 * @param text - The user's message to analyze
 * @param apiKey - The Groq API key for authentication
 * @returns Promise<boolean> - true if abusive content is detected, false otherwise
 */
export async function checkForAbuse(text: string, apiKey: string): Promise<boolean> {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `You are a content moderation system. Analyze text for GENUINELY abusive, offensive, or inappropriate content.

IMPORTANT: Only flag as abusive if the content contains:
- Direct personal attacks or insults targeting someone
- Hate speech or discriminatory language
- Threats or violent language directed at someone
- Sexually explicit harassment
- Severe profanity used to attack or degrade

DO NOT flag as abusive:
- Casual profanity in context (like "how the fuck did this happen" when expressing confusion)
- Mild exclamations or frustration (like "damn", "shit", "wtf")
- Technical or contextual use of words that might sound profane
- Self-directed frustration or critique
- Questions containing casual language

Examples that should be YES (abusive):
- "you are a stupid piece of shit"
- "fuck you and your family"
- "बेवकूफ है तू" (insulting someone)
- "you're an idiot"
- Direct threats or harassment

Examples that should be NO (not abusive):
- "how the fuck did this happen"
- "what the hell is going on"
- "damn that's cool"
- "this shit is not working"
- "wtf is this feature"
- "मेरा काम नहीं हो रहा" (my work isn't happening)

Respond with ONLY "YES" if genuinely abusive/attacking, or "NO" if just casual language.`
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.3,
        max_tokens: 10,
      })
    });

    if (!response.ok) {
      console.error('Abuse detection API error');
      return false; // If API fails, allow the message
    }

    const data = await response.json();
    const result = data.choices[0].message.content.trim().toUpperCase();
    return result === 'YES';
  } catch (error) {
    console.error('Error checking for abuse:', error);
    return false; // If error, allow the message
  }
}
