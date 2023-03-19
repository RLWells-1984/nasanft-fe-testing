import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppText from "../components/AppText";
import colors from "../config/colors";
import CustomButton from "../components/CustomButton";
import HeaderBar from "../components/HeaderBar";
import HelpButton from "../components/HelpButton";
import QuestionBox from "../components/QuestionBox";
import ScreenSetUp from "../components/ScreenSetUp";
import Timer from "../components/Timer";
import AuthContext from "../auth/context";
import cache from "../utility/cache";

function QuizScreen({ navigation }) {
  const { user, setUser, token } = useContext(AuthContext);
  const updateDate = {
    user: user,
    user_name: user.user_name,
  };

  const getQuiz = async () => {
    setLoading(true);
    return await fetch("http://192.168.1.177:3000/api/quizzes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setQuiz(data);
        cache.store("quiz", data);
        setLoading(false);
        return data;
      });
  };

  const handleclick = (id, right) => {
    setSelected(id);
    if (right) {
      setCorrect(correct + 1);
    }
  };

  const handleNext = () => {
    setQuestionNumber(questionNumber + 1);
    setDisplayNumber(displayNumber + 1);
    setSelected(5);
  };

  const handleSubmit = () => {
    const points = correct * 100;
    updateUserDetails();
    Alert.alert(
      "Quiz Completed",
      "You got " +
        correct +
        " answers correct! You earned " +
        points +
        " points!",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("HomeScreen"),
        },
      ]
    );
    updateUserDetails(points);
  };

  const updateUserDetails = (points) => {
    setUser({
      ...user,
      current_quiz_score: points,
      current_score: user.current_score + points,
      overall_score: user.overall_score + points,
      questions_answered: user.questions_answered + 10,
      questions_correct: user.questions_correct + correct,
    });
  };

  const updateDB = async () => {
    return await fetch("http://192.168.1.177:3000/api/users/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(updateDate),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    updateDB();
  }, [user]);

  const [quiz, setQuiz] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(5);
  const [correct, setCorrect] = useState(0);
  const [displayNumber, setDisplayNumber] = useState(1);
  const questNum = "Question: " + displayNumber;

  useEffect(() => {
    getQuiz();
  }, []);

  return loading ? (
    <Text>loading</Text>
  ) : (
    <ScreenSetUp style={{ backgroundColor: colors.backgroundGrey }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 300 }}>
        <ActivityIndicator animating={loading} size="large" />
        <Timer></Timer>
        <AppText fontSize={30} style={styles.text}>
          {questNum}
        </AppText>
        <View style={styles.QuestionBox}>
          <QuestionBox>{quiz.questions[questionNumber].question}</QuestionBox>
        </View>
        <View style={styles.answers}>
          <CustomButton
            color={selected === 0 ? "red" : "buttonColor"}
            textColor={selected === 0 ? "white" : "blue_text"}
            marginVertical={5}
            onPress={() =>
              handleclick(
                0,
                quiz.questions[questionNumber].answers[0].correct_answer
              )
            }
            style={{ fontSize: 16 }}
            title={quiz.questions[questionNumber].answers[0].answer}
          ></CustomButton>
          <CustomButton
            color={selected === 1 ? "red" : "buttonColor"}
            textColor={selected === 1 ? "white" : "blue_text"}
            marginVertical={5}
            onPress={() =>
              handleclick(
                1,
                quiz.questions[questionNumber].answers[1].correct_answer
              )
            }
            style={{ fontSize: 16 }}
            title={quiz.questions[questionNumber].answers[1].answer}
          ></CustomButton>
          <CustomButton
            color={selected === 2 ? "red" : "buttonColor"}
            textColor={selected === 2 ? "white" : "blue_text"}
            marginVertical={5}
            onPress={() =>
              handleclick(
                2,
                quiz.questions[questionNumber].answers[2].correct_answer
              )
            }
            style={{ fontSize: 16 }}
            title={quiz.questions[questionNumber].answers[2].answer}
          ></CustomButton>
          <CustomButton
            color={selected === 3 ? "red" : "buttonColor"}
            textColor={selected === 3 ? "white" : "blue_text"}
            marginVertical={5}
            onPress={() =>
              handleclick(
                3,
                quiz.questions[questionNumber].answers[3].correct_answer
              )
            }
            style={{ fontSize: 16 }}
            title={quiz.questions[questionNumber].answers[3].answer}
          ></CustomButton>
        </View>
        <View style={styles.touchable}>
          <CustomButton
            title={questionNumber === 9 ? "Submit" : "Next"}
            onPress={() => {
              questionNumber === 9 ? handleSubmit() : handleNext();
            }}
          />
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
