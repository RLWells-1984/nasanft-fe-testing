import React from "react";
import Constants from "expo-constants";
import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";

function ScreenSetUp({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <ImageBackground
        style={styles.background}
        //source={{}} will be from nasa image of the day api
        source={require("../assets/PIA13110_large.jpg")}
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
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  view: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
});

export default ScreenSetUp;
