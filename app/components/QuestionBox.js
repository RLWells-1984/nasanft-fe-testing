import React from "react";
import ScreenSetUp from "./ScreenSetUp";

import { StyleSheet, Text } from "react-native";

import colors from "../config/colors";
import { View } from "react-native";

function QuestionBox({ children, style }) {
  return (
    <View style={styles.screen}>
      <Text style={[styles.text, style]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.buttonBorder,
  },
  text: {
    borderBottomLeftRadius: 50,
    borderColor: colors.buttonColor,
    borderTopRightRadius: 50,
    borderWidth: 5,
    color: colors.blue_text,
    fontSize: 20,
    marginTop: 30,
    padding: 15,
  },
});

export default QuestionBox;
