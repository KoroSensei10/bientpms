<template>
    <div class="container d-flex flex-row align-items-center mt-3">
                <img class='rounded-circle' src='{this.account_data.profile_picture}' style="width: 5rem; height: 5rem;" />

                <div class="d-flex flex-row justify-content-between align-items-start flex-grow-1">

                    <div class="card border-0">
                        <div class="card-body p-2">
                            <h5 class="card-title m-0">{{this.account_data.last_name}} {{this.account_data.first}}</h5>
                            <p class="card-text m-0 fw-light">{{this.account_data.birthday}}</p>

                            <p v-for="sport in sports" :key="sport.list class" class="card-text m-0 fw-light fst-italic">
                              {{this.participation.sport.string}}
                              </p>
                        </div>
                    </div>

                    <div class="d-flex flex-column justify-content-around">
                        <div class="d-flex flex-row justify-content-end align-items-start p-2 pb-0">
                            <i class="fal fa-map-marker-alt me-2"></i>
                            <p>{{this.account_data.postcode}}</p>
                        </div>
                        <button v-if="click" @click="about" type="button" class="badge rounded-pill color border-0">
                            <div class="text-light text-center p-1">{{this.account_data.about}}</div>
                        </button>
                    </div>
                </div>
            </div>
</template>

<script>
function getAge(date) { 
        var diff = Date.now() - date.getTime();
        var age = new Date(diff); 
        return Math.abs(age.getUTCFullYear() - 1970);
    }
    alert(getAge(new Date(1995, 12, 6))); //Date(année, mois, jour)  


</script>
<style>

</style>