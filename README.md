# AI integration Hub Plugin

**AI integration Hub** is a plugin for [Obsidian](https://obsidian.md) that integrates AI services like Google Gemini, allowing you to generate AI content directly within your notes.

## Features

- **Generate AI Content**: Select text in your note and generate AI-powered content to replace or expand it.
- **Ribbon Button for Quick Access**: Use the ribbon button to quickly generate content with AI.
- **Customizable Settings**: Configure your API key and select the AI model in the plugin settings.

## Installation

1. Go to Obsidian Settings.
2. Click on `Community plugins`.
3. Click on `Browse`.
4. Search "ai hub" and select `AI integration Hub`.

## Configuration

### Set Your API Key

- Navigate to **Settings** > **AI Hub**.
- Enter your Google AI Studio API key.
- Choose your desired AI model (e.g., `gemini-1.5-flash`).

## Usage

1. **Generate AI Content**

   - Open a markdown note.
   - Select the text you want to use as a prompt.
     - Click the **"Generate content"** ribbon icon on the left sidebar.
     - Alternatively, open the command palette (`Ctrl+P` or `Cmd+P`) and run **"Generate content"**.

2. **View the Result**

   - The selected text will be sent to the AI service.
   - The AI-generated content will replace the selected text in your note.

## Development

### Prerequisites

- Node.js v18+ installed on your machine.

### Setup

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Build the Plugin**

   - For a one-time build:

     ```bash
     npm run build
     ```

   - For development with watch mode:

     ```bash
     npm run watch
     ```

## Future Enhancements

- Plan to integrate with OpenRouter, and other AI services.
- Options for inserting content without replacing text.
- Custom prompt templates, and more.

## Contributing

- Contributions are welcome! Please feel free to submit issues and pull requests.

## License

[MIT License](LICENSE)
