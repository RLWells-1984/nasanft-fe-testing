import "./app/global";

import React, { useCallback, useState } from "react";
import { Platform, StyleSheet } from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import WalletConnectProvider from "@walletconnect/react-native-dapp";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SCHEME_FROM_APP_JSON = "walletconnect-example";

import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthContext from "./app/auth/context";
import Blank from "./app/screens/Blank";

export default function App() {
  const [user, setUser] = useState();
  const [publicAddress, setPublicAddress] = useState();
  const [token, setToken] = useState();
  const [refreshToken, setRefreshToken] = useState();

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
    //<Blank />
    <AuthContext.Provider
      value={{
        user,
        setUser,
        publicAddress,
        setPublicAddress,
        token,
        setToken,
        refreshToken,
        setRefreshToken,
      }}
    >
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
        <NavigationContainer theme={navigationTheme}>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </WalletConnectProvider>
    </AuthContext.Provider>

    //<AuthContext.Provider value={{ user, setUser }}>
    //  <NavigationContainer theme={navigationTheme}>
    //    <AppNavigator />
    //  </NavigationContainer>
    //</AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
  },
});
