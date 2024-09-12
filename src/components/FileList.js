import React, { useEffect, useState } from 'react';
// import { Storage } from 'aws-amplify';
// import { Storage } from '@aws-amplify/storage';
// import { uploadData, downloadData, list, remove } from '@aws-amplify/storage';
import { list } from '@aws-amplify/storage';
import FileDelete from './FileDelete';
import FileRename from './FileRename';


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
          <li key={file.key}>{file.key}<FileRename oldFileKey={file.key} onRenameSuccess={fetchFiles} /><FileDelete fileKey={file.key} onDeleteSuccess={fetchFiles} /></li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;