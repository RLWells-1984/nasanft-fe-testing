import { create } from "apisauce";
import cache from "../utility/cache";
//import authStorage from "../auth/storage";

//this calls the db with the auth headers implemented
const apiAuthClient = create({
  baseURL: "http://192.168.1.177:3000/api",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

const get = apiAuthClient.get;

apiAuthClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);
  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }

  const data = await cache.get(url);
  return data ? { ok: true, data } : response;
};

export default apiAuthClient;
