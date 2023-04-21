import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../components/AppText";
import AuthContext from "../auth/context";
import CountDown from "react-native-countdown-component";
import CustomButton from "../components/CustomButton";
import HelpButton from "../components/HelpButton";
import { Ionicons } from "@expo/vector-icons";
import LoadingIndicator from "../components/LoadingIndicator";
import LottieView from "lottie-react-native";
import PropTypes from "prop-types";
import ScreenSetUp from "../components/ScreenSetUp";
import UserIconBar from "../components/UserIconBar";
import cache from "../utility/cache";
import colors from "../config/colors";
import { useFocusEffect } from "@react-navigation/native";

function HomeScreen({ navigation }) {
  const { user, setUser, token, neoTime, setNeoTime, setRank } =
    useContext(AuthContext);
  const [duration, setDuration] = useState(-1);
  const [nextQuiz, setNextQuiz] = useState();
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [quizTimerDone, setQuizTimerDone] = useState(false);
  var quizTimer = Number(nextQuiz);

  const getUserView = async () => {
    return await fetch("https://nasaft-tbact528.b4a.run/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((data) => {
        setRank(data.overall_rank);
      })
      .catch((error) => console.log("error", error));
  };
  const getNEO = async () => {
    const testTime = await cache.get("neoTimeStamp");
    return await fetch("https://nasaft-tbact528.b4a.run/api/neo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((data) => {
        if (testTime != data.neo.dateUTC) {
          console.log("NEW NEO ACQUIRED");
          newNFTSetup();
          setNeoTime(data.neo.dateUTC);
          cache.store("neoTimeStamp", data.neo.dateUTC);
          return data.neo.dateUTC;
        }
        setNeoTime(data.neo.dateUTC);
        return data.neo.dateUTC;
      })
      .catch((error) => console.log("error", error));
  };

  const getNFTDuration = () => {
    const currentTime = Date.now();
    const endTime = neoTime;
    const difference = endTime - currentTime;
    const seconds = Math.floor(difference / 1000).toFixed(0);
    setDuration(seconds);
  };

  const getTilMidnight = () => {
    var midnight = new Date();
    midnight.setHours(24);
    midnight.setMinutes(0);
    midnight.setSeconds(0);
    midnight.setMilliseconds(0);
    const remaining = Math.floor(
      (midnight.getTime() - new Date().getTime()) / 1000
    );
    setNextQuiz(remaining);
  };

  const quizReady = () => {
    var splitDate;
    var storedYear;
    var storedMonth;
    var storedDay;
    const today = new Date();
    const userDate = user.date_completed;
    if (userDate != null) {
      splitDate = userDate.split("-");
      storedYear = splitDate[0];
      storedMonth = splitDate[1];
      storedDay = splitDate[2];
      if (splitDate.length == 1) {
        splitDate = splitDate[0].split("/");
        storedYear = splitDate[2];
        storedMonth = splitDate[0];
        storedDay = splitDate[1];
      }
    }
    console.log(storedYear);
    console.log(storedMonth);
    console.log(storedDay);
    if (splitDate != undefined) {
      if (today.getFullYear() > storedYear) {
        // its a new year from when they last played
        console.log("new year");
        setReady(true);
      } else if (parseInt(today.getMonth() + 1) > storedMonth) {
        // its next month from the last time they played
        setReady(true);
      } else if (parseInt(today.getDate()) > storedDay) {
        console.log("new day");
        // its the next day from the last time they played
        setReady(true);
      } else {
        setReady(false);
      }
    } else {
      setReady(true);
    }
  };

  const newNFTSetup = () => {
    const winner = user.winner;
    if (winner) {
      setUser({
        ...user,
        // eslint-disable-next-line no-undef
        nft_earned: user.nft_earned + 1,
        current_quiz_score: 0,
        current_score: 0,
        winner: false,
      });
    } else {
      setUser({
        ...user,
        current_quiz_score: 0,
        current_score: 0,
      });
    }
  };

  const handleQuizTimerDone = () => {
    getTilMidnight();
    quizReady();
  };

  useEffect(() => {
    getNEO();
    getUserView();
  }, []);

  useEffect(() => {
    getNFTDuration();
    getTilMidnight();
    quizReady();
  }, [quizTimerDone, user, neoTime]);

  useEffect(() => {
    setLoading(true);
    if (duration > 1) {
      setLoading(false);
    }
  }, [duration]);

  useFocusEffect(
    React.useCallback(() => {
      getNFTDuration();
    })
  );
  return loading ? (
    <LoadingIndicator visible={true} />
  ) : (
    <ScreenSetUp style={{ backgroundColor: colors.white }}>
      <UserIconBar navigation={navigation}></UserIconBar>

      <View style={styles.points}>
        {!user ? (
          <AppText></AppText>
        ) : (
          <>
            <AppText color="blue_text" fontSize={18}>
              Points earned this NEO
            </AppText>
            <AppText color="red" fontSize={26}>
              {user.current_score}
            </AppText>
          </>
        )}
      </View>
      <View style={styles.timerBox}>
        <AppText fontSize={22}>Time until next quiz</AppText>
        <View style={{ flex: 1 }}>
          <View style={styles.counter1}>
            <Ionicons name="timer-outline" size={26} color={colors.blue_text} />
            <CountDown
              // TIMER FOR QUIZ
              until={quizTimer}
              size={30}
              onFinish={() => handleQuizTimerDone()}
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
      {!ready ? (
        <View>
          <View
            style={{
              alignItems: "center",
              height: 80,
            }}
          >
            <AppText fontFamily="Rag_Bo" fontSize={22}>
              Next quiz not availble yet!
            </AppText>
          </View>
          <View style={{ height: 140 }}>
            <LottieView
              autoPlay
              loop
              // eslint-disable-next-line no-undef
              source={require("../assets/animations/rocket.json")}
            />
          </View>
        </View>
      ) : (
        <View style={styles.quizButton}>
          <CustomButton
            title="Start Daily Quiz"
            onPress={() => navigation.navigate("QuizScreen")}
            fontSize={28}
            fontFamily="Rag_Bo"
            borderColor="blue_text"
          />
        </View>
      )}
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          borderWidth: 10,
          borderColor: colors.buttonColor,
          height: 150,
          marginTop: 60,
        }}
      >
        <AppText fontSize={20}>Time until next NFT is awarded</AppText>
        <View style={styles.counter}>
          <Ionicons name="timer-outline" size={22} color={colors.blue_text} />
          <CountDown
            // TIMER FOR NFT
            // has id prop to use to reset
            until={Number(duration)}
            size={30}
            onFinish={() => getNEO()}
            digitStyle={{ backgroundColor: "transparent" }}
            digitTxtStyle={{ color: colors.blue_text }}
            timeToShow={["D", "H", "M"]}
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

HomeScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  backArrow: {
    borderRadius: 80,
    position: "absolute",
    right: "90%",
    top: 50,
  },
  counter: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  counter1: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  counterIcon: {
    alignSelf: "center",
  },
  points: {
    alignItems: "center",
    height: 100,
    top: 15,
  },
  text: {
    alignSelf: "center",
  },
  timerBox: {
    alignItems: "center",
    borderColor: colors.buttonColor,
    borderWidth: 10,
    height: 150,
    marginBottom: 50,
    paddingTop: 20,
  },
  quizButton: {
    alignSelf: "center",
    height: 80,
    marginBottom: 40,
    paddingBottom: 20,
    width: "80%",
  },
  userIcon: {
    borderColor: colors.white,
    borderRadius: 80,
    left: "90%",
    position: "absolute",
    top: 50,
  },
});
export default HomeScreen;
