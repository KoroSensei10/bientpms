<template>
    <perfect-scrollbar v-if="!loading">
        <div class="haut mb-3">
            <div class="gris_haut"></div>
            <div class="profil text-center">{{ this.username }}</div>
            <div class="avatar">
                <img class="profile-picture" :src="this.infos.profile_picture" alt="profile picture">
            </div>
        </div>
        <form class="d-flex flex-column align-self-center align-items-center flex-grow-1 mb-3" @submit.prevent="updateData">
            <div class="mb-3">
                <label for="about" class="form-label">Description</label>
                <input type="text" name="about" id="about" v-model="this.infos.about"
                minlength="0" maxlength="300" class="form-control" disabled/>
            </div>
            <div class="mb-3">
                <label for="last_name" class="form-label">Last Name</label>
                <input type="text" name="last_name" id="last_name" 
                v-model="this.infos.last_name" minlength="4" maxlength="50" size="10" class="form-control" disabled/>
            </div>

            <div class="mb-3">
                <label for="first_name" class="form-label">First Name</label>
                <input type="text" name="first_name" id="first_name" 
                v-model="this.infos.first_name" minlength="4" maxlength="50" size="10" class="form-control" disabled>
            </div>

            <div class="mb-3">
                <label for="postcode" class="form-label">Postcode</label>
                <input type="text" name="postcode" id="postcode" v-model="this.infos.postcode"
                minlength="3" maxlength="5" size="10" class="form-control" disabled/>
            </div>

            <div class="age mb-3">
                <label for="" class="form-label">Birthday</label>
                <input type="date" name="" id="" v-model="this.infos.birthday"
                minlength="3" maxlength="5" size="10" class="form-control" disabled/>
            </div>
            <div class="age mt-3">
                <label for="" class="form-label"></label>
                <input type="date" name="" id=""
                minlength="3" maxlength="5" size="10" class="form-control" disabled/>
            </div>
        </form>
        <div v-if="error">
            {{ this.error }}
        </div>
        <LoopingRhombusesSpinner class="align-self-center"
            v-if="loading"
            :animation-duration="2500"
            :rhombus-size="15"
            color="#ff1d5e"
        />
    </perfect-scrollbar>
</template>

<script>
import SportivesInformations from "../services/sportives.services.js"
import { LoopingRhombusesSpinner } from 'epic-spinners'
export default {
    name: "User",
    components: {
        LoopingRhombusesSpinner
    },
    data () {
        return {
            username: this.$route.params.username,
            infos: null,
            loading: false,
            error: null,
        }
    },
    methods: {
        getInformations(){
            this.loading = true;
            SportivesInformations.getSportivesWithUsername(this.$route.params.username).then((data) => {
                this.loading = false;
                this.infos = data;
            }).catch((error) => {
                this.loading = false;
                this.error = error;
            })
        },
        eventChangeTitle(){
            const data = {title: "L'utilisateur :"};
            this.$emit('updateTitleName', data);
        }
    },
    beforeMount(){
        this.getInformations();
    },
    mounted() {
        this.eventChangeTitle();
    }
}
</script>

<style scoped>

.padding {
    margin-bottom: 50px;
  padding-bottom: 100px;
}

.haut {
    display: grid;
    grid-template-columns: 25% 50% 25%;
    grid-template-rows: 1fr 1fr 1fr;
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

.modifier {
    color: #000000;
    background-color: white;
    font-size: calc(10px + 1vw);
}

.editing {
    background-color: red;
    color: white;
}

.deconnexion {
    color: #000000;
    background-color: white;
    grid-row-start: 1;
    grid-column-end: 4;
    font-size: calc(10px + 1vw);
    cursor: pointer;
}

.profil {
    display: inline-flex;
    justify-content: center;
    align-items: flex-end;
    text-align: center;
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