import { supabase } from "@/lib/supabase"

async function authMiddleware(req, res, next) {
  const userId = req.headers['x-user-id']
  const accessToken = req.headers['authorization']

  if (!userId || !accessToken) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const { user, error } = await supabase.auth.api.getUser(accessToken)

  if (error || user.id !== userId) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  next()
}

export default authMiddleware
