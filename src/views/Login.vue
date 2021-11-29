<template  class=".flex-lg-fill .d-flex .flex-row">
  <div
    class="
      .container-fluid
      .flex-xl-fill
      .d-flex
      .flex-row
      .justify-content-center
    "
  >
    <div
      class="
        in-container-fluid
        .d-flex
        .justify-content-center
        .align-self-center
      "
    >
      <div class="form-group .align-items-center .align-self-center">
        <!-- en-tête du formulaire -->
        <header class="myHed .text-center">
          <p>Se connecter</p>
          <img class="logo" src="/images/logotpms.png" alt="logo" />
        </header>
        <!-- formulaire de connexion -->
        <form
          class="main-form .text-center d-flex flex-column"
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
          <hr noshade="1" width="100%" size="" />
          <div class="form-group mb-2">
            <label>
              <button class="form-control button" type="submit">
                Se connecter
              </button>
            </label>
          </div>
          <span class="check_1"> <a href="">Mot de passe oublié ?</a></span>
        </form>
        <div v-if="authFail" class="alert alert-danger align-items-center" role="alert">
          <strong>{{ this.message }}</strong>
        </div>
        <div class="spinner-border text-info" v-if="loading" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>
  <div class="bottom-decoration"></div>
</template>

<script>
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
      this.$store
        .dispatch("login", userData)
        .then(() => {
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          this.loading = false;
          this.authFail = true;
          this.message = error.message || error;
          setTimeout(() => this.authFail = false, 3000)
        });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");

.in-container {
  min-height: 99%;
  padding: none;
  min-width: 100%;
  width: 100%;
}

/* la partie "se connecter" + logo */

.myHed {
  margin-top: 10px;
  font-size: 32px;
  margin-bottom: 10px;
  font-weight: 700;
  background-image: linear-gradient(to right, #0084ff, #00f2ff);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}

.logo {
  max-width: 200px;
}

/* logo mot de passe et utilisateur */

.fas {
  position: relative;
  display: block;
  left: -87px;
  top: 30px;
  color: rgb(255, 255, 255);
}

/* le boutton "connexion" */

.button {
  margin-top: 10px;
  width: 250px;
  border-radius: 25px;
  background-image: linear-gradient(to right, #0084ff, #00f2ff);
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}

/* l'insertion du texte dans les cases*/

.myInput {
  width: 220px;
  padding: 10px;
  padding-left: 40px;
  border-radius: 25px;
  background-image: linear-gradient(to right, #0084ff, #00f2ff);
  color: #fff;
  border: none;
  display: block;
}

.check_1 {
  font-weight: 500;
  color: rgb(85, 85, 85);
  font-size: 12px;
  margin: 15px auto;
  cursor: pointer;
}

.bottom-decoration::after {
  --round: 20vh;
  content: "";
  position: absolute;
  left: -32px;
  right: -32px;
  top: calc(var(--round) / -2);
  background: #fff;
  height: var(--round);
  border-radius: 0 0 50% 50%;
}
</style>