import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import LandingScreen from "./app/screens/LandingScreen";

import "./shim.js";

import * as React from "react";
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./app/screens/HomeScreen";
import UserDetailScreen from "./app/screens/UserDetailScreen";
import HelpScreen from "./app/screens/HelpScreen";
import RegistrationScreen from "./app/screens/RegistrationScreen";

export default function App() {
  return <RegistrationScreen />;

  //needs deep link URI scheme. More info and links https://www.npmjs.com/package/@walletconnect/react-native-dapp
  //return (
  //  <WalletConnectProvider
  //    redirectUrl={Platform.OS === 'web' ? window.location.origin : 'yourappscheme://'}
  //    storageOptions= {{
  //      AsyncStorage,
  //    }}>
  //    <>{/* awesome app here */}</>
  //  </WalletConnectProvider>
  //);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
