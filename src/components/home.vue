<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import AddRecipeForm from './AddRecipeForm.vue';
import RecipeCard from './RecipeCard.vue';

const store = useStore();
const router = useRouter();

const showAddForm = ref(false);
const searchQuery = ref('');
const doneFilter = ref('all');
const recipes = computed(() => store.getters.getRecipes);
const filteredRecipes = computed(() => {
  let filtered = recipes.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(recipe =>
      recipe.name.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query)
    );
  }

  if (doneFilter.value === 'ready') {
    filtered = filtered.filter(recipe => recipe.done);
  } else if (doneFilter.value === 'not_ready') {
    filtered = filtered.filter(recipe => !recipe.done);
  }

  return filtered;
});

const toggleAddForm = () => {
  showAddForm.value = !showAddForm.value;
};

const addRecipe = (newRecipe) => {
  store.dispatch('addRecipe', newRecipe);
  showAddForm.value = false;
};

const viewRecipe = (id) => {
  router.push({ name: 'RecipeDetails', params: { id } });
};
</script>


<template>
  <div class="container mx-auto">
    <div
      v-if="!showAddForm && recipes.length == 0"
      class="flex justify-center items-center flex-col text-center min-h-screen"
    >
      <h1 class="text-3xl font-bold mb-2">Hello👋,</h1>
      <p class="text-lg mb-4">
        Welcome to Recipes App. Please add a recipe to get started.
      </p>
      <button
        @click="toggleAddForm"
        class="bg-green-500 text-white px-4 py-2 rounded"
      >
        Get Started
      </button>
    </div>

    <div v-if="showAddForm || recipes.length > 0">
      <button v-if="recipes.length" @click="toggleAddForm">
        Add New Recipe
      </button>

      <div class="container mx-auto p-0" v-if="recipes.length > 0">
        <div class="my-6">
          <input
            v-model="searchQuery"
            placeholder="Search recipes..."
            class="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        <div class="my-6 flex items-center space-x-4">
          <label for="doneFilter" class="font-medium">Filter by status:</label>
          <select
            v-model="doneFilter"
            class="border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="all">All</option>
            <option value="ready">Ready</option>
            <option value="not_ready">Not Ready</option>
          </select>
        </div>
      </div>

      <AddRecipeForm
        v-if="showAddForm || recipes.length === 0"
        :onAddRecipe="addRecipe"
      />

      <div v-if="!showAddForm && recipes.length > 0" class="flex flex-wrap">
        <!-- Use the recipe-card component here -->
        <recipe-card
          v-for="recipe in filteredRecipes"
          :key="recipe.id"
          :recipe="recipe"
          @click="viewRecipe(recipe.id)"
        />
      </div>
    </div>
  </div>
</template>


