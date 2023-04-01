import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";

function LoadingIndicator({ visible = false }) {
  if (!visible) return null;

  return (
    <View style={styles.spaceShip}>
      <LottieView
        autoPlay
        loop
        source={require("../assets/animations/Planet.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  spaceShip: {
    alignSelf: "center",
    height: 520,
    width: 560,
  },
});

export default LoadingIndicator;
