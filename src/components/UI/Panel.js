import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import "./Panel.css";

Panel.propTypes = {
  title: PropTypes.string,
  level: PropTypes.number,
  isOpen: PropTypes.bool,
};

export default function Panel({ children, title, level = 1, isOpen = false }) {
  // Initialise ----------------------------------
  // State ---------------------------------------
  const [isExpanded, setIsExpanded] = useState(isOpen);

  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <div
      className={
        "Panel PanelLevel" +
        level +
        (isExpanded ? " PanelOpen" : " PanelClosed")
      }
    >
      <header onClick={() => setIsExpanded(!isExpanded)}>
        <span className="title">{title}</span>
      </header>
      {isExpanded && <main>{children}</main>}
    </div>
  );
}

Static.propTypes = {
  level: PropTypes.number,
};

function Static({ children, level }) {
  // Initialise ----------------------------------
  // State ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return <div className={"StaticPanel PanelLevel" + level}>{children}</div>;
}

Container.propTypes = {
  className: PropTypes.string,
};

function Container({ children, className = "" }) {
  return <div className={"PanelContainer " + className}>{children}</div>;
}

Panel.Container = Container;
Panel.Static = Static;
