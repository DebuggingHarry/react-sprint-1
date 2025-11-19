import { useState, useEffect } from "react";
import API from "../api/API.js";
import TrialPanels from "../entities/trials/TrialPanels.js";
import { ActionTray, Add } from "../UI/Actions.js";
import TrialForm from "../entities/trials/TrialForm.js";

function MyTrials() {
  // Initialisation --------------------------------------
  const loggedInUser = 2001;
  //const endpoint = `/trials/crc/${loggedInUser}`;
  const trialsEndpoint = `/trials`;
  // State -----------------------------------------------
  const [trials, setTrials] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState(
    "Loading your records..."
  );
  const [showNewTrialForm, setShowNewTrialForm] = useState(false);

  // Context ---------------------------------------------
  // Methods ---------------------------------------------

  const handleAdd = () => {
    setShowNewTrialForm(true);
  };

  const handleCancel = () => {
    setShowNewTrialForm(false);
  };

  const handleSubmit = async (trial) => {
    const response = await API.post(trialsEndpoint, trial);
    return response.isSuccess ? getTrials() || true : false;
  };

  const getTrials = async () => {
    try {
      const response = await API.get(`/trials/crc/${loggedInUser}`);
      if (response && response.isSuccess) {
        const raw = response.result;
        let data = [];
        if (Array.isArray(raw)) {
          data = raw;
        } else if (Array.isArray(raw?.data)) {
          data = raw.data;
        }
        setTrials(data);
      } else {
        setLoadingMessage(response?.Message ?? "Failed to load records.");
      }
    } catch (error) {
      setLoadingMessage("An error occurred while loading records.");
    }
  };

  useEffect(() => {
    getTrials();
  }, []);

  // View ------------------------------------------------
  return (
    <section>
      <h1>My Trials</h1>
      {trials.length === 0 ? (
        <p>You have no assigned trials.</p>
      ) : (
        <TrialPanels trials={trials} />
      )}
      <ActionTray>
        <Add onClick={handleAdd} showText={true} buttonText="Add Trial" />
      </ActionTray>

      {showNewTrialForm && (
        <TrialForm onDismiss={handleCancel} onSubmit={handleSubmit} />
      )}
    </section>
  );
}

export default MyTrials;
