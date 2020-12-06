import Vue from 'vue'
import VueRouter from 'vue-router'
import { Home, Favorites, Photo } from "@/views";


Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/favorites",
        name: "Favorites",
        component: Favorites,
    },
    {
        path: "/photo/:id",
        name: "Photo",
        component: Photo,
    }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
