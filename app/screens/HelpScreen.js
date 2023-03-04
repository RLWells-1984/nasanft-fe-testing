import React, { useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import * as Animatable from "react-native-animatable";
import Accordion from "react-native-collapsible/Accordion";

import ClickableText from "../components/ClickableText";
import ScreenSetUp from "../components/ScreenSetUp";
import colors from "../config/colors";
import GoBackHeader from "../components/GoBackHeader";
import AppText from "../components/AppText";

const CONTENT = [
  {
    title: "Q1",
    content: "ANSWER_ONE blah blah bhabhablahblakbhalkfhdlkasdjhflksd",
  },
  {
    title: "Q2",
    content:
      "ANSWER_ONE sdjkfjaslkdf kasfjdlkasdj flaskdjf lkas aksldfjalksd jflkasdjflaksdj flksdfjnlksdjf",
  },
  {
    title: "Q3",
    content:
      " sakldjfalksd aksldjf laksdj flkasdjfalskd fjlksd jalskdfjANSWER_ONE",
  },
];

function HelpScreen({ navigation }) {
  const [activeSections, setActiveSections] = useState([]);

  const [collapsed, setCollapsed] = useState(true);

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  const setSections = (sections) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderHeader = (section, _, isActive) => {
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

  const renderContent = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.Text
          animation={isActive ? "bounceIn" : undefined}
          style={{ textAlign: "center" }}
        >
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  };

  return (
    <ScreenSetUp style={{ backgroundColor: colors.backgroundGrey }}>
      <GoBackHeader color="blue_text" navigation={navigation} />
      <View style={styles.container}>
        <ScrollView>
          <AppText
            style={styles.title}
            color="red"
            fontFamily="Rag_Bo"
            fontSize={24}
          >
            Fequently Asked Questions
          </AppText>

          <Accordion
            activeSections={activeSections}
            sections={CONTENT}
            touchableComponent={TouchableOpacity}
            renderHeader={renderHeader}
            renderContent={renderContent}
            duration={400}
            onChange={setSections}
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

export default HelpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contactUs: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  header: {
    padding: 10,
    color: colors.blue_text,
  },
  headerText: {
    textAlign: "center",
    fontSize: 18,
    color: colors.blue_text,
    fontFamily: "Rag_B_I",
  },
  content: {
    padding: 20,
  },
  active: {
    backgroundColor: colors.white,
  },
  inactive: {
    backgroundColor: colors.backgroundGrey,
    borderBottomColor: colors.blue_text,
    borderBottomWidth: 2,
  },
});
