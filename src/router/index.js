import { createRouter, createWebHistory } from 'vue-router';
import List from '../views/List';
import Detail from '../views/Detail';
import History from '../views/History';

const routes = [
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
  {
    path: '/history',
    name: 'History',
    component: History,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
