<template  class=".flex-lg-fill .d-flex .flex-row">
  <div class=".container-fluid .flex-xl-fill .d-flex .flex-row .justify-content-center">
    <div class="in-container-fluid .d-flex .justify-content-center .align-self-center">
      <div class="form-group .align-items-center .align-self-center">
        <!-- en-tête du formulaire -->
        <header class="myHed .text-center">
          <p>Se connecter</p>
          <img src="/images/tpms.ico" alt="logo">
        </header>
        <!-- formulaire de connexion -->
        <form
          class="main-form .text-center"
          name="loginForm"
          @submit.prevent="login"
        >
          <div class="form-group my-0">
            <label class="my-0">
              <i class="fas fa-user"></i>
              <input
                v-model="this.user.username"
                class="myInput"
                type="text"
                name="login"
                id="login"
                placeholder="E-mail/Nom d'utilisateur"
                required
              />
            </label>
          </div>
          <div class="form-group my-0">
            <label class="my-0">
              <i class="fas fa-lock"></i>
              <input
                type="password"
                class="myInput"
                placeholder="Mot de Passe"
                v-model="this.user.password"
                required
              />
            </label>
          </div>
          <hr noshade="1" width="100%" size="">
          <div class="form-group">
            <label>
              <button class="form-control button" type="submit">
                Se connecter
              </button>
            </label>
          </div>
          <span class="check_1"> <a href="">Mot de passe oublié ?</a></span>
        </form>
        <div v-if="authFail">
          <strong>{{ this.message }}</strong>
        </div>
        <div class="spinner-border text-info" v-if="loading" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>
  <div class="bottom-decoration">
  </div>
</template>

<script>
require("../assets/login.css");
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      user: {
        username: "",
        password: "",
      },
      authFail: false,
      message: "",
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  created() {
    if (this.isAuthenticated) {
      this.$router.push({ name: "Home" });
    }
  },
  methods: {
    login() {
      this.loading = true;
      this.authFail = false;
      const userData = {
        username: this.user.username,
        password: this.user.password,
      };
      this.$store.dispatch("login", userData)
        .then(() => {
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          this.loading = false;
          this.authFail = true;
          this.message = error.message || error;
        });
    },
  },
};
</script>