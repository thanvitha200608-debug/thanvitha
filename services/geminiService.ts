import { GoogleGenAI, Type } from "@google/genai";
import { StartupIdea, ChatMessage } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. App will not function correctly.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const ideaSchema = {
  type: Type.OBJECT,
  properties: {
    ideaName: {
      type: Type.STRING,
      description: "A creative and catchy name for the startup.",
    },
    description: {
      type: Type.STRING,
      description: "A brief, one-to-two sentence compelling description of the business concept.",
    },
    audience: {
      type: Type.STRING,
      description: "The specific target customer or user base for this idea.",
    },
    monetization: {
      type: Type.STRING,
      description: "The primary strategy for generating revenue (e.g., subscription, freemium, B2B sales).",
    },
    ideaScore: {
        type: Type.INTEGER,
        description: "A score from 0-100 representing the idea's potential, feasibility, and market fit."
    },
    feasibilityAnalysis: {
        type: Type.STRING,
        description: "A short paragraph analyzing the potential challenges and viability of this startup idea."
    },
    suggestedMentors: {
        type: Type.ARRAY,
        description: "A list of 2-3 hypothetical mentor or investor profiles that would be a good fit for this startup.",
        items: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING, description: "Full name of the suggested mentor/investor." },
                expertise: { type: Type.STRING, description: "A brief description of their relevant skills or investment focus." }
            },
            required: ['name', 'expertise']
        }
    }
  },
  required: ['ideaName', 'description', 'audience', 'monetization', 'ideaScore', 'feasibilityAnalysis', 'suggestedMentors'],
};

export async function generateIdeaFromChat(chatHistory: ChatMessage[]): Promise<ChatMessage> {
  const userMessages = chatHistory.map(msg => `${msg.sender}: ${msg.text}`).join('\n');

  const prompt = `
    You are BizSpark, an AI co-pilot for student entrepreneurs. Your role is to act as a chatbot, understand the user's skills and interests from the conversation, and generate a detailed startup idea when you have enough information.
    
    Conversation History:
    ${userMessages}

    Your task:
    1.  Analyze the user's latest message in the context of the conversation.
    2.  If the user is providing enough information about their interests and skills and seems ready for an idea, generate a single, detailed startup idea. The output MUST be a JSON object that strictly follows the provided schema.
    3.  If the user's message is conversational (e.g., "hello", "tell me more"), respond with a friendly, encouraging chat message as text, asking them about their passions, skills, or problems they want to solve. DO NOT output JSON in this case.

    If you generate an idea, ensure it is innovative, viable, and tailored to the user's input.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                response_type: { type: Type.STRING, description: "Either 'idea' or 'chat'."},
                content: { type: Type.STRING, description: "The chat message if response_type is 'chat'."},
                idea: ideaSchema
            }
        },
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);

    if (result.response_type === 'idea' && result.idea) {
        return {
            sender: 'ai',
            text: `I've sparked an idea for you: **${result.idea.ideaName}**! Here are the details.`,
            idea: result.idea as StartupIdea,
            timestamp: Date.now()
        };
    } else {
         return {
            sender: 'ai',
            text: result.content || "I'm sorry, I couldn't process that. Could you tell me more about your skills or interests?",
            timestamp: Date.now()
        };
    }

  } catch (error) {
    console.error("Gemini API call failed:", error);
    return {
        sender: 'ai',
        text: "I'm having a little trouble connecting to my creative circuits right now. Please try again in a moment.",
        timestamp: Date.now()
    };
  }
}
