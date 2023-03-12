import React, { useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";

import colors from "../config/colors";
import CustomButton from "../components/CustomButton";
import ClickableText from "../components/ClickableText";
import ScreenSetUp from "../components/ScreenSetUp";

function WelcomeScreen({ navigation }) {
  return (
    <ScreenSetUp>
      <ImageBackground
        style={styles.background}
        //source={{}} will be from nasa image of the day api future implementation
        source={require("../assets/PIA13110_large.jpg")}
      >
        <Image style={styles.logo} source={require("../assets/TempLogo.png")} />

        <View style={styles.touchableButton}>
          <CustomButton
            title="Login"
            fontFamily={"Rag_Bo"}
            fontSize={26}
            onPress={() => navigation.navigate("LoginScreen")}
          />
        </View>

        <View style={styles.touchable}>
          <ClickableText
            title="Register"
            onPress={() => navigation.navigate("RegistrationScreen")}
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
    justifyContent: "flex-end",
    height: 70,
    paddingBottom: 20,
    width: "60%",
  },
  touchableButton: {
    justifyContent: "flex-end",
    height: 70,
    paddingBottom: 20,
    width: "60%",
  },
});

export default WelcomeScreen;
