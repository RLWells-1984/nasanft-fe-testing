import client from "./client";

//const username = //remove before uploading
//const password = //remove before uploading

const login = () =>
  client.post("/token/login", {
    username: "xXSpacedOutXx",
    password: "INeedSpace",
  });

export default {
  login,
};
