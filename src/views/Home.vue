<template>
  <div class="d-flex text-center justify-content-center text-white p-1 size-title color">Accueil</div>
  <div class=".d-flex .flex-sm-column" v-if="activities">
    <Activity
      v-for="activity in activities"
      v-bind:key="activity.id"
      :activity-info="activity"
    />
  </div>
  
  <div class=".d-flex text-center justify-content-center">
  <input type="search" class="form-control rounded" placeholder="Rechercher un joueur ou une activité..."/>
</div>

  <div class="container flex-row d-flex flex-row justify-content-center ">
    
    <div class=".d-flex .flex-fill card-group justify-content-center">
<div class=".d-flex justify-content-center m-3 "> 
    <div class="card border-dark" style="width: 20rem;margin-left: 3px;">
        <img src="/images/foot.jpg"  class="card-img-top w-100" alt="imageSport">
        <div class="card-body">
            <div class="clearfix mb-3">
              <span class="float-start badge rounded-pill bg-primary w-20">
                debutant
              </span>
              <span class="float-start badge rounded-pill bg-primary w-20">
                intermediaire
              </span>
            </div>
            <h5 class="card-title">Tournoi de Football</h5>
            <p class="card-subtitle">Venez passez un bon temps avec des amateurs de foot comme vous ! </p>
            <p class="card-text">14/12/2021</p>
            <p class="card-text">51100</p>
            <p class="card-text">Football</p>
            
        </div>
        </div>
    </div>  
    <div class=".d-flex justify-content-center m-3 "> 
        <div class="card border-dark " style="width: 20rem;margin-left: 3px;
    margin-right: 3px;">
            <img src="/images/foot.jpg"  class="card-img-top w-100" alt="imageSport">
            <div class="card-body">
                <h5 class="card-title">Tournoi de Tennis</h5>
                <p class="card-subtitle">Procedente igitur mox tempore cum adventicium nihil inveniretur, relicta ora maritima . </p>
                <div class=".d-flex justify-content-end flex-fill">
                <span class="badge rounded-pill bg-warning w-50 ">Débutant</span>
                </div>
                <p class="card-text">14/12/2021</p>
                <p class="card-text">51100</p>
                <p class="card-text">Tennis</p>
                
            </div>
            </div>
        </div>  
        <div class=".d-flex justify-content-center m-3 "> 
    <div class="card border-dark " style="width: 20rem;margin-left: 3px;
    margin-right: 3px;">
        <img src="/images/foot.jpg"  class="card-img-top w-100" alt="imageSport">
        <div class="card-body">
            <h5 class="card-title">Tournoi de Tennis</h5>
            <p class="card-subtitle">Procedente igitur mox tempore cum adventicium nihil inveniretur, relicta ora maritima . </p>
            <div class=".d-flex justify-content-end flex-fill">
            <span class="badge rounded-pill bg-warning w-50 ">Débutant</span>
            </div>
            <p class="card-text">14/12/2021</p>
            <p class="card-text">51100</p>
            <p class="card-text">Tennis</p>
            
        </div>
        </div>
    </div>  
    <div class=".d-flex justify-content-center m-3 "> 
        <div class="card border-dark " style="width: 20rem;margin-left: 3px;
    margin-right: 3px;">
            <img src="/images/foot.jpg"  class="card-img-top w-100" alt="imageSport">
            <div class="card-body">
                <h5 class="card-title">Tournoi de Tennis</h5>
                <p class="card-subtitle">Procedente igitur mox tempore cum adventicium nihil inveniretur, relicta ora maritima . </p>
                <div class="d-flex justify-content-end flex-fill">
                <span class="badge rounded-pill bg-warning w-50 ">Débutant</span>
                </div>
                <p class="card-text">14/12/2021</p>
                <p class="card-text">51100</p>
                <p class="card-text">Tennis</p>
                
            </div>
            </div>
        </div>  
        <div class=".d-flex justify-content-center m-3 "> 
        <div class="card border-dark " style="width: 20rem;margin-left: 3px;
    margin-right: 3px;">
            <img src="/images/foot.jpg"  class="card-img-top w-100" alt="imageSport">
            <div class="card-body">
                <h5 class="card-title">Tournoi de Tennis</h5>
                <p class="card-subtitle">Procedente igitur mox tempore cum adventicium nihil inveniretur, relicta ora maritima . </p>
                <div class="d-flex justify-content-end flex-fill">
                <span class="badge rounded-pill bg-warning w-50 ">Débutant</span>
                </div>
                <p class="card-text">14/12/2021</p>
                <p class="card-text">51100</p>
                <p class="card-text">Tennis</p>
                
            </div>
            </div>
        </div>
        
    
    </div>
</div>              
  
</template>

<script>
import Activity from "../components/Activity.vue";
import GestionActivities from "../services/activities.service.js";
export default {
  name: "Home",
  components: {
    Activity,
  },
  data() {
    return {
      activitiesRequestInfo: {
        active: false,
        sport_id: null,
        postcode: null,
        offset: 0,
        limit: 10,
        levels: [],
      },
      activities: null,
      message: null,
      loading: false,
    };
  },
  methods: {
    getActivities(requestInfo) {
      GestionActivities.getActiveUserActivities(requestInfo)
        .then((data) => {
          this.loading = false;
          this.activities = data;
        })
        .catch((error) => {
          this.loading = false;
          this.message = error;
        });
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
  beforeCreate() {
    if (!this.isAuthenticated) {
      this.logout;
    }
  },
  beforeMount() {
    //récup les activités de l'user et les mets sous forme de card
    this.getActivities(this.activitiesRequestInfo);
  },
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
.size-retour{
    font-size: 20px;
}

</style>
<!--
<div
    class="card ui fluid"
    v-for="product in products"
    :key="product.id"
    style="margin: 0"
  ></div>
   <div class="activite .d-flex">
    <div
      class=".d-flex .container-fluid .bg-trasparent .my-4 .p-3"
      style="position: relative"
    >
      <div class=".row">
        <div class="card .h-100 .shadow-sm">
          <img
            src="/images/foot.jpg"
            class="card-img-top"
            alt="image du sport"
          />
          <div class="card-body">
            <div class="clearfix mb-3">
              <span class="float-start badge .rounded-pill .bg-primary">{{
                debutant
              }}</span>
            </div>
            <h5 class="card-title">Titre</h5>
            <p class="card-date">11/12/2013</p>
            <p class="card-cp">51100</p>
            <p class="card-sport">football</p>

            <div v-if="participant">
              <div class=".text-center my-4">
                <a href="" class=".btn btn-info">Rejoindre</a>
              </div>
            </div>
            <div v-else>
              <div class="createur" style="align-item">
                <div class="text-center my-4">
                  <a href="" class=".btn btn-primary">Modifier</a>
                </div>
                <div class="text-center my-4">
                  <a href="" class=".btn btn-danger">Supprimer</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div class="container .d-flex  justify-content-center ">
    
    <div class=".d-flex .flex-fill card-group justify-content-center">
<div class=".d-flex justify-content-center m-3 "> 
    <div class="card border-dark" style="width: 20rem;">
        <img src="/images/foot.jpg"  class="card-img-top w-100" alt="imageSport">
        <div class="card-body">
            <div class="clearfix mb-3">
              <span class="float-start badge rounded-pill bg-primary w-20">
                debutant
              </span>
            </div>
            <h5 class="card-title">Tournoi de Football</h5>
            <p class="card-subtitle">Venez passez un bon temps avec des amateurs de foot comme vous ! </p>
            <p class="card-text">14/12/2021</p>
            <p class="card-text">51100</p>
            <p class="card-text">Football</p>
            
        </div>
        </div>
    </div>  
    <div class=".d-flex justify-content-center m-3 "> 
        <div class="card border-dark " style="width: 20rem;">
            <img src="/images/foot.jpg"  class="card-img-top w-100" alt="imageSport">
            <div class="card-body">
                <h5 class="card-title">Tournoi de Tennis</h5>
                <p class="card-subtitle">Procedente igitur mox tempore cum adventicium nihil inveniretur, relicta ora maritima . </p>
                <div class=".d-flex justify-content-end flex-fill">
                <span class="badge rounded-pill bg-warning w-50 ">Débutant</span>
                </div>
                <p class="card-text">14/12/2021</p>
                <p class="card-text">51100</p>
                <p class="card-text">Tennis</p>
                
            </div>
            </div>
        </div>  
        <div class=".d-flex justify-content-center m-3 "> 
    <div class="card border-dark " style="width: 20rem;">
        <img src="/images/foot.jpg"  class="card-img-top w-100" alt="imageSport">
        <div class="card-body">
            <h5 class="card-title">Tournoi de Tennis</h5>
            <p class="card-subtitle">Procedente igitur mox tempore cum adventicium nihil inveniretur, relicta ora maritima . </p>
            <div class=".d-flex justify-content-end flex-fill">
            <span class="badge rounded-pill bg-warning w-50 ">Débutant</span>
            </div>
            <p class="card-text">14/12/2021</p>
            <p class="card-text">51100</p>
            <p class="card-text">Tennis</p>
            
        </div>
        </div>
    </div>  
    <div class=".d-flex justify-content-center m-3 "> 
        <div class="card border-dark " style="width: 20rem;">
            <img src="/images/foot.jpg"  class="card-img-top w-100" alt="imageSport">
            <div class="card-body">
                <h5 class="card-title">Tournoi de Tennis</h5>
                <p class="card-subtitle">Procedente igitur mox tempore cum adventicium nihil inveniretur, relicta ora maritima . </p>
                <div class="d-flex justify-content-end flex-fill">
                <span class="badge rounded-pill bg-warning w-50 ">Débutant</span>
                </div>
                <p class="card-text">14/12/2021</p>
                <p class="card-text">51100</p>
                <p class="card-text">Tennis</p>
                
            </div>
            </div>
        </div>  
        <div class=".d-flex justify-content-center m-3 "> 
        <div class="card border-dark " style="width: 20rem;">
            <img src="/images/foot.jpg"  class="card-img-top w-100" alt="imageSport">
            <div class="card-body">
                <h5 class="card-title">Tournoi de Tennis</h5>
                <p class="card-subtitle">Procedente igitur mox tempore cum adventicium nihil inveniretur, relicta ora maritima . </p>
                <div class="d-flex justify-content-end flex-fill">
                <span class="badge rounded-pill bg-warning w-50 ">Débutant</span>
                </div>
                <p class="card-text">14/12/2021</p>
                <p class="card-text">51100</p>
                <p class="card-text">Tennis</p>
                
            </div>
            </div>
        </div>
        
    
    </div>
</div>              

  -->