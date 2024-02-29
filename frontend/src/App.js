import "./styles/reset.scss";
import "./styles/styles.scss";
import "./styles/responsive.scss";


import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate } from 'react-router-dom';
import LinkedinProvider from './context/LinkedinProvider.js'
import Homepage from './pages/homepage/homepage';
import Profile from './pages/profile/index';
import LoadingProfile from './pages/loading/index';
import UpdateUser from './pages/profile/tabs/profile/personal/profile';
import Showprofile from './pages/profile/tabs/profile/personal/showProfile';
import ShowAI from "./pages/profile/tabs/search-job/showAI";
import LinkedinContext from './context/LinkedinContext.js'
import handlePostMessage from './components/layout/loginbox/loginbox.js'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // Kullanıcının ID'sini saklamak için
  const { linkedinId, setLinkedinId } = useContext(LinkedinContext);
  console.log(linkedinId)


  useEffect(() => {
    const checkSession = async () => {

      console.log(linkedinId)
      setUserId(linkedinId)

      try {
        const response = await axios.get('http://localhost:3001/user/check-session', { withCredentials: true });
        console.log(response)


        const token = localStorage.getItem("userToken")

        if (response.data.loggedIn || token) {
          setIsLoggedIn(true);

          console.log(token)
          console.log(response.data.userId)

          setUserId(response.data.userId); // Kullanıcının ID'sini sakla
          console.log(userId)


        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Oturum kontrolünde hata:', error);
        setIsLoggedIn(false);
        localStorage.removeItem("userToken")
      }
    };

    checkSession();


    console.log(linkedinId)
    setUserId(linkedinId)

  }, []);



  return (
    <LinkedinProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/personal/update" element={isLoggedIn ? <UpdateUser /> : <Navigate to="/" />} />
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              userId ? (<Navigate to={`/profile/${userId}`} replace={true} />
              ) : (
                <LoadingProfile />
              )
            ) : (
              <Navigate to="/profile/:id" />
            )
          }
        />
        <Route path="/loading/profile" element={<LoadingProfile />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/showProfile" element={<Showprofile />} />
        <Route path="/showAI" element={<ShowAI />} />
      </Routes>
    </LinkedinProvider>
  );
}

export default App;
