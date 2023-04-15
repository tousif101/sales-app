// components/FileUploadForm.js
import React, { useState } from 'react';

const FileUploadForm = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onFileUpload(file);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue-600 rounded-lg shadow-lg tracking-wide uppercase border border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white">
        <span className="mt-2 text-base leading-normal">
          {file ? file.name : 'Select a file'}
        </span>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      <button
        type="submit"
        className="bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-blue-700"
      >
        Upload
      </button>
    </form>
  );
};

export default FileUploadForm;
