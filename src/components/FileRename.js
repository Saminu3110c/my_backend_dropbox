import React, { useState } from 'react';
import { uploadData, downloadData, list, remove } from '@aws-amplify/storage'

const FileRename = ({ oldFileKey, onRenameSuccess }) => {
  const [newFileName, setNewFileName] = useState('');

  const handleRename = async () => {
    try {
      // Copy the old file to the new file
      const fileContent = await downloadData(oldFileKey, { download: true });
      await uploadData(newFileName, fileContent.Body, {
        contentType: fileContent.ContentType,
      });

      // Delete the old file
      await remove(oldFileKey);

      alert('File renamed successfully!');
      onRenameSuccess();
    } catch (error) {
      console.error("Error renaming file:", error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="New file name" 
        value={newFileName} 
        onChange={(e) => setNewFileName(e.target.value)} 
      />
      <button onClick={handleRename}>Rename File</button>
    </div>
  );
};

export default FileRename;
