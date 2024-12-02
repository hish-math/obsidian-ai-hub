// src/api/index.ts
import { AIModel } from "../types";
import { GoogleAI } from "./googleAI";

export class AIManager {
	private aiModel: AIModel;

	constructor(apiKey: string, model: string) {
		// Initialize with Google AI by default
		this.aiModel = new GoogleAI(apiKey, model);
	}

	async generateContent(prompt: string): Promise<string> {
		const response = await this.aiModel.generateContent(prompt);
		return response.text;
	}
}
