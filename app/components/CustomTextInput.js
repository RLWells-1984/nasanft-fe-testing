import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import colors from "../config/colors";

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
    alignSelf: "center",
    backgroundColor: colors.lightGrey,
    borderRadius: 25,
    flexDirection: "row",
    marginVertical: 10,
    padding: 15,
    width: "90%",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: colors.blue_text,
    fontFamily: "Rag",
    fontSize: 18,
  },
});
export default CustomTextInput;
