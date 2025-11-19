# OCR + GPT Text Extractor

A browser-based application that extracts text from images using Tesseract.js OCR and enhances it with GPT-4.

## Features

- 📷 **Client-Side OCR** - Extract text from images entirely in the browser using Tesseract.js
- 🤖 **AI Enhancement** - Clean up OCR errors and improve formatting with GPT-4
- 🎯 **Real-time Progress** - Visual feedback during OCR and enhancement
- 📊 **Confidence Scoring** - See how confident the OCR engine is about the results
- 📋 **Easy Copy** - One-click copy of both raw and enhanced text
- 🎨 **Modern UI** - Clean, responsive interface with dark mode

## Prerequisites

- Node.js 18+ and npm
- OpenAI API key (for GPT enhancement)

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

Edit `.env` and add your OpenAI API key:
```
VITE_OPENAI_API_KEY=your-api-key-here
```

Get your API key from: https://platform.openai.com/api-keys

## Usage

Start the development server:
```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### How to Use

1. **Upload an Image** - Drag & drop or click to browse for an image containing text
2. **Wait for Processing** - The app will extract text using OCR and enhance it with GPT
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
- **OpenAI API** - GPT-4 for text enhancement
- **CSS3** - Styling with modern features

## How It Works

1. **Image Upload** - User selects an image file
2. **OCR Processing** - Tesseract.js extracts text (runs in Web Worker)
3. **Confidence Check** - If OCR confidence > 30%, proceed to enhancement
4. **GPT Enhancement** - OpenAI GPT-4 fixes errors and improves formatting
5. **Display Results** - Show both raw and enhanced text side-by-side

## Notes

- **API Key Security**: This demo uses `dangerouslyAllowBrowser: true` for the OpenAI client. In production, proxy API calls through your backend.
- **Offline OCR**: The Tesseract.js OCR works entirely offline. Only GPT enhancement requires internet.
- **Image Quality**: Better quality images produce better OCR results. Try to use clear, high-contrast images.

## License

MIT

## Article

Read the full article: *[Link to Medium article]*
