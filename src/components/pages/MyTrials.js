import { useState, useEffect } from "react";
import API from "../api/API.js";
import Panel from "../UI/Panel.js";

function MyTrials() {
  // Initialisation --------------------------------------
  const loggedInUser = 2001;
  const endpoint = `/trials/crc/${loggedInUser}`;
  // State -----------------------------------------------
  const [trials, setTrials] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState(
    "Loading your records..."
  );

  // Context ---------------------------------------------
  // Methods ---------------------------------------------
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
        <Panel.Container>
          {trials.map((trial) => (
            <Panel
              key={trial.trialId}
              title={trial.trial_name}
              level={1}
            ></Panel>
          ))}
        </Panel.Container>
      )}
    </section>
  );
}

export default MyTrials;
