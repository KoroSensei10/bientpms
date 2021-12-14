<template>
    <div class="container d-flex flex-row align-items-center mt-3 carte">
        <img class='rounded-circle' :src="this.profilInfo.account.profile_picture" style="width: 5rem; height: 5rem;" />

        <div class="d-flex flex-row justify-content-between align-items-start flex-grow-1">

            <div class="card border-0">
                <div class="card-body p-2">
                    <h5 class="card-title m-0">{{this.profilInfo.account.last_name}} {{this.profilInfo.account.first_name}}</h5>
                    <p class="card-text m-0 fw-light">{{this.profilInfo.account.birthday}}</p>

                    <p v-for="sport in this.profilInfo.sports" :key="sport.sport.id" class="card-text m-0 fw-light fst-italic">
                        {{sport.sport.name}} | {{ sport.level.level }}
                        </p>
                </div>
            </div>

            <div class="d-flex flex-column justify-content-around">
                <div class="d-flex flex-row justify-content-end align-items-start p-2 pb-0">
                    <i class="fal fa-map-marker-alt me-2"></i>
                    <p>{{this.profilInfo.account.postcode}}</p>
                </div>
                <div class="text-light text-center p-1 badge rounded-pill color border-0">{{this.profilInfo.account.about}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Profil",
    props: {
        profilInfo: Object
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
.carte{
    box-shadow: -3px 9px 20px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>