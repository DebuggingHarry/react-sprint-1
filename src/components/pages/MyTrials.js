import { useState, useEffect } from "react";
import API from "../api/API.js";
import TrialPanels from "../entities/trials/TrialPanels.js";
import { ActionTray, Add } from "../UI/Actions.js";
import TrialForm from "../entities/trials/TrialForm.js";

function MyTrials() {
  // Initialisation --------------------------------------
  const loggedInUser = 2001;
  const endpoint = `/trials/crc/${loggedInUser}`;
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

  const apiCall = async (endpoint) => {
    try {
      const response = await API.get(endpoint);
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
    apiCall(endpoint);
  }, [endpoint]);

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

      {showNewTrialForm && <TrialForm />}
    </section>
  );
}

export default MyTrials;
