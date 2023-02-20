import React from "react";
import { StyleSheet, Text } from "react-native";
function CustomText({ children }) {
  return <Text style={styles.text}>{children}</Text>;
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
