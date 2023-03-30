import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";

function HeaderBar({ navigation }) {
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
      <View style={{ height: "10%" }}>
        <TouchableOpacity onPressIn={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={32}
            color={colors.blue_text}
            style={styles.backArrow}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backArrow: {
    //borderRadius: 80,
    position: "absolute",
    right: "87%",
    top: 50,
  },
  userIcon: {
    borderColor: colors.white,
    //borderRadius: 80,
    left: "87%",
    position: "absolute",
    top: 50,
  },
});
export default HeaderBar;
