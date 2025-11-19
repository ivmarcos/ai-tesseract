import { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import ProgressIndicator from './components/ProgressIndicator';
import TextComparison from './components/TextComparison';
import { extractTextFromImage } from './services/ocr';
import { enhanceTextWithAI } from './services/ai';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [ocrText, setOcrText] = useState('');
  const [enhancedText, setEnhancedText] = useState('');
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [confidence, setConfidence] = useState(null);
  const [error, setError] = useState(null);

  const handleImageUpload = async (file) => {
    setImage(URL.createObjectURL(file));
    setProcessing(true);
    setError(null);
    setOcrText('');
    setEnhancedText('');
    setProgress(0);

    try {
      // Step 1: Extract text with OCR
      setProgress(10);
      const { text, confidence: conf } = await extractTextFromImage(file, (p) => {
        setProgress(10 + (p * 0.4)); // 10% to 50%
      });

      setOcrText(text);
      setConfidence(conf);
      setProgress(50);

      if (!text.trim()) {
        setError('No text detected in the image. Try a clearer image.');
        setProcessing(false);
        return;
      }

      // Step 2: Enhance with AI (if confidence is reasonable)
      if (conf > 30) {
        setProgress(60);
        const enhanced = await enhanceTextWithAI(text);
        setEnhancedText(enhanced);
        setProgress(100);
      } else {
        setError('OCR confidence too low. The recognized text may be inaccurate.');
      }
    } catch (err) {
      console.error('Processing failed:', err);
      setError(err.message || 'Failed to process image');
    } finally {
      setProcessing(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setOcrText('');
    setEnhancedText('');
    setProcessing(false);
    setProgress(0);
    setConfidence(null);
    setError(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>OCR + AI Text Extractor</h1>
        <p>Upload an image with text, and we'll extract and enhance it using AI</p>
      </header>

      <main className="app-main">
        <ImageUploader
          onUpload={handleImageUpload}
          disabled={processing}
          currentImage={image}
          onReset={handleReset}
        />

        {processing && <ProgressIndicator progress={progress} />}

        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        {ocrText && (
          <TextComparison
            original={ocrText}
            enhanced={enhancedText}
            confidence={confidence}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>
          Powered by <strong>Tesseract.js</strong> (OCR) and <strong>Groq Llama</strong> (Enhancement)
        </p>
      </footer>
    </div>
  );
}

export default App;
