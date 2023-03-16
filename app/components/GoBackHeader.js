import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";

function GoBackHeader({ navigation, color = "white" }) {
  return (
    <View>
      <View style={{ height: "10%" }}>
        <TouchableOpacity onPressIn={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={28}
            color={colors[color]}
            style={styles.backArrow}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backArrow: {
    borderRadius: 80,
    position: "absolute",
    right: "90%",
    top: 50,
  },
});
export default GoBackHeader;
