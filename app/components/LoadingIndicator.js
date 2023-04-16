/* eslint-disable no-undef */
/* lint doesn't like require, considers it undefined */
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import PropTypes from "prop-types";
import React from "react";

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

LoadingIndicator.propTypes = {
  visible: PropTypes.bool,
};

const styles = StyleSheet.create({
  spaceShip: {
    alignSelf: "center",
    height: 520,
    width: 560,
  },
});

export default LoadingIndicator;
