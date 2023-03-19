//Testing screen for implementing new components.
//Is not within the navigation flow, must be called directly on app.js
//remove upon project completion

import React, { useState } from "react";
import { ButtonGroup } from "@rneui/themed";
import { Text, StyleSheet } from "react-native";
import ScreenSetUp from "../components/ScreenSetUp";
import CustomButton from "../components/CustomButton";

function Blank(props) {
  const [selectedIndex, setSelectedIndex] = useState();
  const button1 = (
    <CustomButton
      title={quiz.questions[questionNumber].answers[0].answer}
      marginVertical={5}
      onPress={() => handleclick(id)}
      style={{ fontSize: 16 }}
    ></CustomButton>
  );
  const buttons = [button1, button1];

  return (
    <ScreenSetUp>
      <ButtonGroup
        buttons={buttons}
        selectedIndex={selectedIndex}
        onPress={(value) => {
          setSelectedIndex(value);
        }}
        containerStyle={{ marginBottom: 20 }}
      />
    </ScreenSetUp>
  );
}

const styles = StyleSheet.create({
  subHeader: {
    backgroundColor: "#2089dc",
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
    marginBottom: 10,
  },
});

export default Blank;
