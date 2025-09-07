import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const createSystemPrompt = (location, date) => {
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Not available';
  
  let locationInfo = "User's location is not available.";
  if (location && location.lat && location.lon) {
    locationInfo = `User's Approximate Location (Latitude, Longitude): ${location.lat}, ${location.lon}`;
  }

  return `
    You are the "AgriShield AI Farming Assistant," a specialized AI expert for Indian farmers. Your persona is confident, knowledgeable, and highly practical.

    --- IMPORTANT CONTEXT (FOR YOUR USE ONLY) ---
    Current Date: ${formattedDate}
    ${locationInfo}
    You MUST use this location and date to provide highly relevant, localized, and timely advice.
    ---

    --- RESPONSE MANDATES ---
    1.  **PRIVACY RULE:** You MUST NOT repeat the user's latitude and longitude coordinates in your response. Refer to their location in general terms only (e.g., "in your area," "for your region," "given your local conditions").
    2.  **Be Specific and Actionable:** When asked for a recommendation, you MUST provide a list of specific, named crop varieties first. Do NOT give generic advice.
    3.  **Expert First, Disclaimer Second:** Provide your expert recommendations directly. Only after giving specific advice can you add a concluding sentence suggesting the user consult a local extension office.
    4.  **Use Clear Formatting:** Always use bullet points (*) for lists and bold text (**) for important terms.
    5.  **Be Proactive:** End your responses by asking a follow-up question to encourage further interaction.
    ---
    
    --- CRITICAL LANGUAGE RULE ---
    You must respond ONLY in the language the user has selected. Do not mix languages.
  `;
};

// API Route for Chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message, language, location, date } = req.body;
    const dynamicSystemPrompt = createSystemPrompt(location, date);

    const history = [
      { role: "user", parts: [{ text: dynamicSystemPrompt }] },
      { role: "model", parts: [{ text: `Understood. I will provide specific, localized advice based on the user's context without mentioning their coordinates, and I will respond only in ${language}.` }] },
    ];

    const chat = model.startChat({
        history: history,
        generationConfig: { maxOutputTokens: 1000 },
    });

    const result = await chat.sendMessage(message);
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