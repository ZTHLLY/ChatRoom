import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import home from './pages/Home';
import about from './pages/About';
import chat from './pages/Chat';
import ElementPlus from 'element-plus'
import {v4 as uuidv4} from 'uuid';
import 'element-plus/dist/index.css'


const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/about',
        name: 'about',
        component: about
    }, {
        path: '/chat/:account?',
        name: 'chat',
        component: chat
    },{
        path: '/',
        name: home,
        component: home
    }]
})

createApp(App)
    .use(router)
    .use(ElementPlus)
    .use(uuidv4)
    .mount('#app')


