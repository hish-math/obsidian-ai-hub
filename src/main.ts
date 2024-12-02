import { Plugin, setIcon, Notice, MarkdownView } from "obsidian";
import { AIHubSettings, AIHubSettingTab, DEFAULT_SETTINGS } from "./settings";
import { AIManager } from "./api";
import { registerCommands } from "./commands";

export default class AIHubPlugin extends Plugin {
	settings!: AIHubSettings;
	aiManager!: AIManager;

	async onload() {
		console.log("Loading obsidian-ai-hub plugin");

		await this.loadSettings();

		if (!this.settings.apiKey) {
			new Notice("AI Hub: Please set your API key in the settings.");
			return;
		}

		try {
			this.aiManager = new AIManager(
				this.settings.apiKey,
				this.settings.model
			);

			// Add status bar icon
			const item = this.addStatusBarItem();
			setIcon(item, "brain-circuit");

			// Register commands
			registerCommands(this);

			// Add settings tab
			this.addSettingTab(new AIHubSettingTab(this.app, this));

			// Add ribbon button
			const ribbonIconEl = this.addRibbonIcon(
				"brain-circuit",
				"Generate Content with AI",
				async () => {
					const activeLeaf =
						this.app.workspace.getActiveViewOfType(MarkdownView);
					if (!activeLeaf) {
						new Notice(
							"Please open a markdown note to use this feature."
						);
						return;
					}

					const editor = activeLeaf.editor;
					const selectedText = editor.getSelection();

					if (!selectedText) {
						new Notice("Please select text to use as a prompt.");
						return;
					}

					try {
						const response = await this.aiManager.generateContent(
							selectedText
						);
						editor.replaceSelection(response);
						new Notice("AI content generated successfully!");
					} catch (error) {
						console.error(
							"Error generating content with AI:",
							error
						);
						new Notice(
							"Failed to generate content. Check the console for details."
						);
					}
				}
			);

			// Optional: Add a tooltip to the ribbon icon
			ribbonIconEl.setAttribute("aria-label", "Generate Content with AI");
		} catch (error) {
			console.error("Error initializing AI Hub plugin:", error);
			new Notice(
				"AI Hub failed to initialize. Check console for details."
			);
		}
	}

	onunload() {
		console.log("Unloading obsidian-ai-hub plugin");
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
