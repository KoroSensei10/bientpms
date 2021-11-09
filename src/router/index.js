import { createRouter, createWebHashHistory } from 'vue-router'
import Accueil from '../views/Accueil.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Register from '../views/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Accueil
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/Login', '/Register', '/Accueil', '/'];
//   const authRequired = !publicPages.includes(to.path);
//   if (!authRequired){
//     next();
//   }
//   // si il faut une autorisation (style page profile) ET que le mec n'est pas connécté
//   else if (authRequired && !createStore.state.isAuthenticated){
//     next({ name: 'Login' })
//   }
//   /*
//   En gros le else il fait quoi :
//   Déjà on entre dans le quand on veut accéder à une page privé (style profile) ET que l'appli nous considère comme connecté
//   - Donc on vérifie en premier lieu que le token qui sert pour se co est bien valable
//    - si il l'est pas ça nous déco et nous envoi sur la page de login
//   - Et après ça vérifie si il y a bien les informations principale dans le store localStorage
//    - si il n'y a rien (cas de première connexion par exemple) ça les ajoutes
//    - si il y a une errer -> déco et push sur /Login
//   */
// })

export default router
