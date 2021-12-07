<template>
  <div>
    <nav id="nav-top" v-if="isAuthenticated" class="fixed-top d-flex align-items-center p-2 justify-content-around">
      <router-link to="/profile">Profile</router-link>
      <router-link to="/home">Home</router-link>
    </nav>
    <nav v-else class="fixed-top border border-black d-flex align-items-center justify-content-center">
      <router-link to="/">Accueil</router-link>
    </nav>
    <div id="application">
      <router-view/>
    </div>
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
        {
          id: 2,
          icon: "fa fa-coffee",
          title: "Activités",
          childs: [
            {
              id: 201,
              icon: "fa fa-calendar-check",
              title: "Vos Activités",
              path: {name: "UserActivities"}
            },
            {
              id: 202,
              icon: "fa fa-calendar",
              title: "Créer votre activité",
              path: {name: "CreateActivity"}
            }
          ]
        },
        { id: 3, icon: "fa fa-user", title: "Les gens", path: {name: "User"}},
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
body{
  height: 100%;
}

#app{
  background-color: #001d3a;
  height: 100%;
}

#application {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: auto;
  height: 100%;
  background-color: #fff;
  margin-bottom: 50px;
  margin-top: 50px;
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