import nc from 'next-connect';
import { supabase } from '@/lib/supabase';
import { checkJwt } from './middleware/checkJwt';

const handler = nc()
  .use(checkJwt) // Add the middleware
  .get(async (req, res) => { // Handle the GET method
    const { user } = req;

    const { data, error } = await supabase
      .from('transcripts')
      .select('*')
      .eq('user_id', user.user.id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);
  });

export default handler;