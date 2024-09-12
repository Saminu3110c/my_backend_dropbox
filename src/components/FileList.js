import React, { useEffect, useState } from 'react';
// import { Storage } from 'aws-amplify';
// import { Storage } from '@aws-amplify/storage';
import { uploadData, downloadData, list, remove } from '@aws-amplify/storage';


const FileList = () => {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const fileList = await list(''); // Fetch all files
      setFiles(fileList);
    } catch (error) {
      console.error("Error fetching file list:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
      <h2>Uploaded Files</h2>
      <ul>
        {files.map(file => (
          <li key={file.key}>{file.key}</li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;