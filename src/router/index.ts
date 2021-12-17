import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import List from '../views/List';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'List',
    component: List,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
