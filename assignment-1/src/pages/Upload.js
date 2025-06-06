import React, { useState, useEffect } from 'react';

function Upload() {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    // Load saved files from localStorage
    const savedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
    setFiles(savedFiles);
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const uploadedFiles = e.dataTransfer.files;
    handleFiles(uploadedFiles);
  };

  const handleFileInput = (e) => {
    const uploadedFiles = e.target.files;
    handleFiles(uploadedFiles);
  };

  const handleFiles = (uploadedFiles) => {
    const newFiles = Array.from(uploadedFiles).map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      uploadDate: new Date().toISOString()
    }));

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Upload Your Content</h1>
        <p className="mt-2 text-gray-600">Share your books and writings about mental health</p>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
          accept=".pdf,.doc,.docx"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Choose Files
        </label>
        <p className="mt-2 text-sm text-gray-600">
          or drag and drop your files here
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Supported formats: PDF, DOC, DOCX
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Uploaded Files</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {files.map((file, index) => (
                <li key={index} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)} • Uploaded on {new Date(file.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="ml-4 text-sm font-medium text-red-600 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Upload; 