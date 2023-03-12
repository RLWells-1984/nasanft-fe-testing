import React from "react";

import { StyleSheet, View } from "react-native";

import colors from "../config/colors";
import AppText from "./AppText";

function QuestionBox({ children, style }) {
  return (
    <View>
      <AppText style={[styles.text, style]}>{children}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    borderBottomLeftRadius: 50,
    borderColor: colors.buttonColor,
    borderTopRightRadius: 50,
    borderWidth: 5,
    fontFamily: "Rag",
    fontSize: 20,
    marginTop: 30,
    padding: 15,
  },
});

export default QuestionBox;
