import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";
import AppText from "./AppText";

function CustomButton({
  borderColor = "backgroundGrey",
  children,
  color = "buttonColor",
  marginVertical,
  onPress,
  title,
  fontSize,
  fontFamily,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: colors[color],
          marginVertical: marginVertical,
          borderColor: colors[borderColor],
        },
      ]}
      onPress={onPress}
    >
      <AppText style={styles.text} fontSize={fontSize} fontFamily={fontFamily}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.buttonColor,
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
