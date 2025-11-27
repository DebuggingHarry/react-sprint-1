import { useState } from "react";
import { ActionTray, Submit, Cancel } from "./Actions.js";

export default function Form({ children, onSubmit, onCancel, className = "" }) {
  // Initialisation --------------------------------------
  // Hooks -----------------------------------------------
  // State -----------------------------------------------
  // Context ---------------------------------------------
  // Handlers --------------------------------------------
  const handleSubmit = (event) => {
    event && event.preventDefault && event.preventDefault();
    if (typeof onSubmit === "function") onSubmit(event);
  };
  const handleCancel = (event) => {
    event && event.preventDefault && event.preventDefault();
    if (typeof onCancel === "function") onCancel();
  };
  // View ------------------------------------------------
  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className="FormTray">{children}</div>
      <ActionTray>
        <Submit onClick={handleSubmit} showText={true} buttonText="Submit" />
        <Cancel onClick={handleCancel} showText={true} buttonText="Cancel" />
      </ActionTray>
    </form>
  );
}

function Item({ label, htmlFor, advice, error, children }) {
  // Initialisation --------------------------------------
  // Hooks -----------------------------------------------
  // State -----------------------------------------------
  // Context ---------------------------------------------
  // Handlers --------------------------------------------
  // View ------------------------------------------------
  return (
    <div className="FormItem">
      <label htmlFor={htmlFor} className="FormLabel">
        {label}
      </label>
      {advice && <p className="FormAdvice">{advice}</p>}
      {children}
      {error && <p className="FormError">{error}</p>}
    </div>
  );
}

function useForm(
  initialRecord,
  conformance = {},
  { isValid, errorMessages },
  onDismiss,
  onSubmit
) {
  // Initialisation --------------------------------------

  // Hooks -----------------------------------------------
  // State -----------------------------------------------
  const [record, setRecord] = useState(initialRecord);
  const [errors, setErrors] = useState(
    Object.keys(initialRecord).reduce(
      (accum, key) => ({ ...accum, [key]: null }),
      {}
    )
  );
  // Context ---------------------------------------------
  // Handlers --------------------------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;
    const newRecord = { ...record, [name]: value };
    setRecord(newRecord);

    const newErrors = { ...errors };
    const validator = isValid[name];
    const valid = validator ? validator(newRecord[name], newRecord) : true;
    newErrors[name] = valid ? null : errorMessages[name];

    if (conformance && typeof conformance[name] === "function") {
      try {
        conformance[name](newRecord, newErrors);
      } catch (e) {
        console.error("Conformance hook error:", e);
      }
    }

    setErrors(newErrors);
  };

  const isValidRecord = (record) => {
    let isRecordValid = true;
    const newErrors = { ...errors };
    Object.keys(record).forEach((key) => {
      const validator = isValid[key];
      const value = record[key];
      const valid = validator ? validator(value, record) : true;
      newErrors[key] = valid ? null : errorMessages[key];
      if (!valid) isRecordValid = false;
    });
    setErrors(newErrors);
    return isRecordValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    isValidRecord(record) && onSubmit(record) && onDismiss();
    setErrors({ ...errors });
  };

  // View ------------------------------------------------
  return [record, setRecord, errors, setErrors, handleChange, handleSubmit];
}

Form.Item = Item;
Form.useForm = useForm;
