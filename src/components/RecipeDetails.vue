<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const router = useRouter();
const store = useStore();

const recipe = ref(null);
const isEditing = ref(false);

const updatedName = ref('');
const updatedIngredients = ref('');
const updatedDescription = ref('');
const updatedDone = ref(false);
const imagePath = ref('');

onMounted(() => {
  const id = route.params.id;
  const foundRecipe = store.state.recipes.find(r => r.id === Number(id));

  if (foundRecipe) {
    recipe.value = foundRecipe;
    updatedName.value = foundRecipe.name;
    updatedIngredients.value = foundRecipe.ingredients;
    updatedDescription.value = foundRecipe.description;
    updatedDone.value = foundRecipe.done;
    imagePath.value = foundRecipe.imageUrl;
  } else {
    router.push('/');
  }
});

const startEditing = () => {
  isEditing.value = true;
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      imagePath.value = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

const updateRecipe = () => {
  const updatedRecipe = {
    ...recipe.value,
    name: updatedName.value,
    ingredients: updatedIngredients.value,
    description: updatedDescription.value,
    done: updatedDone.value,
    imageUrl: imagePath.value
  };

  store.commit('updateRecipe', updatedRecipe);
  recipe.value = updatedRecipe;
  isEditing.value = false;
};

const goToHome = () => {
  router.push({ name: 'Home' });
};
</script>

<template>

        <button @click="goToHome" class="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        See All Recipes
        </button>

  <div class="container mx-auto">
    <div v-if="recipe">
      <h1 class="text-2xl font-bold">{{ recipe.name }}</h1>
      <p><strong>Description:</strong> {{ recipe.description }}</p>
      <p><strong>Ingredients:</strong> {{ recipe.ingredients }}</p>
      <label>
        <input type="checkbox" v-model="recipe.done" disabled />
        Done
      </label>

      <img v-if="recipe.imageUrl" :src="recipe.imageUrl" alt="Recipe Image" class="my-4" />

      <button @click="startEditing" class="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>

      <div v-if="isEditing" class="my-4">
        <h2>Edit Recipe</h2>
        <form @submit.prevent="updateRecipe">
          <input v-model="updatedName" placeholder="Recipe Name" class="block my-2 p-2 border" />
          <textarea v-model="updatedIngredients" placeholder="Ingredients" class="block my-2 p-2 border"></textarea>
          <textarea v-model="updatedDescription" placeholder="Description" class="block my-2 p-2 border"></textarea>
          <input type="file" @change="handleFileUpload" class="block my-2 p-2 border" />
          <div class="flex items-center space-x-2">
  <input type="checkbox" v-model="updatedDone" class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
  <p class="">Ready</p>
</div>
          <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Save Changes</button>
        </form>
      </div>
    </div>
  </div>


</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #1e1e1e;
  border-radius: 0.75rem;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.2);
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
}

img {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
}

button {
  background-color: #1dbf73;
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #17a564;
}

form input, form textarea {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #2c2c2c;
  border-radius: 0.5rem;
  background-color: #2c2c2c;
  color: #ffffff;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

form input:focus, form textarea:focus {
  outline: none;
  border-color: #1dbf73;
}

textarea {
  min-height: 100px;
}
</style>
