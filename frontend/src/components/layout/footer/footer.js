import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="sub__container">
          <Link to="/" className="logo">
            Top Talenter
          </Link>
        </div>
        <div className="copyright">
          © Top Talenter 2023 all rights reserved.
        </div>
      </div>
    </footer>
  );
}
