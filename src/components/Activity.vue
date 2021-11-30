<template>
  <!--En gros c'est dans ce div que tu crées la carte bootstrap, et genre à la place où tu veux mettre genre le titre, la date le sport etc... 
    tu mets genre un attribut de l'objet this.activityInfo
    par exemple pour le titre de la carte tu mets {{ this.activityInfo.title }}
    pour avoir toutes les infos de l'activité regarde sur l'api de Liam http://157.90.237.150/docs#/activity/read_activities_api_v1_activity_get (dans l'onglet réponse)-->
  <div v-if="this.message" class="alert alert-success" role="alert">
    {{ this.message }}
  </div>
  <div v-if="this.error" class="alert alert-danger" role="alert">
    {{ this.error }}
  </div>
  <div class="card text-center m-3 flex-grow-1">
    <div class="card-header">{{ this.activityInfo.title }}</div>
    <div class="card-body">
      <h5 class="card-title">{{ this.activityInfo.sport.name }}</h5>
      <p class="card-text">
        {{ this.activityInfo.description }}
      </p>
      <p class="card-text">
        <strong>Se déroule le :</strong> {{ this.activityInfo.event_date }}
      </p>
      <p class="card-text">
        <strong>Niveau : </strong>
        <span class="badge rounded-pill bg-success" v-for="level in this.activityInfo.levels" v-bind:key="level.id">{{ level.level }}</span>
      </p>
      <!--Div pour pouvoir participer-->
      <div v-if="participant && !userParticipe">
        <button @click="addMyParticipation" class="btn btn-primary float-center" :disabled="userParticipe">Participer</button>
        <select name="levels" id="levels" v-model="this.levelSelected" class="form-select m-1" required :disabled="userParticipe">
          <option v-for="level in this.activityInfo.levels" :value="level.level" v-bind:key="level.id">{{ level.level }}</option>
        </select>
      </div>
      <div v-else class="mb-3">
        <p>Vous participez à cette activité.</p>
        <button class="btn btn-danger" @click="removeMyParticipation"> Annuler ? </button>
      </div>
      <div v-if="!loading">
        <p>Il y a déjà {{ this.participants.length }} participants !</p>
      </div>
      <!--Div pour modifier/supprimer l'activité-->
      <div v-if="owner">
        <button @click="modifActivity" class="btn btn-primary float-start">Modifier</button>
        <button @click="deleteActivity" class="btn btn-danger float-end">Supprimer</button>
      </div>
    </div>
    <div class="card-footer text-muted">{{ this.activityInfo.postcode }} / {{ this.activityInfo.address }}</div>
  </div>
</template>

<script>
import GestionActivities from "../services/activities.service.js";
import GestionParticipations from "../services/participations.service.js";
export default {
  name: "Activity",
  props: {
    activityInfo: Object,
    participant: {default: false, type: Boolean},
    owner: {default: false, type: Boolean},
  },
  data() {
    return {
      id: this.activityInfo.id,
      participants: null,
      loading: false,
      error: null,
      message: null,
      levelSelected: null
    }
  },
  computed: {
    userParticipe() {
      let tempParticipants = this.participants
      
      if (this.$store.state.userInformation.username != '' && this.$store.state.userInformation.username) {
        tempParticipants = tempParticipants.filter((item) => {
          return item.user.username.includes(this.$store.state.userInformation.username)
        })
      }
      console.log(tempParticipants);
      return false
    }
  },
  methods: {
    modifActivity() {
      this.$router.push({ name: 'ActivityPage', params: { id: this.id }});
    },
    deleteActivity() {
      GestionActivities.deleteActivity(this.id).then(() => {
        this.message = "L'activité a bien été supprimée.";
      }).catch((error) => {
        this.error = error;
      });
    },
    addMyParticipation() {
      let reqData = {level: this.levelSelected, activity_id: this.activityInfo.id};
      GestionParticipations.addMyParticipation(reqData).then(() => {
        this.message = "Vous êtes bien inscrit à cette activité !";
      }).catch(() =>{
        this.error = "Veuillez chosir votre niveau";
      })
    },
    removeMyParticipation() {
      GestionParticipations.removeMyParticipation(this.id).then(() => {
        this.message = "Vous êtes bien désinscrit de cette activité !";
      }).catch((error) =>{
        this.error = error;
      });
    }
  },
  beforeMount() {
    this.loading = true;
    GestionActivities.getActivityWithId(this.id).then((data) => {
      this.participants = data.participants;
      this.loading = false;
    }).catch(() =>{
      this.error = "Nous n'arrivons pas à récupérer les participants de cette activité."
      this.loading = false;
    })
  }
};
</script>
<style>

</style>
