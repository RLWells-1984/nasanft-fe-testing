import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";

export function FullHeightScrollView(props) {
  return (
    <ScrollView contentContainerStyle={styles.grow} {...props}>
      {props.children}
    </ScrollView>
  );
}
FullHeightScrollView.propTypes = {
  children: React.Node,
};

const styles = StyleSheet.create({
  grow: { flexGrow: 1 },
});
