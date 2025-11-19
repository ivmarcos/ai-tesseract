import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  console.warn('OpenAI API key not configured. GPT enhancement will be disabled.');
}

const openai = apiKey ? new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
}) : null;

/**
 * Enhance OCR-extracted text using GPT
 * Fixes errors, improves formatting, corrects typos
 * @param {string} rawText - The raw text from OCR
 * @returns {Promise<string>} Enhanced text
 */
export async function enhanceTextWithGPT(rawText) {
  if (!openai) {
    throw new Error('OpenAI API key not configured. Please set VITE_OPENAI_API_KEY in .env file.');
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
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
          role: "user",
          content: `Clean up this OCR-extracted text:\n\n${rawText}`
        }
      ],
      temperature: 0.3,
      max_tokens: 2000
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error('GPT enhancement failed:', error);

    if (error.code === 'insufficient_quota') {
      throw new Error('OpenAI API quota exceeded. Please check your account.');
    }

    throw new Error('Failed to enhance text with GPT');
  }
}
