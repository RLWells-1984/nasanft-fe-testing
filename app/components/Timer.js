import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Svg, { Path, LinearGradient, Defs } from "react-native-svg";
import Constants from "expo-constants";
import { useCountdown } from "react-native-countdown-circle-timer";
import colors from "../config/colors";

function Timer(props) {
  const duration = 60;

  const {
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    remainingTime,
    elapsedTime,
  } = useCountdown({
    isPlaying: true,
    duration,
    colors: ["#8fce00", "#ffc000", "#cc0000"],
    colorsTime: [60, 30, 15],
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          width: 180,
          height: 180,
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 10,
        }}
      >
        <Svg
          width="70%"
          height="70%"
          preserveAspectRatio="none"
          viewBox="0 0 180 180"
        >
          <Defs>
            <LinearGradient
              id="timer"
              x1="1"
              y1="0"
              x2="0"
              y2="0"
            ></LinearGradient>
          </Defs>
          <Path d={path} fill="none" stroke="#d9d9d9" strokeWidth={8} />
          {elapsedTime !== duration && (
            <Path
              d={path}
              fill="none"
              stroke={stroke}
              strokeLinecap="butt"
              strokeWidth={8}
              strokeDasharray={pathLength}
              strokeDashoffset={strokeDashoffset}
            />
          )}
        </Svg>
        <View style={styles.time}>
          <Text style={{ fontSize: 26 }}>{remainingTime}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 8,
    height: 100,
    width: 100,
  },
  time: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
  },
});
export default Timer;
