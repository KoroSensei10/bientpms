<template>
  <!--En gros c'est dans ce div que tu crées la carte bootstrap, et genre à la place où tu veux mettre genre le titre, la date le sport etc... 
    tu mets genre un attribut de l'objet this.activityInfo
    par exemple pour le titre de la carte tu mets {{ this.activityInfo.title }}
    pour avoir toutes les infos de l'activité regarde sur l'api de Liam http://157.90.237.150/docs#/activity/read_activities_api_v1_activity_get (dans l'onglet réponse)-->
  <div class="activite .d-flex">
    <div
      class=".d-flex .container-fluid .bg-trasparent .my-4 .p-3"
      style="position: relative"
    >
      <div class=".row">
        <div class="card .h-100 .shadow-sm">
          <img
            :src="this.activityInfo.image"
            class="card-img-top"
            alt="image du sport"
          />
          <div class="card-body">
            <div class="clearfix mb-3">
              <span v-for="level in this.activityInfo.levels" v-bind:key="level.id" class="float-start badge .rounded-pill .bg-primary">
                level.level
              </span>
            </div>
            <h5 class="card-title">Tournoi de foot</h5>
            <p class="card-date">{{ this.activityInfo.event_date }}</p>
            <p class="card-cp">{{ this.activityInfo.postcode }}</p>
            <p class="card-sport">{{ this.activityInfo.sport.name }}</p>

            <div v-if="this.participant">
              <div class=".text-center my-4">
                <a href="#" class=".btn btn-info">Rejoindre</a>
              </div>
            </div>
            <div v-else>
              <div class="createur" style="align-item">
                <div class="text-center my-4">
                  <a href="#" class=".btn btn-primary">Modifier</a>
                </div>
                <div class="text-center my-4">
                  <a href="#" class=".btn btn-danger">Supprimer</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Activity",
  props: {
    activityInfo: Object,
    participant: Boolean,
  },
};
</script>
<style>
body {
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  border-style: none;
  background-color: #fff;
}

.card {
  font-weight: bold;
  font-size: 15px;
  border: 1px solid black;
  margin-left: 15px;
}
.img {
  width: 50px;
  height: 50px;
}
</style>
