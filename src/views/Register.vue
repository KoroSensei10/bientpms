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
                  placeholder="code postal"
                  v-model="this.userInformation.data_in.postcode"
                  required
                />
              </label>
            </div>
            <div class="form-group my-0 mb-2">
              <label class="my-0">
                  <i class="fas fa-user"></i>
                <input
                  class="myInput"
                  type="date"
                  name="birthdate"
                  id="birthdate"
                  pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                  placeholder="Date de naissance"
                  v-model="this.userInformation.data_in.birthday"
                  required
                />
              </label>
            </div>
            <div>
              <div class="form-check form-check-inline my-0 ">
              <input class="form-check-input" type="radio" name="gender" id="man" value="m" v-model="this.userInformation.data_in.gender">
              <label class="form-check-label" for="inlineRadio1">Homme</label>
            </div>
            <div class="form-check form-check-inline my-0 ">
              <input class="form-check-input" type="radio" name="gender" id="women" value="f" v-model="this.userInformation.data_in.gender">
              <label class="form-check-label" for="inlineRadio1">Femme</label>
            </div>
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
    <SemipolarSpinner class="align-self-center"
          v-if="loading"
          :animation-duration="2000"
          :size="65"
          color="#ff1d5e"
        />
    <div v-if="inscriptionValide" class="alert alert-success align-self-center" role="alert">
        Vous vous êtes bien inscrit, mais vous devez vérifier votre email avant de pouvoir vous connecter.
      </div>
  </div>
  <div class="bottom-decoration"></div>
</template>

<script>
import AuthService from "../services/auth.service.js";
import { SemipolarSpinner  } from 'epic-spinners'
export default {
  name: "Register",
  components: {
    SemipolarSpinner
  },
  data() {
    return {
      suite: true,
      loading: false,
      inscriptionValide: false,
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
      this.$router.push({ name: "Home" });
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
          this.inscriptionValide = true;
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
#application{
  /* padding-top: 0px!important; */
  padding-bottom: 0px!important;
  background-color: #fff;
}

input {
  display: block;
  text-align: center;
  left: 50%;
}
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

.in-container {
    min-height: 99%;
    padding: none;
    min-width: 100%;
    width: 100%;
}

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

.fas {
    position: relative;
    display: block;
    left: -87px;
    top: 30px;
    color: rgb(255, 255, 255);
}

.button {
    margin-top: 10px;
    width: 250px;
    border-radius: 25px;
    background-image: linear-gradient(to right, #0084ff, #00f2ff);
    color: #fff;
    font-weight: 700;
    cursor: pointer;
}

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
    font-size: 13px;
    margin: 15px auto;
    cursor: pointer;
}

.text {
    font-size: 55%;
    color: #746f6f;
}


.grey option {
    background-color: rgb(115, 115, 119);
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
  padding-bottom: 0px!important;
}
</style>