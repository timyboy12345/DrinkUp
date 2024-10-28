import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppDescriptionView from '../views/App/AppDescriptionView.vue'
import DrinkingGamesView from "@/views/DrinkingGames/DrinkingGamesView.vue";
import DrinkingGameView from "@/views/DrinkingGames/DrinkingGameView.vue";
import TagView from "@/views/Tags/TagView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/drankspellen',
      name: 'drinking-games-index',
      component: DrinkingGamesView,
    },
    {
      path: '/drankspellen/:slug',
      name: 'drinking-games-show',
      component: DrinkingGameView,
    },
    {
      path: '/tags/:slug',
      name: 'tags-show',
      component: TagView,
    },
    {
      path: '/app',
      name: 'app',
      component: AppDescriptionView
    },
    {
      path: '/app/start',
      name: 'app-start',
      component: () => import('../views/App/AppView.vue')
    },
    {
      path: '/app/game',
      name: 'app-game',
      component: () => import('../views/App/GameView.vue')
    },
    {
      path: '/app/board',
      name: 'app-board',
      component: () => import('../views/App/BoardView.vue')
    }
  ]
})

export default router
