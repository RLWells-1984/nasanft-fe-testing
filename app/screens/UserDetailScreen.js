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
  const { user, setUser, token } = useContext(AuthContext);
  const [newName, setNewName] = useState("");
  const name = user.user_name + " Details";
  const updateDate = {
    user: user,
    user_name: user.user_name,
  };

  const editUserName = () => {
    setUser({
      ...user,
      user_name: newName,
      overall_rank: 43,
    });
  };

  const saveEdit = async () => {
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

  useEffect(() => {
    saveEdit();
  }, [user]);

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
            onChangeText={(text) => setNewName(text)}
            placeholder={user.user_name}
            style={styles.usernameInput}
          ></TextInput>
          <TouchableOpacity>
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
        <CustomButton title="Save" onPress={() => editUserName()} />
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
    marginLeft: 20,
    marginRight: 30,
  },
  usernameInput: {
    backgroundColor: "white",
    borderBottomColor: colors.buttonBorder,
    borderBottomWidth: 1,
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 30,
    marginRight: 30,
  },
});
export default UserDetailScreen;
