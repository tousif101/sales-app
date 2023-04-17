// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from 'axios';
import { encoding_for_model } from '@dqbd/tiktoken';
import nextConnect from 'next-connect';
import cors from 'cors';
import generatePrompts from './constants.js';
import Formidable from 'formidable';
import fs from 'fs-extra';
import FormData from 'form-data';

const API_KEY = process.env.API_KEY;

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nextConnect();
handler.use(cors());

handler.use(async (req, res, next) => {
  if (req.method !== 'POST') {
    return next();
  }

  const form = new Formidable.IncomingForm({
    uploadDir: '/tmp/',
    keepExtensions: true,
    maxFileSize: 25 * 1024 * 1024, // 25MB
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      res.status(500).json({ detail: 'Error parsing form.' });
      return;
    }

    req.fields = fields;
    req.files = files;
    next();
  });
});

handler.post(async (req, res) => {
  console.log('Received request');

  try {
    if (!req.files || !req.files.video) {
      res.status(400).json({ detail: 'No video file provided.' });
      return;
    }

    //const audioBuffer = req.files.video.path;
    console.log(req.files.video.filepath)
    console.log('Transcribing audio...');
    const transcript = await transcribe(req.files.video.filepath);

    const response = await analyzeSalesCall(transcript);
    //const response = await callOpenAPI(`You are a very smart and licensed sales coach. Based on the following sales call transcript:\n\n${transcript}\n\n3. Identify instances of closing techniques and suggest ways to refine the approach. Return the result in a JSON format with key: "closingTechniques".`)

    res.json(response);
}catch (error) {
  console.error('Error processing request:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});

async function generateResponse(prompt, model = 'text-davinci-003') {
  const enc = encoding_for_model(model);
  const promptTokens = enc.encode(prompt).length;
  enc.free();

  const maxTokens = 4094 - promptTokens;

  const response = await axios.post('https://api.openai.com/v1/completions', {
    model: model,
    prompt: prompt,
    max_tokens: maxTokens,
    temperature: 0.5,
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
  });
  console.log(response.data.usage.total_tokens);
  return response.data.choices[0].text.trim();
}

//TODO: Clean this up later
// async function callOpenAPI (prompt) {
//   //const apiKey = process.env.OPENAI_API_KEY; // Replace this with your actual API key
//   const apiUrl = 'https://api.openai.com/v1/chat/completions';

//   const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${API_KEY}`,
//   };

//   const data = {
//     model: 'gpt-3.5-turbo',
//     messages: [{ role: 'user', content: prompt }],
//   };

//   try {
//     const response = await axios.post(apiUrl, data, { headers });
//     return response.data;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

async function analyzeSalesCall(conversation) {
  const prompts = generatePrompts(conversation);
  const requests = prompts.map(prompt => generateResponse(prompt.content));
  const results = await Promise.all(requests);
  const response = await parseInput(results);
  //console.log(results);
  return response;
}

async function parseInput(input) {
  const output = input.map(item => {
    try {
      const parsedItem = JSON.parse(item.replace(/\\n/g, '').replace(/"/g, '\"'));
      return parsedItem;
    } catch (error) {
      return item;
    }
  });
  return output;
}

async function transcribe(audioFilePath) {
  const audioFile = fs.createReadStream(audioFilePath);
  const formData = new FormData();

  formData.append('file', audioFile);
  formData.append('model', 'whisper-1');

  const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
    headers: {
      ...formData.getHeaders(),
      'Authorization': `Bearer ${API_KEY}`
    }
  });

  return response.data.text;
}

export default handler;