# Obsidian AI Hub Plugin

**Obsidian AI Hub** is a plugin for [Obsidian](https://obsidian.md) that integrates AI services like Google AI Studio, allowing you to generate content directly within your notes.

## Features

- **Generate AI Content**: Select text in your note and generate AI-powered content to replace or expand it.
- **Ribbon Button for Quick Access**: Use the ribbon button to quickly generate content with AI.
- **Modular Integration**: Designed to be modular, so you can integrate with other AI APIs like ChatGPT, Claude, or Llama in the future. **To be implemented.**
- **Customizable Settings**: Configure your API key and select the AI model in the plugin settings.

## Installation

### Manual Installation

1. **Download the Plugin**

   - Clone or download the `obsidian-ai-hub` repository to your local machine.

2. **Build the Plugin**

   - Ensure you have Node.js v18+ installed.
   - Open a terminal in the plugin directory.
   - Install dependencies:

     ```bash
     npm install
     ```

   - Build the plugin:

     ```bash
     npm run build
     ```

3. **Install the Plugin in Obsidian**

   - Copy the entire `obsidian-ai-hub` folder into your Obsidian vault's `.obsidian/plugins/` directory.
   - Restart Obsidian or reload plugins.
   - Go to **Settings** > **Community Plugins** and enable **Obsidian AI Hub**.

## Configuration

### Set Your API Key

- Navigate to **Settings** > **AI Hub**.
- Enter your Google AI Studio API key.
- Choose your desired AI model (e.g., `gemini-1.5-flash`).

## Usage

1. **Generate AI Content**

   - Open a markdown note.
   - Select the text you want to use as a prompt.
   - Click the **"Generate Content with AI"** ribbon icon on the left sidebar.
     - Alternatively, open the command palette (`Ctrl+P` or `Cmd+P`) and run **"Generate Content with AI"**.

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

- Plan to integrate with ChatGPT, Claude, Llama, and other AI services.
- Options for inserting content without replacing text, custom templates, and more.

## Contributing

- Contributions are welcome! Please feel free to submit issues and pull requests.

## License

[MIT License](LICENSE)
