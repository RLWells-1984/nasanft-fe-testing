import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function CustomButton({
  children,
  color = "buttonColor",
  fontSize = 20,
  onPress,
  style,
  title,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, style, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { fontSize: fontSize }]}>{title}</Text>
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
    height: 50,
    justifyContent: "center",
    width: "100%",
    flex: 1,
  },
  text: {
    alignItems: "center",
    color: colors.blue_text,
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default CustomButton;
