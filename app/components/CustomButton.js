import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function CustomButton({ title, onPress, color = colors.buttonColor }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.buttonColor,
    borderRadious: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    height: 50,
    borderWidth: 5,
    borderColor: colors.buttonBorder,
    borderRadius: 25,
    margin: 10,
  },
  text: {
    color: colors.white_text,
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default CustomButton;
