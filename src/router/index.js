// DEFINE OUR ROUTER RULES

import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddLocations from "../components/AddLocations.vue";
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
            path:"/locations",
            name: 'locations',
            component: AddLocations
        },
        {
            path:"/:catchall(.*)*",
            name: 'Not Found',
            component: NotFoundView
        },
    ]
});

export default router;