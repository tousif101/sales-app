// pages/api/upload.js
import nc from 'next-connect';
import { supabase } from '@/lib/supabase';
import { checkJwt } from './middleware/checkJwt';
import multer from 'multer';


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

        // Call the Python API
        const pythonApiUrl = '';
        const pythonApiData = {
            userId: user.user.id,
            transcriptId: insert[0].id,
            fileSource: path
        };
        console.log("Calling Python API:", pythonApiUrl, pythonApiData);
        try {
            const pythonApiResponse = await fetch(pythonApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pythonApiData)
            });

            if (!pythonApiResponse.ok) {
                throw new Error('Error calling Python API');
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error processing transcript' });
        }

        res.status(200).json({ taskId: insert[0].id});
    });

export default handler;
