import { useRef } from 'react';
import './ImageUploader.css';

function ImageUploader({ onUpload, disabled, currentImage, onReset }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onUpload(file);
    } else {
      alert('Please select a valid image file');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (disabled) return;

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="image-uploader">
      {currentImage ? (
        <div className="uploaded-image">
          <img src={currentImage} alt="Uploaded" />
          <button onClick={onReset} className="reset-button">
            Upload New Image
          </button>
        </div>
      ) : (
        <div
          className={`upload-zone ${disabled ? 'disabled' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => !disabled && fileInputRef.current?.click()}
        >
          <div className="upload-icon">📷</div>
          <p>Drag & drop an image or click to browse</p>
          <span className="upload-hint">Supports JPG, PNG, WebP</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={disabled}
            style={{ display: 'none' }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
