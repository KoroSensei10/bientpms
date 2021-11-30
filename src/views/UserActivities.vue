<template>
    <div class="d-flex flex-sm-column">
        <h1>Page activités de l'user</h1>
        <div class="d-flex flex-sm-column" v-if="activities">
            <Activity v-for="activity in activities" v-bind:key="activity.id" :activity-info="activity"/>
        </div>
        <div v-if="this.message" class="alert alert-danger" role="alert">
            {{this.message}}
        </div>
    </div>
</template>
<script>
import Activity from "../components/Activity.vue"
import GestionActivities from '../services/activities.service.js'
export default {
    name: "UserActivities",
    components: {
        Activity
    },
    data() {
        return {
            activitiesRequestInfo : {
                active: false,
                postcode: 51100,
                offset: 0,
                limit: 10,
            },
            activities: null,
            message: null,
            loading: false
        }
    },
    methods: {
        getActivities(requestInfo) {
            GestionActivities.getActiveUserActivities(requestInfo).then((data) => {
            this.loading = false;
            console.log(data)
            this.activities = data;
        }).catch((error) => {
            this.loading = false;
            this.message = error;
        })
        },
        logout() {
            this.$store.dispatch('logout');
            this.$router.push('/');
        },
    },
    beforeCreate() {
        if (!this.isAuthenticated) {
            this.logout;
        }
    },
    beforeMount() {
        //récup les activités de l'user et les mets sous forme de card
        this.getActivities(this.activitiesRequestInfo)
    }
}
</script>