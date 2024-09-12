// import React, { useState } from 'react';
// // Import 'put' directly from '@aws-amplify/storage'
// import {put} from '@aws-amplify/storage';
// import { Form, Button, Alert } from 'react-bootstrap';

// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [fileInfo, setFileInfo] = useState(null);
//   const [alertMessage, setAlertMessage] = useState(null);
//   const [alertVariant, setAlertVariant] = useState('success');

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setAlertMessage('Please choose a file first!');
//       setAlertVariant('danger');
//       return;
//     }

//     try {
//       // Use 'put' directly for file upload
//       const response = await put(file.name, file, {
//         contentType: file.type,
//       });

//       const newFileInfo = {
//         key: response.key, // S3 key for the uploaded file
//         size: file.size,
//         type: file.type,
//         lastModified: file.lastModifiedDate.toString(),
//       };

//       setFileInfo(newFileInfo);
//       setAlertMessage('File uploaded successfully!');
//       setAlertVariant('success');
//     } catch (error) {
//       setAlertMessage('Error uploading file!');
//       setAlertVariant('danger');
//       console.error("Error uploading file:", error);
//     }
//   };

//   return (
//     <div className="file-upload-container">
//       <Form>
//         <Form.Group controlId="formFile">
//           <Form.Label>Choose File to Upload</Form.Label>
//           <Form.Control type="file" onChange={handleFileChange} />
//         </Form.Group>
//         <Button variant="primary" onClick={handleUpload}>
//           Upload File
//         </Button>
//       </Form>

//       {/* Alert for upload success or error */}
//       {alertMessage && (
//         <Alert variant={alertVariant} className="mt-3">
//           {alertMessage}
//         </Alert>
//       )}

//       {/* Display new file info */}
//       {fileInfo && (
//         <div className="mt-3">
//           <h5>File Information</h5>
//           <p><strong>File Name:</strong> {fileInfo.key}</p>
//           <p><strong>File Size:</strong> {fileInfo.size} bytes</p>
//           <p><strong>File Type:</strong> {fileInfo.type}</p>
//           <p><strong>Last Modified:</strong> {fileInfo.lastModified}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;


import React, { useState } from 'react';
// Import 'uploadData' directly from '@aws-amplify/storage'
import { uploadData } from '@aws-amplify/storage';
import { Form, Button, Alert } from 'react-bootstrap';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState('success');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setAlertMessage('Please choose a file first!');
      setAlertVariant('danger');
      return;
    }

    try {
      // Use 'uploadData' to upload the file
      const response = await uploadData(file.name, file, {
        contentType: file.type,
      });

      const newFileInfo = {
        key: response.key, // S3 key for the uploaded file
        size: file.size,
        type: file.type,
        lastModified: file.lastModifiedDate.toString(),
      };

      setFileInfo(newFileInfo);
      setAlertMessage('File uploaded successfully!');
      setAlertVariant('success');
    } catch (error) {
      setAlertMessage('Error uploading file!');
      setAlertVariant('danger');
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="file-upload-container">
      <Form>
        <Form.Group controlId="formFile">
          <Form.Label>Choose File to Upload</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button variant="primary" onClick={handleUpload}>
          Upload File
        </Button>
      </Form>

      {/* Alert for upload success or error */}
      {alertMessage && (
        <Alert variant={alertVariant} className="mt-3">
          {alertMessage}
        </Alert>
      )}

      {/* Display new file info */}
      {fileInfo && (
        <div className="mt-3">
          <h5>File Information</h5>
          <p><strong>File Name:</strong> {fileInfo.key}</p>
          <p><strong>File Size:</strong> {fileInfo.size} bytes</p>
          <p><strong>File Type:</strong> {fileInfo.type}</p>
          <p><strong>Last Modified:</strong> {fileInfo.lastModified}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
