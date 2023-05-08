import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Head from 'next/head';
import Link from 'next/link';

export default function index() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-2 flex flex-col justify-center sm:py-12">
    <Head>
        <title>SmarterSales</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-lightBlue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold text-center mb-4">
            Welcome to SmarterSales
          </h1>
          {session ? (
            <div>
              <p className="text-center">
                Please start by uploading your sales call.
              </p>
              {/* Add your upload component here */}
            </div>
          ) : (
            <div>
              <p className="text-center mb-4">
                Please start by logging in and then uploading a .mp3 file in the
                upload tab.
              </p>
              <div className="flex justify-center">
                <Link href="/login">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Log In
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}