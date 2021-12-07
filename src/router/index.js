import { createRouter, createWebHashHistory } from 'vue-router'
import Accueil from '../views/Accueil.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import UserActivities from '../views/UserActivities.vue'
import CreateActivity from '../views/CreateActivity.vue'
import ActivityPage from '../views/ActivityPage.vue'
// import User from '../views/User.vue'
// import Users from '../views/Users.vue'

const routes = [{
        path: '/',
        name: 'Accueil',
        component: Accueil
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/userActivities',
        name: 'UserActivities',
        component: UserActivities
    },
    {
        path: '/createActivity',
        name: 'CreateActivity',
        component: CreateActivity
    },
    {
        path: '/activityPage/:id',
        name: 'ActivityPage',
        component: ActivityPage
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
    // {
    //     path: '/user/:username',
    //     name: 'User',
    //     component: User
    // },
    // {
    //     paht: '/users',
    //     name: 'Users',
    //     component: Users
    // },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router