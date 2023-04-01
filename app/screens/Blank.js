//Testing screen for implementing new components.
//Is not within the navigation flow, must be called directly on app.js
//remove upon project completion

import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import ScreenSetUp from "../components/ScreenSetUp";
import CustomButton from "../components/CustomButton";
import LoadingIndicator from "../components/LoadingIndicator";
import LottieView from "lottie-react-native";

function Blank(props) {
  return (
    <ScreenSetUp>
      <LoadingIndicator visible={true} />
    </ScreenSetUp>
  );
}

const styles = StyleSheet.create({
  spaceShip: {
    alignSelf: "center",
    height: 120,
    width: 160,
  },
});

export default Blank;
