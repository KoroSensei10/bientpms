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
      <div v-if="participant">
        <button @click="addMyParticipation" class="btn btn-primary float-center">Participer</button>
        <select name="levels" id="levels" v-model="this.levelSelected" required>
          <option v-for="level in this.activityInfo.levels" :value="level.level" v-bind:key="level.id">{{ level.level }}</option>
        </select>
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
      error: null,
      message: null,
      levelSelected: "débutant"
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
      }).catch((error) =>{
        this.error = error;
      })
    }
  }
};
</script>
<style>

</style>
