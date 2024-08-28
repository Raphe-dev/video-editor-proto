import Vue from 'vue';
import VueRouter from 'vue-router';
const Creation = () => import('../views/Creation.vue');

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'creation',
        component: Creation
    }
];

const router = new VueRouter({
    routes
});

export default router;
