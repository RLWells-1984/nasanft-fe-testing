import React from "react";
import {
  Image,
  ImageBackground,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "../config/colors";
import CustomText from "../components/CustomText";
import CustomButton from "../components/CustomButton";

function LandingScreen(props) {
  return (
    <ImageBackground
      style={styles.background}
      //source={{}} will be from nasa image of the day api
      source={require("../assets/PIA13110_large.jpg")}
    >
      <Image style={styles.logo} source={require("../assets/TempLogo.png")} />

      <CustomButton title="Login" onPress={console.log("login")}></CustomButton>

      <TouchableOpacity
        style={styles.touchable}
        onPress={() => console.log("register")} //after navigation is added will go to register screen
      >
        <View style={styles.registerButton}>
          <CustomText style={styles.registerText}>Register</CustomText>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    borderWidth: 5,
    position: "absolute",
    top: 100,
    borderColor: colors.buttonBorder,
    borderRadius: 10,
  },
  registerButton: {
    width: "50%",
    height: 50,
    alignSelf: "center",
    backgroundColor: "transparent",
  },
  registerText: {
    fontSize: 16,
    color: colors.red,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  touchable: {
    width: "60%",
  },
});

export default LandingScreen;
