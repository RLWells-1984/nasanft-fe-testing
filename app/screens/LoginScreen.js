import "../global";
import React, { useContext, useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";

import WalletConnectExperience from "./walletConnectExperience";
import { StatusBar } from "expo-status-bar";

import AuthContext from "../auth/context";
import colors from "../config/colors";
import ScreenSetUp from "../components/ScreenSetUp";
import GoBackHeader from "../components/GoBackHeader";

const SCHEME_FROM_APP_JSON = "walletconnect-example";

function LoginScreen({ navigation }) {
  const [loginFailed, setLoginFailed] = useState(false);
  const authContext = useContext(AuthContext);

  return (
    <ScreenSetUp>
      <View style={styles.goBack}>
        <GoBackHeader navigation={navigation}></GoBackHeader>
      </View>
      <View style={styles.logoBox}>
        <Image style={styles.logo} source={require("../assets/FullLogo.png")} />
      </View>
      <View style={styles.touchableButton}>
        <View>
          <WalletConnectExperience navigation={navigation} />
        </View>
      </View>
    </ScreenSetUp>
  );
}
const styles = StyleSheet.create({
  goBack: {
    flex: 1,
    height: 20,
    position: "absolute",
    right: "90%",
    top: 10,
  },
  logo: {
    borderColor: colors.backgroundGrey,
    borderRadius: 80,
    borderWidth: 5,
    height: 200,
    width: 200,
  },
  logoBox: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
    top: 100,
    width: "100%",
  },
  touchable: {
    height: 70,
    justifyContent: "flex-end",
    paddingBottom: 20,
    width: "60%",
  },
  touchableButton: {
    flex: 1,
    justifyContent: "flex-end",
    marginVertical: 20,
    width: "100%",
  },
});

export default LoginScreen;
