/* eslint-disable no-undef */
import { Image, StyleSheet, View } from "react-native";
import React, { useContext, useEffect } from "react";

import AuthContext from "../auth/context";
import ClickableText from "../components/ClickableText";
import CustomButton from "../components/CustomButton";
import PropTypes from "prop-types";
import ScreenSetUp from "../components/ScreenSetUp";
import cache from "../utility/cache";
import colors from "../config/colors";

function WelcomeScreen({ navigation }) {
  const { setIOTD } = useContext(AuthContext);

  const getNewImage = async () => {
    return await fetch("https://nasaft-tbact528.b4a.run/api/neo/iotd", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("issue getting image");
          return response.json();
        }
      })
      .then((data) => {
        if (data != undefined) {
          console.log("storing image");
          cache.store("iotd", data.hdurl);
          setIOTD(data.hdurl);
        } else {
          console.log("no new image");
          setIOTD(null);
        }
      })
      .catch((error) => console.log("error with image call", error));
  };

  useEffect(() => {
    getNewImage();
  }, []);

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

WelcomeScreen.propTypes = {
  navigation: PropTypes.object,
};

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
