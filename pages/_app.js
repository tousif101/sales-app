import '@/styles/globals.css'
import Navbar from '@/components/Navbar.js';

export default function App({ Component, pageProps: { session, ...pageProps } }) {

  return (
    <>
        <Navbar />
        <Component {...pageProps} />
    </>

  )
}
