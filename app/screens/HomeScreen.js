import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import CountDown from "react-native-countdown-component";
import moment from "moment";

import AppText from "../components/AppText";
import cache from "../utility/cache";
import colors from "../config/colors";
import CustomButton from "../components/CustomButton";
import HelpButton from "../components/HelpButton";
import ScreenSetUp from "../components/ScreenSetUp";
import AuthContext from "../auth/context";
import UserIconBar from "../components/UserIconBar";

var timerExpired = false;

function HomeScreen({ navigation }) {
  const { user, token } = useContext(AuthContext);
  const [neoTime, setNeoTime] = useState(1679764500000);
  const [duration, setDuration] = useState(+10);
  const [nextQuiz, setNextQuiz] = useState(+10);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [quizTimerDone, setQuizTimerDone] = useState(false);
  const quizTimer = Number(nextQuiz);
  const nftTimer = Number(duration);

  const getNEO = async () => {
    return await fetch("http://192.168.1.177:3000/api/nft_data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNeoTime(data.date);
        cache.store("neoTime", data.date);
        return data;
      });
  };

  const getNFTDuration = () => {
    setLoading(true);
    const currentTime = Date.now();
    const endTime = neoTime;
    const difference = endTime - currentTime;
    const seconds = Math.floor(difference / 1000).toFixed(0);
    setDuration(seconds);
    setLoading(false);
  };

  const getTilMidnight = () => {
    setLoading(true);
    var midnight = new Date();
    midnight.setHours(24);
    midnight.setMinutes(0);
    midnight.setSeconds(0);
    midnight.setMilliseconds(0);
    const remaining = Math.floor(
      (midnight.getTime() - new Date().getTime()) / 1000
    );
    setNextQuiz(remaining);
    setLoading(false);
  };

  const quizReady = () => {
    setLoading(true);
    const today = moment(new Date()).format("MM/DD/YYYY");
    console.log("today", today);
    console.log(user.date_completed);
    console.log(!moment(today).isSame(user.date_completed));
    if (!moment(today).isSame(user.date_completed)) {
      setReady(true);
    } else setReady(false);
    setLoading(false);
  };

  const newNFT = () => {
    //check cacheed neo time vs current time
    //if neo time has pass run setUser and getNEO
    const neoTime = cache.get("neoTime");
    const now = new Date().getTime();

    if (now > neoTime) {
      setUser({
        ...user,
        current_quiz_score: 0,
        current_score: 0,
      });
      //getNEO();
    }
  };

  useEffect(() => {
    //getNEO();
    quizReady();
    getNFTDuration();
    getTilMidnight();
  }, [duration, nextQuiz, quizTimerDone, user]);

  return loading ? (
    <Text>Loading</Text>
  ) : (
    <ScreenSetUp style={{ backgroundColor: colors.backgroundGrey }}>
      <UserIconBar navigation={navigation}></UserIconBar>

      <View style={styles.points}>
        {!user ? (
          <AppText></AppText>
        ) : (
          <AppText color="red" fontSize={26}>
            {user.current_score}
          </AppText>
        )}
      </View>
      <View style={styles.timerBox}>
        <AppText fontSize={22}>Time until next quiz</AppText>
        <View style={{ flex: 1 }}>
          <View style={styles.counter1}>
            <Ionicons name="timer-outline" size={26} color={colors.blue_text} />
            <CountDown
              //TIMER FOR QUIZ
              until={quizTimer}
              size={30}
              onFinish={() => setQuizTimerDone(true)}
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
              source={require("../assets/animations/rocket.json")}
            />
          </View>
        </View>
      ) : (
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
      )}
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          borderWidth: 5,
          borderColor: "yellow",
          height: 150,
          marginTop: 60,
        }}
      >
        <AppText fontSize={20}>Time until next NFT is awarded</AppText>
        <View style={styles.counter}>
          <Ionicons name="timer-outline" size={26} color={colors.blue_text} />
          <CountDown
            //TIMER FOR NFT
            //has id prop to use to reset
            until={nftTimer}
            size={30}
            onFinish={() => newNFT()}
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
    top: 10,
  },
  text: {
    alignSelf: "center",
  },
  timerBox: {
    alignItems: "center",
    borderColor: "yellow",
    borderWidth: 5,
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
    borderColor: colors.backgroundGrey,
    borderRadius: 80,
    left: "90%",
    position: "absolute",
    top: 50,
  },
});
export default HomeScreen;
