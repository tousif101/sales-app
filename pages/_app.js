import '@/styles/globals.css'
import Navbar from '@/components/Navbar.js';
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps: { session, ...pageProps } }) {

  return (
    <>
        <Navbar />
        <Component {...pageProps} />
      </>

  )
}
