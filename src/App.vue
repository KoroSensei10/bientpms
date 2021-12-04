<template>
  <div>
    <nav id="nav-top" v-if="isAuthenticated" class="fixed-top">
      <router-link to="/">Accueil</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <nav v-else class="fixed-top border border-black d-flex align-items-center justify-content-center">
      <router-link to="/">Accueil</router-link>
    </nav>
    <router-view id="app" />

    <!-- Affiche la NavBar que quand la personne est loggedin -->
    <nav id="nav-bottom" v-if="isAuthenticated" class="navbar fixed-bottom navbar-light bg-light">
      <VueBottomNavigation color="#000000" badgeColor="#000000" :value="selected" :options="options" v-model="selected" />
    </nav>
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
  background-color: #001d3a;
  margin-bottom: 25px;
  margin-top: 25px;
  /* padding-top: 10px; */
  padding-bottom: 5px;
  box-sizing: border-box;
}

#nav-top{
  background-color: crimson;
  border-bottom: rgba(0, 0, 0, 0.5);
  box-shadow: -3px 9px 20px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
#nav-bottom{
  border-top: rgba(0, 0, 0, 0.5);
  box-shadow: -3px 9px 20px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

nav{
  height: 50px;
  box-sizing: border-box;
}
</style>