import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function CustomButton({ title, onPress, color = "buttonColor" }) {
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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderWidth: 5,
    borderColor: colors.buttonBorder,
    borderRadius: 25,
  },
  text: {
    color: colors.blue_text,
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
  },
});
export default CustomButton;
