import { createWebHistory, createRouter } from 'vue-router'

import Formulario from '../components/Formulario.vue'
import Usuarios from '../components/Usuarios.vue'

const routes = [
    /* Se cargar todos los routers */
    { path: '/', name: 'Home', component: Formulario },
    { path: '/formulario', name: 'Formulario', component: Formulario },
    { path: '/usuarios', name: 'Usuarios', component: Usuarios }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
