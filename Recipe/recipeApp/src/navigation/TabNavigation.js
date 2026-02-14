import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import AddRecipeScreen from "../screens/AddRecipeScreen";

const Tab = createBottomTabNavigator();

function AddButton({ children, onPress }) {
  return (
    <TouchableOpacity style={styles.addBtn} onPress={onPress}>
      <View style={styles.addCircle}>{children}</View>
    </TouchableOpacity>
  );
}

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar
      }}
    >

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="home" size={24} color={focused ? "#6EC1C3" : "gray"} />
          )
        }}
      />

      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="restaurant" size={24} color={focused ? "#6EC1C3" : "gray"} />
          )
        }}
      />

      <Tab.Screen
        name="Add"
        component={AddRecipeScreen}
        options={{
          tabBarButton: (props) => (
            <AddButton {...props}>
              <Ionicons name="add" size={30} color="#fff" />
            </AddButton>
          )
        }}
      />

      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="heart" size={24} color={focused ? "#6EC1C3" : "gray"} />
          )
        }}
      />

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    height: 70,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    elevation: 10
  },

  addBtn: {
    top: -25,
    justifyContent: "center",
    alignItems: "center"
  },

  addCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#6EC1C3",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8
  }
});
