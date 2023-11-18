import "./styles/reset.scss";
import "./styles/styles.scss";
import "./styles/responsive.scss";
import React, { useState, useEffect } from 'react';
import axios from 'axios';


import { Routes, Route, HashRouter,Navigate  } from "react-router-dom";

import Homepage from "./pages/homepage/homepage";
import Profile from "./pages/profile/index";
import LoadingProfile from "./pages/loading/index";

// import Profile2 from "./pages/profile/tabs/profile/personal/profile";
import UpdateUser from "./pages/profile/tabs/profile/personal/profile";
import api from "./services/api";
import { faL } from "@fortawesome/free-solid-svg-icons";




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    // Kullanıcı oturum kontrolü
    const checkSession = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user/check-session", { withCredentials: true });

        if (response.data.loggedIn) {
          setIsLoggedIn(true); // Oturum varsa true yap
        } else {
          setIsLoggedIn(false); // Oturum yoksa false yap
        }
      } catch (error) {
        console.error("Oturum kontrolünde hata:", error);
        setIsLoggedIn(false);
      }
    };

    checkSession(); // sayfa yüklendiğinde oturumu kontrol et
  }, []);


  return (
    <Routes>
        <Route  path="/" element={<Homepage />} />
        {/* <Route  path="/meltem" element={<Meltem />} /> */}
        <Route  path="/personal/update"   element={isLoggedIn ? <UpdateUser /> : <Navigate to="/" />}
 />

        {/* <Route  path="/profile" element={<Profile />} />
        <Route  path="/loading/profile" element={<LoadingProfile />} />
         <Route  path="/personal/update" element={<UpdateUser profile={api.user.profile.get()} />}/>  */}
   

      </Routes>
  );
}

export default App;
