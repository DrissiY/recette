export default {
    getRecipes: state => state.recipes,
    getRecipeById: state => id => state.recipes.find(recipe => recipe.id === id)
  };
