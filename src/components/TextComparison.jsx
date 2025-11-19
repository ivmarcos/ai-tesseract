import { useState } from 'react';
import './TextComparison.css';

function TextComparison({ original, enhanced, confidence }) {
  const [copiedOriginal, setCopiedOriginal] = useState(false);
  const [copiedEnhanced, setCopiedEnhanced] = useState(false);

  const copyToClipboard = async (text, setFlag) => {
    try {
      await navigator.clipboard.writeText(text);
      setFlag(true);
      setTimeout(() => setFlag(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="text-comparison">
      <div className="confidence-badge">
        <span className={`badge ${confidence > 80 ? 'high' : confidence > 50 ? 'medium' : 'low'}`}>
          OCR Confidence: {confidence}%
        </span>
      </div>

      <div className="comparison-grid">
        <div className="text-panel">
          <div className="panel-header">
            <h3>Raw OCR Output</h3>
            <button
              className="copy-button"
              onClick={() => copyToClipboard(original, setCopiedOriginal)}
            >
              {copiedOriginal ? '✓ Copied!' : '📋 Copy'}
            </button>
          </div>
          <div className="text-content">
            <pre>{original}</pre>
          </div>
        </div>

        {enhanced && (
          <div className="text-panel enhanced">
            <div className="panel-header">
              <h3>AI-Enhanced 🚀</h3>
              <button
                className="copy-button"
                onClick={() => copyToClipboard(enhanced, setCopiedEnhanced)}
              >
                {copiedEnhanced ? '✓ Copied!' : '📋 Copy'}
              </button>
            </div>
            <div className="text-content">
              <pre>{enhanced}</pre>
            </div>
          </div>
        )}
      </div>

      {!enhanced && confidence < 50 && (
        <div className="enhancement-note">
          <p>⚠️ OCR confidence is low. AI enhancement may not be reliable.</p>
        </div>
      )}
    </div>
  );
}

export default TextComparison;
