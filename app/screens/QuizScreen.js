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

function QuizScreen(props) {
  const answerA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz";
  const answerB = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz B";
  const answerC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz C";
  const answerD = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz D";

  return (
    //timer up top
    <ScreenSetUp style={styles.screen}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 300 }}>
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
        <Text style={styles.text}>Question</Text>
        <View style={styles.QuestionBox}>
          <QuestionBox style={{ fontFamily: "Rag" }}>
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
    flex: 1,
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
