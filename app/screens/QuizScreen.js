import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import AppText from "../components/AppText";
import colors from "../config/colors";
import CustomButton from "../components/CustomButton";
import HeaderBar from "../components/HeaderBar";
import HelpButton from "../components/HelpButton";
import QuestionBox from "../components/QuestionBox";
import ScreenSetUp from "../components/ScreenSetUp";
import Timer from "../components/Timer";

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
        <Timer></Timer>
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
    alignSelf: "center",
    flex: 1,
    width: "90%",
  },
  backArrow: {
    borderRadius: 80,
    position: "absolute",
    right: "90%",
    top: 30,
  },
  QuestionBox: {
    flex: 1,
    flexGrow: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  screen: {
    backgroundColor: colors.buttonBorder,
    flex: 1,
  },
  text: {
    borderBottomColor: colors.red,
    borderBottomWidth: 5,
    borderTopColor: colors.red,
    borderTopWidth: 5,
    color: colors.blue_text,
    fontSize: 24,
    marginTop: 12,
    textAlign: "center",
    textAlignVertical: "center",
  },
  touchable: {
    alignSelf: "center",
    height: 70,
    justifyContent: "flex-end",
    marginTop: 30,
    paddingBottom: 20,
    width: "60%",
  },
  userIcon: {
    borderColor: colors.buttonBorder,
    borderRadius: 80,
    left: "90%",
    position: "absolute",
    top: 30,
  },
});
export default QuizScreen;
