<template>
    <div class="d-flex flex-column justify-content-between">
        <div class="haut mb-5 flex-grow-1">
            <div class="gris_haut"></div> 
            <button @click="disableEdit = !disableEdit" type="button" class="btn btn-outline-danger modifier">Edit</button>
            <button v-on:click="logout" class="btn btn-outline-dark deconnexion">Logout</button>
            <div class="profil">{{ this.userInfo.username }}</div>
            <div class="avatar">
                <img class="profile-picture" :src="this.updatableData.profile_picture" alt="profile picture">
            </div>
        </div>
        <div v-if="infoUpdated" class="alert alert-success align-self-center" role="alert">
            Vos informations ont bien étaient mise à jour.
        </div>
        <div v-if="error" class="alert alert-danger align-self-center" role="alert">
            {{ this.message }}
        </div>
        <div v-if="this.userInfo.is_superuser" class="alert alert-primary align-self-center" role="alert">
                Vous êtes administrateur de cette application. &lsaquo;3
        </div>
        <form class="d-flex flex-column align-self-center flex-grow-1" @submit.prevent="updateData">
            <div class="mb-3">
                <label for="about" class="form-label">Description</label>
                <input type="text" name="about" id="about" v-model="this.updatableData.about"
                minlength="0" maxlength="300" class="form-control" :disabled="disableEdit"/>
            </div>
            <div class="mb-3">
                <label for="last_name" class="form-label">Last Name</label>
                <input type="text" name="last_name" id="last_name" 
                v-model="this.updatableData.last_name" minlength="4" maxlength="50" size="10" class="form-control" :disabled="disableEdit"/>
            </div>

            <div class="mb-3">
                <label for="first_name" class="form-label">First Name</label>
                <input type="text" name="first_name" id="first_name" 
                v-model="this.updatableData.first_name" minlength="4" maxlength="50" size="10" class="form-control" :disabled="disableEdit"/>
            </div>

            <div class="mb-3">
                <label for="postcode" class="form-label">Postcode</label>
                <input type="text" name="postcode" id="postcode" v-model="this.updatableData.postcode"
                minlength="3" maxlength="5" size="10" class="form-control" :disabled="disableEdit"/>
            </div>

            <div class="age mb-3">{{ this.updatableData.birthday }}</div>
        </form>
        <button data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" class="btn btn-primary align-self-center" v-on:click="updateData" v-if="!disableEdit">
            Edit information
        </button>
        <LoopingRhombusesSpinner class="align-self-center"
            v-if="loading"
            :animation-duration="2500"
            :rhombus-size="15"
            color="#ff1d5e"
            />
    </div>
</template>

<script>
import UserInformation from '../services/userInfo.service.js';
import { LoopingRhombusesSpinner } from 'epic-spinners'
export default {
    name: 'Profile',
    components: {
        LoopingRhombusesSpinner
    },
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
            message: "",
            loading: false,
            disableEdit: true
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
            this.loading = true;
            UserInformation.updateProfileInformation(this.updatableData).then((data) => {
                this.updatableData = data;
                this.infoUpdated = true;
                this.loading = false;
                setTimeout(() => this.infoUpdated = false, 3000);
            }).catch((error) => {
                this.error = true;
                this.message = error;
                this.loading = false;
            });
        },
        eventChangeTitle(){
            const data = {title: "Profil"};
            this.$emit('updateTitleName', data);
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
    },
    mounted() {
        this.eventChangeTitle();
    }
}
</script>

<style>
.haut {
    flex-basis: 0;
    flex-grow: 3;
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

.age {
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