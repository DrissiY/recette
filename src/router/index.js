import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/home.vue';
import RecipeDetails from '../components/RecipeDetails.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recipe/:id',
    name: 'RecipeDetails',
    component: RecipeDetails,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
