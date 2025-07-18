// llm.js
import axios from "axios";
import "dotenv/config";

const callAgent = async (prompt) => {
  const apiKey = process.env.TOGETHER_API_KEY;

  const body = {
    model: "deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free",
    messages: [
      { role: "system", content: "You are a helpful and creative assistant agent." },
      { role: "user", content: prompt },
    ],
    max_tokens: 700,
    temperature: 0.9,
    top_p: 0.95,
    stop: null,
  };

  try {
    const res = await axios.post(
      "https://api.together.xyz/v1/chat/completions",
      body,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data.choices[0].message.content;
  } catch (error) {
    console.error("LLM Error:", error.response?.data || error.message);
    return "Sorry, I couldn't process your request.";
  }
};

export default callAgent;
