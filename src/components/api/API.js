import API_URL from "./apiURL.js";

const API = {};
API.get = (endpoint) => callFetch(endpoint, "GET");
API.post = (endpoint, dataObject) => callFetch(endpoint, "POST", dataObject);
API.put = (endpoint, dataObject) => callFetch(endpoint, "PUT", dataObject);
API.delete = (endpoint) => callFetch(endpoint, "DELETE");

const callFetch = async (endpoint, method, dataObject) => {
  // Build request object
  let requestObject = {
    method: method || "GET",
  };

  if (dataObject) {
    requestObject = {
      ...requestObject,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataObject),
    };
  }

  // Call fetch
  try {
    const endpointAddress = API_URL + endpoint;
    const response = await fetch(endpointAddress, requestObject);
    const result = await response.json();
    return response.status >= 200 && response.status < 300
      ? { isSuccess: true, result: result }
      : {
          isSuccess: false,
          Message: `Error recovering records: ${response.status}`,
        };
  } catch (error) {
    return { isSuccess: false, Message: error.message };
  }
};

export default API;
