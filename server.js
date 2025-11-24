import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Initialize the client (API Key only)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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
    
    // 1. Generate the dynamic prompt based on request data
    const dynamicSystemPrompt = createSystemPrompt(location, date);

    // 2. Initialize the model WITH the system instruction
    // Note: If 'gemini-1.5-flash' still gives 404, try 'gemini-1.5-flash-latest'
    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: {
            role: "system",
            parts: [{ text: dynamicSystemPrompt }]
        }
    });

    // 3. Start Chat (No need to hack history anymore)
    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: `I am an Indian Farmer. My preferred language is: ${language}.` }],
            },
            {
                role: "model",
                parts: [{ text: `Namaste! I am ready to help you in ${language}.` }],
            },
        ],
        generationConfig: { 
            maxOutputTokens: 1000,
            temperature: 0.7, 
        },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    
    res.json({ response: text });

  } catch (error) {
    console.error("Error with Gemini API:", error);
    // Send the actual error message back to frontend for easier debugging
    res.status(500).json({ error: "Failed to get response from AI", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});