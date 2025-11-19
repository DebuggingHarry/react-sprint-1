import PropTypes from "prop-types";
import Icon from "./Icons.js";

// Basic Action button (also exported as default)
export function Action({ children, onClick, showText = false, buttonText }) {
  return (
    <button className="Action" onClick={onClick}>
      {children} {showText && <p>{buttonText}</p>}
    </button>
  );
}

Action.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  showText: PropTypes.bool,
  buttonText: PropTypes.string,
};

export function ActionTray({ children }) {
  return <div className="ActionTray">{children}</div>;
}

ActionTray.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export function Add({ onClick, showText = false, buttonText = "Add" }) {
  return (
    <Action buttonText={buttonText} onClick={onClick} showText={showText}>
      <Icon.Plus />
    </Action>
  );
}

Add.propTypes = {
  onClick: PropTypes.func.isRequired,
  showText: PropTypes.bool,
  buttonText: PropTypes.string,
};

export function Submit({ onClick, showText = false, buttonText = "Submit" }) {
  return (
    <Action buttonText={buttonText} onClick={onClick} showText={showText}>
      <Icon.Tick />
    </Action>
  );
}

Submit.propTypes = {
  onClick: PropTypes.func.isRequired,
  showText: PropTypes.bool,
  buttonText: PropTypes.string,
};

Cancel.propTypes = Action.propTypes;

export function Cancel({ onClick, showText = false, buttonText = "Cancel" }) {
  return (
    <Action buttonText={buttonText} onClick={onClick} showText={showText}>
      <Icon.Cross />
    </Action>
  );
}

export default Action;
