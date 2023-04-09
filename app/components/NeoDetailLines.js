import React from "react";
import { Image, StyleSheet, View } from "react-native";

import AppText from "./AppText";

function NeoDetailLines({ distance, id, size, url, velocity }) {
  return (
    <View style={styles.dataLine}>
      <View style={styles.attributesStyle}>
        <AppText>ID: {id}</AppText>
        <AppText>Size: {size}</AppText>
        <AppText>Velocity: {velocity}</AppText>
        <AppText>Distance: {distance}</AppText>
      </View>
      <View style={styles.dataValue}>
        <Image
          source={{
            width: 150,
            height: 150,
            uri: url,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  attributesStyle: {
    flexDirection: "column",
  },
  dataLine: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
    paddingLeft: 20,
  },
  dataValue: {
    alignItems: "flex-end",
    flex: 1,
    paddingRight: 30,
  },
});

export default NeoDetailLines;
