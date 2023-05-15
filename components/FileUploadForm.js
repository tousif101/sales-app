// components/FileUploadForm.js
import React, { useState } from 'react';
import Link from 'next/link';
import {useAuthSession} from "@/hooks/useAuthSession";


const FileUploadForm = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const session = useAuthSession();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onFileUpload(file);
  };

  return session ? (
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
  ) : (
    <div className="flex flex-col items-center">
      <p className="text-center mb-4">
        Please sign up or sign in to upload files.
      </p>
      <Link href="/login" passHref>
        <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
          Sign Up / Sign In
        </button>
      </Link>
    </div>
  );
};

export default FileUploadForm;
