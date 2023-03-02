import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import LandingScreen from "./app/screens/LandingScreen";

import * as React from "react";
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./app/screens/HomeScreen";
import UserDetailScreen from "./app/screens/UserDetailScreen";
import HelpScreen from "./app/screens/HelpScreen";
import RegistrationScreen from "./app/screens/RegistrationScreen";
import QuizScreen from "./app/screens/QuizScreen";
import CustomTextInput from "./app/components/CustomTextInput";
import ScreenSetUp from "./app/components/ScreenSetUp";
import colors from "./app/config/colors";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

export default function App() {
  const [fontsLoaded] = useFonts({
    BlueCurve: require("./app/assets/fonts/Bluecurve-Regular.ttf"),
    BlueCurve_L: require("./app/assets/fonts/Bluecurve-Light.ttf"),
    BlueCurve_B: require("./app/assets/fonts/Bluecurve-Bold.ttf"),
    Mona: require("./app/assets/fonts/Mona-Sans-Regular.otf"),
    Rag: require("./app/assets/fonts/Rag-Regular.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QuizScreen />
    //<ScreenSetUp>
    //  <CustomTextInput placeholder="Display Name" icon="user-astronaut" />
    //</ScreenSetUp>
  );

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
