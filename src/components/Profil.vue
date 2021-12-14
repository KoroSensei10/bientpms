<template>
<!--  <div class="container mx-4 d-flex flex-row align-items-center mt-3 carte">-->
<!--      <img class='rounded-circle' :src="this.profilInfo.account.profile_picture" style="width: 5rem; height: 5rem;" />-->

<!--      <div class="d-flex flex-row justify-content-between align-items-start flex-grow-1">-->

<!--          <div class="card border-0">-->
<!--              <div class="card-body p-2">-->
<!--                  <h5 class="card-title m-0">{{this.profilInfo.account.last_name}} {{this.profilInfo.account.first_name}}</h5>-->
<!--                  <p class="card-text m-0 fw-light">{{this.profilInfo.account.birthday}}</p>-->

<!--                  <p v-for="sport in this.profilInfo.sports" :key="sport.sport.id" class="card-text m-0 fw-light fst-italic">-->
<!--                      {{sport.sport.name}} | {{ sport.level.level }}-->
<!--                      </p>-->
<!--              </div>-->
<!--          </div>-->

<!--          <div class="d-flex flex-column justify-content-around">-->
<!--              <div class="d-flex flex-row justify-content-end align-items-start p-2 pb-0">-->
<!--                  <i class="fal fa-map-marker-alt me-2"></i>-->
<!--                  <p>{{this.profilInfo.account.postcode}}</p>-->
<!--              </div>-->
<!--          </div>-->
<!--      </div>-->
<!--      <div>-->
<!--          <button type="button" class="btn btn-primary" @click="pushToUserpage">-->
<!--              En savoir plus-->
<!--          </button>-->
<!--      </div>-->
<!--  </div>-->
  <div class="d-flex justify-content-center align-items-center m-3">
    <div class="card panic">
      <div class="user text-center">
        <div class="profile">
          <img :src="this.profilInfo.account.profile_picture" class="rounded-circle pt-4" width="80">
        </div>
      </div>
      <div class="mt-3 text-center">
        <h4 class="mb-0">{{this.profilInfo.account.last_name}} {{this.profilInfo.account.first_name}}</h4>
        <span class="text-muted d-block mb-2">{{this.profilInfo.account.postcode}}</span>
        <button class="btn btn-primary btn-sm follow" @click="pushToUserpage">En savoir plus</button>
        <div class="d-flex flex-column justify-content-between align-items-center mt-4 px-4">
          <h6 style="text-decoration: underline;">Sports Pratiqués</h6>
          <p v-for="sport in this.profilInfo.sports" :key="sport.sport.id" class="card-text mb-1">
            <b>{{sport.sport.name}}</b> | {{ sport.level.level }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "Profil",
    props: {
        profilInfo: Object
    },
    methods: {
        pushToUserpage() {
            this.$router.push({ name: 'User', params: { username: this.profilInfo.account.owner_username }});
        }
    }
}
// function getAge(date) { 
//         var diff = Date.now() - date.getTime();
//         var age = new Date(diff); 
//         return Math.abs(age.getUTCFullYear() - 1970);
//     }
    //alert(getAge(new Date(1995, 12, 6))); //Date(année, mois, jour)  


</script>
<style>
.panic {
  width: 60vw;
}
</style>