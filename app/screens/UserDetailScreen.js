/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import React, { useCallback, useContext, useEffect, useState } from "react";
import AppText from "../components/AppText";
import AuthContext from "../auth/context";
import CustomButton from "../components/CustomButton";
import DetailLines from "../components/DetailLines";
import LoadingIndicator from "../components/LoadingIndicator";
import LottieView from "lottie-react-native";
import NeoDetailLines from "../components/NeoDetailLines";
import PropTypes from "prop-types";
import ScreenSetUp from "../components/ScreenSetUp";
import cache from "../utility/cache";
import colors from "../config/colors";
import { useWalletConnect } from "@walletconnect/react-native-dapp";

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
    rank,
  } = useContext(AuthContext);
  const [newName, setNewName] = useState("");
  const [sizeArray, setSizeArray] = useState([]);
  const [velocityArray, setVelocityArray] = useState([]);
  const [distanceArray, setDistanceArray] = useState([]);
  const [ownedNFTs, setOwnedNFTs] = useState([]);
  const [velocityRank, setVelocityRank] = useState(0);
  const [distanceRank, setDistanceRank] = useState(0);
  const [sizeRank, setSizeRank] = useState(0);
  const [nftImages, setNftImages] = useState([]);
  const [lengthOwned, setLengthOwned] = useState(0);
  const [loading, setLoading] = useState(true);
  const [attributes, setAttributes] = useState([]);
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
    return await fetch("https://nasaft-tbact528.b4a.run/api/token/refresh", {
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
      })
      .catch((error) => console.log("error", error));
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
      });
    }
  };

  const saveEdit = async () => {
    return await fetch("https://nasaft-tbact528.b4a.run/api/users/", {
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
          return await fetch("https://nasaft-tbact528.b4a.run/api/users/", {
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
    return await fetch("https://nasaft-tbact528.b4a.run/api/neo/", {
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
          return await fetch("https://nasaft-tbact528.b4a.run/api/neo/", {
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
    return await fetch("https://nasaft-tbact528.b4a.run/api/neo/", {
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
        newNFTSetup();
        setNeoTime(data.neo.dateUTC);
        cache.store("neoTimeStamp", data.neo.dateUTC);
        return data.neo.dateUTC;
      })
      .catch((error) => console.log("error", error));
  };

  const newNFTSetup = () => {
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

  const deleteUser = async () => {
    return await fetch("https://nasaft-tbact528.b4a.run/api/users/", {
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
        return response.json();
      })
      .then((data) => {
        console.log("Something went wrong.", data);
      })
      .catch((error) => {
        console.log("error deleting", error);
      });
  };

  const getNEORanking = async () => {
    // eslint-disable-next-line no-unused-vars
    const sizeInfo = await fetch(
      "https://nasaft-tbact528.b4a.run/api/neo/size",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((data) => {
        setSizeArray([]);
        if (data.length > 0) {
          // eslint-disable-next-line vars-on-top
          for (var i = 0; i < data.length; i++) {
            setSizeArray((sizeArray) => [...sizeArray, data[i].id]);
          }
        }
      })
      .catch((error) => console.log("error", error));

    // eslint-disable-next-line no-unused-vars
    const velcityInfo = await fetch(
      "https://nasaft-tbact528.b4a.run/api/neo/velocity",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((data) => {
        setVelocityArray([]);
        if (data.length > 0) {
          // eslint-disable-next-line vars-on-top
          for (var i = 0; i < data.length; i++) {
            setVelocityArray((velocityArray) => [...velocityArray, data[i].id]);
          }
        }
      })
      .catch((error) => console.log("error", error));

    // eslint-disable-next-line no-unused-vars
    const rangeInfo = await fetch(
      "https://nasaft-tbact528.b4a.run/api/neo/range",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((data) => {
        setDistanceArray([]);
        if (data.length > 0) {
          // eslint-disable-next-line vars-on-top
          for (var i = 0; i < data.length; i++) {
            setDistanceArray((distanceArray) => [...distanceArray, data[i].id]);
          }
        }
      })
      .catch((error) => console.log("error", error));

    // eslint-disable-next-line no-unused-vars
    const getOwnedNFTs = await fetch(
      "https://nasaft-tbact528.b4a.run/api/nft/ownedBy/" + user.public_address,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((data) => {
        setAttributes([]);
        setOwnedNFTs([]);
        setNftImages([]);
        if (data.ownedNfts.length == 0) {
          console.log("none");
          setLengthOwned(-1);
        } else {
          const testLength = data.ownedNfts.length;

          // eslint-disable-next-line vars-on-top
          for (var i = 0; i < testLength; i++) {
            setAttributes((attributes) => [
              ...attributes,
              data.ownedNfts[i].rawMetadata.attributes,
            ]);
            setNftImages((nftImages) => [
              ...nftImages,
              data.ownedNfts[i].media[0].thumbnail,
            ]);
            setOwnedNFTs((ownedNFTs) => [
              ...ownedNFTs,
              data.ownedNfts[i].rawMetadata.id,
            ]);
          }
          setLengthOwned(data.ownedNfts.length);
        }
        return data;
      })
      .catch((error) => console.log("error", error));
  };

  const calculateRankings = () => {
    var newRank;
    var oldRank;
    if (ownedNFTs.length == 0) {
      console.log("in no data land");
      setSizeRank("N/A");
      setVelocityRank("N/A");
      setDistanceRank("N/A");
    } else {
      console.log("have rank data");
      // eslint-disable-next-line vars-on-top
      for (var i = 0; i < ownedNFTs.length; i++) {
        if (sizeArray.includes(ownedNFTs[i])) {
          newRank = sizeArray.indexOf(ownedNFTs[i]);
          oldRank = 11;
          if (newRank < oldRank) {
            oldRank = newRank;
          }
        }
        if (oldRank < 11) {
          setSizeRank(oldRank);
        } else {
          setSizeRank("N/A");
        }
      }
      // eslint-disable-next-line vars-on-top
      for (var x = 0; i < ownedNFTs.length; x++) {
        if (velocityArray.includes(ownedNFTs[x])) {
          newRank = velocityArray.indexOf(ownedNFTs[x]);
          oldRank = 11;
          if (newRank < oldRank) {
            oldRank = newRank;
          }
        }
        if (oldRank < 11) {
          setVelocityRank(oldRank);
        } else {
          setVelocityRank("N/A");
        }
      }
      // eslint-disable-next-line vars-on-top
      for (var y = 0; i < ownedNFTs.length; y++) {
        if (distanceArray.includes(ownedNFTs[y])) {
          newRank = distanceArray.indexOf(ownedNFTs[y]);
          oldRank = 11;
          if (newRank < oldRank) {
            oldRank = newRank;
          }
        }
        if (oldRank < 11) {
          setDistanceRank(oldRank);
        } else {
          setDistanceRank("N/A");
        }
      }
    }
  };

  useEffect(() => {
    saveEdit();
  }, [user]);

  useEffect(() => {
    getNEORanking();
  }, []);

  useEffect(() => {
    if (ownedNFTs.length == lengthOwned) {
      if (ownedNFTs.length > 0) {
        if (nftImages.length > 0) {
          if (lengthOwned != 0) {
            setLoading(false);
          }
        }
      }
    }
    if (lengthOwned == -1) {
      console.log("no nfts");
      setLoading(false);
    }
  }, [lengthOwned]);

  useEffect(() => {
    if (ownedNFTs.length > 0) {
      calculateRankings();
    }
  }, [ownedNFTs]);

  return loading ? (
    <LoadingIndicator visible={true} />
  ) : (
    <ScreenSetUp style={{ backgroundColor: colors.white }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}>
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
        <View>
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
          <View style={styles.statBoxes}>
            <DetailLines
              title="Questions Attempted"
              data={user.questions_answered}
            />
            <DetailLines
              title="Questions Correct"
              data={user.questions_correct}
            />
            <DetailLines
              title="Total Points Earned"
              data={user.overall_score}
            />
            <DetailLines title="NFTs Earned" data={user.nft_earned} />
            <DetailLines title="Overall Points Ranking" data={rank} />
          </View>
          <View style={styles.statBoxes}>
            <View style={styles.save}>
              <CustomButton
                borderColor="blue_text"
                title="Save name change"
                onPress={() => editUserName()}
              />
            </View>
          </View>
          <View style={styles.statBoxes}>
            <Text style={styles.header}>Owned Neo Rankings</Text>
            <DetailLines title="Highest  NEO rank" data={velocityRank} />
            <DetailLines
              title="Closest Approach NEO rank"
              data={distanceRank}
            />
            <DetailLines title="Largest NEO rank" data={sizeRank} />
          </View>
          <View style={styles.statBoxes}>
            <Text style={styles.header}>Owned Neo Details</Text>
            {lengthOwned == -1 ? (
              <Text style={styles.text}>
                You haven't earned any NFTs yet. Keep Playing!
              </Text>
            ) : (
              <AppText></AppText>
            )}
            {lengthOwned > 0 && attributes.length > 0 ? (
              <NeoDetailLines
                size={attributes[0].size}
                distance={attributes[0].range}
                velocity={attributes[0].velocity}
                url={nftImages[0]}
              />
            ) : (
              <AppText></AppText>
            )}
            {lengthOwned > 1 && attributes.length > 1 ? (
              <NeoDetailLines
                size={attributes[1].size}
                distance={attributes[1].range}
                velocity={attributes[1].velocity}
                url={nftImages[1]}
              />
            ) : (
              <AppText></AppText>
            )}
            {lengthOwned > 2 && attributes.length > 2 ? (
              <NeoDetailLines
                size={attributes[2].size}
                distance={attributes[2].range}
                velocity={attributes[2].velocity}
                url={nftImages[3]}
              />
            ) : (
              <AppText></AppText>
            )}
          </View>
        </View>
        <View style={styles.deleteBox}>
          <View style={styles.save}>
            <CustomButton
              borderColor="blue_text"
              title="Delete Account"
              onPress={() => verifyDelete()}
            />
          </View>
        </View>
        <View style={styles.logoutContainer}>
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
            <AppText style={styles.header}>Logout</AppText>
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
        <View>
          {user.isAdmin ? (
            <View style={styles.delete}>
              <CustomButton
                borderColor="blue_text"
                color="red"
                title="Admin"
                onPress={() => promptForce()}
              />
            </View>
          ) : (
            <AppText></AppText>
          )}
        </View>
      </ScrollView>
    </ScreenSetUp>
  );
}

UserDetailScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  backArrow: {
    borderRadius: 80,
    position: "absolute",
    right: "90%",
    top: 50,
  },
  delete: {
    alignSelf: "center",
    height: 70,
    justifyContent: "flex-end",
    marginVertical: 10,
    width: "50%",
  },
  deleteBox: {
    marginBottom: 10,
    paddingBottom: 5,
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
    bottom: -15,
  },
  logoutContainer: {
    borderBottomColor: colors.buttonColor,
    borderBottomWidth: 5,
    height: 50,
    marginVertical: 10,
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
  statBoxes: {
    borderBottomColor: colors.buttonColor,
    borderBottomWidth: 5,
    marginBottom: 10,
    paddingBottom: 5,
  },
  text: {
    color: colors.blue_text,
    fontFamily: "Rag_Bo",
    fontSize: 18,
    textAlign: "center",
  },
  userContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 30,
    marginVertical: 10,
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
