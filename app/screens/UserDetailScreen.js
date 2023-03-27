import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import LottieView from "lottie-react-native";

import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";

import AppText from "../components/AppText";
import colors from "../config/colors";
import CustomButton from "../components/CustomButton";
import DetailLines from "../components/DetailLines";
import ScreenSetUp from "../components/ScreenSetUp";
import AuthContext from "../auth/context";

function UserDetailScreen({ navigation }) {
  const { user, setUser, token, setToken, setPublicAddress, setRefreshToken } =
    useContext(AuthContext);
  const [newName, setNewName] = useState("");
  const name = user.user_name + "'s Details";
  const updateDate = {
    user: user,
    public_address: user.public_address,
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
      .then((data) => {
        console.log(data);
      });
  };

  const logout = () => {
    navigation.navigate("WelcomeScreen");
    setUser(null);
    setToken(null);
    setPublicAddress(null);
    setRefreshToken(null);
  };

  useEffect(() => {
    saveEdit();
  }, [user]);

  return (
    <ScreenSetUp style={{ backgroundColor: colors.backgroundGrey }}>
      <View style={{ height: "10%", paddingBottom: 100 }}>
        <TouchableOpacity
          style={{ backgroundColor: colors.gold }}
          onPressIn={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color={colors.blue_text}
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <View style={styles.spaceShip}>
          <LottieView
            autoPlay
            loop
            source={require("../assets/animations/83550-alien-saucer.json")}
          />
        </View>
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
        <CustomButton
          borderColor="blue_text"
          title="Save"
          onPress={() => editUserName()}
        />
      </View>
      <View style={{ flex: 0.5 }}>
        <TouchableOpacity style={styles.logout} onPress={() => logout()}>
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
        <TouchableOpacity
          style={styles.help}
          onPressIn={() => navigation.navigate("HelpScreen")}
        >
          <View>
            <Feather name="help-circle" size={28} color="white" />
          </View>
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
  help: {
    alignSelf: "flex-end",
    padding: 20,
    position: "absolute",
    bottom: 15,
  },
  logout: {
    alignSelf: "flex-start",
    padding: 20,
    position: "absolute",
    bottom: 10,
  },
  save: {
    alignSelf: "center",
    height: 70,
    justifyContent: "flex-end",
    width: "50%",
  },
  spaceShip: {
    alignSelf: "center",
    height: 120,
    width: 160,
  },
  userContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 30,
  },
  usernameInput: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.buttonColor,
    borderWidth: 4,
    fontSize: 16,
    fontWeight: "bold",
    height: 35,
    marginLeft: 10,
    marginRight: 5,
    width: "50%",
    paddingLeft: 5,
  },
});
export default UserDetailScreen;
