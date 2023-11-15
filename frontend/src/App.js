import "./styles/reset.scss";
import "./styles/styles.scss";
import "./styles/responsive.scss";


import { Routes, Route, HashRouter } from "react-router-dom";

import Homepage from "./pages/homepage/homepage";
import Profile from "./pages/profile/index";
import LoadingProfile from "./pages/loading/index";
import Meltem from "./pages/meltem";
// import Profile2 from "./pages/profile/tabs/profile/personal/profile";
import UpdateUser from "./pages/profile/tabs/profile/personal/profile";
import api from "./services/api";

function App() {
  return (
    <Routes>
        <Route  path="/" element={<Homepage />} />
        <Route  path="/meltem" element={<Meltem />} />
        <Route  path="/profile" element={<UpdateUser />} />

        {/* <Route  path="/profile" element={<Profile />} />
        <Route  path="/loading/profile" element={<LoadingProfile />} />
         <Route  path="/personal/update" element={<UpdateUser profile={api.user.profile.get()} />}/>  */}
   

      </Routes>
  );
}

export default App;
