import { useState, useEffect } from "react";
import API from "./API.js";

export default function useLoad(endpoint) {
  // State -----------------------------------------------

  const [records, setRecords] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState(
    "Loading your records..."
  );

  // Methods ---------------------------------------------

  const loadRecords = async (endpoint) => {
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
        setRecords(data);
      } else {
        setLoadingMessage(response?.Message ?? "Failed to load records.");
      }
    } catch (error) {
      setLoadingMessage("An error occurred while loading records.");
    }
  };

  useEffect(() => {
    loadRecords(endpoint);
  }, [endpoint]);

  // Return ---------------------------------------------
  return [records, setRecords, loadingMessage, loadRecords];
}
