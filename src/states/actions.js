export default {
    addRecipe({ commit }, recipe) {
        commit('addRecipe', recipe);
      },

      updateRecipe({ commit }, updatedRecipe) {
        commit('updateRecipe', updatedRecipe);
      },

      deleteRecipe({ commit }, recipeId) {
        commit('deleteRecipe', recipeId);
      }
  };
