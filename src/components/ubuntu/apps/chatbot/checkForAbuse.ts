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
            content: `You are a content moderation system. Analyze the given text for abusive, offensive, or inappropriate language in ANY language (including English, Hindi, and Hinglish). 
            
Consider the following as abusive:
- Profanity, curse words, or vulgar language
- Personal attacks, insults, or degrading comments
- Hate speech or discriminatory language
- Sexually explicit or inappropriate content
- Threats or violent language
- Hindi/Hinglish abusive words like: गाली, बकवास, मूर्ख, बेवकूफ, चूतिया, भोसड़ी, लंड, मादरचोद, etc.

Respond with ONLY "YES" if the text contains abuse, or "NO" if it's clean. No explanations.`
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
