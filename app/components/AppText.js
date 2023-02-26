import React from "react";
import { StyleSheet, Text, View } from "react-native";

import colors from "../config/colors";

function AppText({ children, color = "blue_text", style }) {
  return (
    <View style={styles.text}>
      <Text style={[styles.text, style, { color: colors[color] }]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: colors.transparent,
    color: colors.blue_text,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AppText;
