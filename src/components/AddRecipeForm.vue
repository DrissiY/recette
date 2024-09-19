<script setup>
import { ref } from 'vue';

const { onAddRecipe } = defineProps(['onAddRecipe']);

const name = ref('');
const ingredients = ref('');
const description = ref('');
const done = ref(false);
const imageFile = ref(null);
const imagePath = ref('');

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

const submitForm = () => {
  const newRecipe = {
    id: Date.now(),
    name: name.value,
    ingredients: ingredients.value,
    description: description.value,
    done: done.value,
    imageUrl: imagePath.value
  };

  onAddRecipe(newRecipe);

  name.value = '';
  ingredients.value = '';
  description.value = '';
  done.value = false;
  imageFile.value = null;
  imagePath.value = '';
};
</script>

<template>
  <div class="form-container">
    <h1 class="form-title">Add a Recipe</h1>
    <form @submit.prevent="submitForm" class="recipe-form">
      <input v-model="name" placeholder="Recipe Name" class="form-input" />
      <input type="file" @change="handleFileUpload" class="form-input" />
      <textarea v-model="ingredients" placeholder="Ingredients" class="form-textarea"></textarea>
      <textarea v-model="description" placeholder="Description" class="form-textarea"></textarea>
      <div class="checkbox-container">
        <label>
          <input type="checkbox" v-model="done" class="form-checkbox" />
          Done
        </label>
      </div>
      <button type="submit" class="form-button">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: #1e1e1e;
  border-radius: 0.75rem;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.2);
}

.form-title {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  margin-bottom: 1.5rem;
}

.recipe-form {
  display: flex;
  flex-direction: column;
}

.form-input,
.form-textarea {
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

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #1dbf73;
}

.form-textarea {
  min-height: 100px;
}

.checkbox-container {
  margin-bottom: 1rem;
  color: #ffffff;
  font-size: 1rem;
}

.form-checkbox {
  margin-right: 0.5rem;
}

.form-button {
  background-color: #1dbf73;
  color: #ffffff;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.form-button:hover {
  background-color: #17a564;
}
</style>
