import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import React from "react";

import colors from "../config/colors";

function AppText({
  children,
  color = "blue_text",
  fontFamily = "Rag",
  fontSize = 16,
  style,
  textAlign,
}) {
  return (
    <View style={styles.text}>
      <Text
        style={[
          styles.text,
          style,
          {
            color: colors[color],
            fontFamily: fontFamily,
            fontSize: fontSize,
            textAlign: textAlign,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

AppText.propTypes = {
  children: React.Node,
  color: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number,
  style: PropTypes.object,
  textAlign: PropTypes.string,
};

const styles = StyleSheet.create({
  text: {
    backgroundColor: colors.transparent,
    color: colors.blue_text,
  },
});

export default AppText;
