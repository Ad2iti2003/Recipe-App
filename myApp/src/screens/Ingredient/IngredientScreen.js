import React, { useLayoutEffect } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from './styles';
import {
  getIngredientUrl,
  getRecipesByIngredient,
  getCategoryName,
} from '../../Data/MockDataAPI';

const IngredientScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { ingredient, name } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, [navigation, name]);

  const onPressRecipe = (item) => {
    navigation.navigate('Recipe', { item });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressRecipe(item)}
    >
      <View style={styles.container}>
        <Image
          style={styles.photo}
          source={{ uri: item.photo_url }}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>
          {getCategoryName(item.categoryId)}
        </Text>
      </View>
    </TouchableHighlight>
  );

  const ingredientUrl = getIngredientUrl(ingredient);

  return (
    <ScrollView style={styles.mainContainer}>
      
      <View
        style={{
          borderBottomWidth: 0.4,
          marginBottom: 10,
          borderBottomColor: 'grey',
        }}
      >
        <Image
          style={styles.photoIngredient}
          source={{ uri: ingredientUrl }}
        />
      </View>

      <Text style={styles.ingredientInfo}>
        Recipes with {name}:
      </Text>

      <FlatList
        data={getRecipesByIngredient(ingredient)}
        renderItem={renderRecipes}
        keyExtractor={(item) => item.recipeId.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />

    </ScrollView>
  );
};

export default IngredientScreen;
