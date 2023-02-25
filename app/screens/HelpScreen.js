import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import * as Animatable from "react-native-animatable";
import Collapsible from "react-native-collapsible";
import Accordion from "react-native-collapsible/Accordion";

import colors from "../config/colors";
import ScreenSetUp from "../components/ScreenSetUp";
import ClickableText from "../components/ClickableText";

const ANSWER_ONE = "SOME ANSWER";

const CONTENT = [
  {
    title: "Q1",
    content: ANSWER_ONE,
  },
  {
    title: "Q2",
    content: ANSWER_ONE,
  },
  {
    title: "Q3",
    content: ANSWER_ONE,
  },
];

export default class HelpScreen extends Component {
  state = {
    activeSections: [],
    collapsed: true,
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSections = (sections) => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text>{section.content}</Text>
      </Animatable.View>
    );
  }

  render() {
    const { activeSections } = this.state;

    return (
      <ScreenSetUp style={styles.screen}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
            <Text style={styles.title}>Fequently Asked Questions</Text>

            <Collapsible collapsed={this.state.collapsed}>
              <View style={styles.content}>
                <Animatable.Text
                  animation={this.state.collapsed ? undefined : "zoomIn"} //what does this animatable do
                  duration={300}
                  useNativeDriver
                ></Animatable.Text>
              </View>
            </Collapsible>
            <Accordion
              align="bottom"
              activeSections={activeSections}
              sections={CONTENT}
              touchableComponent={TouchableOpacity}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
              duration={400}
              onChange={this.setSections}
              renderAsFlatList={false}
            />
          </ScrollView>
        </View>
        <View style={styles.contactUs}>
          <ClickableText
            title="Contact Us"
            onPress={() => console.log("contact")}
          />
        </View>
      </ScreenSetUp>
    );
  }
}

const styles = StyleSheet.create({
  active: {
    backgroundColor: colors.lightGrey,
  },
  contactUs: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    padding: 10,
  },
  headerText: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    width: "50%",
    height: 30,
    borderRadius: 15,
    color: colors.blue_text,
    backgroundColor: colors.buttonColor,
    paddingTop: 5,
  },
  inactive: {
    backgroundColor: colors.buttonBorder,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.red,
  },
  screen: {
    backgroundColor: colors.buttonBorder,
  },
});
