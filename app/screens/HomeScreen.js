import React, { useState } from "react";

import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import CountDown from "react-native-countdown-component";

import colors from "../config/colors";
import CustomButton from "../components/CustomButton";
import AppText from "../components/AppText";
import ScreenSetUp from "../components/ScreenSetUp";
import defaultStyles from "../config/styles";
import HeaderBar from "../components/HeaderBar";
import HelpButton from "../components/HelpButton";

const duration = 2 * 24 * 60 * 60 - 1;
const timerExpired = false;

function HomeScreen({ navigation }) {
  return (
    <ScreenSetUp style={{ backgroundColor: colors.backgroundGrey }}>
      <HeaderBar navigation={navigation}></HeaderBar>

      <View style={styles.points}>
        <AppText color="red" fontSize={26}>
          8100 points
        </AppText>
      </View>
      <View
        style={{
          alignItems: "center",
          height: 150,
          borderWidth: 5,
          borderColor: "yellow",
          paddingTop: 20,
          marginBottom: 50,
        }}
      >
        <AppText fontSize={22}>Time until next quiz</AppText>
        <View style={{ flex: 1 }}>
          <View style={styles.counter1}>
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
      </View>

      <View style={styles.quizButton}>
        <CustomButton
          //set unclickable till timerExpired = true
          title="Start Daily Quiz"
          onPress={() => navigation.navigate("QuizScreen")}
          fontSize={28}
          fontFamily="Rag_Bo"
          borderColor="blue_text"
        />
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          borderWidth: 5,
          borderColor: "yellow",
          height: 150,
          marginTop: 90,
        }}
      >
        <AppText fontSize={20}>Time until next NFT is awarded</AppText>
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
      </View>
      <HelpButton navigation={navigation} />
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
  counter1: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    top: 10,
    alignItems: "center",
    height: 100,
  },
  text: {
    alignSelf: "center",
  },
  userIcon: {
    position: "absolute",
    top: 50,
    left: "90%",
    borderColor: colors.backgroundGrey,
    borderRadius: 80,
  },
  quizButton: {
    width: "80%",
    alignSelf: "center",
    height: 80,
    marginBottom: 40,
    paddingBottom: 20,
  },
});
export default HomeScreen;
