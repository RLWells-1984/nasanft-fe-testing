import React from "react";
import { StyleSheet, Text, View } from "react-native";

import colors from "../config/colors";

function AppText({ title, color = "blue_text" }) {
  return (
    <View style={styles.text}>
      <Text style={[styles.text, { color: colors[color] }]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: colors.transparent,
    color: colors.blue_text,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AppText;
