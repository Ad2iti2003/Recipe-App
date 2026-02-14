import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import TabNavigation from "./TabNavigation";
import RecipeDetailScreen from "../screens/RecipeDetailScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={TabNavigation} />
        <Stack.Screen name="Details" component={RecipeDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
