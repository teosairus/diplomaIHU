import axios from "axios";
import baseURL from "../utils/baseURL";

const showUser = (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  console.log("config", config);
  return axios.get(`${baseURL()}user/1`, config);
};

export default showUser;
