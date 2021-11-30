<template>
  <!--En gros c'est dans ce div que tu crées la carte bootstrap, et genre à la place où tu veux mettre genre le titre, la date le sport etc... 
    tu mets genre un attribut de l'objet this.activityInfo
    par exemple pour le titre de la carte tu mets {{ this.activityInfo.title }}
    pour avoir toutes les infos de l'activité regarde sur l'api de Liam http://157.90.237.150/docs#/activity/read_activities_api_v1_activity_get (dans l'onglet réponse)-->
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
      <button v-if="!participant" class="btn btn-danger float-end">Supprimer</button>
    </div>
    <div class="card-footer text-muted">{{ this.activityInfo.postcode }} / {{ this.activityInfo.address }}</div>
  </div>
</template>

<script>
export default {
  name: "Activity",
  props: {
    activityInfo: Object,
    participant: Boolean,
  },
  methods: {
    modifActivity() {
      this.$router.push({ name: 'ActivityPage', params: { id: this.activityInfo.id }});
    }
  }
};
</script>
<style>

</style>
