import "../global";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";

import RegistrationConnect from "./RegistrationConnect";
import { StatusBar } from "expo-status-bar";

import AppText from "../components/AppText";
import AuthContext from "../auth/context";
import colors from "../config/colors";
import CustomButton from "../components/CustomButton";
import GoBackHeader from "../components/GoBackHeader";
import ScreenSetUp from "../components/ScreenSetUp";

const SCHEME_FROM_APP_JSON = "walletconnect-example";

function RegistrationScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [newName, setNewName] = useState("");
  const user = {
    user: {
      public_address: authContext.publicAddress,
      user_name: newName,
    },
  };

  const registerAccount = async (user) => {
    console.log("what data is here");
    console.log(user);
    return await fetch("http://192.168.1.177:3000/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (
          data.text.localeCompare(
            'duplicate key value violates unique constraint "user_data_public_address_key"'
          ) == 0
        ) {
          Alert.alert(
            "Registration Failed",
            "Your public address is already registered! Please login instead.",
            [
              {
                text: "OK",
                onPress: () => navigation.navigate("LoginScreen"),
              },
            ]
          );
          return Promise.reject(data.text);
        }
        if (data.text.localeCompare("Created") == 0) {
          navigation.navigate("LoginScreen");
        }
        console.log(data);
      });
  };

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
            onChangeText={(text) => setNewName(text)}
            placeholder=" Enter Display Name" //need to set limits on char length and type
            style={styles.usernameInput}
          ></TextInput>
        </View>
        <View style={styles.touchableButton}>
          <View>
            <RegistrationConnect navigation={navigation} />
            <StatusBar style="auto" />
          </View>
          {!authContext.publicAddress ? (
            <AppText></AppText>
          ) : (
            <View style={styles.registerButtonView}>
              <CustomButton
                fontFamily="Rag_Bo"
                fontSize={18}
                marginVertical={7}
                onPress={() => registerAccount(user)}
                title="Register"
              />
            </View>
          )}
        </View>
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
    paddingHorizontal: 5,
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
  registerButtonView: {
    alignItems: "center",
    alignSelf: "center",
    height: 80,
    width: "80%",
  },
  touchableButton: {
    alignSelf: "center",
    marginVertical: 20,
    width: "100%",
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
    backgroundColor: colors.white,
    borderColor: colors.buttonColor,
    borderWidth: 4,
    fontSize: 16,
    fontWeight: "bold",
    height: 35,
    marginLeft: 30,
    width: "55%",
  },
});

export default RegistrationScreen;
