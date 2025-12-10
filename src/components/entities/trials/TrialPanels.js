import { useState } from "react";
import Panel from "../../UI/Panel.js";
import ObjectTable from "../../UI/ObjectTable.js";
import { ActionTray, Add } from "../../UI/Actions.js";
import TrialStaffForm from "../trialStaff/TrialStaffForm.js";

export default function TrialPanels({ trials = [], onStaffSubmit }) {
  // Properties ------------------------------------------
  const displayableAttributes = [
    { key: "trial_id", label: "Trial ID" },
    { key: "trial_name", label: "Trial Name" },
  ];
  // Hooks -----------------------------------------------
  const [showStaffForm, setShowStaffForm] = useState({});

  // Context ---------------------------------------------
  // Methods ---------------------------------------------
  const toggleStaffForm = (trialId) => {
    setShowStaffForm((prev) => ({
      ...prev,
      [trialId]: !prev[trialId],
    }));
  };

  const handleStaffSubmit = async (staffData) => {
    if (typeof onStaffSubmit === "function") {
      const result = await onStaffSubmit(staffData);
      if (result) {
        setShowStaffForm((prev) => ({
          ...prev,
          [staffData.trial_id]: false,
        }));
      }
      return result;
    }

    return true;
  };

  // View ------------------------------------------------
  return (
    <Panel.Container>
      {trials.map((trial) => (
        <Panel key={trial.trial_id} title={trial.trial_name} level={1}>
          <Panel.Static level={2}>
            <ObjectTable
              data={trial}
              attributes={displayableAttributes}
              keyField="trial_id"
            />
          </Panel.Static>

          <ActionTray>
            <Add
              onClick={() => toggleStaffForm(trial.trial_id)}
              showText={true}
              buttonText="Add Staff"
            />
          </ActionTray>

          {showStaffForm[trial.trial_id] && (
            <TrialStaffForm
              onDismiss={() => toggleStaffForm(trial.trial_id)}
              onSubmit={handleStaffSubmit}
              initialTrialStaff={{ trial_id: trial.trial_id }}
            />
          )}
        </Panel>
      ))}
    </Panel.Container>
  );
}
