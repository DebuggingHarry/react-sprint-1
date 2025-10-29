import Logo from "../../images/logo-large.png";
import { Link } from "react-router-dom";

import "./Header.css";

function Header() {
  // Properties ------------------------------------------
  // Hooks -----------------------------------------------
  // Context ---------------------------------------------
  // Methods ---------------------------------------------
  // View ------------------------------------------------
  return (
    <header>
      <Link to="/">
        <img src={Logo} alt="Company Logo" />
      </Link>
      <Link to="/">
        <h1>DASH</h1>
        <h1>AE</h1>
      </Link>
      <div className="login">
        <p>Welcome!</p>
      </div>
    </header>
  );
}

export default Header;
