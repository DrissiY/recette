
<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  recipe: {
    type: Object,
    required: true
  }
});

const router = useRouter();

const viewDetails = () => {
  router.push({ name: 'RecipeDetails', params: { id: props.recipe.id } });
};
</script>


<template>
  <div class="recipe-card">
    <img v-if="recipe.imageUrl" :src="recipe.imageUrl" alt="Recipe Image" class="recipe-image" />
    <div class="recipe-info">
      <h2>{{ recipe.name }}</h2>
      <p>
        <strong>Status:</strong>
        <span>{{ recipe.done ? 'Ready' : 'Not Ready' }}</span>
      </p>
      <button @click="viewDetails">Show More</button>
    </div>
  </div>
</template>

