export default {
    addRecipe(state, recipe) {
        state.recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(state.recipes));
      },

      updateRecipe(state, updatedRecipe) {
        const index = state.recipes.findIndex(recipe => recipe.id === updatedRecipe.id);
        if (index !== -1) {
          state.recipes.splice(index, 1, updatedRecipe);
          localStorage.setItem('recipes', JSON.stringify(state.recipes));
        }
      },

      deleteRecipe(state, recipeId) {
        state.recipes = state.recipes.filter(recipe => recipe.id !== recipeId);
        localStorage.setItem('recipes', JSON.stringify(state.recipes));
      }
  };
