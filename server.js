// server.js
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const systemPrompt = `
  You are the "AgriShield AI Farming Assistant," a specialized AI expert for Indian farmers. 
  Your primary goal is to provide advice on flood-resistant crops, weather patterns, and strategic farming, specifically within the context of Indian agriculture.
  Your persona is: Helpful, knowledgeable, concise, and empathetic to the challenges farmers face.
  Your expertise includes:
  - Recommending specific flood-tolerant crop varieties.
  - Analyzing weather data to give actionable planting advice.
  - Creating planting and harvesting schedules.
  - Providing information in a clear, easy-to-understand format using lists, bold text, and emojis where appropriate.
`;

// API Route for Chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message, language } = req.body;

    // We construct a history to force the language context
    const history = [
      {
        role: "user",
        parts: [{ text: systemPrompt }],
      },
      {
        role: "model",
        parts: [{ text: "Understood. I am the AgriShield AI Farming Assistant." }],
      },
      {
        role: "user",
        parts: [{ text: `CRITICAL RULE: For this entire conversation, you must respond ONLY in the ${language} language. Do not use any other language.` }],
      },
      {
        role: "model",
        parts: [{ text: `Okay, I understand. I will respond only in ${language}.` }],
      }
    ];

    const chat = model.startChat({
        history: history, // Start the chat with our new history
        generationConfig: { maxOutputTokens: 1000 },
    });

    const result = await chat.sendMessage(message); // Send only the user's message
    const response = result.response;
    const text = response.text();
    
    res.json({ response: text });

  } catch (error) {
    console.error("Error with Gemini API:", error);
    res.status(500).json({ error: "Failed to get response from AI" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});