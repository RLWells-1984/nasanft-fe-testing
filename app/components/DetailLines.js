import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "./AppText";

function DetailLines({ title, data }) {
  return (
    <View style={styles.dataLine}>
      <AppText>{title}</AppText>
      <View style={styles.dataValue}>
        <AppText>{data}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dataLine: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    paddingLeft: 20,
  },
  dataValue: {
    alignItems: "flex-end",
    flex: 1,
    paddingRight: 30,
  },
});
export default DetailLines;
