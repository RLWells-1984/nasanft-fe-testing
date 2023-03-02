import React from "react";

import { StyleSheet, Text } from "react-native";

import colors from "../config/colors";
import { View } from "react-native";
import AppText from "./AppText";

function QuestionBox({ children, style }) {
  return (
    <View style={styles.screen}>
      <AppText style={[styles.text, style]}>{children}</AppText>
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
    fontSize: 20,
    marginTop: 30,
    padding: 15,
  },
});

export default QuestionBox;
