<template>
  <div ip="app" class="mb-5 pb-5">
    <div id="nav" v-if="!isAuthenticated" class="flex-grow-1">
      <router-link to="/">Accueil</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    <!-- Affiche la NavBar que quand la personne est loggedin -->
    <VueBottomNavigation v-if="isAuthenticated" value="1" :options="options" v-model="selected" />
  </div>
</template>

<script>
import VueBottomNavigation from "bottom-navigation-vue";
export default {
  name: "App",
  components: {
    VueBottomNavigation,
  },
  data: () => ({
      selected: 1,
      options: [
        { id: 1, icon: "fa fa-home", title: "Home", path: {name: "Home"} },
        // { id: 2, icon: "fa fa-coffee", title: "Meet" },
        { 
          id: 3, 
          icon: "fa fa-cog", 
          title: "Settings", 
          childs: [
            {
              id: 301,
              icon: "fa fa-calendar-check",
              title: "Vos Activités",
              path: {name: "UserActivities"}
            },
            { 
              id: 302,
              icon: "fa fa-user",
              title: "Vous",
              path: {name: "Profile"}
            }
          ]
        },
        // { id: 4, icon: "fa fa-bell", title: "Messages" },
      ],
  }),
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.bottom-decoration {
  position: absolute;
  bottom: 0;
  margin-bottom: 0px;
  width: 100%;
  height: 200px;
  max-height: 20vh;
  background-image: linear-gradient(to right, #0084ff, #00f2ff);
  overflow-y: hidden;
  overflow-x: hidden;
  z-index: -1000;
}
</style>