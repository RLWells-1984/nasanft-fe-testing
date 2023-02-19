import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {} from "react-native-web";

import colors from "../config/colors";

function LandingScreen(props) {
  return (
    <ImageBackground
      style={styles.background}
      //source={{}} will be from nasa image of the day api
      source={require("../assets/PIA13110_large.jpg")}
    >
      <Image style={styles.logo} source={require("../assets/TempLogo.png")} />
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => console.log("login")} //after navigation is added will go to login screen
      >
        <View style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => console.log("register")} //after navigation is added will go to register screen
      >
        <View style={styles.registerButton}>
          <Text style={styles.registerText}>Register</Text>
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
  loginButton: {
    width: "100%",
    height: 50,
    borderWidth: 5,
    alignSelf: "center",
    backgroundColor: colors.buttonColor,
    borderColor: colors.buttonBorder,
    borderRadius: 25,
    alignItems: "center",
    margin: 10,
  },
  loginText: {
    fontSize: 30,
    fontWeight: "bold",
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
