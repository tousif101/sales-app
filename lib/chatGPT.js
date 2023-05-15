// lib/chatgpt.js
import { Configuration, OpenAIApi } from 'openai';
import { encoding_for_model } from '@dqbd/tiktoken';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function getChatGPTResponse(prompt) {
    const enc = encoding_for_model('text-davinci-003');
    const promptTokens = enc.encode(prompt).length;
    enc.free();

    const maxTokens = 4094 - promptTokens;
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: maxTokens,
        temperature: 0.5,
    });

    return response.data.choices[0].text.trim();
}
