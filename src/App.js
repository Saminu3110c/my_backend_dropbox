// // import logo from './logo.svg';
// // import './App.css';
// import React from 'react';
// import { Amplify } from 'aws-amplify';
// import awsmobile from './aws-exports';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Authenticator } from '@aws-amplify/ui-react'; // Replace AmplifyAuthenticator with Authenticator
// import FileUpload from './components/FileUpload';
// import FileList from './components/FileList';
// import Profile from './components/Profile';
// import { Container, Navbar, Nav } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// Amplify.configure(awsmobile);

// const App = () => {
//   return (
//     <Authenticator>
//       {({ signOut, user }) => (
//         <Router>
//           <Navbar bg="dark" variant="dark">
//             <Container>
//               <Navbar.Brand href="/">My Backend Dropbox</Navbar.Brand>
//               <Nav className="me-auto">
//                 <Nav.Link href="/">Files</Nav.Link>
//                 <Nav.Link href="/upload">Upload</Nav.Link>
//                 <Nav.Link href="/profile">Profile</Nav.Link>
//               </Nav>
//               <Navbar.Text>
//                 Signed in as: {user.username}
//               </Navbar.Text>
//               <Nav.Link onClick={signOut} className="text-light">
//                 Sign Out
//               </Nav.Link>
//             </Container>
//           </Navbar>
//           <Routes>
//             <Route path="/" element={<FileList />} />
//             <Route path="/upload" element={<FileUpload />} />
//             <Route path="/profile" element={<Profile />} />
//           </Routes>
//         </Router>
//       )}
//     </Authenticator>
//   );
// };

// export default App;


import React from 'react';
import { Amplify } from 'aws-amplify';
import awsmobile from './aws-exports';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react'; // Replace AmplifyAuthenticator with Authenticator
import FileManagement from './components/FileManagement'; // Import the FileManagement component
// import Profile from './components/Profile';
import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Amplify.configure(awsmobile);

const App = () => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Router>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">My Backend Dropbox</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/">Files</Nav.Link>
                <Nav.Link href="/upload">Upload</Nav.Link>
                {/* <Nav.Link href="/profile">Profile</Nav.Link> */}
              </Nav>
              <Navbar.Text>
                Signed in as: {user.username}
              </Navbar.Text>
              <Nav.Link onClick={signOut} className="text-light">
                Sign Out
              </Nav.Link>
            </Container>
          </Navbar>
          <Routes>
            {/* Use the FileManagement component for both file listing and upload */}
            <Route path="/" element={<FileManagement />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
          </Routes>
        </Router>
      )}
    </Authenticator>
  );
};

export default App;