import React, { useEffect, useState } from 'react';
import { list } from '@aws-amplify/storage'; // Import list function directly
import { Table, Button } from 'react-bootstrap';
import FileDelete from './FileDelete';
import FileRename from './FileRename';

const FileList = () => {
  const [files, setFiles] = useState([]); // Initialize files as an empty array
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchFiles = async () => {
    try {
      const fileList = await list(''); // Fetch all files
      setFiles(fileList.results || []); // Ensure we set files to an empty array if results are undefined
    } catch (error) {
      console.error("Error fetching file list:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="file-list-container mt-5">
      <h3>Uploaded Files</h3>

      {loading ? (
        <p>Loading files...</p> // Display loading message
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.length > 0 ? ( // Check if files array has elements
              files.map(file => (
                <tr key={file.key}>
                  <td>{file.key}</td>
                  <td>
                    <FileDelete fileKey={file.key} onDeleteSuccess={fetchFiles} />
                    <FileRename oldFileKey={file.key} onRenameSuccess={fetchFiles} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No files found</td> {/* Handle case when no files are available */}
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default FileList;
