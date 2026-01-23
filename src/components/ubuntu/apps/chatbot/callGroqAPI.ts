/**
 * Groq API integration for ChatBot conversations
 */

import { ANKIT_CONTEXT } from './context/ankitContext.ts';

interface Message {
  role: string;
  content: string;
}

/**
 * Calls Groq API with conversation history and returns AI response
 * 
 * @param conversationHistory - Array of previous messages
 * @param apiKey - The Groq API key for authentication
 * @returns Promise<string> - AI generated response
 */
export async function callGroqAPI(
  conversationHistory: Array<Message>,
  apiKey: string
): Promise<string> {
  try {
    const groqMessages = [
      {
        role: 'system',
        content: ANKIT_CONTEXT
      },
      ...conversationHistory.map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      }))
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: groqMessages,
        temperature: 0.8,
        max_tokens: 300,
        top_p: 0.9,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Groq API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Groq API Error:', error);
    throw error;
  }
}
