// src/main.ts
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

		// Ensure data.json is created if it doesn't exist
		if (!this.settings) {
			this.settings = DEFAULT_SETTINGS;
			await this.saveSettings();
		}

		// Initialize AI Manager without checking for API key
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
		this.addRibbonButton();
	}

	onunload() {
		console.log("Unloading obsidian-ai-hub plugin");
	}

	async loadSettings() {
		const data = await this.loadData();
		this.settings = Object.assign({}, DEFAULT_SETTINGS, data);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	addRibbonButton() {
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

				// Check for API key when user tries to generate content
				if (!this.settings.apiKey) {
					new Notice(
						"Please set your API key in the AI Hub settings."
					);
					return;
				}

				try {
					// Update AI Manager in case settings have changed
					this.aiManager.updateConfig(
						this.settings.apiKey,
						this.settings.model
					);

					const response = await this.aiManager.generateContent(
						selectedText
					);
					editor.replaceSelection(response);
					new Notice("AI content generated successfully!");
				} catch (error) {
					console.error("Error generating content with AI:", error);
					new Notice(
						"Failed to generate content. Check the console for details."
					);
				}
			}
		);

		// Optional: Add a tooltip to the ribbon icon
		ribbonIconEl.setAttribute("aria-label", "Generate Content with AI");
	}
}
