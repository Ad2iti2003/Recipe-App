import React, { useState, useLayoutEffect } from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';

import {
  getCategoryName,
  getRecipesByRecipeName,
  getRecipesByCategoryName,
  getRecipesByIngredientName,
} from '../../Data/MockDataAPI';

const SearchScreen = () => {
  const navigation = useNavigation();

  const [value, setValue] = useState('');
  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MenuImage onPress={() => navigation.openDrawer()} />
      ),
      headerTitle: () => (
        <SearchBar
          containerStyle={{
            backgroundColor: 'transparent',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            flex: 1,
          }}
          inputContainerStyle={{
            backgroundColor: '#EDEDED',
          }}
          inputStyle={{
            backgroundColor: '#EDEDED',
            borderRadius: 10,
            color: 'black',
          }}
          round
          placeholder="Search"
          value={value}
          onChangeText={(text) => handleSearch(text)}
        />
      ),
    });
  }, [navigation, value]);

  const handleSearch = (text) => {
    const recipes1 = getRecipesByRecipeName(text);
    const recipes2 = getRecipesByCategoryName(text);
    const recipes3 = getRecipesByIngredientName(text);

    const merged = [...recipes1, ...recipes2, ...recipes3];
    const unique = [...new Set(merged)];

    if (text === '') {
      setValue(text);
      setData([]);
    } else {
      setValue(text);
      setData(unique);
    }
  };

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
        data={data}
        renderItem={renderRecipes}
        keyExtractor={(item) => item.recipeId.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SearchScreen;
