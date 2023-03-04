import * as React from "react";
import { useCallback } from "react";
import { StyleSheet } from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";

import WalletConnectProvider from "@walletconnect/react-native-dapp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomTextInput from "./app/components/CustomTextInput";
import colors from "./app/config/colors";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import HelpScreen from "./app/screens/HelpScreen";

export default function App() {
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
    //<HelpScreen />

    <NavigationContainer theme={navigationTheme}>
      <AppNavigator />
    </NavigationContainer>
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
