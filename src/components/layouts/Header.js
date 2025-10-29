import "./Header.css";
import React from "react";
import Logo from "../../images/logo-large.png";

function Header() {
  // Properties ------------------------------------------
  // Hooks -----------------------------------------------
  // Context ---------------------------------------------
  // Methods ---------------------------------------------
  // View ------------------------------------------------
  return (
    <header>
      <a>
        <img src={Logo} alt="Company Logo" />
      </a>
      <a>
        <h1>DASH</h1>
        <h1>AE</h1>
      </a>
      <div className="login">
        <p>Welcome!</p>
      </div>
    </header>
  );
}

export default Header;
