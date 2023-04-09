//Testing screen for implementing new components.
//Is not within the navigation flow, must be called directly on app.js
//remove upon project completion

import React, { useEffect, useState } from "react";
import { Dimensions, Image, Text, StyleSheet, View } from "react-native";
import ScreenSetUp from "../components/ScreenSetUp";
import CustomButton from "../components/CustomButton";
import LoadingIndicator from "../components/LoadingIndicator";
import LottieView from "lottie-react-native";

function Blank(props) {
  const windowDimensions = Dimensions.get("window");
  const height = windowDimensions.height;
  const width = windowDimensions.width;

  const getNewImage = async () => {
    console.log(height, width);
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
          console.log("got it");
          return response.json();
        }
        console.log("NOPE");
      })
      .then((data) => {
        console.log(data.hdurl);
      });
  };

  useEffect(() => {
    getNewImage();
  });

  return (
    <ScreenSetUp>
      <Text>HI</Text>
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
