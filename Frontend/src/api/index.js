import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:8081",
  mode: "cors",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
export const get = (options) => {
  const { url, params = {} } = options || {};
  console.log(url,params);
  const serverOptions = {
    url,
    method: "get",
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
    params,
  };
  return server(serverOptions);
};
