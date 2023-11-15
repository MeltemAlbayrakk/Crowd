import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header(props) {
  const {
    auth,
    logout,
    setLoginboxVisibility,
    setRegisterboxVisibility,
    isProfileHidden,
  } = props;

  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  return (
    <header className={scroll ? "header fixed" : "header"}>
      <nav className="container">
        <div className="sub__container">
          <Link to="/" className="logo">
            Top Talenter
          </Link>
        </div>
        {!auth && (
          <ul className={auth ? "" : "active"}>
            <li>
              <a onClick={() => setLoginboxVisibility(true)}>Login</a>
            </li>
            <li>
              <a onClick={() => setRegisterboxVisibility(true)}>Get Started</a>
            </li>
          </ul>
        )}
        {auth && (
          <ul className={!auth ? "" : "active"}>
            {!isProfileHidden && (
              <li>
                <Link to={"/personal/update"} >My Profile</Link>
              </li>
            )}
            <li>
              <a onClick={logout}>Logout</a>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
