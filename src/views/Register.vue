<template>
    <div>
        <h1>Formulaire d'inscription</h1>
        <form @submit.prevent="register">
            <input type="text" name="username" id="username" v-model="this.userInformation.account_in.username">Username
            <input type="email" name="email" id="email" v-model="this.userInformation.account_in.email">Email
            <input type="password" name="password" id="password" v-model="this.userInformation.account_in.password">Password

            <input type="text" name="first_name" id="first_name" v-model="this.userInformation.data_in.first_name">First Name
            <input type="text" name="last_name" id="last_name" v-model="this.userInformation.data_in.last_name">Last name
            <input type="number" name="postcode" id="postcode" v-model="this.userInformation.data_in.postcode">Postcode
            <textarea name="about" id="about" cols="30" rows="10" v-model="this.userInformation.data_in.about">About you</textarea>
            <input type="date" name="birthdate" id="birthdate" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" v-model="this.userInformation.data_in.birthday">Birthdate
            <input type="radio" name="gender" id="man" value="m" v-model="this.userInformation.data_in.gender">Man
            <input type="radio" name="gender" id="woman" value="f" v-model="this.userInformation.data_in.gender">Woman
            <button type="submit">Sign up</button>
        </form>
        <div>
            {{ this.message }}
        </div>
    </div>
</template>

<script>
import AuthService from '../services/auth.service.js'
export default {
    name: "Register",
    data() {
        return {
            loading: false,
            // L'objet qui va contenir toutes les infos de l'utilisateur
            userInformation: {
                account_in: {
                    username: "",
                    email: "",
                    password: ""
                },
                data_in: {
                    first_name: "",
                    last_name: "",
                    postcode: "",
                    profile_picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/800px-ISO_C%2B%2B_Logo.svg.png",
                    birthday: "",
                    about: "",
                    gender: true
                }
            },
            authFail: false,
            message: ""
        };
    },
    computed: {
        // Fonction pour savoir si le mec est connécté pour l'app
        isAuthenticated() {
            return this.$store.state.isAuthenticated;
        }
    },
    // à la création de la page (quand la page s'affiche en gros)
    created() {
        // si le mec est connécté il est redirigé vers la page profile
        if (this.isAuthenticated) {
            this.$router.push('/profile');
        }
    },
    methods: {
        // Fonction pour register l'utilisateur
        register() {
            this.loading = true;
            this.authFail = false;
            // si le register se passe bien, redirige vers la page login
            let data = JSON.parse(JSON.stringify(this.userInformation));
            console.log(this.userInformation.data_in.birthday);
            AuthService.register(data).then(() => {
                this.$router.push({ name: "Login"});
            }).catch((error) => { // sinon indique qu'il y a eu une erreur
                this.loading = false;
                this.authFail = true;
                this.message = error.message || error;
            })
        }
    }
}
</script>
<style>
input{
    display: block;
    text-align: center;
    left: 50%;
}
</style>