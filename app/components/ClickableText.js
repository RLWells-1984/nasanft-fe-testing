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
  text: {
    backgroundColor: colors.transparent,
    color: colors.red,
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
  },
});
export default ClickableText;
