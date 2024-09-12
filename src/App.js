import logo from './logo.svg';
import './App.css';
import React from 'react';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import { Amplify } from 'aws-amplify';
import awsmobile from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";




Amplify.configure(awsmobile);


function App({ signOut }) {
  return (
    <div className="App">
      <h1>My Backend Dropbox App</h1>
      <button id="hover-button" style={{ height: "100%", padding: ".5rem 2rem", cursor: "pointer", }} onClick={signOut} >Sign Out </button>
      <FileUpload />
      <FileList />
    </div>
  );
}

export default withAuthenticator(App);
