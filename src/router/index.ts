import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import List from '../views/List';
import Detail from '../views/Detail';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'List',
    component: List,
  },
  {
    path: '/headline/:url',
    name: 'Detail',
    component: Detail,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
