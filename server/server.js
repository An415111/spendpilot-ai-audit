import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

app.get("/", (req, res) => {
  res.json({
    message: "SpendPilot AI Server Running",
  });
});

app.post("/generate-summary", async (req, res) => {

  try {

    const audit = req.body;

    const prompt = `
You are an AI financial optimization assistant.

Analyze this AI spend audit and generate a concise professional summary.

Tool: ${audit.tool}
Plan: ${audit.plan}
Monthly Spend: $${audit.monthlySpend}
Seats: ${audit.seats}
Use Case: ${audit.useCase}

Include:
- spending efficiency insight
- optimization opportunity
- financial recommendation
- annual savings perspective

Keep response under 100 words.
`;

    const response =
      await client.chat.completions.create({
        model:
          "meta-llama/llama-3-8b-instruct:free",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    const summary =
      response.choices[0].message.content;

    res.json({
      success: true,
      summary,
    });

  } catch (error) {

    console.error(error);

    res.json({
      success: false,
      summary:
        "Your AI tooling setup shows potential optimization opportunities that may reduce operational spending while maintaining productivity.",
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});