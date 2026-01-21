/**
 * Detects if the user's message indicates an intent to give/add/submit a review or feedback
 * Uses Groq AI API for intent detection in multiple languages (English, Hindi, Hinglish)
 * 
 * @param text - The user's message to analyze
 * @param apiKey - The Groq API key for authentication
 * @returns Promise<boolean> - true if review intent is detected, false otherwise
 */
export async function detectReviewIntent(text: string, apiKey: string): Promise<boolean> {
  console.log('🔍 Checking review intent for:', text);
  
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
            content: `You are an intent detection system. Your job is to determine if the user wants to give/add/submit a review or feedback.

Analyze the user's message in ANY language (English, Hindi, Hinglish, or mixed) and determine if they are expressing intent to:
- Give a review
- Add a review
- Write a review
- Submit feedback
- Provide testimonial
- Share their experience
- Rate the portfolio/work

Examples of review intent:
- "I want to give a review"
- "add krde bhai" (add it brother)
- "review dena chahta hoon" (want to give review)
- "let me write a review"
- "can I add feedback"
- "apni website par review add karna hai"
- "mujhe review dena hai"
- "can i add the review here?"
- "My name is ankit i am a developer 4 star and he is good"

Respond with ONLY "YES" if they want to give a review, or "NO" if they don't.`
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.3,
        max_tokens: 10
      })
    });

    console.log('📡 Review intent API response status:', response.status, response.ok);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Review intent API error:', response.status, errorData);
      return false; // If API fails, don't trigger review
    }

    const data = await response.json();
    console.log('🤖 Groq response for intent detection:', data);
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('❌ Invalid response structure from Groq API:', data);
      return false;
    }
    
    const result = data.choices[0].message.content.trim().toUpperCase();
    console.log('📊 Review intent result:', result, '→', result === 'YES');
    return result === 'YES';
  } catch (error) {
    console.error('❌ Error detecting review intent:', error);
    return false; // If error, don't trigger review
  }
}
