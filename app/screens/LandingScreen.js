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
        onPress={() => console.log("login")} //deep link for login
      >
        <View style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </View>
      </TouchableOpacity>

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
