import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HelpScreen from "../screens/HelpScreen";
import HomeScreen from "../screens/HomeScreen";
import QuizScreen from "../screens/QuizScreen";
import UserDetailScreen from "../screens/UserDetailScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="HelpScreen" component={HelpScreen} />
    <Stack.Screen name="QuizScreen" component={QuizScreen} />
    <Stack.Screen name="UserDetailsScreen" component={UserDetailScreen} />
    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
