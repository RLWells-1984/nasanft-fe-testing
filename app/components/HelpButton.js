import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import colors from "../config/colors";

function HelpButton({ navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("HelpScreen")}>
      <View style={styles.button}>
        <Feather name="help-circle" size={28} color="white" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "flex-end",
    bottom: -50,
    justifyContent: "flex-end",
    paddingRight: 20,
  },
});
export default HelpButton;
