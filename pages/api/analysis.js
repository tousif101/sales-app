import nc from 'next-connect';
import { checkJwt } from './middleware/checkJwt';
import { supabase } from '@/lib/supabase';

const handler = nc().use(checkJwt).get(async (req, res) => {
    const { user } = req;
    const { transcriptId } = req.query;

    const { data: analysesFromDb, error: dbError } = await supabase
        .from('analyses')
        .select('*')
        .eq('transcript_id', transcriptId)
        .limit(1);

    if (dbError) {
        throw new Error(dbError.message);
    }

    if (analysesFromDb && analysesFromDb.length > 0) {
        res.status(200).json(analysesFromDb[0]);
        return;
    }

    res.status(404).json({ error: 'Analysis not found' });
});

export default handler;
