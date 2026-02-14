import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator
} from "react-native";
import RecipeCard from "../components/RecipeCard";
import { useRoute } from "@react-navigation/native";
import api from "../services/api";
import { COLORS } from "../constants/theme";

export default function HomeScreen({ navigation }) {

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const categoryFilter = route.params?.category;


  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const res = await api.get("/recipes");
      setRecipes(res.data || []);
    } catch (err) {
      console.log("API ERROR:", err.message);
    }
    setLoading(false);
  };

  const filtered = recipes.filter(r => {
  const matchSearch = r?.name?.toLowerCase().includes(search.toLowerCase());
  const matchCategory = categoryFilter ? r?.category === categoryFilter : true;
  return matchSearch && matchCategory;
});


  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Search</Text>
      <Text style={styles.subtitle}>What is in your kitchen?</Text>

      <TextInput
        placeholder="Type your ingredients"
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <FlatList
        data={filtered}
        numColumns={2}
        keyExtractor={(item, index) => item?._id || index.toString()}
        ListEmptyComponent={<Text>No recipes yet</Text>}
        renderItem={({ item }) => (
          <RecipeCard
  recipe={item}
  refresh={loadRecipes}
  onPress={() => navigation.navigate("Details", { recipe: item })}
/>

        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, padding: 20, paddingTop:60 },
  title: { fontSize:22, fontWeight:"bold" },
  subtitle: { color:"#777", marginBottom:15 },
  search:{ backgroundColor:"#eee", padding:12, borderRadius:12, marginBottom:20 },
  center:{ flex:1, justifyContent:"center", alignItems:"center" }
});

