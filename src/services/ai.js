// NOTE: For production, move this API call to a backend endpoint
// to keep your API key secure. Never expose API keys in client-side code.
const apiKey = import.meta.env.VITE_GROQ_API_KEY;

if (!apiKey) {
  console.warn('Groq API key not configured. AI enhancement will be disabled.');
}

/**
 * Enhance OCR-extracted text using Groq's free LLM API
 * Fixes errors, improves formatting, corrects typos
 * @param {string} rawText - The raw text from OCR
 * @returns {Promise<string>} Enhanced text
 */
export async function enhanceTextWithAI(rawText) {
  if (!apiKey) {
    throw new Error('Groq API key not configured. Please set VITE_GROQ_API_KEY in .env file.');
  }

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
            content: `You are a text correction assistant specializing in fixing OCR errors.

Your task:
1. Fix obvious OCR mistakes (e.g., "l" vs "1", "O" vs "0", garbled characters)
2. Correct spacing and formatting issues
3. Fix punctuation and capitalization
4. Preserve the original meaning and structure
5. DO NOT add commentary or explanations
6. Return ONLY the corrected text

If the text appears to be a specific format (code, table, list), preserve that structure.`
          },
          {
            role: 'user',
            content: `Clean up this OCR-extracted text:\n\n${rawText}`
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to enhance text');
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('AI enhancement failed:', error);
    throw new Error('Failed to enhance text with AI: ' + error.message);
  }
}
