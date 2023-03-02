import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";
import AppText from "./AppText";

function CustomButton({
  children,
  color = "buttonColor",
  marginVertical,
  onPress,
  style,
  title,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: colors[color], marginVertical: marginVertical },
      ]}
      onPress={onPress}
    >
      <AppText style={[styles.text, style]}>{title}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.buttonColor,
    borderColor: colors.buttonBorder,
    borderRadius: 25,
    borderWidth: 5,
    justifyContent: "center",
    width: "100%",
    flex: 1,
  },
  text: {
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 24,
  },
});
export default CustomButton;
