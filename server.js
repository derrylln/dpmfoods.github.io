const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'system', content: 'You are an AI assistant for DPM Foods, helping customers find products.' },
                           { role: 'user', content: message }],
            },
            {
                headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` }
            }
        );

        res.json({ response: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));
