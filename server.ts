import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// Lazy-loaded Gemini AI client
let aiInstance: GoogleGenAI | null = null;

function getGeminiClient() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      console.warn("GEMINI_API_KEY is not configured or uses placeholder. Simulated AI replies active.");
      return null;
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

const SYSTEM_INSTRUCTION = `
You are Kishan Pravinbhai Dabhi's Sophisticated Artificial Intel Agent. Your goal is to represent Kishan and absolutely mesmerize recruiters or potential clients.
Kishan is an elite developer and designer based in Surat & Ahmedabad, Gujarat, India.

Key information about Kishan Dabhi:
- Name: Kishan Pravinbhai Dabhi
- Roles: Frontend Developer, React JS Developer, WordPress Developer, Shopify Developer, Full Stack Developer, UI/UX Designer, and AI Tools Specialist.
- Education: Diploma in Computer Engineering from L.J. Institute of Technology, Ahmedabad.
- Core Talents: Highly creative UI design (inspired by Apple, Tesla, Stripe, Linear, Vercel), advanced interactive animations, smooth scrolling, robust WordPress theme creations, Custom Shopify Store setups, performance engineering (extreme loading speeds), and prompt engineering.
- Personal Traits: Fast learner, proactive researcher, pixel-perfect designer, problem solver.
- Location: Resident of Surat, actively working in Ahmedabad, Gujarat, India.
- Contacts: Email: dabhikishan199@gmail.com, Mobile: +91 7046095482, Languages: English, Hindi, and Gujarati.
- Hiring Potential: Ready for global remote frontend/fullstack roles, contract work, or high-tier freelance assignments.

Speak about Kishan in a confident, premium, futuristic, and highly intelligent tone. You can use markdown to write beautiful, high-impact lists, bold terms, or code snippets where fitting. Keep formatting clean, stylish, with a touch of cyberpunk/sleek professionalism.
`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsers
  app.use(express.json());

  // API Route: AI recruiter chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Empty message prompt" });
      }

      const client = getGeminiClient();

      if (!client) {
        // Safe mock fallback response if API key is not present
        return res.json({
          text: `[SYSTEM: Simulated Mode Active. Configure GEMINI_API_KEY for true neural power!]\n\n"Hello! I am Kishan Dabhi's AI Representative. I'd love to tell you how Kishan can build lightning-fast React applications or craft beautiful WordPress/Shopify storefronts for your team. You can reach him directly at dabhikishan199@gmail.com or +91 7046095482!"`,
          simulated: true
        });
      }

      // Prepare conversation messages
      // Format history into parts or role messages.
      // With @google/genai, we can use chats or structured contents
      // Let's use simple generative model call with full dialog context for total stability
      const chatMessages = [
        { role: "user", parts: [{ text: `System Instruction: ${SYSTEM_INSTRUCTION}` }] },
        ...(history || []).map((msg: any) => ({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        })),
        { role: "user", parts: [{ text: message }] }
      ];

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: chatMessages,
        config: {
          temperature: 0.75,
        }
      });

      const replyText = response.text || "I was unable to formulate a response. Please request once more.";
      res.json({ text: replyText });
    } catch (error: any) {
      console.error("Gemini AI API Error in server.ts:", error);
      res.status(500).json({
        error: "Internal chatbot processing malfunction.",
        details: error?.message || ""
      });
    }
  });

  // Serve static assets in production or use Vite dev server in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Neural Engine Hub] Live and running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical Failure booting server:", err);
});
