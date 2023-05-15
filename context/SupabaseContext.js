// import { createContext, useContext, useEffect, useState } from 'react'
// import { supabase } from '@/lib/supabase'

// const SupabaseContext = createContext()

// export function useSupabase() {
//   return useContext(SupabaseContext)
// }

// export function SupabaseProvider({ children }) {
//   const [user, setUser] = useState(null)
//   const value = { supabase, user }

//   useEffect(() => {
//     const session = supabase.auth.getSession()

//     setUser(session?.user ?? null)

//     const { data: authListener } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         setUser(session?.user ?? null)
//       }
//     )

//     return () => {
//       authListener
//     }
//   }, [])

//   return (
//     <SupabaseContext.Provider value={value}>
//       {children}
//     </SupabaseContext.Provider>
//   )
// }
