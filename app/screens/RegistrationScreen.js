import React, { useState } from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";

import AppText from "../components/AppText";
import colors from "../config/colors";
import CustomButton from "../components/CustomButton";
import GoBackHeader from "../components/GoBackHeader";
import ScreenSetUp from "../components/ScreenSetUp";

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
    alignSelf: "center",
    flex: 1,
    position: "absolute",
    top: 100,
  },
  displayName: {
    backgroundColor: colors.backgroundGrey,
    borderColor: colors.buttonColor,
    borderWidth: 4,
    height: 34,
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  logo: {
    alignSelf: "center",
    borderColor: colors.buttonBorder,
    borderRadius: 40,
    borderWidth: 5,
    height: 80,
    width: 80,
  },
  touchableButton: {
    alignSelf: "center",
    height: 70,
    paddingBottom: 20,
    top: 300,
    width: "60%",
  },
  userContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 30,
  },
  usernameInput: {
    alignItems: "center",
    backgroundColor: "white",
    borderBottomColor: colors.buttonBorder,
    borderBottomWidth: 1,
    fontSize: 16,
    fontWeight: "bold",
    height: 30,
    marginLeft: 30,
    width: "45%",
  },
});

export default RegistrationScreen;
