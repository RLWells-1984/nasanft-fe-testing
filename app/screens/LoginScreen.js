import "../global";
import React, { useContext, useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";

import WalletConnectExperience from "./walletConnectExperience";
import { StatusBar } from "expo-status-bar";

import AuthContext from "../auth/context";
import colors from "../config/colors";
import ScreenSetUp from "../components/ScreenSetUp";

const SCHEME_FROM_APP_JSON = "walletconnect-example";

function LoginScreen({ navigation }) {
  const [loginFailed, setLoginFailed] = useState(false);
  const authContext = useContext(AuthContext);

  return (
    <ScreenSetUp>
      <ImageBackground
        style={styles.background}
        //source={{}} will be from nasa image of the day api to be implemented later
        source={require("../assets/PIA13110_large.jpg")}
      >
        <Image style={styles.logo} source={require("../assets/TempLogo.png")} />
        <View style={styles.touchableButton}>
          <View style={styles.container}>
            <WalletConnectExperience navigation={navigation} />
            <StatusBar style="auto" />
          </View>
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
