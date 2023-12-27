// DEFINE OUR ROUTER RULES

import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddCity from "../components/AddCity.vue";
import NotFoundView from "../views/404View.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path:"/",
            name: 'home',
            component: HomeView
        },
        {
            path:"/home",
            redirect: "/"
        },
        {
            path:"/cities",
            name: 'cities',
            component: AddCity
        },
        {
            path:"/:catchall(.*)*",
            name: 'Not Found',
            component: NotFoundView
        },
    ]
});

export default router;