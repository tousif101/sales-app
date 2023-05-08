// pages/transcript/[id].js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAuthSession } from '@/hooks/useAuthSession';

const TranscriptPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [transcript, setTranscript] = useState(null);
    const session = useAuthSession();

    useEffect(() => {
        async function fetchTranscript() {
            if (id && session) {
                const response = await fetch(`/api/transcript/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${session.access_token}`,
                    },
                });

                if (response.ok) {
                    try {
                        const data = await response.json();
                        setTranscript(data);
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
        }

        fetchTranscript();
    }, [id, session]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-10">
                {transcript ? (
                    transcript.status === "processing" ? (
                        <div className="flex items-center justify-center mt-4">
                            <div className="animate-spin mr-2 h-5 w-5 text-blue-500"></div>
                            <p className="text-blue-500">Still Processing...</p>
                        </div>
                    ) : (
                        <div className="p-4 bg-white shadow-md rounded-lg">
                            <h2 className="text-2xl font-bold mb-4">{transcript.title}</h2>
                            <pre className="whitespace-pre-wrap">{transcript.content}</pre>
                        </div>
                    )
                ) : (
                    <p className="text-center mt-4">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default TranscriptPage;
