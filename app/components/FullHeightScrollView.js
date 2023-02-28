import * as React from "react";
import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";

export function FullHeightScrollView(props) {
  return (
    <ScrollView contentContainerStyle={styles.grow} {...props}>
      {props.children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  grow: { flexGrow: 1 },
});
