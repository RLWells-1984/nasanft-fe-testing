import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "../components/AppText";
import CustomButton from "../components/CustomButton";
import DetailLines from "../components/DetailLines";
import ScreenSetUp from "../components/ScreenSetUp";

const attempted = 0; //import from db
const correct = 0;
const totalPoints = 0;
const earned = 0;
const ranking = 0;

function UserDetailScreen({ navigation }) {
  return (
    <ScreenSetUp style={{ backgroundColor: colors.backgroundGrey }}>
      <View style={{ height: "10%" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={28}
            color={colors.blue_text}
            style={styles.backArrow}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.header}>USER DETAILS</Text>
        <View style={styles.userContainer}>
          <AppText>Display Name</AppText>
          <TextInput
            placeholder="Display Name"
            style={styles.usernameInput} //needs to get current user name from db
          ></TextInput>
          <TouchableOpacity onPress={() => console.log("edit name")}>
            <Feather name="edit" size={20} color={colors.blue_text} />
          </TouchableOpacity>
        </View>
        <DetailLines title="Questions Attempted" data={attempted} />
        <DetailLines title="Questions Correct" data={correct} />
        <DetailLines title="Total Points Earned" data={totalPoints} />
        <DetailLines title="NFTs Earned" data={earned} />
        <DetailLines title="Overall Ranking" data={ranking} />
      </View>
      <View style={styles.save}>
        <CustomButton
          title="Save"
          onPress={() => console.log("Update Username")}
        />
      </View>
      <View style={styles.logout}>
        <TouchableOpacity onPress={() => console.log("go logout")}>
          <FontAwesome5
            name="space-shuttle"
            size={20}
            color={colors.blue_text}
            style={{
              transform: [{ rotate: "300deg" }],
              paddingLeft: 20,
            }}
          />
          <AppText>Logout</AppText>
        </TouchableOpacity>
      </View>
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
  dataContainer: {
    flex: 1,
  },
  header: {
    fontSize: 22,
    color: colors.red,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
  },
  logout: {
    flex: 0.5,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    padding: 10,
  },
  save: {
    width: "50%",
    alignSelf: "center",
    justifyContent: "flex-end",
    height: 70,
  },
  userContainer: {
    flexDirection: "row",
    paddingRight: 30,
    paddingLeft: 20,
    flex: 1,
    alignItems: "center",
  },
  usernameInput: {
    borderBottomColor: colors.buttonBorder,
    borderBottomWidth: 1,
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 40,
    paddingRight: 40,
    marginLeft: 30,
    marginRight: 30,
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
  },
});
export default UserDetailScreen;
