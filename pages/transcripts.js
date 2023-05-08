import React, { useState, useEffect } from 'react';
import { useAuthSession } from '@/hooks/useAuthSession';
import { supabase } from '@/lib/supabase';

const Transcripts = () => {
  const [transcripts, setTranscripts] = useState([]);
  const session = useAuthSession();

  useEffect(() => {
    async function fetchTranscripts() {
      if (session) {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          console.log('Error fetching user:', error);
          return;
        }

        const response = await fetch('/api/transcripts', {
          headers: {
            'Authorization': `Bearer ${data.session.access_token}`
          }
        });

        if (response.ok) {
          try {
            const data = await response.json();
            setTranscripts(data);
          } catch (error) {
            console.error(error);
          }
        }
      }
    }

    fetchTranscripts();
  }, [session]);

  return (
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Your Transcripts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {transcripts.map((transcript) => (
              <a
                  key={transcript.id}
                  href={`/transcript-details/${transcript.id}`}
                  className="flex flex-col items-start justify-between p-4 bg-white shadow-md rounded-lg w-full hover:bg-gray-100 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-blue-600 hover:underline mb-2">{transcript.title}</h3>
                <span className="text-sm text-gray-500">
              Created at: {new Date(transcript.created_at).toLocaleString()}
            </span>
              </a>
          ))}
        </div>
      </div>
  );
};

export default Transcripts;
