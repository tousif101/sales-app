// utils/authMiddleware.js
import { supabase } from "@/lib/supabase";

export async function checkJwt(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { data: user, error } = await supabase.auth.getUser(token);

    if (error) {
      throw error;
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message});
  }
}
