import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import colors from "../config/colors";
import CustomButton from "../components/CustomButton";
import ClickableText from "../components/ClickableText";
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
            placeholder=" Enter Display Name"
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
    backgroundColor: colors.buttonColor,
    height: 34,
    paddingHorizontal: 20,
    paddingTop: 5,
    borderWidth: 4,
    borderColor: colors.buttonBorder,
    borderRadius: 15,
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
