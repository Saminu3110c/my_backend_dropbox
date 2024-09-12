import React, { useState } from 'react';
// import { Storage } from 'aws-amplify';
// import { Storage } from '@aws-amplify/storage';
import { uploadData, downloadData, list, remove, put } from '@aws-amplify/storage';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  
  const handleUpload = async () => {
    if (!file) {
      alert("Please choose a file first!");
      return;
    }
    try {
    //   await Storage.put(file.name, file, {
    //     contentType: file.type,
    //   });
    await uploadData(file.name, file, {
        contentType: file.type,
      });
      alert('File uploaded successfully!');
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
    </div>
  );
};

export default FileUpload;
