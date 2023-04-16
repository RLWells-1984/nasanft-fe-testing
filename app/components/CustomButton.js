import { StyleSheet, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import PropTypes from "prop-types";
import React from "react";
import colors from "../config/colors";

function CustomButton({
  borderColor = "white",
  color = "buttonColor",
  fontFamily,
  fontSize,
  marginVertical,
  onPress,
  textColor,
  title,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: colors[color],
          borderColor: colors[borderColor],
          marginVertical: marginVertical,
        },
      ]}
      onPress={onPress}
    >
      <AppText
        fontFamily={fontFamily}
        fontSize={fontSize}
        style={styles.text}
        color={textColor}
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
}

CustomButton.propTypes = {
  borderColor: PropTypes.string,
  color: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number,
  marginVertical: PropTypes.number,
  onPress: PropTypes.func,
  textColor: PropTypes.string,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.buttonColor,
    borderRadius: 25,
    borderWidth: 5,
    flex: 1,
    height: 40,
    justifyContent: "center",
    width: "100%",
  },
  text: {
    alignItems: "center",
    alignSelf: "center",
    bottom: 3,
    fontSize: 24,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
export default CustomButton;
