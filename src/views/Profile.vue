<template>
    <div>
        <button v-on:click="logout">
            Se déconnecter
        </button>
        <div>
            <p>{{ this.userInfo }}</p>
            <input type="text" name="last_name" id="last_name" v-model="this.updatableData.last_name"
            minlength="4" maxlength="50" size="10">
            <input type="text" name="first_name" id="first_name" v-model="this.updatableData.first_name"
            minlength="4" maxlength="50" size="10">
            <input type="text" name="postcode" id="postcode" v-model="this.updatableData.postcode"
            minlength="3" maxlength="5" size="10">
            <textarea type="text" name="about" id="about" v-model="this.updatableData.about"
            minlength="0" maxlength="300"></textarea>
        </div>
        <p>
            postcode = {{ this.updatableData.postcode }}
        </p>
        <div v-if="error">
            Une erreur de connexion est survenue.
        </div>
        <div v-if="infoUpdated">
            {{ this.message }}
        </div>
        <button v-on:click="updateData">
            Edit information
        </button>
        <img :src="this.updatableData.profile_picture" alt="profile picture">
    </div>
</template>

<script>
import UserInformation from '../services/userInfo.service.js'
export default {
    name: 'Profile',
    data() {
        return {
            userInfo: {
                username: '',
                email: '',
                is_superuser: false,
                sign_up_data: ''
            },
            updatableData: {},
            postcode: '',
            error: false,
            infoUpdated: false,
            message: ""
        }
    },
    computed: {
        isAuthenticated() {
            return this.$store.state.isAuthenticated;
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
            this.$router.push('/');
        },
        updateData() {
            console.log(this.updatableData);
            UserInformation.updateProfileInformation(this.updatableData).then((data) => {
                this.updatableData = data;
            }).catch((error) => {
                this.error = true;
                this.message = error;
            });
        }
    },
    beforeCreate() {
        if (!this.isAuthenticated) {
            this.logout;
        }
    },
    beforeMount() {
        this.$store.dispatch('setBasicInformation').then((data) => {
            this.userInfo = data;
            UserInformation.getMoreInformation().then((info) => {
                this.updatableData = info;
            }).catch((error) => {
                this.error = true;
                this.message = error;
            })
        }).catch((error) => {
            this.error = true;
            this.message = error;
        })
    }
}
</script>