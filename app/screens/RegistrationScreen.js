import React, { useState } from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";

import colors from "../config/colors";
import CustomButton from "../components/CustomButton";
import ScreenSetUp from "../components/ScreenSetUp";
import AppText from "../components/AppText";
import GoBackHeader from "../components/GoBackHeader";

function RegistrationScreen({ navigation }) {
  return (
    <ScreenSetUp>
      <GoBackHeader color="white" navigation={navigation}></GoBackHeader>

      <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/TempLogo.png")} />
        <AppText color="white" fontSize={26}>
          Register Account
        </AppText>
      </View>

      <View style={{ flex: 0.5, top: 200 }}>
        <View style={styles.userContainer}>
          <AppText style={styles.displayName}> Display Name</AppText>
          <TextInput
            placeholder=" Enter Display Name" //need to set limits on char length and type
            style={styles.usernameInput}
          ></TextInput>
        </View>
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
          }}
        >
          <AppText style={{ padding: 10 }}>
            Public wallet address from login
          </AppText>
        </View>
      </View>

      <View style={styles.touchableButton}>
        <CustomButton
          title="Connect Wallet"
          fontSize={20}
          fontFamily="Rag_Bo"
          onPress={() => navigation.navigate("HomeScreen")}
        />
      </View>
    </ScreenSetUp>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 100,
    flex: 1,
    alignSelf: "center",
  },
  displayName: {
    backgroundColor: colors.backgroundGrey,
    height: 34,
    paddingHorizontal: 20,
    paddingTop: 5,
    borderWidth: 4,
    borderColor: colors.buttonColor,
  },
  logo: {
    width: 80,
    height: 80,
    borderWidth: 5,
    borderColor: colors.buttonBorder,
    borderRadius: 40,
    alignSelf: "center",
  },
  touchableButton: {
    height: 70,
    width: "60%",
    paddingBottom: 20,
    alignSelf: "center",
    top: 300,
  },
  userContainer: {
    flexDirection: "row",
    paddingRight: 30,
    paddingLeft: 20,
    paddingBottom: 30,
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
  },
});

export default RegistrationScreen;
