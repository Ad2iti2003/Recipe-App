import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";

export default function RecipeCard({ recipe, onPress, refresh }) {

  const toggleFavorite = async () => {
    await api.patch(`/favorite/${recipe._id}`);
    refresh && refresh();
  };
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      
      <Image
        source={{ uri: recipe?.image || "https://via.placeholder.com/150" }}
        style={styles.image}
      />

      {/* HEART ICON */}
      <TouchableOpacity style={styles.heart} onPress={toggleFavorite}>
        <Ionicons
          name={recipe.favorite ? "heart" : "heart-outline"}
          size={22}
          color={recipe.favorite ? "red" : "white"}
        />
      </TouchableOpacity>

      <Text style={styles.name}>{recipe?.name}</Text>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card:{ flex:1, margin:8, backgroundColor:"#fff", borderRadius:16, padding:10 },
  image:{ width:"100%", height:120, borderRadius:12 },
  name:{ marginTop:8, fontWeight:"600" },

  heart:{
    position:"absolute",
    right:14,
    top:14,
    backgroundColor:"rgba(0,0,0,0.4)",
    padding:6,
    borderRadius:20
  }
});