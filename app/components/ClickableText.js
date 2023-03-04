import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function ClickableText({ title, onPress, color = "transparent" }) {
  return (
    <TouchableOpacity
      style={[styles.textContainer, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    alignItems: "center",
    backgroundColor: colors.transparent,
    color: "white",
    fontSize: 20,
    fontFamily: "Rag_B_I",
    paddingLeft: 7,
    borderColor: colors.red,
    borderBottomWidth: 5,
  },
  textContainer: {
    alignItems: "center",
  },
});
export default ClickableText;
