// src/commands.ts
import { Editor, Notice } from "obsidian";
import AIHubPlugin from "./main";

export function registerCommands(plugin: AIHubPlugin) {
	plugin.addCommand({
		id: "generate-content",
		name: "Generate content",
		editorCheckCallback: (checking: boolean, editor: Editor) => {
			if (checking) {
				return !!editor.getSelection();
			}

			const selectedText = editor.getSelection();

			(async () => {
				// Check for API key when the user tries to generate content
				if (!plugin.settings.apiKey) {
					new Notice(
						"Please set your API key in the AI Hub settings."
					);
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
			})();
		},
	});
}
