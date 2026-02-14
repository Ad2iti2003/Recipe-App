import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { CATEGORIES } from "../constants/categories";
import CategoryItem from "../components/CategoryItem";
import { COLORS } from "../constants/theme";

export default function CategoriesScreen({ navigation }) {

  const openCategory = (category) => {
    navigation.navigate("Home", { category: category.name });
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Categories</Text>

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CategoryItem
            item={item}
            onPress={() => openCategory(item)}
          />
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: 60,
    paddingHorizontal: 18
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15
  }
});

