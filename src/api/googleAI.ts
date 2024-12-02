import { AIModel, AIResponse } from "../types";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Notice } from "obsidian";

export class GoogleAI implements AIModel {
	private genAI: any;
	private model: string;

	constructor(apiKey: string, model: string) {
		this.genAI = new GoogleGenerativeAI(apiKey);
		this.model = model;
	}

	async generateContent(prompt: string): Promise<AIResponse> {
		try {
			const model = this.genAI.getGenerativeModel({ model: this.model });
			const result = await model.generateContent(prompt);
			return { text: result.response.text() };
		} catch (error: any) {
			console.error("Error during AI content generation:", error);
			// Show a user-friendly error message
			if (error.message) {
				new Notice(`AI Error: ${error.message}`);
			} else {
				new Notice(
					"An unknown error occurred while generating content."
				);
			}
			throw error; // Re-throw the error for further debugging if necessary
		}
	}
}
