// // components/Auth.js
// import { useState, useEffect } from 'react'
// import { supabase } from '@/lib/supabase'

// const Auth = () => {
//   const [session, setSession] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [isSignUp, setIsSignUp] = useState(false)

//   useEffect(() => {
//     const authListener = supabase.auth.onAuthStateChange(async (event, session) => {
//       setSession(session)
//       setLoading(false)
  
//       if (session) {
//         // Fetch protected data when the user is signed in
//         fetchProtectedData(session.access_token)
//       }
//     })
  
//     return () => {
//       authListener()
//     }
//   }, [])

//   const handleSignIn = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     const { error } = await supabase.auth.signIn({ email, password })
//     if (error) console.error(error)
//     setLoading(false)
//   }

//   const handleSignUp = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     const { error } = await supabase.auth.signUp({ email, password })
//     if (error) console.error(error)
//     setLoading(false)
//   }

//   const handleSignOut = async () => {
//     setLoading(true)
//     const { error } = await supabase.auth.signOut()
//     if (error) console.error(error)
//     setLoading(false)
//   }

//   if (loading) return <div>Loading...</div>

//   if (!session)
//     return (
//       <div className="max-w-sm mx-auto mt-10">
//         <h1 className="text-4xl mb-8">{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
//         <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
//           <input
//             className="w-full px-3 py-2 border border-gray-300 rounded"
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             className="w-full px-3 py-2 border border-gray-300 rounded"
//             className="w-full px-3 py-2 border border-gray-300 rounded"
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button
//             className="w-full px-3 py-2 bg-blue-500 text-white rounded"
//             type="submit"
//           >
//             {isSignUp ? 'Sign Up' : 'Sign In'}
//           </button>
//         </form>
//         <button
//           className="w-full px-3 py-2 mt-4 bg-gray-300 text-black rounded"
//           onClick={() => setIsSignUp(!isSignUp)}
//         >
//           {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
//         </button>
//       </div>
//     )

//   return (
//     <div className="max-w-sm mx-auto mt-10">
//       <h1 className="text-4xl mb-8">Welcome, {session.user.email}!</h1>
//       <button
//         className="w-full px-3 py-2 bg-red-500 text-white rounded"
//         onClick={handleSignOut}
//       >
//         Sign Out
//       </button>
//     </div>
//   )
// }

// export default Auth



import { supabase } from '@/lib/supabase'
import { useState } from 'react'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      alert(error.error_description || error.message)
    } else {
      alert('Check your email for the login link!')
    }
    setLoading(false)
  }

  return (
    <div className="flex justify-center pt-16">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">Welcome to Smarter Sales </h1>
        <p className="text-center mb-4">Sign in via magic link with your email below</p>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button
              className={`w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
              disabled={loading}
            >
              {loading ? <span>Loading</span> : <span>Send magic link</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
  
}