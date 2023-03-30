import React, { useCallback, useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useWalletConnect } from "@walletconnect/react-native-dapp";

import colors from "../config/colors";
import AuthContext from "../auth/context";

function Button({ onPress, label }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

function DisplayAddress({ pubAddress }) {
  if (pubAddress != null) {
    return <Text style={styles.resultText}>Public Address: {pubAddress}</Text>;
  } else {
    return <Text style={styles.resultText}>NO ADDRESS</Text>;
  }
}
export default function WalletConnectExperience({ navigation }) {
  const authContext = useContext(AuthContext);
  const [pubAddress, setPubAddress] = useState([]);
  const [results, setResults] = useState([]);
  const connector = useWalletConnect();

  //need to alert not console.log and prompt them to register. in the DB
  const personalSign = async (publicAddress, navigation) => {
    const nonceRes = await fetch(
      "http://192.168.1.177:3000/api/token/" + publicAddress,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (!response.ok) {
        console.log("not ok, likely not in the DB");
      }
      return response.json();
    });
    const nonce = nonceRes.nonce;

    connector
      .signPersonalMessage([nonce, publicAddress, navigation])
      .then(async (results) => {
        const loginRes = await fetch(
          "http://192.168.1.177:3000/api/token/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              public_address: publicAddress,
              signed_nonce: results,
            }),
          }
        ).then((response) => response.json());
        console.log("object");
        console.log(loginRes); //object
        if (results != null) {
          setResults(results);
          authContext.setToken(loginRes.accessToken);
          authContext.setRefreshToken(loginRes.refreshToken);
          authContext.setUser(loginRes.user);
          navigation.navigate("HomeScreen");
        }
      })
      .catch((error) => {
        // Error returned when rejected
        console.error(error);
      });
  };

  const connectWallet = useCallback(() => {
    connector.connect();
  }, [connector]);

  const killSession = useCallback(() => {
    return connector.killSession();
  }, [connector]);

  useEffect(() => {
    if (connector.connected) {
      setPubAddress(connector.accounts[0]);
      authContext.setPublicAddress(connector.accounts[0]);
    }
    if (!connector.connected) {
      authContext.setPublicAddress(null);
    }
  });

  return (
    <>
      {!connector.connected ? (
        <Button onPress={connectWallet} label="Connect a Wallet" />
      ) : (
        <>
          <DisplayAddress pubAddress={pubAddress} />
          <Button
            onPress={() => personalSign(connector.accounts[0], navigation)}
            label="sign"
          />
          <Button onPress={killSession} label="Log out" />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.buttonColor,
    borderColor: colors.white,
    borderRadius: 25,
    borderWidth: 5,
    height: 70,
    justifyContent: "center",
    marginVertical: 20,
    width: "80%",
  },
  text: {
    color: colors.blue_text,
    fontSize: 18,
    fontFamily: "Rag_Bo",
  },
  resultText: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.buttonColor,
    borderWidth: 5,
    color: colors.blue_text,
    fontSize: 18,
    marginBottom: 60,
    padding: 7,
    width: "100%",
  },
});
