import { App, PluginSettingTab, Setting } from "obsidian";
import AIHubPlugin from "./main";

export interface AIHubSettings {
	apiKey: string;
	model: string;
}

export const DEFAULT_SETTINGS: AIHubSettings = {
	apiKey: "",
	model: "gemini-1.5-flash",
};

export class AIHubSettingTab extends PluginSettingTab {
	plugin: AIHubPlugin;

	constructor(app: App, plugin: AIHubPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();
		containerEl.createEl("h2", { text: "AI Hub Settings" });

		new Setting(containerEl)
			.setName("Google AI API Key")
			.setDesc("Enter your Google AI Studio API key.")
			.addText((text) =>
				text
					.setPlaceholder("Enter your API key")
					.setValue(this.plugin.settings.apiKey)
					.onChange(async (value) => {
						this.plugin.settings.apiKey = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Model")
			.setDesc("Select the AI model to use.")
			.addText((text) =>
				text
					.setPlaceholder("gemini-1.5-flash")
					.setValue(this.plugin.settings.model)
					.onChange(async (value) => {
						this.plugin.settings.model = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
