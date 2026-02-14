import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import api from "../services/api";
import { COLORS } from "../constants/theme";

export default function AddRecipeScreen({ navigation }) {

  const [form, setForm] = useState({
    name: "",
    category: "",
    ingredients: "",
    description: "",
    image: ""
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const submitRecipe = async () => {

    if (!form.name || !form.category) {
      Alert.alert("Error", "Please fill required fields");
      return;
    }

    await api.post("/recipes", form);

    Alert.alert("Success", "Recipe Added!");
    navigation.navigate("Home");
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>New Recipe</Text>

      <TextInput
        placeholder="Recipe name"
        style={styles.input}
        onChangeText={(t) => handleChange("name", t)}
      />

      <TextInput
        placeholder="Category (Breakfast, Lunch...)"
        style={styles.input}
        onChangeText={(t) => handleChange("category", t)}
      />

      <TextInput
        placeholder="Ingredients"
        style={styles.input}
        multiline
        onChangeText={(t) => handleChange("ingredients", t)}
      />

      <TextInput
        placeholder="Description"
        style={styles.input}
        multiline
        onChangeText={(t) => handleChange("description", t)}
      />

      <TextInput
        placeholder="Image URL"
        style={styles.input}
        onChangeText={(t) => handleChange("image", t)}
      />

      <TouchableOpacity style={styles.button} onPress={submitRecipe}>
        <Text style={styles.btnText}>Save Recipe</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:COLORS.bg,
    padding:20,
    paddingTop:60
  },

  title:{
    fontSize:22,
    fontWeight:"bold",
    marginBottom:20
  },

  input:{
    backgroundColor:"#fff",
    padding:14,
    borderRadius:14,
    marginBottom:15
  },

  button:{
    backgroundColor:"#6EC1C3",
    padding:16,
    borderRadius:18,
    alignItems:"center",
    marginTop:10
  },

  btnText:{
    color:"#fff",
    fontWeight:"bold",
    fontSize:16
  }
});

