import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import React from "react";
import RegistrationScreen from "../screens/RegistrationScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
