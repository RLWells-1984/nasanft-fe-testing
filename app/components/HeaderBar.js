import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";

function HeaderBar({ navigation }) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("UserDetailsScreen")}
      >
        <FontAwesome5
          name="user-astronaut"
          size={30}
          color={colors.blue_text}
          style={styles.userIcon}
        />
      </TouchableOpacity>
      <View style={{ height: "10%" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={28}
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
    position: "absolute",
    top: 50,
    right: "90%",
    borderRadius: 80,
  },
  userIcon: {
    position: "absolute",
    top: 50,
    left: "90%",
    borderColor: colors.backgroundGrey,
    borderRadius: 80,
  },
});
export default HeaderBar;
