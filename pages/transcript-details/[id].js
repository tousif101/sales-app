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

    useEffect(() => {
        let intervalId = null;

        const checkStatus = async () => {
            const response = await fetch(`/api/transcript/${id}/status`, {
                headers: {
                    'Authorization': `Bearer ${session.access_token}`,
                },
            });

            if (response.ok) {
                try {
                    const data = await response.json();

                    if (data.status === 'completed') {
                        setTranscript(data);
                        clearInterval(intervalId);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };

        if (transcript && transcript.status === 'processing') {
            intervalId = setInterval(checkStatus, 5000);
        }

        return () => clearInterval(intervalId);
    }, [transcript, id, session]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-10">
                {transcript && transcript.status === 'completed' ? (
                    <div className="p-4 bg-white shadow-md rounded-lg overflow-y-auto max-h-[calc(100vh-64px)]">
                        <h2 className="text-2xl font-bold mb-4">{transcript.title}</h2>
                        <pre className="whitespace-pre-wrap">{transcript.content}</pre>
                    </div>
                ) : (
                    <p className="text-center mt-4">{transcript && transcript.status === 'processing' ? 'Still Processing...' : 'Loading...'}</p>
                )}
            </div>
        </div>
        // <div className="min-h-screen bg-gray-100">
        //     <div className="container mx-auto px-4 py-10">
        //         {transcript && transcript.status === 'completed' ? (
        //             <div className="h-1/2  mx-auto p-4 bg-white shadow-md rounded-lg overflow-y-auto max-h-screen">
        //                 <h2 className="text-2xl font-bold mb-4">{transcript.title}</h2>
        //                 <pre className="whitespace-pre-wrap">{transcript.content}</pre>
        //             </div>
        //         ) : (
        //             <p className="text-center mt-4">{transcript && transcript.status === 'processing' ? 'Still Processing...' : 'Loading...'}</p>
        //         )}
        //     </div>
        // </div>
    );
};

export default TranscriptPage;
