import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppView from '../views/App/AppView.vue'
import DrinkingGamesView from "@/views/DrinkingGames/DrinkingGamesView.vue";
import DrinkingGameView from "@/views/DrinkingGames/DrinkingGameView.vue";

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
      path: '/app',
      name: 'app',
      component: AppView
    },
    {
      path: '/app/game',
      name: 'app-game',
      // route level code-splitting
      // this generates a separate chunk (GameView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
