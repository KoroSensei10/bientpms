<template>
  <!-- barre de recherche -->
  <div class="d-flex flex-column">
    <div class="d-flex flex-column flex-sm-row justify-content-center align-items-center" v-if="!loading">
      <h4>Filtres : </h4>
      <div class="form-group flex-grow-1 d-flex mb-3 justify-content-center align-items-center">
        <label class="form-label flex-grow-1" for="">Code Postal</label>
        <input class="form-control flex-grow-0" type="text" v-model="this.activitiesRequestInfo.postcode">
      </div>
      <div class="d-flex mb-3 flex-grow-1 justify-content-center align-items-center">
        <label class="form-label">Sport</label>
        <select class="form-select" aria-label="Select pour le sport" v-model="this.activitiesRequestInfo.sport_id">
          <option v-for="sport in this.sports" v-bind:key="sport.id" :value="sport.id">
            {{ sport.name }}
          </option>
        </select>
      </div>
      <button @click="getActivities()" class="btn btn-primary m-3">Chercher</button>
      <button @click="resetSearch()" class="btn btn-danger">Reset</button>
    </div>
    <ScalingSquaresSpinner class="align-self-center m-5"
      v-if="loading"
      :animation-duration="1250"
      :size="65"
      color="#ff1d5e"
    />
    <div class="d-flex flex-column flex-wrap" v-if="activities">
      <Activity v-for="activity in activities" v-bind:key="activity.id" :activity-info="activity" :participant="true" />
    </div>
  </div>
</template>

<script>
import Activity from "../components/Activity.vue";
import GestionActivities from "../services/activities.service.js";
import { ScalingSquaresSpinner  } from 'epic-spinners'
export default {
  name: "Home",
  components: {
    Activity,
    ScalingSquaresSpinner
  },
  data() {
    return {
      activitiesRequestInfo: {
        postcode: "51100",
        offset: 0,
        limit: 10,
      },
      activities: null,
      message: null,
      loading: false,
      sports: null,
      levels: ["débutant", "amateur", "intermédiaire", "confirmé", "expert"],
    };
  },
  methods: {
    getActivities() {
      this.loading = true;
      this.activities = {};
      GestionActivities.getActivitiesBySearch(this.activitiesRequestInfo).then((data) => {
          setTimeout(() => {this.loading = false; this.activities = data;}, 2000)
        })
        .catch((error) => {
          this.loading = false;
          this.message = error;
        });
    },
    resetSearch() {
      this.activitiesRequestInfo = {postcode: "51100",offset: 0, limit: 10,};
      this.getActivities();
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
    eventChangeTitle(){
      const data = {title: "Home"};
      this.$emit('updateTitleName', data);
    }
  },
  beforeCreate() {
    if (!this.isAuthenticated) {
      this.logout;
    }
  },
  beforeMount() {
    //récup les activités de l'user et les mets sous forme de card
    this.loading = true;
    this.getActivities();

    GestionActivities.getSports()
      .then((sports) => {
        this.sports = sports;
      })
      .catch((error) => {
        this.message = error;
    });
  },
  mounted() {
    this.eventChangeTitle();
  }
};
</script>
<style>
.color {
  background: linear-gradient(to right, #0084ff, #00f2ff);
}

.size-label {
  font-size: calc(17px + 0.7vw);
}
.size-input {
  font-size: calc(13px + 0.5vw);
}
.size-title {
  font-size: calc(25px + 2vw);
  font-family: Times New Roman;
  font-weight: 700;
}
.size-retour {
  font-size: 20px;
}
</style>