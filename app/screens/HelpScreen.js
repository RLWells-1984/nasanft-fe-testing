import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Accordion from "react-native-collapsible/Accordion";
import * as Linking from "expo-linking";

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

  const openEmail = () => {
    Linking.openURL("mailto:NasaFTApp@gmail.com");
  };

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
    <ScreenSetUp style={{ backgroundColor: colors.white }}>
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
        <ClickableText title="Contact Us" onPress={() => openEmail()} />
      </View>
    </ScreenSetUp>
  );
}

export default HelpScreen;

const styles = StyleSheet.create({
  active: {
    backgroundColor: colors.white,
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
    color: colors.blue_text,
    padding: 10,
  },
  headerText: {
    color: colors.blue_text,
    fontFamily: "Rag_B_I",
    fontSize: 18,
    textAlign: "center",
  },
  inactive: {
    backgroundColor: colors.white,
    borderBottomColor: colors.blue_text,
    borderBottomWidth: 2,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
});
