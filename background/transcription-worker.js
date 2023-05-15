const { parentPort, workerData } = require('worker_threads');
const axios = require('axios');
const fs = require('fs-extra');
const FormData = require('form-data');
const { supabase } = require('../lib/supabase.js');

const API_KEY = process.env.API_KEY;

async function transcribe() {
    const { publicURL, transcriptId, userId } = workerData;

    try {
        console.log("Starting Transcription");

        // Download the file from Supabase Storage
        const audioStream = await downloadFile(publicURL);

        // Perform the transcription process here
        const transcript = await transcribeVideo(audioStream);

        // Update the transcript in the database
        const { error } = await updateTranscript(transcriptId, userId, transcript);

        if (error) {
            throw new Error(error.message);
        }

        console.log("End Transcription");
        // Send a message to the parent thread indicating the transcription is complete
        parentPort.postMessage({ success: true, transcriptId });
    } catch (error) {
        console.error(error);
        // Mark the transcript as failed
        await markTranscriptFailed(transcriptId, userId, error.message);
        // Send a message to the parent thread indicating there was an error
        parentPort.postMessage({ success: false, error: error.message });
    }
}

async function downloadFile(url) {
    const response = await axios.get(url, { responseType: 'stream' });
    return response.data;
}

async function transcribeVideo(audioStream) {
    const formData = new FormData();

    formData.append('file', audioStream, { filename: 'audio_file' });
    formData.append('model', 'whisper-1');

    const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
        headers: {
            ...formData.getHeaders(),
            'Authorization': `Bearer ${API_KEY}`
        }
    });

    return response.data.text;
}

export async function updateTranscript(transcriptId, userId, transcript) {
    const { error } = await supabase
        .from('transcripts')
        .update({
            content: transcript,
            status: 'completed',
        })
        .eq('id', transcriptId)
        .eq('user_id', userId);

    return { error };
}

export async function markTranscriptFailed(transcriptId, userId, errorMessage) {
    // Update the transcript in the database, setting the status to "failed"
    // and adding the error message to a new field, e.g. "error_message"
    const { error } = await supabase
        .from('transcripts')
        .update({
            status: 'failed',
            error_message: errorMessage
        })
        .eq('id', transcriptId)
        .eq('user_id', userId);

    if (error) {
        console.error('Error marking transcript as failed:', error.message);
    }
}


transcribe();