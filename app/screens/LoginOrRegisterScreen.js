import React, { useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";

import colors from "../config/colors";
import CustomButton from "../components/CustomButton";
import ClickableText from "../components/ClickableText";
import ScreenSetUp from "../components/ScreenSetUp";

function LandingScreen({ navigation }) {
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
            onPress={() => navigation.navigate("HomeScreen")}
          />
        </View>

        <View style={styles.touchable}>
          <ClickableText
            //after navigation is added will go to register screen
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

export default LandingScreen;
