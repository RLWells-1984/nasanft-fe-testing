import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Constants from "expo-constants";
import moment from "moment";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

import AppText from "../components/AppText";
import colors from "../config/colors";
import CustomButton from "../components/CustomButton";
import HelpButton from "../components/HelpButton";
import QuestionBox from "../components/QuestionBox";
import ScreenSetUp from "../components/ScreenSetUp";
import AuthContext from "../auth/context";
import cache from "../utility/cache";
import LoadingIndicator from "../components/LoadingIndicator";

function QuizScreen({ navigation }) {
  const { user, setUser, refreshToken, setRefreshToken, token, setToken } =
    useContext(AuthContext);
  const updateDate = {
    user: user,
    public_address: user.public_address,
  };
  const [quiz, setQuiz] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(5);
  const [correct, setCorrect] = useState(0);
  const [displayNumber, setDisplayNumber] = useState(1);
  const [quizDone, setQuizDone] = useState(false);
  const questNum = "Question: " + displayNumber;

  const useRefreshToken = async () => {
    return await fetch("http://192.168.1.177:3000/api/token/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": refreshToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data != null) {
          setToken(data.accessToken);
        }
      });
  };

  const getQuiz = async () => {
    return await fetch("http://192.168.1.177:3000/api/quizzes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (
          data.text != undefined &&
          data.text.localeCompare("jwt expired") == 0
        ) {
          useRefreshToken();
        } else if (data.text == undefined) {
          if (quiz.length == 0) {
            setQuiz(data);
            cache.store("quiz", data);
            setQuizDone(false);
            return data;
          }
        }
      })
      .catch((error) => console.log("error", error));
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
    setQuizDone(true);
    var points = correct * 100;
    updateUserDetails(points);
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
  };

  const updateUserDetails = (points) => {
    if (points >= 700) {
      setUser({
        ...user,
        winner: true,
        current_quiz_score: points,
        current_score: user.current_score + points,
        overall_score: user.overall_score + points,
        questions_answered: user.questions_answered + 10,
        questions_correct: user.questions_correct + correct,
        date_completed: moment(new Date()).format("MM/DD/YYYY"),
      });
    } else {
      setUser({
        ...user,
        current_quiz_score: points,
        current_score: user.current_score + points,
        overall_score: user.overall_score + points,
        questions_answered: user.questions_answered + 10,
        questions_correct: user.questions_correct + correct,
        date_completed: moment(new Date()).format("MM/DD/YYYY"),
      });
    }
  };

  const updateUserDB = async () => {
    return await fetch("http://192.168.1.177:3000/api/users/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(updateDate),
    })
      .then((response) => response.json())
      .then((data) => {});
  };

  const updateWinnerDB = async () => {
    if (correct >= 7) {
      const userAddress = { public_address: user.public_address };
      return await fetch("http://192.168.1.177:3000/api/quizzes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(userAddress),
      })
        .then((response) => response.json())
        .then((data) => {});
    } else {
    }
  };

  useEffect(() => {
    updateUserDB();
    updateWinnerDB();
  }, [user]);

  useEffect(() => {
    setLoading(true);
    getQuiz();
    if (quiz.length != 0) {
      setLoading(false);
    }
  }, [token, quiz]);

  return loading ? (
    <LoadingIndicator visible={true} />
  ) : (
    <ScreenSetUp style={{ backgroundColor: colors.white }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 300 }}>
        <View style={styles.container}>
          <CountdownCircleTimer
            isPlaying
            duration={90}
            colors={["#38761d", "#8fce00", "#ffc000", "#cc0000"]}
            colorsTime={[90, 60, 30, 0]}
            size={120}
            onComplete={() => {
              if (quizDone == false) {
                handleSubmit();
              }
              return [false, 0];
            }}
          >
            {({ remainingTime, animatedColor }) => (
              <Animated.Text
                style={{ ...styles.remainingTime, color: animatedColor }}
              >
                {remainingTime}
              </Animated.Text>
            )}
          </CountdownCircleTimer>
        </View>
        <AppText fontSize={30} style={styles.text}>
          {questNum}
        </AppText>
        <View style={styles.QuestionBox}>
          <QuestionBox>{quiz.questions[questionNumber].question}</QuestionBox>
        </View>
        <View style={styles.answers}>
          <CustomButton
            borderColor="blue_text"
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
            borderColor="blue_text"
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
            borderColor="blue_text"
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
            borderColor="blue_text"
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
            borderColor="blue_text"
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.white,
    padding: 8,
  },
  QuestionBox: {
    flex: 1,
    flexGrow: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  remainingTime: {
    fontSize: 46,
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
