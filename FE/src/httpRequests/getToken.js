import axios from "axios";

const getToken = (code, clientID, secretID) => {
  const config = {
    client_id: clientID,
    client_secret: secretID,
    grant_type: "authorization_code",
    code: code[0],
  };

  const baseURL = "http://127.0.0.1:8000/";

  return axios.post(`${baseURL}sso`, config);
};

export default getToken;
