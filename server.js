const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = 3000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(express.json());
app.use(express.static('public'));

app.post('/generate', async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
    const result = await model.generateContent(req.body.prompt);
    const response = await result.response;
    const text = response.text();
    res.json({ text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});