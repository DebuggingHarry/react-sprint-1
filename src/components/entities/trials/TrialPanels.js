import { useState } from "react";
import { useModal } from "../../UI/Modal.js";
import API from "../../api/API.js";
import Panel from "../../UI/Panel.js";
import ObjectTable from "../../UI/ObjectTable.js";
import { ActionTray, Add, Modify, Delete, Remove, Yes, No } from "../../UI/Actions.js";
import TrialStaffForm from "../trialStaff/TrialStaffForm.js";
import TrialForm from "../trials/TrialForm.js";

export default function TrialPanels({ trials = [], onStaffSubmit, reloadTrials }) {
  // Properties ------------------------------------------
  const displayableAttributes = [
    { key: "trial_id", label: "Trial ID" },
    { key: "trial_name", label: "Trial Name" },
  ];

  const putTrialsEndpoint = `/trials`;
  const patchTrialsEndpoint = `/trials`;

  // Hooks -----------------------------------------------
  const [showStaffForm, setShowStaffForm] = useState({});
  const [selectedTrialForm, setSelectedTrialForm] = useState(0);

  // Context ---------------------------------------------
  const { handleModal } = useModal();

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

   const handleModify = (id) => {
    setSelectedTrialForm(id=== selectedTrialForm ? 0 : id);
  };
  
  const handleDelete = async (trial) => {
    dismissModal();  
    try {
      const response = await API.patch(
        `${patchTrialsEndpoint}/${trial.trial_id}/is-deleted`,
        { is_deleted: 1 }
      );
      if (response.isSuccess) {
        reloadTrials();
      }
    } catch (error) {
      
    }
  };
  
  const handleRemoveStaff = () => {};
  const handleTrialCancel = () => setSelectedTrialForm(0);
  const handleTrialSubmit = async (trial) => {

    const payload = {
      ...trial,
      start_date: trial.start_date || null,
      end_date: trial.end_date || null,
    };

    const response = await API.put(`${putTrialsEndpoint}/${trial.trial_id}`, payload);
    if (response.isSuccess) {
      setSelectedTrialForm(0);
      reloadTrials();
      return true;
    }
    console.error('Trial update failed', response);
    return false;
  }

  const showDeleteModal = (id) => handleModal({
    show: true,
    title: "Alert!",
    content: `Are you sure you want to delete trial "${id.trial_name}"?`,
    actions: [
      <Yes key="confirm-delete" showText={true} onClick={() => handleDelete(id)} />,
      <No key="cancel-delete" showText={true} onClick={dismissModal} />
    ]

  });

  const dismissModal = () => handleModal({ show: false });



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
              buttonText="Add staff"
            />
            <Remove
              onClick={handleRemoveStaff}
              showText={true}
              buttonText="Remove staff"
            />
            <Modify
              onClick={() => handleModify(trial.trial_id)}
              showText={true}
              buttonText="Modify trial"
            />
            <Delete
              onClick={() => showDeleteModal(trial)}
              showText={true}
              buttonText="Delete trial"
            />
          </ActionTray>

          

          {showStaffForm[trial.trial_id] && (
            <TrialStaffForm
              onDismiss={() => toggleStaffForm(trial.trial_id)}
              onSubmit={handleStaffSubmit}
              trialName={trial.trial_name}
              initialTrialStaff={{
                trial_id: trial.trial_id,
                start_date: trial.start_date
                  ? trial.start_date.split("T")[0]
                  : "",
                end_date: trial.end_date ? trial.end_date.split("T")[0] : "",
              }}
            />
          )}

          {selectedTrialForm === trial.trial_id && (
            <TrialForm
              isEditing={true}
              initialTrial={{
                ...trial,
                start_date: trial.start_date
                  ? trial.start_date.split("T")[0]
                  : "",
                end_date: trial.end_date ? trial.end_date.split("T")[0] : "",
              }}
              onDismiss={handleTrialCancel}
              onSubmit={handleTrialSubmit}
            />
          )}
          

        </Panel>
      ))}
    </Panel.Container>
  );
}
