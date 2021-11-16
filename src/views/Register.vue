<template>
  <div class="container.d-flex .justify-content-center .position-absolute">
    <div
      class="in-container .d-flex .justify-content-center .align-self-center"
    >
      <div class="form-group .align-items-center .align-self-center">
        <header class="myHed .text-center">
          <p>S'inscrire</p>
          <img src="/images/tpms.ico" alt="logo">
        </header>

        <form
          @submit.prevent="register"
          action="Register2.html"
          class="main-form .text-center"
        >
          <div v-if="suite">
            <div class="form-group my-0">
              <label class="my-0">
                <i class="fas fa-user"></i>
                <input
                  class="myInput"
                  type="contact"
                  name="username"
                  id="username"
                  placeholder="Pseudo * "
                  v-model="this.userInformation.account_in.username"
                  required
                />
                <div class="text m-1">
                  <p>Vous ne pourrez plus changer votre pseudo après cela.</p>
                </div>
              </label>
            </div>
            <div class="form-group my-0">
              <label class="my-0">
                <i class="fas fa-envelope"></i>
                <input
                  class="myInput"
                  type="email"
                  name="email"
                  placeholder="Adresse e-mail *"
                  id="email"
                  v-model="this.userInformation.account_in.email"
                />
                <div class="text m-1">
                  <p>Un e-mail de confirmation vous sera envoyé.</p>
                </div>
              </label>
            </div>

            <div class="form-group my-0">
              <label class="my-0">
                <i class="fas fa-lock"></i>
                <input
                  class="myInput"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Mot de passe *"
                  v-model="this.userInformation.account_in.password"
                />
              </label>
            </div>
          </div>
          <!-- Div qui gère la seconde partie de l'inscription -->
          <div v-else>
            <div class="form-group my-0">
              <label class="my-0">
                <i class="fas fa-user"></i>
                <input
                  class="myInput"
                  name="first_name"
                  id="first_name"
                  placeholder="Prénom"
                  v-model="this.userInformation.data_in.first_name"
                  required
                />
              </label>
            </div>
            <div class="form-group my-0">
              <label class="my-0">
                <i class="fas fa-user"></i>
                <input
                  class="myInput"
                  name="last_name"
                  id="last_name"
                  placeholder="Nom"
                  v-model="this.userInformation.data_in.last_name"
                  required
                />
              </label>
            </div>
            <div class="form-group my-0">
              <label class="my-0">
                  <i class="fas fa-user"></i>
                <input
                  class="myInput"
                  type="number"
                  name="postcode"
                  id="postcode"
                  v-model="this.userInformation.data_in.postcode"
                  required
                />
              </label>
            </div>
            <div class="form-group my-0">
              <label class="my-0">
                  <i class="fas fa-user"></i>
                <input
                  class="myInput"
                  type="date"
                  name="birthdate"
                  id="birthdate"
                  pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                  v-model="this.userInformation.data_in.birthday"
                  required
                />
              </label>
            </div>
            <div class="form-group my-0">
                <input class="myInput" type="radio" name="gender" id="man" value="m" v-model="this.userInformation.data_in.gender">Man
                <input class="myInput" type="radio" name="gender" id="woman" value="f" v-model="this.userInformation.data_in.gender">Woman
            </div>
          </div>
          <!-- Fin de la seconde partie de l'inscription -->

          <!-- bouton pour aller à la 2e partie du formulaire -->
          <div class="m-4">
            <div class="form-group" v-if="suite">
              <label>
                <input
                  @click="this.suite = false"
                  type="button"
                  class="form-control button"
                  value="Continuer"
                />
              </label>
            </div>
            <!-- bouton pour s'inscrire -->
            <div class="form-group" v-else>
              <label>
                <input
                  type="submit"
                  class="form-control button"
                  value="S'inscrire !"
                />
              </label>
            </div>
            <!-- bouton retour -->
            <div class="form-group" v-if="!suite">
              <label>
                <input
                  @click="this.suite = true"
                  type="button"
                  class="form-control button"
                  value="Retour"
                />
              </label>
            </div>
          </div>
          <router-link class="check_1" to="/login"
            >Déjà un compte ?
        </router-link>
        <div class="spinner-border text-info" v-if="loading" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        </form>
        <div>
          {{ this.message }}
        </div>
      </div>
    </div>
  </div>
  <div class="bottom-decoration"></div>
</template>

<script>
require("../assets/register.css");
import AuthService from "../services/auth.service.js";
export default {
  name: "Register",
  data() {
    return {
      suite: true,
      loading: false,
      // L'objet qui va contenir toutes les infos de l'utilisateur
      userInformation: {
        account_in: {
          username: "",
          email: "",
          password: "",
        },
        data_in: {
          first_name: "",
          last_name: "",
          postcode: "",
          profile_picture:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/800px-ISO_C%2B%2B_Logo.svg.png",
          birthday: "",
          about: "",
          gender: "m",
        },
      },
      authFail: false,
      message: "",
    };
  },
  computed: {
    // Fonction pour savoir si le mec est connécté pour l'app
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  // à la création de la page (quand la page s'affiche en gros)
  created() {
    // si le mec est connécté il est redirigé vers la page profile
    if (this.isAuthenticated) {
      this.$router.push("/profile");
    }
  },
  methods: {
    // Fonction pour register l'utilisateur
    register() {
      this.loading = true;
      this.authFail = false;
      // si le register se passe bien, redirige vers la page login
      let data = JSON.parse(JSON.stringify(this.userInformation));
      AuthService.register(data)
        .then(() => {
          this.$router.push({ name: "Login" });
        })
        .catch((error) => {
          // sinon indique qu'il y a eu une erreur
          this.loading = false;
          this.authFail = true;
          this.message = error.message || error;
          this.suite = true;
        });
    },
  },
};
</script>
<style>
input {
  display: block;
  text-align: center;
  left: 50%;
}
</style>