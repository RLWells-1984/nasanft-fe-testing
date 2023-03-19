import "../global";
import React, { useContext, useState } from "react";
import { Alert, Image, ImageBackground, StyleSheet, View } from "react-native";

import WalletConnectExperience from "./walletConnectExperience";
import { StatusBar } from "expo-status-bar";

import AuthContext from "../auth/context";
import cache from "../utility/cache";
import colors from "../config/colors";
import CustomButton from "../components/CustomButton";
import ScreenSetUp from "../components/ScreenSetUp";

const SCHEME_FROM_APP_JSON = "walletconnect-example";
//var token = null;

function LoginScreen({ navigation }) {
  const [loginFailed, setLoginFailed] = useState(false);
  const authContext = useContext(AuthContext);
  const udata = {
    username: "TestUser",
    signedNonce: "INeedSpace",
    publicAddress: "123",
  }; //temp till nonce is set

  //uses temp user email password to get auth token here
  const fetchToken = async () => {
    return await fetch("http://192.168.1.177:3000/api/token/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(udata),
    })
      .then((response) => response.json())
      .then((data) => {
        const response = data.text;
        if (!response.localeCompare("Login Successful") == 0) {
          Alert.alert("Login Failed", response);
          return Promise.reject(data.text);
        }
        if (response == "Login Successful") {
          const dataToken = data.accessToken;
          const refreshToken = data.refreshToken;
          authContext.setToken(dataToken);
          authContext.setRefreshToken(refreshToken);
          cache.store("token", dataToken);
          cache.store("refreshToken", refreshToken);
          return dataToken;
        }
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  const fetchUserDetails = async () => {
    const userToken = await fetchToken();
    if (userToken == undefined) {
      return Promise.reject("Unsuccessful Login");
    }
    const response = await fetch("http://192.168.1.177:3000/api/users/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const userDetails = data;
        authContext.setUser(userDetails);
        cache.store("user", userDetails);
      });
  };

  return (
    <ScreenSetUp>
      <ImageBackground
        style={styles.background}
        //source={{}} will be from nasa image of the day api to be implemented later
        source={require("../assets/PIA13110_large.jpg")}
      >
        <Image style={styles.logo} source={require("../assets/TempLogo.png")} />
        <View style={styles.touchableButton}>
          <CustomButton
            title="Login"
            fontFamily={"Rag_Bo"}
            fontSize={26}
            onPress={fetchUserDetails}
          />
        </View>
      </ImageBackground>
    </ScreenSetUp>
  );
}
const styles = StyleSheet.create({
  background: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  logo: {
    borderColor: colors.backgroundGrey,
    borderRadius: 80,
    borderWidth: 5,
    height: 200,
    position: "absolute",
    top: 100,
    width: 200,
  },
  touchable: {
    height: 70,
    justifyContent: "flex-end",
    paddingBottom: 20,
    width: "60%",
  },
  touchableButton: {
    height: 110,
    justifyContent: "flex-end",
    paddingBottom: 40,
    width: "60%",
  },
});

export default LoginScreen;

//wallet connect path - removed while testing user details data
//<View style={styles.touchableButton}>
//<View style={styles.container}>
//  <WalletConnectExperience navigation={navigation} />
//  <StatusBar style="auto" />
//</View>
//</View>
