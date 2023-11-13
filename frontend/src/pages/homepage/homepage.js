import api from "../../services/api";
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
  useEffect(() => {
    document.getElementById("root").classList.add("homepage");
  }, []);

  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));

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
      const response = await axios.post('http://localhost:3000/user/login', {
        email: email,
        password: password
      });
  
      // Check the response status code
      if (response.status === 201) {
        alert("Login successful"); // You can add redirection logic here
      } else {
        alert("Unexpected response from server"); // Handle unexpected response codes
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          alert("Invalid email or password. Please try again."); // Handle 401 Unauthorized error
        } else {
          alert("Server error. Please try again later."); // Handle other server errors
        }
      } else if (error.request) {
        // The request was made but no response was received
        alert("No response from server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an error
        alert("Request failed. Please check your internet connection and try again.");
      }
    }
  };
  const logout = () => {
    setAuth(false);
    setLoginboxVisibility(false);
    localStorage.removeItem("auth");
  };

  const register = async (event) => {
    fetch("http://localhost:3000/user/register/individual",registerData).then((res) => res.json())
    .then((data) => {
       alert(data);
    })
    .catch((err) => {
       console.log(err.message);
    });
  };

  return (
    <div className="wrapper homepage">
      <Header
        auth={auth}
        logout={logout}
        setLoginboxVisibility={setLoginboxVisibility}
        setRegisterboxVisibility={setRegisterboxVisibility}
      />
      <Banner setRegisterboxVisibility={setRegisterboxVisibility} />
      <Sidebox />
      <Footer />
      {!auth && (
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
