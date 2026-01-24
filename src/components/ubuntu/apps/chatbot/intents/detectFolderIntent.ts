/**
 * Detects if the user's message indicates an intent to create a folder
 * Uses Groq AI API for intent detection in multiple languages (English, Hindi, Hinglish)
 * 
 * @param text - The user's message to analyze
 * @param apiKey - The Groq API key for authentication
 * @returns Promise<{ hasIntent: boolean; folderName: string | null }> - Intent details
 */

export interface FolderIntentResult {
  hasIntent: boolean;
  folderName: string | null;
  needsName: boolean; // true if user wants to create folder but didn't specify name
}

export async function detectFolderIntent(
  text: string,
  apiKey: string
): Promise<FolderIntentResult> {
  //console.log('🔍 Checking Folder creation intent for:', text);
  
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
            content: `You are an intent detection system for folder/directory creation requests.

IMPORTANT: Only respond with folder creation intent if the user EXPLICITLY wants to:
- Create a new folder/directory
- Make a folder with a specific name
- Use mkdir command

DO NOT respond with folder intent if the user is:
- Just mentioning folders or directories in conversation
- Asking about file management or organization
- Using "folder" in other contexts (like "show me the folder")
- Asking questions about folders
- Talking about folders without creating them

Analyze the message and determine:
1. If they want to CREATE A NEW FOLDER
2. If they specified the FOLDER NAME

Examples that should have CREATE intent:
- "create a folder" → CREATE|no_name
- "make a folder named my-project" → CREATE|my-project
- "create a new directory called test" → CREATE|test
- "folder banao demo naam se" → CREATE|demo
- "new folder test123" → CREATE|test123
- "mkdir projects" → CREATE|projects

Examples that should have NO intent:
- "what folders do you have" → NONE|none
- "show me your folders" → NONE|none
- "tell me about your file organization" → NONE|none
- "do you use folders" → NONE|none
- "folder kya hai" → NONE|none

Respond in this EXACT format:
- If they want to create folder with name: "CREATE|<folder_name>"
- If they want to create folder but no name: "CREATE|no_name"
- If not folder creation intent: "NONE|none"

Use lowercase and hyphens/underscores for folder names. Remove special characters.`
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.1,
        max_tokens: 50
      })
    });

    if (!response.ok) {
      console.error('❌ Groq API error:', response.status, response.statusText);
      return { hasIntent: false, folderName: null, needsName: false };
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content?.trim().toUpperCase();

   // console.log('🤖 Folder intent detection result:', result);

    if (!result || result.startsWith('NONE')) {
      return { hasIntent: false, folderName: null, needsName: false };
    }

    // Parse the result
    const [action, folderName] = result.split('|').map(s => s.trim());
    
    if (action === 'CREATE') {
      if (folderName === 'NO_NAME') {
        return { hasIntent: true, folderName: null, needsName: true };
      } else {
        // Clean the folder name
        const cleanName = folderName.toLowerCase()
          .replace(/[^a-z0-9-_]/g, '-') // Replace invalid chars with hyphen
          .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
          .replace(/-{2,}/g, '-'); // Replace multiple hyphens with single
        
        return { 
          hasIntent: true, 
          folderName: cleanName || null, 
          needsName: !cleanName 
        };
      }
    }
    
    return { hasIntent: false, folderName: null, needsName: false };
    
  } catch (error) {
  //  console.error('❌ Error detecting Folder intent:', error);
    return { hasIntent: false, folderName: null, needsName: false };
  }
}

/**
 * Generate response asking for folder name
 */
export function generateAskFolderNameResponse(): string {
  return `Sure! I can help you create a folder. 📁

What would you like to name the folder?

**Naming guidelines:**
- Use lowercase letters and numbers
- Use hyphens (-) or underscores (_) instead of spaces
- Keep it simple and descriptive

Examples: \`my-project\`, \`test-folder\`, \`documents_2024\``;
}

/**
 * Generate response for successful folder creation
 */
export function generateFolderCreatedResponse(folderName: string): string {
  return `✅ Perfect! I'll create a folder named **${folderName}** for you.

Opening terminal to execute: \`mkdir ${folderName}\`

You should see the new folder on your desktop! 📁✨`;
}
