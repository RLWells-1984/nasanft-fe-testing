import { StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import React from "react";

import colors from "../config/colors";

function ClickableText({ color = "transparent", onPress, title, textColor }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.textContainer, { backgroundColor: colors[color] }]}
    >
      <Text style={[styles.text, { color: colors[textColor] }]}> {title}</Text>
    </TouchableOpacity>
  );
}

ClickableText.propTypes = {
  color: PropTypes.string,
  onPress: PropTypes.func,
  title: PropTypes.string,
  textColor: PropTypes.string,
};

const styles = StyleSheet.create({
  text: {
    alignItems: "center",
    backgroundColor: colors.transparent,
    borderColor: colors.red,
    borderBottomWidth: 5,
    color: colors.blue_text,
    fontFamily: "Rag_B_I",
    fontSize: 20,
    paddingLeft: 7,
  },
  textContainer: {
    alignItems: "center",
  },
});
export default ClickableText;
