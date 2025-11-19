import './ProgressIndicator.css';

function ProgressIndicator({ progress }) {
  const getStatusText = () => {
    if (progress < 50) return 'Extracting text with OCR...';
    if (progress < 60) return 'OCR complete!';
    if (progress < 100) return 'Enhancing with GPT...';
    return 'Done!';
  };

  return (
    <div className="progress-indicator">
      <div className="progress-status">{getStatusText()}</div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="progress-percent">{Math.round(progress)}%</div>
    </div>
  );
}

export default ProgressIndicator;
