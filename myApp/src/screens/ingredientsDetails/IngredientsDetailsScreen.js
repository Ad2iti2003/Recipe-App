import React, { useLayoutEffect } from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from './styles';
import {
  getIngredientName,
  getAllIngredients,
} from '../../Data/MockDataAPI';

const IngredientsDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { title, ingredients } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
      headerTitleStyle: { fontSize: 16 },
    });
  }, [navigation, title]);

  const onPressIngredient = (item) => {
    const name = getIngredientName(item.ingredientId);
    const ingredient = item.ingredientId;

    navigation.navigate('Ingredient', {
      ingredient,
      name,
    });
  };

  const renderIngredient = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressIngredient(item[0])}
    >
      <View style={styles.container}>
        <Image
          style={styles.photo}
          source={{ uri: item[0].photo_url }}
        />
        <Text style={styles.title}>{item[0].name}</Text>
        <Text style={{ color: 'grey' }}>{item[1]}</Text>
      </View>
    </TouchableHighlight>
  );

  const ingredientsArray = getAllIngredients(ingredients);

  return (
    <View>
      <FlatList
        data={ingredientsArray}
        renderItem={renderIngredient}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default IngredientsDetailsScreen;
