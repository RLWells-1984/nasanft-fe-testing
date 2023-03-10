import client from "./client";

const endpoint = "/users";

const createUserData = () => client.post(endpoint); //test doesn't have .post and endpoint?
const setUserData = () => client.put(endpoint); //same?
const deleteUserData = () => client.delete(endpoint); //same?

const getUserData = () => client.get(endpoint);
const getOtherUserData = () => client.get(endpoint + "/" + { user_name });

export default {
  getUserData,
  getOtherUserData,
  createUserData,
  setUserData,
  deleteUserData,
};
