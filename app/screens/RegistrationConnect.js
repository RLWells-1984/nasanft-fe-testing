import React, { useCallback, useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export default function RegistrationConnect({ navigation }) {
  const authContext = useContext(AuthContext);
  const [pubAddress, setPubAddress] = useState([]);
  const connector = useWalletConnect();

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
          <Button onPress={killSession} label="Log out of WalletConnect" />
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
