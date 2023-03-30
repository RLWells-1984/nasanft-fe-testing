import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";

function UserIconBar({ navigation }) {
  return (
    <View>
      <TouchableOpacity
        onPressIn={() => navigation.navigate("UserDetailsScreen")}
      >
        <FontAwesome5
          name="user-astronaut"
          size={34}
          color={colors.blue_text}
          style={styles.userIcon}
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  userIcon: {
    borderColor: colors.white,
    //borderRadius: 80,
    left: "87%",
    position: "absolute",
    top: 50,
  },
});

export default UserIconBar;
