// pages/transcript/[id].js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAuthSession } from '@/hooks/useAuthSession';
import AnalysisDisplay from "@/components/AnalysisDisplay.js";

const TranscriptPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [transcript, setTranscript] = useState(null);
    const [analysis, setAnalysis] = useState(null);
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

                        // Check if the transcript is still processing
                        if (data.status === 'processing') {
                            setTimeout(fetchTranscript, 5000);
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
        }

        // Check if transcript is already completed on page load
        if (transcript && transcript.status === 'completed') {
            return;
        }

        fetchTranscript();
    }, [id, session, transcript]);

    async function fetchAnalysis() {
        if (transcript && transcript.status === 'completed') {
            const response = await fetch(`/api/analysis?transcriptId=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`,
                },
            });

            if (response.ok) {
                try {
                    const data = await response.json();
                    setAnalysis(data);
                } catch (error) {
                    console.error('Error parsing analysis data:', error);
                }
            } else {
                console.error('Error fetching analysis data:', response.statusText);
            }
        }
    }

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

                {transcript && transcript.status === 'completed' && (
                    <>
                        <button
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto block"
                            onClick={fetchAnalysis}
                        >
                            Show Analysis
                        </button>

                        {analysis ? (
                            <AnalysisDisplay analysis={analysis} />
                        ) : (
                            <p className="text-center mt-4"></p>
                        )}
                    </>
                )}

            </div>
        </div>
    );
};

export default TranscriptPage;