import React from "react";
import { StyleSheet, Text } from "react-native";

function CustomText({ children, style }) {
  return <Text style={[styles.view, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    //add custom font later
    //add color if needed
    //bold etc as needed
  },
});

export default CustomText;
