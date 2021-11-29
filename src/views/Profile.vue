<template>
    <div class="d-flex flex-column justify-content-between">
        <div class="haut mb-5">
            <div class="gris_haut"></div> 
            <div class="modifier">Modifier</div>
            <div v-on:click="logout" class="deconnexion">Déconnexion</div>
            <div class="profil">{{ this.userInfo.username }}</div>
            <div class="avatar">
                <img class="profile-picture" :src="this.updatableData.profile_picture" alt="profile picture">
            </div>
        </div>
        <form class="milieu flex-grow-1 d-flex flex-column text-center" @submit.prevent="updateData">
            <div class="mb-3">
                <label for="about">Description</label>
                <input type="text" name="about" id="about" v-model="this.updatableData.about"
                minlength="0" maxlength="300" class="description form-control"/>
            </div>
            <div class="mb-3">
                <label for="last_name">Last Name</label>
                <input type="text" name="last_name" id="last_name" 
                v-model="this.updatableData.last_name" minlength="4" maxlength="50" size="10" class="nom form-control"/>
            </div>

            <div class="mb-3">
                <label for="first_name">First Name</label>
                <input type="text" name="first_name" id="first_name" 
                v-model="this.updatableData.first_name" minlength="4" maxlength="50" size="10" class="form-control"/>
            </div>

            <input type="text" name="postcode" id="postcode" v-model="this.updatableData.postcode"
            minlength="3" maxlength="5" size="10"/>

            <div class="age">{{ this.updatableData.birthday }}</div>
        </form>
        <button type="button" class="btn btn-primary align-self-center" v-on:click="updateData">
            Edit information
        </button>
        <div v-if="infoUpdated || error">
            {{ this.message }}
        </div>
    </div>
</template>

<script>
import UserInformation from '../services/userInfo.service.js';
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

<style>
.haut {
    flex-basis: 0;
    flex-grow: 2.8;
    display: grid;
    grid-template-columns: 25% 50% 25%;
    grid-template-rows: 1fr 1fr 1fr;
    border-style: none;
    background: linear-gradient(to right, #0084ff, #00f2ff);
}

.gris_haut {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 3;
    grid-row-end: 4;
    border-style: none;
    background-color: #fff;
}

.milieu {
    flex-basis: 0;
    flex-grow: 6.2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 80px;
}

.nom {
    margin-right: 10px;
    margin-left: 10px;
    font-size: calc(24px + 0.5vw);
    font-weight: 600;
}

.age {
    margin-right: 10px;
    margin-left: 10px;
    font-size: calc(13px + 0.5vw);
    font-style: italic;
}

.sport {
    flex-basis: 0;
    flex-grow: 2;
    text-align: center;
    margin-right: 10px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 10px;
    font-size: calc(16px + 0.5vw);
}

.description {
    flex-basis: 0;
    flex-grow: 5;
    text-align: center;
    margin-right: 10px;
    margin-left: 10px;
    font-size: calc(16px + 0.5vw);
}

.bas {
    flex-basis: 0;
    display: flex;
    flex-direction: row;
    border-style: none;
    background: linear-gradient(to right, #0084ff, #00f2ff);
    min-height: 50px;
    position: fixed;
    bottom: 0px;
    right: 0px;
    left: 0px;
}

.modifier {
    margin-left: 12%;
    margin-top: 12%;
    color: #FDFAFA;
    font-size: calc(10px + 1vw);
}

.deconnexion {
    grid-row-start: 1;
    grid-column-end: 4;
    text-align: end;
    margin-right: 12%;
    margin-top: 12%;
    color: #FDFAFA;
    font-size: calc(10px + 1vw);
    cursor: pointer;
}

.profil {
    display: inline-flex;
    justify-content: center;
    align-items: flex-end;
    color: #FDFAFA;
    font-size: calc(32px + 2vw);
    font-weight: 700;
}

.avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    grid-row-start: 2;
    grid-row-end: 4;
    grid-column-start: 2;
    grid-column-end: 3;
}

.profile-picture {
    width: 90%;
    height: auto;
    max-width: 150px;
    border-radius: 50%;
}

.button {
    flex-basis: 0;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media (min-height: 700px) {
    .image {
        max-width: 200px;
    }
}

@media (min-width: 800px) and (min-height: 950px) {
    .image {
        max-width: 250px;
    }
}
</style>