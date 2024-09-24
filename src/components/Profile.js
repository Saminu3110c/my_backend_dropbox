// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { Form, Button } from 'react-bootstrap';
import './styles/Profile.css';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({ username: '', email: '' });
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUserInfo({
        username: user.username,
        email: user.attributes.email,
      });
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleEmailChange = (e) => setNewEmail(e.target.value);

  const handleUpdateProfile = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { email: newEmail });
      alert('Email updated successfully');
      fetchUserInfo();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Profile</h1>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={userInfo.username} readOnly />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={newEmail || userInfo.email} onChange={handleEmailChange} />
        </Form.Group>
        <Button onClick={handleUpdateProfile} className="btn btn-primary mt-3">
          Update Profile
        </Button>
      </Form>
    </div>
  );
};

export default Profile;