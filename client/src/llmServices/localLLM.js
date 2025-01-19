// src/api/llmApi.js
import axios from "axios";

const url = "http://127.0.0.1:1337/v1/chat/completions"; // Base URL of the API

export const callLLM = async (data) => {
  try {
    // Simplified payload structure

    const payload = {
        messages: [
            {
                role: "user",
                content: data.prompt
            }
        ],
        "model": "llama3.2-1b-instruct",
        "stream": false,
        "max_tokens": 100,
        "stop": null,
        "frequency_penalty": 0,
        "presence_penalty": 0,
        "temperature": 0.7,
        "top_p": 0.5
    }

    console.log("Sending request with payload:", payload); // Debug log

    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    console.log("Received response:", response.data); // Debug log
    return response.data;
  } catch (error) {
    // More detailed error logging
    console.error("Error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};
