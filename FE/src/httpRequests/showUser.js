import axios from "axios";
import baseURL from "../utils/baseURL";

const showUser = (token, uid) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return axios.get(`${baseURL()}user/${uid}`, config);
};

export default showUser;
