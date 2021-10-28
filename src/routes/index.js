import VueRouter from "vue-router"
import Home from "../pages/Home"
import Breed from "../pages/Breed"
import Liked from "@/pages/Liked";

const routes =  [
    {path: '/', component: Home, name: 'Home'},
    {path: '/:name', component: Breed, name: 'Breed'},
    {path: '/liked', component: Liked, name: 'Liked'},

];

export default new VueRouter({
    mode: 'history',
    routes
});
