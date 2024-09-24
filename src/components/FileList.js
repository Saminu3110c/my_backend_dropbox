// import React, { useState, useEffect } from 'react';
// // import { Storage } from 'aws-amplify';
// import { list, getUrl, remove } from 'aws-amplify/storage';
// import { ListGroup, Button } from 'react-bootstrap';
// import './styles/FileList.css'; 

// const FileList = () => {
//   const [files, setFiles] = useState([]);
//   const [currentFolder, setCurrentFolder] = useState('');
//   const [previewUrl, setPreviewUrl] = useState('');

//   useEffect(() => {
//     listFiles();
//   }, [currentFolder]);

//   const listFiles = async () => {
//     try {
//       const result = await list(currentFolder);
//       setFiles(result);
//     } catch (error) {
//       console.error('Error listing files:', error);
//     }
//   };

//   const handleFolderClick = (folder) => {
//     setCurrentFolder(`${folder}/`);
//   };

//   const handleDelete = async (fileKey) => {
//     try {
//     //   await Storage.remove(fileKey);
//     await remove(fileKey);
//       listFiles();
//     } catch (error) {
//       console.error('Error deleting file:', error);
//     }
//   };

//   const handlePreview = async (fileKey) => {
//     try {  // const signedURL = await Storage.get(fileKey);
//       const signedURL = await getUrl(fileKey);
//       setPreviewUrl(signedURL);
//     } catch (error) {
//       console.error('Error getting file:', error);
//     }
//   };

//   const handleShareLink = async (fileKey) => {
//     try {
//       const signedURL = await getUrl(fileKey, { expires: 3600 });
//       alert(`Sharable link: ${signedURL}`);
//     } catch (error) {
//       console.error('Error creating shareable link:', error);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h1>My Files</h1>
//       <ListGroup>
//         {files.map((file) => (
//           <ListGroup.Item key={file.key}>
//             {file.key.endsWith('/') ? (
//               <span onClick={() => handleFolderClick(file.key)} style={{ cursor: 'pointer' }}>
//                 📁 {file.key}
//               </span>
//             ) : (
//               <span>{file.key}</span>
//             )}
//             {!file.key.endsWith('/') && (
//               <>
//                 <Button variant="danger" onClick={() => handleDelete(file.key)} className="ml-3">
//                   Delete
//                 </Button>
//                 <Button onClick={() => handlePreview(file.key)} className="ml-3">
//                   Preview
//                 </Button>
//                 <Button onClick={() => handleShareLink(file.key)} className="ml-3">
//                   Share Link
//                 </Button>
//               </>
//             )}
//           </ListGroup.Item>
//         ))}
//       </ListGroup>
//       {previewUrl && (
//         <div className="mt-3">
//           <img src={previewUrl} alt="File Preview" className="img-fluid" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileList;

// import React, { useState, useEffect } from 'react';
// import { list, getUrl, remove } from 'aws-amplify/storage';
// import { ListGroup, Button } from 'react-bootstrap';
// import './styles/FileList.css';

// const FileList = () => {
//   const [files, setFiles] = useState([]);
//   const [currentFolder, setCurrentFolder] = useState('');
//   const [previewUrl, setPreviewUrl] = useState('');

//   useEffect(() => {
//     listFiles();
//   }, [currentFolder]);

//   const listFiles = async () => {
//     try {
//       const result = await list(currentFolder);
//       // Ensuring result is an array before setting it to the state
//       if (Array.isArray(result)) {
//         setFiles(result);
//       } else {
//         setFiles([]);  // In case it's not an array, set it as an empty array
//       }
//     } catch (error) {
//       console.error('Error listing files:', error);
//     }
//   };

//   const handleFolderClick = (folder) => {
//     setCurrentFolder(`${folder}/`);
//   };

//   const handleDelete = async (fileKey) => {
//     try {
//       await remove(fileKey);
//       listFiles();  // Refresh the file list after deletion
//     } catch (error) {
//       console.error('Error deleting file:', error);
//     }
//   };

//   const handlePreview = async (fileKey) => {
//     try {
//       const signedURL = await getUrl(fileKey);
//       setPreviewUrl(signedURL);
//     } catch (error) {
//       console.error('Error getting file preview:', error);
//     }
//   };

//   const handleShareLink = async (fileKey) => {
//     try {
//       const signedURL = await getUrl(fileKey, { expires: 3600 });
//       alert(`Sharable link: ${signedURL}`);
//     } catch (error) {
//       console.error('Error creating shareable link:', error);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h1>My Files</h1>
//       <ListGroup>
//         {files.length > 0 ? (
//           files.map((file) => (
//             <ListGroup.Item key={file.key}>
//               {file.key.endsWith('/') ? (
//                 <span onClick={() => handleFolderClick(file.key)} style={{ cursor: 'pointer' }}>
//                   📁 {file.key}
//                 </span>
//               ) : (
//                 <span>{file.key}</span>
//               )}
//               {!file.key.endsWith('/') && (
//                 <>
//                   <Button variant="danger" onClick={() => handleDelete(file.key)} className="ml-3">
//                     Delete
//                   </Button>
//                   <Button onClick={() => handlePreview(file.key)} className="ml-3">
//                     Preview
//                   </Button>
//                   <Button onClick={() => handleShareLink(file.key)} className="ml-3">
//                     Share Link
//                   </Button>
//                 </>
//               )}
//             </ListGroup.Item>
//           ))
//         ) : (
//           <p>No files found in this folder.</p>
//         )}
//       </ListGroup>
//       {previewUrl && (
//         <div className="mt-3">
//           <img src={previewUrl} alt="File Preview" className="img-fluid" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileList;

// import React, { useState } from 'react';
// import { getUrl, remove } from 'aws-amplify/storage';
// import { ListGroup, Button } from 'react-bootstrap';
// import './styles/FileList.css';

// const FileList = ({ files, setFiles, currentFolder, setCurrentFolder }) => {
//   const [previewUrl, setPreviewUrl] = useState('');

//   const handleFolderClick = (folder) => {
//     setCurrentFolder(`${folder}/`);
//   };

//   const handleDelete = async (fileKey) => {
//     try {
//       await remove(fileKey);
//       // Optionally: Remove the file from the list locally instead of refetching
//       setFiles(files.filter((file) => file.key !== fileKey));
//     } catch (error) {
//       console.error('Error deleting file:', error);
//     }
//   };

//   const handlePreview = async (fileKey) => {
//     try {
//       const signedURL = await getUrl(fileKey);
//       setPreviewUrl(signedURL);
//     } catch (error) {
//       console.error('Error getting file preview:', error);
//     }
//   };

//   const handleShareLink = async (fileKey) => {
//     try {
//       const signedURL = await getUrl(fileKey, { expires: 3600 });
//       alert(`Sharable link: ${signedURL}`);
//     } catch (error) {
//       console.error('Error creating shareable link:', error);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h1>My Files</h1>
//       <ListGroup>
//         {files.length > 0 ? (
//           files.map((file) => (
//             <ListGroup.Item key={file.key}>
//               {file.key.endsWith('/') ? (
//                 <span onClick={() => handleFolderClick(file.key)} style={{ cursor: 'pointer' }}>
//                   📁 {file.key}
//                 </span>
//               ) : (
//                 <span>{file.key}</span>
//               )}
//               {!file.key.endsWith('/') && (
//                 <>
//                   <Button variant="danger" onClick={() => handleDelete(file.key)} className="ml-3">
//                     Delete
//                   </Button>
//                   <Button onClick={() => handlePreview(file.key)} className="ml-3">
//                     Preview
//                   </Button>
//                   <Button onClick={() => handleShareLink(file.key)} className="ml-3">
//                     Share Link
//                   </Button>
//                 </>
//               )}
//             </ListGroup.Item>
//           ))
//         ) : (
//           <p>No files found in this folder.</p>
//         )}
//       </ListGroup>
//       {previewUrl && (
//         <div className="mt-3">
//           <img src={previewUrl} alt="File Preview" className="img-fluid" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileList;


import React, { useState, useEffect } from 'react';
// import { Storage } from 'aws-amplify'; // Import Amplify's Storage service
import { ListGroup, Button } from 'react-bootstrap';
import './styles/FileList.css';

const Amplify = require('aws-amplify');
const Storage = Amplify.Storage;

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [currentFolder, setCurrentFolder] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    listFiles(); // Fetch files when currentFolder changes
  }, [currentFolder]);

  const listFiles = async () => {
    try {
      const result = await Storage.list(currentFolder); // List files using AWS Amplify Storage
      setFiles(result); // Update state with listed files
    } catch (error) {
      console.error('Error listing files:', error);
    }
  };

  const handleFolderClick = (folder) => {
    setCurrentFolder(`${folder}/`);
  };

  const handleDelete = async (fileKey) => {
    try {
      await Storage.remove(fileKey); // Delete file using Amplify Storage remove method
      listFiles(); // Refresh file list after deletion
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handlePreview = async (fileKey) => {
    try {
      const signedURL = await Storage.get(fileKey); // Generate signed URL for file preview
      setPreviewUrl(signedURL);
    } catch (error) {
      console.error('Error getting file:', error);
    }
  };

  const handleShareLink = async (fileKey) => {
    try {
      const signedURL = await Storage.get(fileKey, { expires: 3600 }); // Generate shareable URL
      alert(`Sharable link: ${signedURL}`);
    } catch (error) {
      console.error('Error creating shareable link:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>My Files</h1>
      <ListGroup>
        {files.map((file) => (
          <ListGroup.Item key={file.key}>
            {file.key.endsWith('/') ? (
              <span onClick={() => handleFolderClick(file.key)} style={{ cursor: 'pointer' }}>
                📁 {file.key}
              </span>
            ) : (
              <span>{file.key}</span>
            )}
            {!file.key.endsWith('/') && (
              <>
                <Button variant="danger" onClick={() => handleDelete(file.key)} className="ml-3">
                  Delete
                </Button>
                <Button onClick={() => handlePreview(file.key)} className="ml-3">
                  Preview
                </Button>
                <Button onClick={() => handleShareLink(file.key)} className="ml-3">
                  Share Link
                </Button>
              </>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      {previewUrl && (
        <div className="mt-3">
          <img src={previewUrl} alt="File Preview" className="img-fluid" />
        </div>
      )}
    </div>
  );
};

export default FileList;

