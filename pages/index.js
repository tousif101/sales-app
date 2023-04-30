// pages/index.js
import React from 'react'
import { supabase } from '@/lib/supabase'
import { useState, useEffect } from 'react'
import Auth from '@/components/Auth'

function index() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {session ? (
        <p>User ID: {session.user.id}</p>
      ) : (
        <Auth />
      )}
    </div>
  )
}

export default index