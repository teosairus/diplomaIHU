import axios from "axios";

const getToken = (code, clientID, secretID) => {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      client_id: clientID,
      client_secret: secretID,
      grant_type: "authorization_code",
      code: code[0],
    },
  };

  return axios.post(
    `https://proxy.cors.sh/https://login.it.teithe.gr/${code[0]}`,
    {
      client_id: clientID,
      client_secret: secretID,
      grant_type: "authorization_code",
      code: code[0],
    }
  );
};

export default getToken;
