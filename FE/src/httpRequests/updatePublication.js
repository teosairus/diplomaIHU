import axios from "axios";
import baseURL from "../utils/baseURL";

const updatePublication = (token, publication) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return axios.put(`${baseURL()}paper/${publication.id}`, publication, config);
};

export default updatePublication;
