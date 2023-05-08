import { useState } from 'react';
import FileUploadForm from '../components/FileUploadForm';
import LoadingScreen from '../components/LoadingScreen.js';
import { useAuthSession } from '@/hooks/useAuthSession';

function Upload() {
    const [loading, setLoading] = useState(false);
    const [jsonData, setJsonData] = useState(null);
    const session = useAuthSession();

    const handleFileUpload = async (file) => {
        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);

        if (session) {
            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${session.access_token}`,
                    },
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Failed to upload file');
                }

                const data = await response.json();
                setJsonData(data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-10">
                {loading ? (
                    <LoadingScreen />
                ) : (
                    <>
                        <h1 className="text-4xl font-bold mb-6 text-center">Upload Your Sales Call Recording</h1>
                        <FileUploadForm onFileUpload={handleFileUpload} />
                        {jsonData && (
                            <div className="mt-6 text-center font-bold text-xl">
                                <p>Upload finished. Transcribing Your Call Now</p>
                                <p>Please upload another video or check your transcripts.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Upload;
