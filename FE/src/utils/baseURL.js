const baseURL = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://127.0.0.1:8000/";
  } else return "https://mypubs.iee.ihu.gr/api/v1/";
};

export default baseURL;
