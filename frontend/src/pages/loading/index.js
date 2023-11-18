
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/layout/header/header";
import Footer from "../../components/layout/footer/footer";

export default function LoadingProfile(){
    useEffect(() => {
        document.querySelector("#root.homepage")?.classList.remove("homepage");
      }, []);
    
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));
    const navigate = useNavigate();
    const logout = () => {
      setAuth(false);
      localStorage.removeItem("auth");
      navigate("/");
    };

    return (
        <div className="wrapper">
            <Header auth={auth} logout={logout} isProfileHidden={true} />
            <div className="content">
                <div className="loadingText">
                    Bu sayfa şuan yapım aşamasındadır!
                </div>
            </div>
            <Footer />
        </div>
    );
}