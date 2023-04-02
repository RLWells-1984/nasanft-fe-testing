import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import LottieView from "lottie-react-native";

import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useWalletConnect } from "@walletconnect/react-native-dapp";

import AppText from "../components/AppText";
import cache from "../utility/cache";
import colors from "../config/colors";
import CustomButton from "../components/CustomButton";
import DetailLines from "../components/DetailLines";
import ScreenSetUp from "../components/ScreenSetUp";
import AuthContext from "../auth/context";

function UserDetailScreen({ navigation }) {
  const {
    user,
    setUser,
    token,
    setToken,
    setPublicAddress,
    refreshToken,
    setRefreshToken,
    setNeoTime,
  } = useContext(AuthContext);
  const [newName, setNewName] = useState("");
  const name = user.user_name + "'s Details";
  const connector = useWalletConnect();
  const updateDate = {
    user: user,
    public_address: user.public_address,
  };
  const deleteData = {
    public_address: user.public_address,
  };

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
          return data.accessToken;
        }
      });
  };

  const editUserName = () => {
    if (newName.length < 4) {
      Alert.alert(
        "Invalid Registration",
        "Username must be at least 4 characters."
      );
    } else {
      setUser({
        ...user,
        user_name: newName,
        overall_rank: 43,
      });
    }
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
      .then(async (data) => {
        if (
          data.text != undefined &&
          data.text.localeCompare("jwt expired") == 0
        ) {
          const newToken = await useRefreshToken();
          return await fetch("http://192.168.1.177:3000/api/users/", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": newToken,
            },
            body: JSON.stringify(updateDate),
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  const killSession = useCallback(() => {
    return connector.killSession();
  }, [connector]);

  const logout = () => {
    navigation.navigate("WelcomeScreen");
    setUser(null);
    setToken(null);
    setPublicAddress(null);
    setRefreshToken(null);
    killSession();
  };

  const promptForce = () => {
    Alert.alert(
      "Force NFT Disbursement",
      "Do you really want to force disbursement?",
      [
        {
          text: "Send",
          onPress: () => forceNFTGeneration(),
        },
        {
          text: "Cancel",
        },
      ]
    );
  };

  const forceNFTGeneration = async () => {
    return await fetch("http://192.168.1.177:3000/api/neo/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (
          data.text != undefined &&
          data.text.localeCompare("jwt expired") == 0
        ) {
          const newToken = await useRefreshToken();
          return await fetch("http://192.168.1.177:3000/api/neo/", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": newToken,
            },
          });
        }
        newNeo();
        return data;
      })
      .catch((error) => console.log("error", error));
  };

  const newNeo = async () => {
    return await fetch("http://192.168.1.177:3000/api/neo/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("new one aquired");
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((data) => {
        newNFTSetup();
        setNeoTime(data.neo.dateUTC);
        cache.store("neoTimeStamp", data.neo.dateUTC);
        return data.neo.dateUTC;
      })
      .catch((error) => console.log("error", error));
  };

  const newNFTSetup = async () => {
    const winner = user.winner;
    if (winner) {
      setUser({
        ...user,
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

  const verifyDelete = () => {
    Alert.alert(
      "Delete User!",
      "This action can not be undone. Do you want to permanently delete your account?",
      [
        {
          text: "Delete",
          onPress: () => deleteUser(),
        },
        {
          text: "Cancel",
        },
      ]
    );
  };

  //formatted with error catching/response checking. change console logs to alerts or other handling
  const deleteUser = async () => {
    return await fetch("http://192.168.1.177:3000/api/users/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(deleteData),
    })
      .then((response) => {
        if (response.ok) {
          logout();
          navigation.navigate("WelcomeScreen");
          return response.json();
        }
        return Promise.reject(response);
      })
      .catch((error) => {
        console.log("Something went wrong.", error);
      });
  };

  useEffect(() => {
    saveEdit();
  }, [user]);

  return (
    <ScreenSetUp style={{ backgroundColor: colors.white }}>
      <View style={{ height: "10%", paddingBottom: 100 }}>
        <TouchableOpacity onPressIn={() => navigation.goBack()}>
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
      <View style={styles.buttonBox}>
        <View style={styles.save}>
          <CustomButton
            borderColor="blue_text"
            title="Save"
            onPress={() => editUserName()}
          />
        </View>
        <View style={styles.save}>
          <CustomButton
            borderColor="blue_text"
            title="Delete Account"
            onPress={() => verifyDelete()}
          />
        </View>
        <View style={styles.save}>
          <CustomButton
            borderColor="blue_text"
            color="red"
            title="Admin"
            onPress={() => promptForce()}
          />
        </View>
      </View>
      <View style={{ height: "10%" }}>
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
            <Feather name="help-circle" size={28} color={colors.blue_text} />
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
    height: "45%",
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
    marginVertical: 10,
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
