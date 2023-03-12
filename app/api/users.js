import client from "./client";

const endpoint = "/users";

const createUserData = () => client.post(endpoint); //test doesn't have .post and endpoint?
const deleteUserData = () => client.delete(endpoint); //same?
const setUserData = () => client.put(endpoint); //same?

//working endpoints
const getUserData = () => client.get(endpoint);
const getOtherUserData = () => client.get(endpoint + "/" + { user_name });

export default {
  createUserData,
  deleteUserData,
  getOtherUserData,
  getUserData,
  setUserData,
};
