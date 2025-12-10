import Form from "../../UI/Form.js";
import useLoad from "../../api/useLoad.js";
import "./TrialStaffForm.css";

const emptyTrialStaff = {
  trial_staff_id: "",
  trial_id: "",
  user_id: "",
  role_id: "",
  start_date: "",
  end_date: "",
};

export default function TrialStaffForm({
  onDismiss,
  onSubmit,
  initialTrialStaff = emptyTrialStaff,
  trialName = "",
} = {}) {
  // Initialisation ---------------------------------------

  const [roles] = useLoad("/trial-staff-roles");
  const [users] = useLoad("/staff-users");

  const validation = {
    isValid: {
      trial_id: (val) => val && val.toString().trim().length > 0,
      user_id: (val) => val && val.toString().trim().length > 0,
      role_id: (val) => val && val.toString().trim().length > 0,
      start_date: (val) => {
        if (!val) return false;
        const start = new Date(val);
        return !isNaN(start.getTime());
      },
      end_date: (val, staffObj) => {
        if (!val) return false;
        const end = new Date(val);
        const start = new Date(staffObj.start_date);
        if (isNaN(end.getTime())) return false;
        if (!staffObj.start_date || isNaN(start.getTime())) return false;
        return end.getTime() > start.getTime();
      },
    },
    errorMessages: {
      trial_id: "Trial ID is required.",
      user_id: "User ID is required.",
      role_id: "Role ID is required.",
      start_date: "Start date is required.",
      end_date: "End date must be after the start date.",
    },
  };

  const conformance = {
    start_date: (newStaff, newErrors) => {
      if (newStaff.end_date) {
        const endValid = validation.isValid.end_date(
          newStaff.end_date,
          newStaff
        );
        newErrors.end_date = endValid
          ? null
          : validation.errorMessages.end_date;
      }
    },
  };

  // state ------------------------------------------------
  const [trialStaff, , errors, , handleChange, handleSubmit] = Form.useForm(
    initialTrialStaff,
    conformance,
    validation,
    onDismiss,
    onSubmit
  );

  // View -------------------------------------------------
  return (
    <Form
      onSubmit={handleSubmit}
      onCancel={onDismiss}
      className="trialStaffForm"
    >
      <Form.Item
        label="Trial Name"
        htmlFor="trial_name"
        advice="This trial is auto-filled"
        error={errors.trial_id}
      >
        <input
          type="text"
          id="trial_name"
          placeholder="Trial Name"
          value={trialName}
          readOnly
          disabled
        />
        <input type="hidden" name="trial_id" value={trialStaff.trial_id} />
      </Form.Item>

      <Form.Item
        label="Staff Name"
        htmlFor="user_id"
        advice="Select a user"
        error={errors.user_id}
      >
        <select
          name="user_id"
          id="user_id"
          value={trialStaff.user_id}
          onChange={handleChange}
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.user_id} value={user.user_id}>
              {user.fullName ||
                `${(user.userFirstname || "").trim()} ${(
                  user.userLastname || ""
                ).trim()}`.trim() ||
                user.email ||
                user.user_id}
            </option>
          ))}
        </select>
      </Form.Item>

      <Form.Item
        label="Role"
        htmlFor="role_id"
        advice="Select a role"
        error={errors.role_id}
      >
        <select
          name="role_id"
          id="role_id"
          value={trialStaff.role_id}
          onChange={handleChange}
        >
          <option value="">Select a role</option>
          {roles.map((role) => (
            <option key={role.role_id} value={role.role_id}>
              {role.role_name}
            </option>
          ))}
        </select>
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
          value={trialStaff.start_date ?? ""}
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
          value={trialStaff.end_date ?? ""}
          onChange={handleChange}
        />
      </Form.Item>
    </Form>
  );
}
