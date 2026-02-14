import React, { useLayoutEffect } from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import { recipes } from '../../Data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import { getCategoryName } from '../../Data/MockDataAPI';

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerLeft: () => (
        <MenuImage onPress={() => navigation.openDrawer()} />
      ),
    });
  }, [navigation]);

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

  return (
    <View>
      <FlatList
        data={recipes}
        renderItem={renderRecipes}
        keyExtractor={(item) => item.recipeId.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;
