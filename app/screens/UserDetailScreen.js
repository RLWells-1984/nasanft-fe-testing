import React from "react";
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

const attempted = 0; //import from db
const correct = 0;
const totalPoints = 0;
const earned = 0;
const ranking = 0;

function UserDetailScreen(props) {
  return (
    <View style={styles.background}>
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
      <View style={styles.dataContainer}>
        <Text style={styles.header}>USER DETAILS</Text>
        <View style={styles.userContainer}>
          <AppText title="Username" />
          <TextInput
            placeholder="User Name"
            style={styles.usernameInput} //needs to get current user name from db
          ></TextInput>
          <TouchableOpacity onPress={() => console.log("edit name")}>
            <Feather name="edit" size={20} color={colors.blue_text} />
          </TouchableOpacity>
        </View>
        <View style={styles.dataLine}>
          <AppText title="Questions Attempted" />
          <View style={styles.dataValue}>
            <AppText title={attempted} />
          </View>
        </View>
        <View style={styles.dataLine}>
          <AppText title="Questions Correct" />
          <View style={styles.dataValue}>
            <AppText title={correct} />
          </View>
        </View>
        <View style={styles.dataLine}>
          <AppText title="Total Points Earned" />
          <View style={styles.dataValue}>
            <AppText title={totalPoints} />
          </View>
        </View>
        <View style={styles.dataLine}>
          <AppText title="NFTs Earned" />
          <View style={styles.dataValue}>
            <AppText title={earned} />
          </View>
        </View>
        <View style={styles.dataLine}>
          <AppText title="Overall Ranking" />
          <View style={styles.dataValue}>
            <AppText title={ranking} />
          </View>
        </View>
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
          <AppText title="Logout" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backArrow: {
    position: "absolute",
    top: 50,
    right: "90%",
    borderRadius: 80,
  },
  background: {
    backgroundColor: colors.buttonBorder,
    flex: 1,
  },
  dataContainer: {
    flex: 1,
  },
  dataLine: {
    flexDirection: "row",
    paddingLeft: 20,
    flex: 1,
    alignItems: "center",
  },
  dataValue: {
    alignItems: "flex-end",
    flex: 1,
    paddingRight: 30,
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
    flex: 0.5,
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
