<template>
    <!--En gros c'est dans ce div que tu crées la carte bootstrap, et genre à la place où tu veux mettre genre le titre, la date le sport etc... 
    tu mets genre un attribut de l'objet this.activityInfo
    par exemple pour le titre de la carte tu mets {{ this.activityInfo.title }}
    pour avoir toutes les infos de l'activité regarde sur l'api de Liam http://157.90.237.150/docs#/activity/read_activities_api_v1_activity_get (dans l'onglet réponse)-->
    <div>
        <div class= ".card">
            <img src="..." class="card-img-top" alt="...">
            <div class= ".card-body">
                 <h5 class="card-title">{{ this.activityInfo.title }}</h5>
                 <p class="card-date"> {{ this.activityInfo.event_date }}</p>
                 <p class="card-cp"> {{ this.activityInfo.postcode }}</p>
                 <p class="card-sport"> {{ this.activityInfo.sport.name }}</p>
                 <p class="card-level"> {{ this.activityInfo.levels.level }}</p>
        </div>              
        {{ this.activityInfo }}
    </div>
</template>

<script>
export default {
    name: "Activity",
    props: {
        activityInfo: Object,
    }
}
</script>
