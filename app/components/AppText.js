import React from "react";
import { StyleSheet, Text, View } from "react-native";

import colors from "../config/colors";

function AppText({
  children,
  color = "blue_text",
  style,
  fontSize = 16,
  fontFamily = "Rag",
}) {
  return (
    <View style={styles.text}>
      <Text
        style={[
          styles.text,
          style,
          { color: colors[color], fontSize: fontSize, fontFamily: fontFamily },
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: colors.transparent,
    color: colors.blue_text,
  },
});

export default AppText;
