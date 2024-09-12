import React from 'react';
import { remove } from '@aws-amplify/storage'; // Use remove function directly
import { Button } from 'react-bootstrap';

const FileDelete = ({ fileKey, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await remove(fileKey);
      onDeleteSuccess();
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <Button variant="danger" onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default FileDelete;
