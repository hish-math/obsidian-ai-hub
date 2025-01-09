// src/commands.ts
import { Editor, MarkdownFileInfo, MarkdownView, Notice } from "obsidian";
import AIHubPlugin from "./main";

export function registerCommands(plugin: AIHubPlugin) {
	plugin.addCommand({
		id: "generate-content",
		name: "Generate content",
		editorCallback: async (
			editor: Editor,
			ctx: MarkdownView | MarkdownFileInfo
		) => {
			const selectedText = editor.getSelection();

			if (!selectedText) {
				new Notice("Please select text to use as a prompt.");
				return;
			}

			// Check for API key when the user tries to generate content
			if (!plugin.settings.apiKey) {
				new Notice("Please set your API key in the AI Hub settings.");
				return;
			}

			try {
				// Update AI Manager in case settings have changed
				plugin.aiManager.updateConfig(
					plugin.settings.apiKey,
					plugin.settings.model
				);

				const response = await plugin.aiManager.generateContent(
					selectedText
				);
				editor.replaceSelection(response);
				new Notice("AI content generated successfully!");
			} catch (error) {
				console.error("Error executing AI command:", error);
				new Notice(
					"Failed to generate content. Check the console for details."
				);
			}
		},
	});
}
