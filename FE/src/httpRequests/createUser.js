import axios from "axios";

const createUser = (who) => {
  const baseURL = "http://127.0.0.1:8000/";
  let data;
  if (who === "1") {
    data = {
      firstname: "Antonis",
      lastname: "Sidiropoulos",
      orc_id: "0000-0002-3352-0868",
      scopus_id: "55918072400",
      email: "asidirop@gmail.com",
      password: "123123123",
      location: "Thessaloniki",
    };
  } else {
    data = {
      firstname: "Stefanos",
      lastname: "Ougiaroglou",
      orc_id: "0000-0003-1094-2520",
      scopus_id: "23390597600",
      email: "sougiar@gmail.com",
      password: "123123123",
      location: "Athens",
    };
  }

  return axios.post(`${baseURL}user/`, data);
};

export default createUser;
