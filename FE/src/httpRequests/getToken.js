import axios from "axios";
import baseURL from "../utils/baseURL";

const getToken = (code, clientID) => {
  const config = {
    client_id: clientID,
    code: code,
  };

  return axios.post(`${baseURL()}login`, config);
};

export default getToken;
