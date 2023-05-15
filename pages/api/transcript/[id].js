// pages/api/transcript/[id].js
import nc from 'next-connect';
import { supabase } from '@/lib/supabase';
import { checkJwt } from "@/pages/api/middleware/checkJwt";

const handler = nc()
    .use(checkJwt)
    .get(async (req, res) => {
        const { id } = req.query;
        const { user } = req;

        // Fetch the transcript by ID for the logged-in user
        const { data, error } = await supabase
            .from('transcripts')
            .select('*')
            .eq('id', id)
            .eq('user_id', user.user.id)
            .single();

        if (error || !data) {
            return res.status(400).json({ error: error ? error.message : 'Transcript not found' });
        }

        // Return the entire transcript
        res.status(200).json(data);
    });

export default handler;
