import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LearnMoreView from '../views/LearnMoreView.vue'
import NewConversationView from '../views/NewConversationView.vue'
import ChatWindowView from '../views/ChatWindowView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/learn-more',
      name: 'learn-more',
      component: LearnMoreView,
    },
    {
      path: '/new-conversation/:query', 
      name: 'new-conversation',
      component: NewConversationView,
      props: (route) => ({ query: route.params.query }),
    },
    {
      path: '/chat', 
      name: 'chat',
      component: ChatWindowView,
    },
  ],
})

export default router
