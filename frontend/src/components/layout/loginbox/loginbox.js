import RememberMe from "./rememberMe";
import React, { useState } from 'react';


import { Link } from "react-router-dom";

export default function Loginbox(props) {
  const {
    login,
    loginboxVisibility,
    setLoginboxVisibility,
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    loading,
  } = props;

  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div
      className={
        loginboxVisibility ? "modal loginbox active" : "modal loginbox"
      }
      id="loginbox"
    >
      <div className="container">
        <a
          className="close"
          onClick={() => {
            setError("");
            setLoginboxVisibility(false);
          }}
        >
          X
        </a>
        <a className="logo">Login</a>
        <form onSubmit={login}>
          <div>
            <label>E-Mail:</label>
            <input
              type="email"
              placeholder="Please enter your email adress"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              placeholder="Please enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
         <RememberMe rememberMe={rememberMe} handleRememberMeChange={handleRememberMeChange}/>
          <button className={loading ? "loading" : undefined}>Login</button>
          {error && <p>{error}</p>}       
          </form>
          <button className={loading ? "loading" : undefined}>Forgot Password</button>
          <Link to={"/forgot-password"}style={{ alignSelf: "flex-start" }}/>
          <p style={{ padding: "0 15px" }}>Forgot Password ?</p>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}
