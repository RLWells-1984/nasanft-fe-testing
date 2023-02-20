import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function ClickableText({ title, onPress, color = "transparent" }) {
  return (
    <TouchableOpacity
      style={[styles.text, { backgroundColor: colors[color] }]}
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
    width: "100%",
    height: 50,
    borderWidth: 5,
    borderColor: colors.buttonBorder,
    borderRadius: 25,
    margin: 10,
  },
  text: {
    backgroundColor: colors.transparent,
    color: colors.red,
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
  },
});
export default ClickableText;
