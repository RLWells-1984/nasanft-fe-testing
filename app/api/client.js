import { create } from "apisauce";
//import cache from "../utility/cache";
//import authStorage from "../auth/storage";

const apiAuthClient = create({
  baseURL: "http://192.168.1.177:3000/api",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

export default apiAuthClient;
