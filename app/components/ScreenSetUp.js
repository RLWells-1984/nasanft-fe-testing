import React, { useContext, useEffect, useState } from "react";
import Constants from "expo-constants";
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

import AuthContext from "../auth/context";
import LoadingIndicator from "../components/LoadingIndicator";

function ScreenSetUp({ children, style }) {
  const { iotd } = useContext(AuthContext);
  const windowDimensions = Dimensions.get("window");
  const height = windowDimensions.height;
  const width = windowDimensions.width;

  return (
    <SafeAreaView style={[styles.screen, style]}>
      <ImageBackground
        style={styles.background}
        source={{
          width: width,
          height: height,
          uri: iotd,
        }}
        defaultSource={require("../assets/PIA13110_large.jpg")}
      >
        <View style={[styles.view, style]}>{children}</View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  screen: {
    backgroundColor: "black",
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  view: {
    alignSelf: "center",
    flex: 1,
    width: "90%",
  },
});

export default ScreenSetUp;
