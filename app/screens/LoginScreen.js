import React, { useContext, useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";

import colors from "../config/colors";
import CustomButton from "../components/CustomButton";
import ScreenSetUp from "../components/ScreenSetUp";
import AuthContext from "../auth/context";
import authApi from "../api/auth";

function LoginScreen({ navigation }) {
  useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState(false);
  const udata = { username: "GiveMeSomeSpace", password: "YodaBest" };

  const fetchData = async () => {
    const response = await fetch("http://192.168.1.177:3000/api/token/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(udata),
    })
      .then((response) => response.json())
      .then((udata) => {
        console.log("data", udata);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  const handleSubmit = async ({ username, password }) => {
    const result = await authApi.login("TestUser", "Open123");
    console.log(result.problem);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    //const user = result.data;
    //console.log(user);
  };

  return (
    <ScreenSetUp>
      <ImageBackground
        style={styles.background}
        //source={{}} will be from nasa image of the day api
        source={require("../assets/PIA13110_large.jpg")}
      >
        <Image style={styles.logo} source={require("../assets/TempLogo.png")} />

        <View style={styles.touchableButton}>
          <CustomButton
            title="Login"
            fontFamily={"Rag_Bo"}
            fontSize={26}
            //onPress={() => navigation.navigate("HomeScreen")}
            onPress={fetchData}
          />
        </View>
      </ImageBackground>
    </ScreenSetUp>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    borderWidth: 5,
    position: "absolute",
    top: 100,
    borderColor: colors.backgroundGrey,
    borderRadius: 80,
  },
  touchable: {
    justifyContent: "flex-end",
    height: 70,
    width: "60%",
    paddingBottom: 20,
  },
  touchableButton: {
    justifyContent: "flex-end",
    height: 70,
    width: "60%",
    paddingBottom: 20,
  },
});

export default LoginScreen;
