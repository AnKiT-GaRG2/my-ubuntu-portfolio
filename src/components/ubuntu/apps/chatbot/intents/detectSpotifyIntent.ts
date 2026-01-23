/**
 * Detects if the user's message indicates an intent to open Spotify or listen to music
 * Uses Groq AI API for intent detection in multiple languages (English, Hindi, Hinglish)
 * 
 * @param text - The user's message to analyze
 * @param apiKey - The Groq API key for authentication
 * @returns Promise<boolean> - true if Spotify/music intent is detected, false otherwise
 */
export async function detectSpotifyIntent(text: string, apiKey: string): Promise<boolean> {
  //console.log('🔍 Checking Spotify intent for:', text);
  
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
            content: `You are an intent detection system. Your job is to determine if the user wants to OPEN SPOTIFY or LISTEN TO MUSIC.

IMPORTANT: Only respond YES if the user EXPLICITLY wants to:
- Open Spotify
- Listen to music, play songs, or start music
- Use a music player

DO NOT respond YES if the user is:
- Just talking about music in general
- Mentioning Spotify in conversation
- Asking what Spotify is
- Referring to music in a non-action context

Examples that should be YES:
- "I want to listen to music"
- "open Spotify"
- "play some songs"
- "start music app"
- "can you open Spotify for me"
- "music sunna hai"
- "Spotify kholo"

Examples that should be NO:
- "do you like music"
- "what is Spotify"
- "tell me about Spotify"
- "who is the CEO of Spotify"
- "music is great"
- "I use Spotify sometimes"

Respond with ONLY "YES" if they want to OPEN SPOTIFY or LISTEN TO MUSIC, or "NO" if they don't.`
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

    console.log('📡 Spotify intent API response status:', response.status, response.ok);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Spotify intent API error:', response.status, errorData);
      return false; // If API fails, don't trigger Spotify
    }

    const data = await response.json();
    console.log('🤖 Groq response for Spotify intent detection:', data);
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('❌ Invalid response structure from Groq API:', data);
      return false;
    }
    
    const result = data.choices[0].message.content.trim().toUpperCase();
    console.log('📊 Spotify intent result:', result, '→', result === 'YES');
    return result === 'YES';
  } catch (error) {
    console.error('❌ Error detecting Spotify intent:', error);
    return false; // If error, don't trigger Spotify
  }
}
