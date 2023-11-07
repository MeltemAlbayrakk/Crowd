import "./styles/reset.scss";
import "./styles/styles.scss";
import "./styles/responsive.scss";

import { Routes, Route, HashRouter } from "react-router-dom";

import Homepage from "./pages/homepage/homepage";
import Profile from "./pages/profile/index";
import LoadingProfile from "./pages/loading/index";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/loading/profile" element={<LoadingProfile />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
