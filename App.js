/* eslint-disable no-undef */
import "./app/global";
import "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { LogBox, Platform } from "react-native";
import React, { useCallback, useState } from "react";
import AppNavigator from "./app/navigation/AppNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "./app/auth/context";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import navigationTheme from "./app/navigation/navigationTheme";
import { useFonts } from "expo-font";
const SCHEME_FROM_APP_JSON = "walletconnect-example";

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

export default function App() {
  const [user, setUser] = useState();
  const [publicAddress, setPublicAddress] = useState();
  const [token, setToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [neoTime, setNeoTime] = useState();
  const [rank, setRank] = useState();
  const [iotd, setIOTD] = useState();

  const [fontsLoaded] = useFonts({
    Rag: require("./app/assets/fonts/Rag-Regular.otf"),
    Rag_Bl: require("./app/assets/fonts/Rag-Black.otf"),
    Rag_Bo: require("./app/assets/fonts/Rag-Bold.otf"),
    Rag_B_I: require("./app/assets/fonts/Rag-BoldItalic.otf"),
    Rag_I: require("./app/assets/fonts/Rag-Italic.otf"),
  });

  // eslint-disable-next-line no-unused-vars
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
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
        neoTime,
        setNeoTime,
        rank,
        setRank,
        iotd,
        setIOTD,
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
  );
}
