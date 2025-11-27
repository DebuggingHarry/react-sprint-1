import { useState } from "react";
import FormItem from "../../UI/Form.js";
import { ActionTray, Submit, Cancel } from "../../UI/Actions.js";
import "./TrialForm.css";

const emptyTrial = {
  trial_name: "",
  trial_status: "",
  trial_description: "",
  start_date: "",
  end_date: "",
};

export default function TrialForm({
  onDismiss,
  onSubmit,
  initialTrial = emptyTrial,
} = {}) {
  // Initialisation ---------------------------------------
  const isValid = {
    trial_name: (name) => name && name.length > 0,
    trial_status: (status) => ["Draft", "Active", "Closed"].includes(status),
    trial_description: (val) => val && val.toString().trim().length > 0,
    start_date: (val) => {
      if (!val) return false;
      const start = new Date(val);
      return !isNaN(start.getTime()) && start.getTime() > Date.now();
    },
    end_date: (val, trialObj) => {
      if (!val) return false;
      const end = new Date(val);
      const start = new Date(trialObj.start_date);
      if (isNaN(end.getTime())) return false;
      if (!trialObj.start_date || isNaN(start.getTime())) return false;
      return end.getTime() > start.getTime();
    },
  };

  const errorMessages = {
    trial_name: "Trial name is required.",
    trial_status: "Status must be one of: Draft, Active or Closed.",
    trial_description: "Description is required.",
    start_date: "Start date must be in the future.",
    end_date: "End date must be after the start date.",
  };
  // state ------------------------------------------------
  const [trial, setTrial] = useState(initialTrial);
  const [errors, setErrors] = useState(
    Object.keys(emptyTrial).reduce(
      (accum, key) => ({ ...accum, [key]: null }),
      {}
    )
  );

  // Handlers ---------------------------------------------
  const handleChange = (event) => {
    const [name, value] = [event.target.name, event.target.value];
    const newTrial = { ...trial, [name]: value };
    setTrial(newTrial);

    const newErrors = { ...errors };
    const validator = isValid[name];
    const valid = validator ? validator(value, newTrial) : true;
    newErrors[name] = valid ? null : errorMessages[name];

    if (name === "start_date" && newTrial.end_date) {
      const endValid = isValid.end_date(newTrial.end_date, newTrial);
      newErrors.end_date = endValid ? null : errorMessages.end_date;
    }

    setErrors(newErrors);
  };

  const isValidTrial = (trial) => {
    let isTrialValid = true;
    const newErrors = { ...errors };
    Object.keys(emptyTrial).forEach((key) => {
      const validator = isValid[key];
      const value = trial[key];
      const valid = validator ? validator(value, trial) : true;
      newErrors[key] = valid ? null : errorMessages[key];
      if (!valid) isTrialValid = false;
    });
    setErrors(newErrors);
    return isTrialValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    isValidTrial(trial) && onSubmit(trial) && onDismiss();
    setErrors({ ...errors });
  };
  const handleCancel = () => onDismiss();

  // View -------------------------------------------------
  return (
    <form className="trialForm">
      <FormItem
        label="Trial name"
        htmlFor="trial_name"
        advice="Enter Trial Name"
        error={errors.trial_name}
      >
        <input
          type="text"
          name="trial_name"
          placeholder="Enter Trial Name"
          value={trial.trial_name}
          onChange={handleChange}
        />
      </FormItem>

      <FormItem
        label="Status"
        htmlFor="trial_status"
        advice="Select a status"
        error={errors.trial_status}
      >
        <select
          name="trial_status"
          value={trial.trial_status}
          onChange={handleChange}
        >
          <option value="">Select status</option>
          <option value="Draft">Draft</option>
          <option value="Active">Active</option>
          <option value="Closed">Closed</option>
        </select>
      </FormItem>

      <FormItem
        label="Description"
        htmlFor="trial_description"
        advice="Enter a short description"
        error={errors.trial_description}
      >
        <textarea
          name="trial_description"
          placeholder="Enter description"
          value={trial.trial_description}
          onChange={handleChange}
        />
      </FormItem>

      <FormItem
        label="Start date"
        htmlFor="start_date"
        advice="Choose a start date"
        error={errors.start_date}
      >
        <input
          type="date"
          name="start_date"
          value={trial.start_date ?? ""}
          onChange={handleChange}
        />
      </FormItem>

      <FormItem
        label="End date"
        htmlFor="end_date"
        advice="Choose an end date"
        error={errors.end_date}
      >
        <input
          type="date"
          name="end_date"
          value={trial.end_date ?? ""}
          onChange={handleChange}
        />
      </FormItem>

      <ActionTray>
        <Submit onClick={handleSubmit} showText={true} buttonText="Submit" />
        <Cancel onClick={handleCancel} showText={true} buttonText="Cancel" />
      </ActionTray>
    </form>
  );
}
