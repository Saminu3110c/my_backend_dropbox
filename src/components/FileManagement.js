import React, { useState, useEffect } from 'react';
import FileUpload from './FileUpload';
import FileList from './FileList';
import { list } from 'aws-amplify/storage';

const FileManagement = () => {
  const [files, setFiles] = useState([]);
  const [currentFolder, setCurrentFolder] = useState('');

  useEffect(() => {
    listFiles();
  }, [currentFolder]);

  const listFiles = async () => {
    try {
      const result = await list(currentFolder);
      if (Array.isArray(result)) {
        setFiles(result);
      } else {
        setFiles([]);
      }
    } catch (error) {
      console.error('Error listing files:', error);
    }
  };

  // This function will be passed to FileUpload to refresh the file list after upload
  const handleUploadSuccess = () => {
    listFiles(); // Refresh the file list after a successful upload
  };

  return (
    <div>
      <FileUpload onUploadSuccess={handleUploadSuccess} />
      <FileList files={files} setFiles={setFiles} setCurrentFolder={setCurrentFolder} currentFolder={currentFolder} />
    </div>
  );
};

export default FileManagement;
