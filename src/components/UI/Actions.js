import PropTypes from "prop-types";
import Icon from "./Icons.js";
import "./Actions.css";

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

export function Remove({ onClick, showText = false, buttonText = "Remove" }) {
  return (
    <Action buttonText={buttonText} onClick={onClick} showText={showText}>
      <Icon.Minus />
    </Action>
  );
}

Remove.propTypes = {
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
  children: PropTypes.node,
};

Cancel.propTypes = Action.propTypes;

export function Cancel({ onClick, showText = false, buttonText = "Cancel" }) {
  return (
    <Action buttonText={buttonText} onClick={onClick} showText={showText}>
      <Icon.Cross />
    </Action>
  );
}

export function Modify({ onClick, showText = false, buttonText = "Modify" }) {
  return (
    <Action buttonText={buttonText} onClick={onClick} showText={showText}>
      <Icon.Modify />
    </Action>
  );
}

Modify.propTypes = {
  onClick: PropTypes.func.isRequired,
  showText: PropTypes.bool,
  buttonText: PropTypes.string,
};

export function Delete({ onClick, showText = false, buttonText = "Delete" }) {
  return (
    <Action buttonText={buttonText} onClick={onClick} showText={showText}>
      <Icon.Delete />
    </Action>
  );
}

Delete.propTypes = {
  onClick: PropTypes.func.isRequired,
  showText: PropTypes.bool,
  buttonText: PropTypes.string,
};

export function Yes({ onClick, showText = false, buttonText = "Yes" }) {
  return (
    <Action buttonText={buttonText} onClick={onClick} showText={showText}>
      <Icon.Yes />
    </Action>
  );
}

Yes.propTypes = {
  onClick: PropTypes.func.isRequired,
  showText: PropTypes.bool,
  buttonText: PropTypes.string,
};

export function No({ onClick, showText = false, buttonText = "No" }) {
  return (
    <Action buttonText={buttonText} onClick={onClick} showText={showText}>
      <Icon.No />
    </Action>
  );
}

No.propTypes = {
  onClick: PropTypes.func.isRequired,
  showText: PropTypes.bool,
  buttonText: PropTypes.string,
};

export default Action;
