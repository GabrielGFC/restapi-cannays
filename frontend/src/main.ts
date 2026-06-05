import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persistedstate';
import { VueQueryPlugin } from '@tanstack/vue-query';
import App from './App.vue';
import router from './router';
import { i18n } from '@/plugins/i18n';
import { queryClient } from '@/plugins/vue-query';
import '@/assets/styles/theme.css';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersist);

app.use(pinia)
    .use(router)
    .use(i18n)
    .use(VueQueryPlugin, { queryClient })
    .mount('#app');
