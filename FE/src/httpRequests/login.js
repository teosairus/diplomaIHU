import axios from "axios";

const login = (data) => {
  const baseURL = "http://127.0.0.1:8000/";
  const formData = new FormData();
  formData.append("username", data.username);
  formData.append("password", data.password);

  return axios.post(`${baseURL}login`, formData);
};

export default login;
