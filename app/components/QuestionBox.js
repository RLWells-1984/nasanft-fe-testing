import { StyleSheet, View } from "react-native";
import AppText from "./AppText";
import PropTypes from "prop-types";
import React from "react";

import colors from "../config/colors";

// eslint-disable-next-line react/prop-types
function QuestionBox({ children, style }) {
  return (
    <View>
      <AppText style={[styles.text, style]}>{children}</AppText>
    </View>
  );
}

QuestionBox.propTypes = {
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  text: {
    borderBottomLeftRadius: 50,
    borderColor: colors.buttonColor,
    borderTopRightRadius: 50,
    borderWidth: 5,
    fontFamily: "Rag",
    fontSize: 20,
    marginTop: 30,
    padding: 15,
  },
});

export default QuestionBox;
