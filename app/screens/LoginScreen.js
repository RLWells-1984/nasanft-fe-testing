/* eslint-disable no-undef */
import "../global";
import { Image, StyleSheet, View } from "react-native";
import GoBackHeader from "../components/GoBackHeader";
import PropTypes from "prop-types";
import React from "react";
import ScreenSetUp from "../components/ScreenSetUp";
import WalletConnectExperience from "./walletConnectExperience";
import colors from "../config/colors";

// eslint-disable-next-line no-unused-vars
const SCHEME_FROM_APP_JSON = "walletconnect-example";

function LoginScreen({ navigation }) {
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

LoginScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  goBack: {
    flex: 1,
    height: 20,
    position: "absolute",
    right: "90%",
    top: 10,
  },
  logo: {
    borderColor: colors.white,
    borderRadius: 100,
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
