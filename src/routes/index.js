import VueRouter from "vue-router"
import Home from "../pages/Home"
import Breed from "../pages/Breed"

const routes =  [
    {path: '/', component: Home},
    {path: '/:name', component: Breed, name: 'Breed'},
];

export default new VueRouter({
    mode: 'history',
    routes
});
