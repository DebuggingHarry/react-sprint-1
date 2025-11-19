import React from "react";
import PropTypes from "prop-types";

function Icon({ children, className = "" }) {
  return <span className={`Icon ${className}`}>{children}</span>;
}

Icon.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

function Plus() {
  return (
    <Icon className="IconPlus" aria-hidden>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 5v14M5 12h14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Icon>
  );
}

Icon.Plus = Plus;

export default Icon;
