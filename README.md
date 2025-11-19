# OCR + AI Text Extractor

A browser-based application that extracts text from images using Tesseract.js OCR and enhances it with free AI (Groq/Llama).

## Features

- 📷 **Client-Side OCR** - Extract text from images entirely in the browser using Tesseract.js
- 🤖 **Free AI Enhancement** - Clean up OCR errors and improve formatting with Groq's free API (Llama 3.3 70B)
- 🎯 **Real-time Progress** - Visual feedback during OCR and enhancement
- 📊 **Confidence Scoring** - See how confident the OCR engine is about the results
- 📋 **Easy Copy** - One-click copy of both raw and enhanced text
- 🎨 **Modern UI** - Clean, responsive interface with dark mode
- 💰 **100% Free** - Uses Groq's free API tier (no credit card required)

## Prerequisites

- Node.js 18+ and npm
- Groq API key (free - for AI enhancement)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/building-an-ai-powered-ocr-app-with-tesseractjs.git
cd building-an-ai-powered-ocr-app-with-tesseractjs/app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Groq API key:
```
VITE_GROQ_API_KEY=your-api-key-here
```

Get your FREE API key from: https://console.groq.com/keys (no credit card required)

## Usage

Start the development server:
```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### How to Use

1. **Upload an Image** - Drag & drop or click to browse for an image containing text
2. **Wait for Processing** - The app will extract text using OCR and enhance it with Llama AI
3. **Review Results** - Compare the raw OCR output with the AI-enhanced version
4. **Copy Text** - Click the copy button to use the text

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

Preview the production build:
```bash
npm run preview
```

## Technologies

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tesseract.js** - OCR engine (WebAssembly)
- **Groq API** - Free Llama 3.3 70B for text enhancement
- **CSS3** - Styling with modern features

## How It Works

1. **Image Upload** - User selects an image file
2. **OCR Processing** - Tesseract.js extracts text (runs in Web Worker)
3. **Confidence Check** - If OCR confidence > 30%, proceed to enhancement
4. **AI Enhancement** - Groq's Llama 3.3 70B fixes errors and improves formatting
5. **Display Results** - Show both raw and enhanced text side-by-side

## Notes

- **Free API**: Groq provides free API access with generous rate limits (no credit card required)
- **Offline OCR**: The Tesseract.js OCR works entirely offline. Only AI enhancement requires internet.
- **Image Quality**: Better quality images produce better OCR results. Try to use clear, high-contrast images.
- **Fast Inference**: Groq's LPU inference is extremely fast (often faster than GPT-4)

## License

MIT

## Article

Read the full article: *[Link to Medium article]*
