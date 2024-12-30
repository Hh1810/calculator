require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // 在 .env 文件中定義您的 API 金鑰
}));

app.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }],
        });

        const botReply = response.data.choices[0].message.content;
        res.json({ reply: botReply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '無法生成回應，請稍後再試。' });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`伺服器已啟動：http://localhost:${PORT}`);
});
