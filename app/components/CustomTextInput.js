import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import colors from "../config/colors";
import ScreenSetUp from "./ScreenSetUp";

function CustomTextInput({ icon, ...otherProps }) {
  return (
    <View style={styles.container}>
      {icon && (
        <FontAwesome5
          name={icon}
          size={24}
          color={colors.blue_text}
          style={styles.icon}
        />
      )}
      <TextInput style={styles.text} {...otherProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGrey,
    borderRadius: 25,
    flexDirection: "row",
    width: "90%",
    padding: 15,
    marginVertical: 10,
    alignSelf: "center",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    color: colors.blue_text,
    fontFamily: "Rag",
  },
});
export default CustomTextInput;
