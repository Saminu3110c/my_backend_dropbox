import { faFile, faTrash, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { storage, database } from "../../firebase";

export default function File({ file, onDelete }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const imageExtensions = ["jpg", "jpeg", "png", "gif"];
    if (imageExtensions.includes(fileExtension)) {
      setIsImage(true);
    }
  }, [file]);

  const handleDelete = async () => {
    const fileRef = storage.refFromURL(file.url);

    try {
  
      await fileRef.delete();

  
      if (file.id) {
        await database.files.doc(file.id).delete();
      }

      setIsDeleted(true);
      onDelete(file.id); 

    } catch (error) {
      console.error("Error deleting file:", error);
    
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(file.url);
    alert("Link copied to clipboard!");
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div className="d-flex flex-column justify-content-between align-items-center w-100">
      <a href={file.url} >
      {isImage ? (
        <img src={file.url} alt={file.name} style={{ maxWidth: "100px", maxHeight: "100px" }} />
      ) : (
        <FontAwesomeIcon icon={faFile} className="file-icon" style={{ fontSize: "50px" }} />
      )}</a>
      <p className="text-truncate">{file.name}</p>
      
      <div className="d-flex justify-content-between w-100">
        <Button variant="outline-success" onClick={handleShare}>
          <FontAwesomeIcon icon={faShare} />
        </Button>
        <Button variant="outline-danger" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    </div>
  );
}
