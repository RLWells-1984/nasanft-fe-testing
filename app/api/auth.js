import client from "./client";

const login = () =>
  client.post("/token/login", {
    username: "xXSpacedOutXx",
    password: "INeedSpace",
  });

export default {
  login,
};
