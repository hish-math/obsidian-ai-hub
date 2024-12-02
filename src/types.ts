export interface AIResponse {
	text: string;
}

export interface AIModel {
	generateContent(prompt: string): Promise<AIResponse>;
}
