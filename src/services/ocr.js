import { createWorker } from 'tesseract.js';

let cachedWorker = null;

/**
 * Get or create a Tesseract OCR worker
 * Caches the worker to avoid repeated initialization
 */
async function getOCRWorker(onProgress) {
  if (!cachedWorker) {
    cachedWorker = await createWorker('eng', 1, {
      logger: (m) => {
        if (m.status === 'recognizing text' && onProgress) {
          onProgress(m.progress);
        }
      }
    });
  }
  return cachedWorker;
}

/**
 * Extract text from an image file using Tesseract.js
 * @param {File} imageFile - The image file to process
 * @param {Function} onProgress - Progress callback (0-1)
 * @returns {Promise<{text: string, confidence: number}>}
 */
export async function extractTextFromImage(imageFile, onProgress) {
  const worker = await getOCRWorker(onProgress);

  try {
    const { data: { text, confidence } } = await worker.recognize(imageFile);

    console.log(`OCR completed with ${Math.round(confidence)}% confidence`);

    return {
      text: text.trim(),
      confidence: Math.round(confidence)
    };
  } catch (error) {
    console.error('OCR extraction failed:', error);
    throw new Error('Failed to extract text from image');
  }
}

/**
 * Clean up the OCR worker
 * Call this when the app is unmounting
 */
export async function cleanupOCRWorker() {
  if (cachedWorker) {
    await cachedWorker.terminate();
    cachedWorker = null;
  }
}
