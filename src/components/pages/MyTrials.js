import { useState, useEffect } from "react";
import API from "../api/API.js";
import Panel from "../UI/Panel.js";

function MyTrials() {
  // Initialisation --------------------------------------
  const loggedInUser = 2001;
  const endpoint = `/trials/users/${loggedInUser}`;
  // State -----------------------------------------------
  const [trials, setTrials] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState(
    "Loading your records..."
  );

  // Context ---------------------------------------------
  // Methods ---------------------------------------------
  const apiCall = async (endpoint) => {
    const response = await API.get(endpoint);
    if (
      response.isSuccess
        ? setTrials(response.result.data)
        : setLoadingMessage(response.Message)
    );
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
              title={trial.trialName}
              level={1}
            ></Panel>
          ))}
        </Panel.Container>
      )}
    </section>
  );
}

export default MyTrials;
