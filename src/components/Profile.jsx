import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css';
import { useUser } from '../context/UserContext';

const Profile = () => {
  const { email, logout, getProfile } = useUser();

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getProfile();
      if (profileData.email) {}
    };
    fetchProfile();
  }, [getProfile]);

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>
      <p className="profile-email">Correo electrónico: {email}</p>
      <Button variant="danger" onClick={logout} className="logout-button">
        Cerrar sesión
      </Button>
    </div>
  );
};

export default Profile;


