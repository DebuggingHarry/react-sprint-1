import React from "react";

function MyTrials() {
  // Initialisation --------------------------------------
  const loggedInUser = 2001;
  const endpoint = `/api/trials/users/{loggedInUser}`;
  // State -----------------------------------------------
  // Context ---------------------------------------------
  // Methods ---------------------------------------------
  // View ------------------------------------------------
  return (
    <section>
      <h1>My Trials</h1>
    </section>
  );
}

export default MyTrials;
