import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import RecipeCard from "../components/RecipeCard";
import api from "../services/api";
import { COLORS } from "../constants/theme";

export default function FavoritesScreen({ navigation }) {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadFavorites);
    return unsubscribe;
  }, [navigation]);

  const loadFavorites = async () => {
    const res = await api.get("/recipes");
    setFavorites(res.data.filter(r => r.favorite));
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Favorites</Text>

      <FlatList
        data={favorites}
        numColumns={2}
        keyExtractor={(item)=>item._id}
        ListEmptyComponent={<Text>No favorites yet</Text>}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            refresh={loadFavorites}
            onPress={() => navigation.navigate("Details", { recipe: item })}
          />
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:COLORS.bg, padding:20, paddingTop:60 },
  title:{ fontSize:22, fontWeight:"bold", marginBottom:10 }
});
