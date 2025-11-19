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

function Tick() {
  return (
    <Icon className="IconTick">
      <img
        src="https://img.icons8.com/material-outlined/24/undefined/checkmark--v1.png"
        alt="Tick icon"
      />
    </Icon>
  );
}
function Cross() {
  return (
    <Icon className="IconCross">
      <img
        src="https://img.icons8.com/material-outlined/24/undefined/delete-sign.png"
        alt="Cross icon"
      />
    </Icon>
  );
}

Icon.Plus = Plus;
Icon.Tick = Tick;
Icon.Cross = Cross;
export default Icon;
