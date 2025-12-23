
import { GoogleGenAI } from "@google/genai";

// A API key deve ser acessada via process.env.API_KEY
const apiKey = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export const generateGiftMessage = async (occasion: string, recipient: string, tone: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Escreva uma mensagem curta e emocionante para um cartão de presente de floricultura. 
      Ocasião: ${occasion}. 
      Destinatário: ${recipient}. 
      Tom: ${tone}. 
      A mensagem deve ter no máximo 150 caracteres.`,
    });
    const text = response.text;
    return typeof text === 'string' ? text : "Desejo que este presente traga muita alegria ao seu dia!";
  } catch (error) {
    console.error("Erro ao gerar mensagem:", error);
    return "Desejo que este presente traga muita alegria ao seu dia!";
  }
};

export const getPlantCareAdvice = async (plantName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Dê 3 dicas rápidas e essenciais de cuidados para a planta: ${plantName}. Foco em rega, iluminação e adubação.`,
    });
    const text = response.text;
    return typeof text === 'string' ? text : "Regue moderadamente e mantenha em local iluminado.";
  } catch (error) {
    console.error("Erro ao obter dicas:", error);
    return "Regue moderadamente e mantenha em local iluminado.";
  }
};
