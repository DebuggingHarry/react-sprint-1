import Panel from "../../UI/Panel.js";
import ObjectTable from "../../UI/ObjectTable.js";

export default function TrialPanels({ trials = [] }) {
  // Properties ------------------------------------------
  const displayableAttributes = [
    { key: "trial_id", label: "Trial ID" },
    { key: "trial_name", label: "Trial Name" },
  ];
  // Hooks -----------------------------------------------
  // Context ---------------------------------------------
  // Methods ---------------------------------------------
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
        </Panel>
      ))}
    </Panel.Container>
  );
}
