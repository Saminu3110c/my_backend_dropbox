import React, { useState, useEffect } from "react";
import AddFileButton from "./Add_File";
import Folder from "./Folder";
import File from "./File";
import { Container } from "react-bootstrap";
import { useFolder } from "../../useFolder";
import AddFolderButton from "./Add_Folder";
import Navbar from "../Navbar";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import { useParams, useLocation } from "react-router-dom";

export default function Dashboard() {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(folderId, state.folder);

  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (childFiles) {
      setFiles(childFiles);
    }
  }, [childFiles]);

  const handleDeleteFile = (fileId) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
  };

  return (
    <>
      <Navbar />
      <Container fluid>
        <div className="d-flex align-items-center">
          <FolderBreadcrumbs currentFolder={folder} />
          <AddFileButton currentFolder={folder} />
          <AddFolderButton currentFolder={folder} />
        </div>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((childFolder) => (
              <div key={childFolder.id} style={{ maxWidth: "150px" }} className="p-2">
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}
        {childFolders.length > 0 && files.length > 0 && <hr />}
        {files.length > 0 ? (
          <div className="d-flex flex-wrap">
            {files.map((childFile) => (
              <div key={childFile.id} style={{ maxWidth: "150px" }} className="p-2">
                {/* Pass handleDeleteFile to the File component */}
                <File file={childFile} onDelete={handleDeleteFile} />
              </div>
            ))}
          </div>
        ) : (
          <p>No files found</p>
        )}
      </Container>
    </>
  );
}
