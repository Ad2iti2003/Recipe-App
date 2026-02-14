import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './screens/Home/HomeScreen';
import RecipesListScreen from './screens/RecipesList/RecipesListScreen'; // FIXED NAME

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

/* ---------------- Drawer Navigator ---------------- */

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Recipes" component={RecipesListScreen} />
    </Drawer.Navigator>
  );
};

/* ---------------- Root Navigator ---------------- */

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;


