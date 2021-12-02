<template>
  <div>
    <nav v-if="isAuthenticated" class="fixed-top border border-black">
      <router-link to="/">Accueil</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <nav v-else class="fixed-top border border-black d-flex align-items-center justify-content-center">
      <router-link to="/">Accueil</router-link>
    </nav>
    <router-view />
    <!-- Affiche la NavBar que quand la personne est loggedin -->
    <nav v-if="isAuthenticated" class="navbar fixed-bottom navbar-light bg-light">
      <VueBottomNavigation value="1" :options="options" v-model="selected" />
    </nav>
  </div>
</template>

<script>
// import VueBottomNavigation from "bottom-navigation-vue";
export default {
  name: "App",
  components: {
    // VueBottomNavigation,
  },
  data: () => ({
      selected: 1,
      options: [
        { id: 1, icon: "fa fa-home", title: "Home", path: {name: "Home"} },
        { id: 2, icon: "fa fa-coffee", title: "Create", path: {name: "CreateActivity"}},
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
  padding-bottom: 50px;
  padding-top: 50px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

nav{
  height: 50px;
}
</style>