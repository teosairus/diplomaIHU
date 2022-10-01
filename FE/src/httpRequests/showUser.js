import axios from "axios";

const showUser = (token) => {
  const baseURL = "http://127.0.0.1:8000/";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  console.log("config", config);
  return axios.get(`${baseURL}user/1`, config);
};

export default showUser;
