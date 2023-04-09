import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";

import AuthContext from "../auth/context";
import cache from "../utility/cache";
import colors from "../config/colors";
import CustomButton from "../components/CustomButton";
import ClickableText from "../components/ClickableText";
import ScreenSetUp from "../components/ScreenSetUp";

function WelcomeScreen({ navigation }) {
  const { iotd, setIOTD } = useContext(AuthContext);

  const getNewImage = async () => {
    const newImage = await fetch(
      "https://nasaft-tbact528.b4a.run/api/neo/iotd",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("issue");
        }
      })
      .then(async (data) => {
        if (data != undefined) {
          cache.store("iotd", data.hdurl);
          setIOTD(data.hdurl);
        } else {
          setIOTD(null);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getNewImage();
  });

  return (
    <ScreenSetUp>
      <View style={styles.background}>
        <Image style={styles.logo} source={require("../assets/FullLogo.png")} />

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
            textColor={"white"}
            onPress={() => navigation.navigate("RegistrationScreen")}
          />
        </View>
      </View>
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
    borderColor: colors.white,
    borderRadius: 100,
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
