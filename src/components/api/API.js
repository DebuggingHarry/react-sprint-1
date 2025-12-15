import API_URL from "./apiURL.js";

const API = {};
API.get = (endpoint) => callFetch(endpoint, "GET");
API.post = (endpoint, dataObject) => callFetch(endpoint, "POST", dataObject);
API.put = (endpoint, dataObject) => callFetch(endpoint, "PUT", dataObject);
API.patch = (endpoint, dataObject) => callFetch(endpoint, "PATCH", dataObject);
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

    let payload = null;
    try {
      payload = await response.json();
    } catch (e) {
      try {
        payload = await response.text();
      } catch (e2) {
        payload = null;
      }
    }

    if (response.status >= 200 && response.status < 300) {
      return { isSuccess: true, result: payload };
    }

    return {
      isSuccess: false,
      Message: `HTTP ${response.status} ${response.statusText}`,
      details: payload,
    };
  } catch (error) {
    return { isSuccess: false, Message: error.message };
  }
};

export default API;
