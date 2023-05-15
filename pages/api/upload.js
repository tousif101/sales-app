// pages/api/upload.js
import nc from 'next-connect';
import { supabase } from '@/lib/supabase';
import { checkJwt } from './middleware/checkJwt';
import multer from 'multer';
import celery from 'celery-node'

const celeryClient = celery.createClient(
    process.env.REDIS_BROKER,
    process.env.REDIS_BROKER
);

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
        const path = `user-${user.user.id}/${file.originalname}`;

        const { data, uploadError } = await supabase
            .storage
            .from('uploads')
            .upload(path, file.buffer, {
                upsert: false
            });

        if (uploadError) {
            return res.status(400).json({ error: uploadError.message });
        }

        console.log("DATA: ", data)
        const { data: insert, error } = await supabase
            .from('transcripts')
            .insert([{ user_id: user.user.id, status:"processing", title: file.originalname }])
            .select('*')

        if (error) {
            throw new Error(error.message);
        }
        console.log("inserted DATA ", insert);

        const taskData = {
            userId: user.user.id,
            transcriptId: insert[0].id,
            fileSource: path
        };
        console.log("Enqueueing Celery task:", taskData);
        try {
            const task = celeryClient.createTask('main.process_video_and_save_transcript');
            const taskResult = await task.applyAsync([taskData.userId, taskData.transcriptId, taskData.fileSource]);
            console.log("Task enqueued. Result:", taskResult);

        } catch (error) {
            console.error("Error enqueuing task:", error);
            return res.status(500).json({ error: 'Error processing transcript' });
        }

        res.status(200).json({ taskId: insert[0].id});
    });

export default handler;
