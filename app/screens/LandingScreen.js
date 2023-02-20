import React from "react";
<<<<<<< Updated upstream
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "../config/colors";
=======
import { Image, ImageBackground, StyleSheet, View } from "react-native";

import colors from "../config/colors";
import CustomButton from "../components/CustomButton";
import ClickableText from "../components/ClickableText";
>>>>>>> Stashed changes

function LandingScreen(props) {
  return (
    <ImageBackground
      style={styles.background}
      //source={{}} will be from nasa image of the day api
      source={require("../assets/PIA13110_large.jpg")}
    >
      <Image style={styles.logo} source={require("../assets/TempLogo.png")} />
<<<<<<< Updated upstream
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => console.log("login")} //deep link for login
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
=======
      <View style={styles.touchable}>
        <CustomButton title="Login" onPress={() => console.log("login")} />
      </View>
      <View style={styles.touchable}>
        <ClickableText
          //after navigation is added will go to register screen
          title="Register"
          onPress={() => console.log("register")}
        />
      </View>
>>>>>>> Stashed changes
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
    width: 200,
    height: 200,
    borderWidth: 5,
    position: "absolute",
    top: 100,
    borderColor: colors.buttonBorder,
    borderRadius: 80,
  },
  touchable: {
    width: "60%",
    paddingBottom: 20,
  },
});

export default LandingScreen;
