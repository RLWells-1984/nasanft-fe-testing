import "./global";
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WalletConnectExperience from "./app/screens/walletConnectExperience";
const SCHEME_FROM_APP_JSON = "walletconnect-example";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";

function Blank(props) {
  return (
    <WalletConnectProvider
      redirectUrl={
        Platform.OS === "web"
          ? window.location.origin
          : `${SCHEME_FROM_APP_JSON}://`
      }
      storageOptions={{
        asyncStorage: AsyncStorage,
      }}
    >
      <View style={styles.container}>
        <WalletConnectExperience />
        <StatusBar style="auto" />
      </View>
    </WalletConnectProvider>
  );
}

export default Blank;
