import React, { useState } from "react";

import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import CountDown from "react-native-countdown-component";

import colors from "../config/colors";
import CustomButton from "../components/CustomButton";
import AppText from "../components/AppText";
import ScreenSetUp from "../components/ScreenSetUp";
import defaultStyles from "../config/styles";

const duration = 2 * 24 * 60 * 60 - 1;
const timerExpired = false;

function HomeScreen(props) {
  return (
    <ScreenSetUp>
      <TouchableOpacity onPress={() => console.log("user icon")}>
        <FontAwesome5
          name="user-astronaut"
          size={30}
          color={colors.blue_text}
          style={styles.userIcon}
        />
      </TouchableOpacity>
      <View style={{ height: "10%" }}>
        <TouchableOpacity onPress={() => console.log("go back")}>
          <Ionicons
            name="arrow-back"
            size={28}
            color={colors.blue_text}
            style={styles.backArrow}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.points}>
        <AppText color="red">Current points from DB</AppText>
      </View>
      <View>
        <Text style={{ ...defaultStyles.text, ...styles.text }}>
          Time until next quiz
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.counter}>
          <Ionicons name="timer-outline" size={26} color={colors.blue_text} />
          <CountDown
            //has id prop to use to reset
            until={60 * 60 * 24 - 1}
            size={30}
            onFinish={() => (timerExpired = true)}
            digitStyle={{ backgroundColor: "transparent" }}
            digitTxtStyle={{ color: colors.blue_text }}
            timeToShow={["H", "M", "S"]}
            timeLabels={{}}
            separatorStyle={{ color: colors.blue_text }}
            showSeparator
          />
        </View>
      </View>
      <View style={styles.quizButton}>
        <CustomButton
          //set unclickable till timerExpired = true
          title="Start Daily Quiz"
          onPress={() => console.log("Quiz Start")}
          color="buttonColor"
          fontSize={30}
        />
      </View>
      <View>
        <Text style={{ ...defaultStyles.text, ...styles.text }}>
          Time until next NFT is awarded
        </Text>
      </View>
      <View style={styles.counter}>
        <Ionicons name="timer-outline" size={26} color={colors.blue_text} />
        <CountDown
          //has id prop to use to reset
          until={duration}
          size={30}
          onFinish={() => (timerExpired = true)}
          digitStyle={{ backgroundColor: "transparent" }}
          digitTxtStyle={{ color: colors.blue_text }}
          timeToShow={["D", "H", "M", "S"]}
          timeLabels={{}}
          separatorStyle={{ color: colors.blue_text }}
          showSeparator
        />
      </View>
    </ScreenSetUp>
  );
}

const styles = StyleSheet.create({
  backArrow: {
    position: "absolute",
    top: 50,
    right: "90%",
    borderRadius: 80,
  },
  counter: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  counterIcon: {
    alignSelf: "center",
  },
  points: {
    top: 100,
    alignItems: "center",
    flex: 1,
    weight: 500,
  },
  text: {
    alignSelf: "center",
  },
  userIcon: {
    position: "absolute",
    top: 50,
    left: "90%",
    borderColor: colors.buttonBorder,
    borderRadius: 80,
  },
  quizButton: {
    flex: 1,
    paddingTop: 10,
    width: "80%",
    alignSelf: "center",
  },
});
export default HomeScreen;
