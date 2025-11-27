import Form from "../../UI/Form.js";
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

  const validation = {
    isValid: {
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
    },
    errorMessages: {
      trial_name: "Trial name is required.",
      trial_status: "Status must be one of: Draft, Active or Closed.",
      trial_description: "Description is required.",
      start_date: "Start date must be in the future.",
      end_date: "End date must be after the start date.",
    },
  };

  const conformance = {
    start_date: (newTrial, newErrors) => {
      if (newTrial.end_date) {
        const endValid = validation.isValid.end_date(
          newTrial.end_date,
          newTrial
        );
        newErrors.end_date = endValid
          ? null
          : validation.errorMessages.end_date;
      }
    },
  };

  // state ------------------------------------------------
  const [trial, , errors, , handleChange, handleSubmit] = Form.useForm(
    initialTrial,
    conformance,
    validation,
    onDismiss,
    onSubmit
  );

  // View -------------------------------------------------
  return (
    <Form onSubmit={handleSubmit} onCancel={onDismiss} className="trialForm">
      <Form.Item
        label="Trial name"
        htmlFor="trial_name"
        advice="Enter Trial Name"
        error={errors.trial_name}
      >
        <input
          type="text"
          name="trial_name"
          id="trial_name"
          placeholder="Enter Trial Name"
          value={trial.trial_name}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Status"
        htmlFor="trial_status"
        advice="Select a status"
        error={errors.trial_status}
      >
        <select
          id="trial_status"
          name="trial_status"
          value={trial.trial_status}
          onChange={handleChange}
        >
          <option value="">Select status</option>
          <option value="Draft">Draft</option>
          <option value="Active">Active</option>
          <option value="Closed">Closed</option>
        </select>
      </Form.Item>

      <Form.Item
        label="Description"
        htmlFor="trial_description"
        advice="Enter a short description"
        error={errors.trial_description}
      >
        <textarea
          id="trial_description"
          name="trial_description"
          placeholder="Enter description"
          value={trial.trial_description}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Start date"
        htmlFor="start_date"
        advice="Choose a start date"
        error={errors.start_date}
      >
        <input
          type="date"
          name="start_date"
          id="start_date"
          value={trial.start_date ?? ""}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="End date"
        htmlFor="end_date"
        advice="Choose an end date"
        error={errors.end_date}
      >
        <input
          type="date"
          name="end_date"
          id="end_date"
          value={trial.end_date ?? ""}
          onChange={handleChange}
        />
      </Form.Item>
    </Form>
  );
}
