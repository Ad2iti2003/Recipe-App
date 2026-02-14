import React, { useState, useRef, useLayoutEffect } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from './styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import {
  getIngredientName,
  getCategoryName,
  getCategoryById,
} from '../../Data/MockDataAPI';

import BackButton from '../../components/BackButton/BackButton';
import ViewIngredientsButton from '../../components/ViewIngredientsButton/ViewIngredientsButton';

const { width: viewportWidth } = Dimensions.get('window');

const RecipeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { item } = route.params;

  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerLeft: () => (
        <BackButton onPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  const onPressIngredient = (ingredientId) => {
    const name = getIngredientName(ingredientId);
    navigation.navigate('Ingredient', {
      ingredient: ingredientId,
      name,
    });
  };

  const category = getCategoryById(item.categoryId);
  const title = getCategoryName(category.id);

  return (
    <ScrollView style={styles.container}>
      
      {/* ---------- IMAGE CAROUSEL ---------- */}
      <View style={styles.carouselContainer}>
        <Carousel
          ref={sliderRef}
          data={item.photosArray}
          renderItem={renderImage}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          onSnapToItem={(index) => setActiveSlide(index)}
        />

        <Pagination
          dotsLength={item.photosArray.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotColor="rgba(255,255,255,0.92)"
          inactiveDotColor="white"
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={sliderRef}
          tappableDots={!!sliderRef.current}
        />
      </View>

      {/* ---------- INFO ---------- */}
      <View style={styles.infoRecipeContainer}>
        <Text style={styles.infoRecipeName}>{item.title}</Text>

        <View style={styles.infoContainer}>
          <TouchableHighlight
            onPress={() =>
              navigation.navigate('RecipesList', { category, title })
            }
          >
            <Text style={styles.category}>
              {getCategoryName(item.categoryId).toUpperCase()}
            </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.infoContainer}>
          <Image
            style={styles.infoPhoto}
            source={require('../../../assets/icons/time.png')}
          />
          <Text style={styles.infoRecipe}>
            {item.time} minutes
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <ViewIngredientsButton
            onPress={() => {
              const ingredients = item.ingredients;
              const title = `Ingredients for ${item.title}`;
              navigation.navigate('IngredientsDetails', {
                ingredients,
                title,
              });
            }}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoDescriptionRecipe}>
            {item.description}
          </Text>
        </View>
      </View>

    </ScrollView>
  );
};

export default RecipeScreen;
