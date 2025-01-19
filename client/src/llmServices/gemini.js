const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI("AIzaSyBxEd32NKrJ95eWcJ3X8RkGEg-5a9oe-FU");

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const generateContent = async (prompt) => {
  const result = await model.generateContent(prompt);
  return result.response.text();
};