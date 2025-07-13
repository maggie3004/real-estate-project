const express = require('express');
const router = express.Router();
const axios = require('axios');

// POST /api/chatbot
router.post('/', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  // Strong, business-specific prompt
  const systemPrompt = `You are an AI assistant for Shree Ganesh Builders, a luxury real estate company.\nYour job is to help website visitors with questions about our properties, locations, amenities, pricing, floor plans, brochures, and services.\nAlways provide clear, friendly, and professional answers based only on information relevant to Shree Ganesh Builders and real estate in general.\n\nIf a user asks about something unrelated to our company, properties, or real estate, politely respond:\n\"I'm here to assist with questions about Shree Ganesh Builders and our real estate offerings. Please ask me anything about our properties, services, or real estate in general.\"\n\nNever answer questions about unrelated topics, personal opinions, or anything outside the scope of our business.`;

  try {
    const openaiRes = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 200,
        temperature: 0.6
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );
    console.log('OpenAI API response:', openaiRes.data); // Debug log
    const aiMessage = openaiRes.data.choices[0].message.content.trim();
    res.json({ reply: aiMessage });
  } catch (error) {
    console.error('OpenAI error:', error.response?.data || error.message); // Debug log
    res.status(500).json({ error: 'Failed to get AI response.' });
  }
});

module.exports = router; 