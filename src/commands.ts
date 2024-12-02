import { Editor, MarkdownFileInfo, MarkdownView, Notice } from "obsidian";
import AIHubPlugin from "./main";

export function registerCommands(plugin: AIHubPlugin) {
	plugin.addCommand({
		id: "generate-content",
		name: "Generate Content with AI",
		editorCallback: async (
			editor: Editor,
			ctx: MarkdownView | MarkdownFileInfo
		) => {
			const selectedText = editor.getSelection();

			if (!selectedText) {
				new Notice("Please select text to use as a prompt.");
				return;
			}

			try {
				const response = await plugin.aiManager.generateContent(
					selectedText
				);
				editor.replaceSelection(response);
			} catch (error) {
				console.error("Error executing AI command:", error);
				// Error is already handled in the API layer, so no additional action is required here
			}
		},
	});
}
