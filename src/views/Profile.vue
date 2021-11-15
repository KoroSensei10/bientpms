<template>
    <div>
        <div class="haut">
            <div class="gris_haut"></div> 
            <div class="modifier">Modifier</div>
            <div v-on:click="logout" class="deconnexion">Déconnexion</div>
            <div class="profil">Profil</div>
            <div class="avatar">
                <img class="image" :src="this.updatableData.profile_picture" alt="profile picture">
            </div>
        </div>
        <form class="milieu" @submit.prevent="updateData">
            <input type="text" name="last_name" id="last_name" 
            v-model="this.updatableData.last_name" minlength="4" maxlength="50" size="10" class="nom"/>

            <input type="text" name="first_name" id="first_name" 
            v-model="this.updatableData.first_name" minlength="4" maxlength="50" size="10"/>

            <input type="text" name="postcode" id="postcode" v-model="this.updatableData.postcode"
            minlength="3" maxlength="5" size="10"/>

            <div class="age">{{ this.updatableData.birthdate }} | {{ this.updatableData.postcode }} | Avis (12)</div>

            <input type="text" name="about" id="about" v-model="this.updatableData.about"
            minlength="0" maxlength="300" class="description"/>
        </form>
        <button v-on:click="updateData">
            Edit information
        </button>
        <div v-if="infoUpdated || error">
            {{ this.message }}
        </div>
        <div class="bas">
            <div class="button"><i class="fal fa-home"></i></div>
            <div class="button"><i class="fal fa-bags-shopping"></i></div>
            <div class="button"><i class="fal fa-comment-lines"></i></div>
            <div class="button"><i class="fal fa-user-alt"></i></div>      
        </div>

    </div>
</template>

<script>
import UserInformation from '../services/userInfo.service.js';
import('../assets/profile.css');
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

