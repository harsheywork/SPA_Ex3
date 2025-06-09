import { createRouter, createWebHistory } from 'vue-router';
import LoginScreen from './components/LoginScreen.vue';
import TransportCompanyTranslationTable from './components/TransportCompanyTranslationTable.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginScreen,
  },
  {
    path: '/TransportCompanyTranslationTable',
    name: 'TransportCompanyTranslationTable',
    component: TransportCompanyTranslationTable,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
