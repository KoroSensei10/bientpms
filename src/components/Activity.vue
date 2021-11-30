<template>
  <!--En gros c'est dans ce div que tu crées la carte bootstrap, et genre à la place où tu veux mettre genre le titre, la date le sport etc... 
    tu mets genre un attribut de l'objet this.activityInfo
    par exemple pour le titre de la carte tu mets {{ this.activityInfo.title }}
    pour avoir toutes les infos de l'activité regarde sur l'api de Liam http://157.90.237.150/docs#/activity/read_activities_api_v1_activity_get (dans l'onglet réponse)-->
  <div v-if="this.message" class="alert alert-success" role="alert">
    L'activité est bien supprimé.
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
        <span class="badge rounded-pill bg-success" v-for="level in this.activityInfo.levels" v-bind:key="level.id"> {{level.level}}</span>
      </p>
      <button v-if="participant" class="btn btn-primary float-center">Participer</button>
      <button v-if="!participant" @click="modifActivity" class="btn btn-primary float-start">Modifier</button>
      <button v-if="!participant" data-bs-toggle="modal" data-bs-target="#deleteModal" class="btn btn-danger float-end">Supprimer</button>
    </div>
    <div class="card-footer text-muted">{{ this.activityInfo.postcode }} / {{ this.activityInfo.address }}</div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteModalLabel">Supprimer {{ this.activityInfo.title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Voulez-vous vraiment supprimer cette activité ?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" @click="deleteActivity" class="btn btn-primary">Oui</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GestionActivities from "../services/activities.service.js";
export default {
  name: "Activity",
  props: {
    activityInfo: Object,
    participant: Boolean,
  },
  data() {
    return {
      error: null,
      message: null
    }
  },
  methods: {
    modifActivity() {
      this.$router.push({ name: 'ActivityPage', params: { id: this.activityInfo.id }});
    },
    deleteActivity() {
      GestionActivities.deleteActivity(this.activityInfo.id).then((data) => {
        this.message = data;
      }).catch((error) => {
        this.error = error;
      });
    }
  }
};
</script>
<style>

</style>
