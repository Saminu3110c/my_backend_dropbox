// import React, { useState } from 'react';
// // import { Storage } from 'aws-amplify';
// import { uploadData, getUrl, remove } from 'aws-amplify/storage';
// import { Form, Button } from 'react-bootstrap';
// import './styles/FileUpload.css'; // Importing the CSS for styling

// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [folderName, setFolderName] = useState('');

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleFolderChange = (event) => {
//     setFolderName(event.target.value);
//   };

//   const handleUpload = async () => {
//     try { 
//       const fileKey = folderName ? `${folderName}/${file.name}` : file.name;
//     //   await Storage.put(fileKey, file);
//     await uploadData({ key: fileKey, data: file });
//       alert('File uploaded successfully!');
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h1>Upload a File</h1>
//       <Form.Group controlId="formFolderName">
//         <Form.Label>Folder Name (Optional)</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter folder name"
//           value={folderName}
//           onChange={handleFolderChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="formFile">
//         <Form.Label>Choose File</Form.Label>
//         <Form.Control type="file" onChange={handleFileChange} />
//       </Form.Group>
//       <Button onClick={handleUpload} className="btn btn-primary mt-3">
//         Upload
//       </Button>
//     </div>
//   );
// };

// export default FileUpload;

import React, { useState } from 'react';
// import { Storage } from 'aws-amplify';
import { uploadData, getUrl, remove } from 'aws-amplify/storage';
import { Form, Button } from 'react-bootstrap';
import './styles/FileUpload.css';

const Amplify = require('aws-amplify');
const Storage = Amplify.Storage;


const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [folderName, setFolderName] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFolderChange = (event) => {
    setFolderName(event.target.value);
  };

//   const handleUpload = async () => {
//     try { //   await Storage.put(fileKey, file);
//         //     await uploadData({ key: fileKey, data: file });
//       const fileKey = folderName ? `${folderName}/${file.name}` : file.name;
//       await uploadData({ key: fileKey, data: file });
//       alert('File uploaded successfully!');
//       onUploadSuccess();  // Notify the parent component to refresh the file list
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };

  const handleUpload = async () => {
    try {
      const fileKey = folderName ? `${folderName}/${file.name}` : file.name;
      await Storage.put(fileKey, file);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  

  return (
    <div className="container mt-5">
      <h1>Upload a File</h1>
      <Form.Group controlId="formFolderName">
        <Form.Label>Folder Name (Optional)</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter folder name"
          value={folderName}
          onChange={handleFolderChange}
        />
      </Form.Group>
      <Form.Group controlId="formFile">
        <Form.Label>Choose File</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>
      <Button onClick={handleUpload} className="btn btn-primary mt-3">
        Upload
      </Button>
    </div>
  );
};

export default FileUpload;
