import "./styles/reset.scss";
import "./styles/styles.scss";
import "./styles/responsive.scss";


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate } from 'react-router-dom';

import Homepage from './pages/homepage/homepage';
import Profile from './pages/profile/index';
import LoadingProfile from './pages/loading/index';
import UpdateUser from './pages/profile/tabs/profile/personal/profile';
 import Showprofile from './pages/profile/tabs/profile/personal/showProfile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // Kullanıcının ID'sini saklamak için

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:3001/user/check-session', { withCredentials: true });

        if (response.data.loggedIn) {
          setIsLoggedIn(true);

          console.log(response.data.userId)
          setUserId(response.data.userId); // Kullanıcının ID'sini sakla
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Oturum kontrolünde hata:', error);
        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/personal/update" element={isLoggedIn ? <UpdateUser /> : <Navigate to="/" />} />
      <Route
        path="/profile"
        element={
          isLoggedIn ? (
            userId ? (
              <Navigate to={`/profile/${userId}`} replace={true} />
            ) : (
              <LoadingProfile />
            )
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="/loading/profile" element={<LoadingProfile />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/showProfile" element={<Showprofile />} />

    </Routes>
  );
}

export default App;
