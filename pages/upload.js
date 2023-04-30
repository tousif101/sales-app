import { useState } from 'react';
import FileUploadForm from '../components/FileUploadForm';
import LoadingScreen from '../components/LoadingScreen.js';
import DisplayData from '@/components/DisplayData';

function upload() {

    const [loading, setLoading] = useState(false);
    const [jsonData, setJsonData] = useState(null);
  
    const handleFileUpload = async (file) => {
      setLoading(true);
    
      const formData = new FormData();
      formData.append('video', file);
    
      try {
        // Replace '/your-flask-api-endpoint' with the actual endpoint of your Flask API
        const response = await fetch('/api/process_video', {
          method: 'POST',
          body: formData,
        });
    
        if (!response.ok) {
          throw new Error('Failed to upload file');
        }
    
        const data = await response.json();
        setJsonData(data);
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-10">
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              <h1 className="text-4xl font-bold mb-6 text-center">Upload Sales Call</h1>
              <FileUploadForm onFileUpload={handleFileUpload} />
              {jsonData && (
              //  <div className="mt-6">
              //   <JsonDataDisplay data={jsonData} />
              // </div>
              <div className="mt-6">
                <DisplayData data={jsonData} />
              </div>
              )}
            </>
          )}
        </div>
      </div>
    );
}

export default upload