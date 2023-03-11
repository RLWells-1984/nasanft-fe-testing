import "./global";

import React, { useCallback, useState, useContext, useEffect } from "react";
import { StyleSheet, View, Platform } from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import WalletConnectProvider from "@walletconnect/react-native-dapp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WalletConnectExperience from "./app/screens/walletConnectExperience";
const SCHEME_FROM_APP_JSON = "walletconnect-example";
import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthContext from "./app/auth/context";
import LoginScreen from "./app/screens/LoginScreen";

export default function App() {
  //const [user, setUser] = useState();
  const [fontsLoaded] = useFonts({
    Rag: require("./app/assets/fonts/Rag-Regular.otf"),
    Rag_Bl: require("./app/assets/fonts/Rag-Black.otf"),
    Rag_Bo: require("./app/assets/fonts/Rag-Bold.otf"),
    Rag_B_I: require("./app/assets/fonts/Rag-BoldItalic.otf"),
    Rag_I: require("./app/assets/fonts/Rag-Italic.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      r;
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

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

    //<LoginScreen />
    //<AuthContext.Provider value={{ user, setUser }}>
    //  <NavigationContainer theme={navigationTheme}>
    //    <AppNavigator />
    //  </NavigationContainer>
    //</AuthContext.Provider>
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
