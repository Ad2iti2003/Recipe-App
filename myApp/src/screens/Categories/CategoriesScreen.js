import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import { categories } from '../../Data/dataArrays';
import { getNumberOfRecipes } from '../../Data/MockDataAPI';

const CategoriesScreen = () => {
  const navigation = useNavigation();

  const onPressCategory = (item) => {
    navigation.navigate('RecipesList', {
      category: item,
      title: item.name,
    });
  };

  const renderCategory = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressCategory(item)}
    >
      <View style={styles.categoriesItemContainer}>
        <Image
          style={styles.categoriesPhoto}
          source={{ uri: item.photo_url }}
        />
        <Text style={styles.categoriesName}>{item.name}</Text>
        <Text style={styles.categoriesInfo}>
          {getNumberOfRecipes(item.id)} recipes
        </Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default CategoriesScreen;
