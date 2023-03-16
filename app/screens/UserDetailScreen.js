import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";

import AppText from "../components/AppText";
import colors from "../config/colors";
import CustomButton from "../components/CustomButton";
import DetailLines from "../components/DetailLines";
import ScreenSetUp from "../components/ScreenSetUp";
import AuthContext from "../auth/context";

function UserDetailScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const name = user.user_name + " Details";

  return (
    <ScreenSetUp style={{ backgroundColor: colors.backgroundGrey }}>
      <View style={{ height: "10%" }}>
        <TouchableOpacity onPressIn={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={28}
            color={colors.blue_text}
            style={styles.backArrow}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.header}>{name}</Text>
        <View style={styles.userContainer}>
          <AppText>Display Name</AppText>
          <TextInput
            placeholder={user.user_name}
            style={styles.usernameInput}
          ></TextInput>
          <TouchableOpacity onPress={() => console.log("edit name")}>
            <Feather name="edit" size={20} color={colors.blue_text} />
          </TouchableOpacity>
        </View>
        <DetailLines
          title="Questions Attempted"
          data={user.questions_answered}
        />
        <DetailLines title="Questions Correct" data={user.questions_correct} />
        <DetailLines title="Total Points Earned" data={user.overall_score} />
        <DetailLines title="NFTs Earned" data={user.nft_earned} />
        <DetailLines title="Overall Ranking" data={user.overall_rank} />
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
    borderRadius: 80,
    position: "absolute",
    right: "90%",
    top: 50,
  },
  dataContainer: {
    flex: 1,
  },
  header: {
    alignSelf: "center",
    color: colors.red,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  logout: {
    alignItems: "flex-end",
    flex: 0.5,
    justifyContent: "flex-end",
    padding: 10,
  },
  save: {
    alignSelf: "center",
    height: 70,
    justifyContent: "flex-end",
    width: "50%",
  },
  userContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 30,
  },
  usernameInput: {
    alignItems: "center",
    backgroundColor: "white",
    borderBottomColor: colors.buttonBorder,
    borderBottomWidth: 1,
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 40,
    paddingRight: 40,
  },
});
export default UserDetailScreen;
