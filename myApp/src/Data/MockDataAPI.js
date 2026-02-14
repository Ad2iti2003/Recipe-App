import { recipes, categories, ingredients } from './dataArrays';

/* ---------------- CATEGORIES ---------------- */

export const getCategoryById = (categoryId) =>
  categories.find(item => item.id === categoryId) || null;

export const getCategoryName = (categoryId) =>
  categories.find(item => item.id === categoryId)?.name || '';

/* ---------------- INGREDIENTS ---------------- */

export const getIngredientName = (ingredientId) =>
  ingredients.find(item => item.ingredientId === ingredientId)?.name || '';

export const getIngredientUrl = (ingredientId) =>
  ingredients.find(item => item.ingredientId === ingredientId)?.photo_url || '';

/* ---------------- RECIPES ---------------- */

export const getRecipes = (categoryId) =>
  recipes.filter(item => item.categoryId === categoryId);

export const getNumberOfRecipes = (categoryId) =>
  recipes.filter(item => item.categoryId === categoryId).length;

/* ---------------- RECIPES BY INGREDIENT ---------------- */

export const getRecipesByIngredient = (ingredientId) =>
  recipes.filter(recipe =>
    recipe.ingredients?.some(i => i[0] === ingredientId)
  );

/* ---------------- INGREDIENT DETAILS ---------------- */

export const getAllIngredients = (idArray = []) =>
  idArray.map(index => {
    const ingredient = ingredients.find(
      item => item.ingredientId === index[0]
    );
    return [ingredient, index[1]];
  });

/* ---------------- SEARCH FUNCTIONS ---------------- */

export const getRecipesByIngredientName = (ingredientName = '') => {
  const nameUpper = ingredientName.toUpperCase();

  const matchedIngredients = ingredients.filter(item =>
    item.name.toUpperCase().includes(nameUpper)
  );

  const recipesList = matchedIngredients.flatMap(item =>
    getRecipesByIngredient(item.ingredientId)
  );

  return [...new Set(recipesList)];
};

export const getRecipesByCategoryName = (categoryName = '') => {
  const nameUpper = categoryName.toUpperCase();

  return categories
    .filter(item => item.name.toUpperCase().includes(nameUpper))
    .flatMap(item => getRecipes(item.id));
};

export const getRecipesByRecipeName = (recipeName = '') => {
  const nameUpper = recipeName.toUpperCase();

  return recipes.filter(item =>
    item.title.toUpperCase().includes(nameUpper)
  );
};

