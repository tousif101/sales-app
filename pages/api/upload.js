// pages/api/upload.js
import nc from 'next-connect';
import { supabase } from '@/lib/supabase';
import { checkJwt } from './middleware/checkJwt';
import multer from 'multer';
import { Worker } from 'node:worker_threads';
//import transcriptionWorker from '../background/transcription-worker.js';


const upload = multer({
    limits: {
        fileSize: 500 * 1024 * 1024,
    },
});

export const config = {
    api: {
        bodyParser: false
    }
}

const handler = nc()
    .use(checkJwt)
    .post(upload.single('file'), async (req, res) => {
        const { user } = req;
        const file = req.file;  // Assuming the file input name is "file"

        //Upload the file to Supabase Storage
        const { publicURL, error: uploadError } = await supabase.storage
            .from('uploads')
            .upload(`user-${user.user.id}/${file.originalname}`, file.data);

        if (uploadError) {
            return res.status(400).json({ error: uploadError.message });
        }

        const { data, error } = await supabase
            .from('transcripts')
            .insert([{ user_id: user.user.id, status:"processing", title: file.originalname }])
            .select();

        if (error) {
            throw new Error(error.message);
        }

        // Dynamically import the worker file
        //const { default: transcriptionWorker } = await import('../background/transcription-worker.js');


            // Spawn the worker thread for transcribing the video
        // const worker = new Worker(new URL('../background/transcription-worker.js', import.meta.url), {
        //     workerData: {
        //         publicURL,
        //         transcriptId: data[0].id,
        //         userId: user.user.id,
        //     },
        // });
        //
        // worker.on('exit', (code) => {
        //     worker.terminate();
        // });
        res.status(200).json({ taskId: data[0].id});
    });

export default handler;





/*
TODO: Implement this later
const handler = nc()
    .use(checkJwt)
    .post(upload.single('file'), async (req, res) => {
        const { user } = req;
        const file = req.file;

        try {
            // Upload the file to Supabase Storage
            const { publicURL, error: uploadError } = await supabase.storage
                .from('uploads')
                .upload(`user-${user.user.id}/${file.originalname}`, file.data);

            if (uploadError) {
                throw new Error(uploadError.message);
            } else {
                // Insert a new row into the 'transcripts' table
                const { data, error } = await supabase
                    .from('transcripts')
                    .insert([{ user_id: user.user.id, status: "processing", title: file.originalname }])
                    .select();

                if (error) {
                    // Delete the file from Supabase Storage if the row insertion fails
                    await supabase.storage.from('uploads').remove([`user-${user.user.id}/${file.originalname}`]);
                    throw new Error(error.message);
                } else {
                    console.log(data);
                    res.status(200).json({ taskId: data[0].id });
                }
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

export default handler;

 */