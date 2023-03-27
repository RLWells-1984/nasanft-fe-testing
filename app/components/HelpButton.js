import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import colors from "../config/colors";

function HelpButton({ navigation }) {
  return (
    <TouchableOpacity onPressIn={() => navigation.navigate("HelpScreen")}>
      <View style={styles.button}>
        <Feather name="help-circle" size={28} color={colors.blue_text} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "flex-end",
    bottom: -10,
    justifyContent: "flex-end",
    paddingRight: 20,
  },
});
export default HelpButton;
