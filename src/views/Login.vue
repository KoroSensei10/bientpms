<template>
    <div>
        <form name="loginForm" @submit.prevent="login">
            <input v-model="this.user.username" type="text" name="login" id="login" placeholder="Entrez votre username ici">
            <input v-model="this.user.password" type="password" name="password" id="password" placeholder="Entrez votre mot de passe ici">
            <button type="submit">Se connecter</button>
        </form>
    <div v-if="authFail">
        <strong>{{ this.message }}</strong>
    </div>
    </div>
</template>

<script>

export default {
    name: "Login",
    data() {
        return {
            loading: false,
            user: {
                username: "",
                password: "" 
            },
            authFail: false,
            message: ""
        };
    },
    computed: {
        isAuthenticated() {
            return this.$store.state.isAuthenticated;
        }
    },
    created() {
        if (this.isAuthenticated) {
            this.$router.push('/profile');
        }
    },
    methods: {
        login() {
            this.loading = true;
            this.authFail = false;
            const userData = {username : this.user.username, password : this.user.password}
            
            this.$store.dispatch('login', userData).then(() => {
                this.$router.push({ name: "Profile"});
            }).catch((error) => {
                this.loading = false;
                this.authFail = true;
                this.message = error.message || error;
            })
        }
    }
}
</script>