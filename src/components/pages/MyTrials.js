import { useState } from "react";
import API from "../api/API.js";
import TrialPanels from "../entities/trials/TrialPanels.js";
import { ActionTray, Add } from "../UI/Actions.js";
import TrialForm from "../entities/trials/TrialForm.js";
import "./MyTrials.css";
import useLoad from "../api/useLoad.js";

function MyTrials() {
  // Initialisation --------------------------------------

  const loggedInUser = 2001;
  const endpoint = `/trials/crc/${loggedInUser}`;
  const trialsEndpoint = `/trials`;
  const staffEndpoint = `/trial-staff`;

  // State -----------------------------------------------

  const [trials, , loadingMessage, loadTrials] = useLoad(endpoint);
  const [showAddTrialForm, setShowAddTrialForm] = useState(false);

  // Context ---------------------------------------------
  // Methods ---------------------------------------------

  const ToggleAddTrialForm = () => {
    setShowAddTrialForm(!showAddTrialForm);
  };

  const CancelAddTrialForm = () => {
    setShowAddTrialForm(false);
  };

  const handleAddSubmit = async (trial) => {
    const response = await API.post(trialsEndpoint, trial);
    return response.isSuccess ? loadTrials(endpoint) || true : false;
  };

  const handleAddStaff = async (staff) => {
    const response = await API.post(staffEndpoint, staff);
    return response.isSuccess ? loadTrials(endpoint) || true : false;
  };

  // View ------------------------------------------------
  return (
    <section>
      <h1>My Trials</h1>
      {trials.length === 0 ? (
        <p>You have no assigned trials.</p>
      ) : (
        <TrialPanels trials={trials} onStaffSubmit={handleAddStaff} />
      )}
      <ActionTray>
        <Add
          onClick={ToggleAddTrialForm}
          showText={true}
          buttonText="Add Trial"
        />
      </ActionTray>

      {showAddTrialForm && (
        <TrialForm onDismiss={CancelAddTrialForm} onSubmit={handleAddSubmit} />
      )}
    </section>
  );
}

export default MyTrials;
