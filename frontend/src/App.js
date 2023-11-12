import "./styles/reset.scss";
import "./styles/styles.scss";
import "./styles/responsive.scss";

import { Routes, Route, HashRouter } from "react-router-dom";

import Homepage from "./pages/homepage/homepage";
import Profile from "./pages/profile/index";
import LoadingProfile from "./pages/loading/index";
// import Profile2 from "./pages/profile/tabs/profile/personal/profile";
import DenemeSayfasi from "./pages/profile/tabs/search-job/search-job"

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/loading/profile" element={<LoadingProfile />} />
                    <Route exact path="/denemesayfasi" element={<DenemeSayfasi />}/> 
      </Routes>
    </HashRouter>
  );
}

export default App;
