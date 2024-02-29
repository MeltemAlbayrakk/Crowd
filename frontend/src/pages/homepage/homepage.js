import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/layout/header/header";
import Footer from "../../components/layout/footer/footer";
import Banner from "../../components/banner/banner";
import Sidebox from "../../components/sidebox/sidebox";
import Loginbox from "../../components/layout/loginbox/loginbox";
import Registerbox from "../../components/layout/registerbox/registerbox";

export default function Homepage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    checkSession();

    document.getElementById("root").classList.add("homepage");
  }, []);


  const [loginboxVisibility, setLoginboxVisibility] = useState(false);
  const [registerboxVisibility, setRegisterboxVisibility] = useState(false);

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("individual");

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirmation: "",
  });

  const navigate = useNavigate();


  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/user/login', {
        email: email,
        password: password
      }, { withCredentials: true });


      if (response.status === 201) {

        setIsLoggedIn(true);
        setLoginboxVisibility(false);
        setLoading(false);

        window.location.reload();


      } else {
        alert("Unexpected response from server");
      }
    } catch (error) {
      if (error.response) {
        setLoading(false);

        if (error.response.status === 401) {
          alert("Invalid email or password. Please try again.");
        } else {
          alert("Server error. Please try again later.");
        }
      } else if (error.request) {

        alert("No response from server. Please try again later.");
      } else {

        alert("Request failed. Please check your internet connection and try again.");
      }
    }
  };
  const logout = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get("http://localhost:3001/user/logout", { withCredentials: true });


      setIsLoggedIn(false);
      setLoginboxVisibility(false);
      //localStorage.removeItem("auth");


    } catch (error) {

    }

  };



  const register = async (event) => {

    event.preventDefault();
    if (activeTab === "corporate") {

      try {
        const response = await axios.post("http://localhost:3001/user/company/register", {
          registerData: registerData
        });

        if (response.status === 201) {
          setRegisterboxVisibility(false);
          setLoading(false);

          alert("Register successful");

        } else {
          alert("Unexpected response from server");
        }
      }

      catch (error) {
        if (error.response) {
          setLoading(false);

          if (error.response.status === 401) {
            alert(error.response.data.error);
          } else {
            alert("Server error. Please try again later.");
          }
        } else if (error.request) {

          alert("No response from server. Please try again later.");
        } else {

          alert("Request failed. Please check your internet connection and try again.");
        }
      }
    }
    else if (activeTab === "individual") {

      try {
        const response = await axios.post("http://localhost:3001/user/personal/register", {
          registerData: registerData
        });

        if (response.status === 201) {
          setRegisterboxVisibility(false);
          setLoading(false);

          alert("Register successful");

        } else {
          alert("Unexpected response from server");
        }
      }

      catch (error) {
        if (error.response) {
          setLoading(false);

          if (error.response.status === 401) {
            alert(error.response.data.error);
          } else {
            alert("Server error. Please try again later.");
          }
        } else if (error.request) {

          alert("No response from server. Please try again later.");
        } else {

          alert("Request failed. Please check your internet connection and try again.");
        }
      }
    }
  }

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

  const loginLinkedin = async () => {
    // const response = await axios.get("http://localhost:3001/auth/linkedin");
    // console.log(response)
    const windowOpen = window.open(
      `http://localhost:3001/auth/linkedin`,
      "_self"
    );

    console.log(windowOpen)

    if (windowOpen != null) {
      window.location.href = 'http://localhost:7000'
      const response = await axios.get("http://localhost:3001/auth/linkedin");
      console.log(response)
    }
  };

  // const LinkedInOAuth = () => {
  //   const handleLogin = async (code) => {
  //     // Exchange the code for an access token
  //     const data = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
  //       method: 'POST',
  //       body: new URLSearchParams({
  //         grant_type: 'authorization_code',
  //         code,
  //         redirect_uri: 'http://localhost:3001/auth/linkedin/callback',
  //         client_id: '7787gti63ys60o',
  //         client_secret: 'UerCC3JrJBBpPWIu',
  //       })
  //     }).then((response) => response.json());

  //     const accessToken = data.access_token;

  //     // Fetch the user's LinkedIn profile
  //     const userProfile = await axios.get('https://api.linkedin.com/v2/userinfo', {
  //       headers: {
  //         'Authorization': `Bearer ${accessToken}`,
  //         'Connection': 'Keep-Alive',
  //       }
  //     });

  //     // Handle the user profile data (e.g., store it in your database and log the user in)
  //     console.log(
  //       `Welcome, ${userProfile} `
  //     );
  //   };

  //   const handleLinkedInCallback = () => {
  //     const queryString = window.location.search;
  //     const urlParams = new URLSearchParams(queryString);
  //     const code = urlParams.get('code');
  //     if (code) handleLogin(code);
  //   };

  //   React.useEffect(() => {
  //     handleLinkedInCallback();
  //   }, []);

  return (
    <div className="wrapper homepage">
      <Header
        auth={isLoggedIn}
        logout={logout}
        setLoginboxVisibility={setLoginboxVisibility}
        setRegisterboxVisibility={setRegisterboxVisibility}
      />
      <Banner setRegisterboxVisibility={setRegisterboxVisibility} />
      <Sidebox />
      <Footer />
      {!isLoggedIn && (
        <>
          <Loginbox
            login={login}
            loginboxVisibility={loginboxVisibility}
            setLoginboxVisibility={setLoginboxVisibility}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={error}
            setError={setError}
            loading={loading}
            loginLinkedin={loginLinkedin}

          />
          <Registerbox
            register={register}
            registerboxVisibility={registerboxVisibility}
            setRegisterboxVisibility={setRegisterboxVisibility}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            registerData={registerData}
            setRegisterData={setRegisterData}
            error={error}
            setError={setError}
            loading={loading}
          />
        </>
      )}
    </div>
  );
}

