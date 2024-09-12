import React, { useState } from 'react';
import { copy, remove, downloadData } from '@aws-amplify/storage'; // Use copy, remove, downloadData directly
import { Button, Form } from 'react-bootstrap';

const FileRename = ({ oldFileKey, onRenameSuccess }) => {
  const [newFileName, setNewFileName] = useState('');

  const handleRename = async () => {
    try {
      const fileContent = await downloadData(oldFileKey); // Fetch the file data
      await copy({ key: oldFileKey }, { key: newFileName });
      await remove(oldFileKey); // Remove old file
      onRenameSuccess();
    } catch (error) {
      console.error("Error renaming file:", error);
    }
  };

  return (
    <Form className="d-inline">
      <Form.Group controlId="newFileName">
        <Form.Control
          type="text"
          placeholder="New file name"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
        />
      </Form.Group>
      <Button variant="warning" onClick={handleRename}>
        Rename
      </Button>
    </Form>
  );
};

export default FileRename;
