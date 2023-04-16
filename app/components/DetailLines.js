import { StyleSheet, View } from "react-native";
import AppText from "./AppText";
import PropTypes from "prop-types";
import React from "react";

function DetailLines({ data, title }) {
  return (
    <View style={styles.dataLine}>
      <AppText>{title}</AppText>
      <View style={styles.dataValue}>
        <AppText>{data}</AppText>
      </View>
    </View>
  );
}

DetailLines.propTypes = {
  data: PropTypes.string,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
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
export default DetailLines;
