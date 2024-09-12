import React from 'react';
import { remove } from '@aws-amplify/storage';

const FileDelete = ({ fileKey, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await remove(fileKey);
      alert('File deleted successfully!');
      onDeleteSuccess();
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <button onClick={handleDelete}>Delete File</button>
  );
};

export default FileDelete;
