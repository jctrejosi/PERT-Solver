import axios from "axios";

export const getBaseUrl = () => `http://127.0.0.1:5000`;

export const axiosConfiguration = () => {
  axios.defaults.baseURL = getBaseUrl();
};
