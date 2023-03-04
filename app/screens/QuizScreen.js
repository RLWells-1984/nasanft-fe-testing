import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import ScreenSetUp from "../components/ScreenSetUp";
import colors from "../config/colors";
import QuestionBox from "../components/QuestionBox";
import CustomButton from "../components/CustomButton";
import AppText from "../components/AppText";
import HeaderBar from "../components/HeaderBar";
import HelpButton from "../components/HelpButton";

function QuizScreen({ navigation }) {
  const answerA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz";
  const answerB = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz B";
  const answerC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz C";
  const answerD = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz D";

  return (
    //timer up top
    <ScreenSetUp style={{ backgroundColor: colors.backgroundGrey }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 300 }}>
        <HeaderBar navigation={navigation}></HeaderBar>
        <AppText fontSize={30} style={styles.text}>
          Question
        </AppText>
        <View style={styles.QuestionBox}>
          <QuestionBox>
            cjvlkasdjfglkasdjflkdsa LS;AKD FJALKSDFJLKSAD FSLKD FJASLKDFJ ALKSD
            LSADKFJJ ALSKDFJ ALKSDF SALDKFJ ASLKD FJASLE ASLDKFJ LASKDJF
          </QuestionBox>
        </View>
        <View style={styles.answers}>
          <CustomButton
            title={answerA}
            marginVertical={5}
            onPress={() => console.log("AnswerA")}
            style={{ fontSize: 16 }}
          ></CustomButton>
          <CustomButton
            title={answerB}
            marginVertical={5}
            onPress={() => console.log("AnswerB")}
            style={{ fontSize: 16 }}
          ></CustomButton>
          <CustomButton
            title={answerC}
            marginVertical={5}
            onPress={() => console.log("AnswerC")}
            style={{ fontSize: 16 }}
          ></CustomButton>
          <CustomButton
            title={answerD}
            marginVertical={5}
            onPress={() => console.log("AnswerD")}
            style={{ fontSize: 16 }}
          ></CustomButton>
        </View>
        <View style={styles.touchable}>
          <CustomButton title="Submit" onPress={() => console.log("submit")} />
        </View>

        <HelpButton navigation={navigation} />
      </ScrollView>
    </ScreenSetUp>
  );
}

const styles = StyleSheet.create({
  answers: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  backArrow: {
    position: "absolute",
    top: 30,
    right: "90%",
    borderRadius: 80,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.buttonBorder,
  },
  QuestionBox: {
    flex: 1,
    width: "100%",
    flexGrow: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    color: colors.blue_text,
    borderBottomColor: colors.red,
    borderBottomWidth: 5,
    borderTopColor: colors.red,
    borderTopWidth: 5,
    marginTop: 12,
    textAlign: "center",
    textAlignVertical: "center",
  },
  touchable: {
    alignSelf: "center",
    justifyContent: "flex-end",
    width: "60%",
    paddingBottom: 20,
    height: 70,
    marginTop: 30,
  },
  userIcon: {
    position: "absolute",
    top: 30,
    left: "90%",
    borderColor: colors.buttonBorder,
    borderRadius: 80,
  },
});
export default QuizScreen;
