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
    title: "When do I get my NFT?",
    content:
      "Each NFT is available for a limited time as displayed on the NFT countdown timer.  Once this timer" +
      " reaches zero everyone who has earned an NFT will recieve one.",
  },
  {
    title: "How do I earn and NFT?",
    content:
      "To earn the current NFT you must score at least 700 on a single quiz. You will have at least 2 quizzes per NFT.",
  },
  {
    title: "Why do my owned NEO rankings show N/A?",
    content:
      "Only the top 10 NEO's for each category are tracked. If you do not own a NEO in the top ten your rank will display N/A.",
  },
  {
    title: "What if my question isn't answered here?",
    content:
      "Please use the contact us button below to send and email and we will get back to you soon!",
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
