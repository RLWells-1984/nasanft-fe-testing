import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../config/colors";
import CustomButton from "../components/CustomButton";
import ScreenSetUp from "../components/ScreenSetUp";
import CustomText from "../components/CustomText";
import AppText from "../components/AppText";

function RegistrationScreen(props) {
  return (
    <ScreenSetUp>
      <ImageBackground
        style={styles.background}
        //source={{}} will be from nasa image of the day api
        source={require("../assets/PIA13110_large.jpg")}
      >
        <View style={{ height: "10%" }}>
          <TouchableOpacity onPress={() => console.log("go back")}>
            <Ionicons
              name="arrow-back"
              size={28}
              color={colors.blue_text}
              style={styles.backArrow}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require("../assets/TempLogo.png")}
          />
          <CustomText style={styles.register}>Register Account</CustomText>
        </View>
        <View style={styles.userContainer}>
          <AppText style={styles.displayName}> Display Name</AppText>
          <TextInput
            placeholder=" Enter Display Name" //need to set limits on char length and type
            style={styles.usernameInput}
          ></TextInput>
        </View>
        <View style={styles.touchable}>
          <CustomButton
            title="Connect Wallet"
            onPress={() => console.log("connect")}
          />
        </View>
      </ImageBackground>
    </ScreenSetUp>
  );
}

const styles = StyleSheet.create({
  backArrow: {
    position: "absolute",
    top: 50,
    right: "90%",
    borderRadius: 80,
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container: {
    position: "absolute",
    top: "5%",
  },
  displayName: {
    backgroundColor: colors.buttonBorder,
    height: 34,
    paddingHorizontal: 20,
    paddingTop: 5,
    borderWidth: 4,
    borderColor: colors.buttonColor,
  },
  logo: {
    width: 100,
    height: 100,
    borderWidth: 5,
    borderColor: colors.buttonBorder,
    borderRadius: 40,
    alignSelf: "center",
  },
  register: {
    color: colors.buttonColor,
    fontSize: 26,
    fontWeight: "500",
  },
  touchable: {
    width: "60%",
    paddingBottom: 20,
  },
  userContainer: {
    flexDirection: "row",
    paddingRight: 30,
    paddingLeft: 20,
    flex: 1,
    alignItems: "center",
  },
  usernameInput: {
    borderBottomColor: colors.buttonBorder,
    borderBottomWidth: 1,
    fontSize: 16,
    fontWeight: "bold",
    height: 30,
    width: "45%",
    marginLeft: 30,
    alignItems: "center",
    backgroundColor: "white",
    //flex: 1,
  },
});

export default RegistrationScreen;
