import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Svg, { Path, LinearGradient, Defs } from "react-native-svg";
import { useCountdown } from "react-native-countdown-circle-timer";

function Timer(props) {
  const duration = 60;

  const {
    elapsedTime,
    path,
    pathLength,
    remainingTime,
    stroke,
    strokeDashoffset,
  } = useCountdown({
    colors: ["#8fce00", "#ffc000", "#cc0000"],
    colorsTime: [60, 30, 15],
    duration,
    isPlaying: true,
  });

  return (
    <View style={styles.container}>
      <View style={styles.alignmentView}>
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
  alignmentView: {
    alignItems: "center",
    height: 180,
    justifyContent: "center",
    paddingBottom: 10,
    width: 180,
  },
  container: {
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
    height: 100,
    justifyContent: "center",
    padding: 8,
    width: 100,
  },
  time: {
    alignItems: "center",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    left: 0,
    position: "absolute",
    top: 0,
    width: "100%",
  },
});
export default Timer;
