<template>
    <div class="d-flex flex-column">
        <h1>Page activités de l'user</h1>
        <div class="d-flex justify-content-center align-items-center">
            <h4>Filters : </h4>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" v-on:change="getActivities()"
                    role="switch" id="flexSwitchCheckChecked" v-model="this.activitiesRequestInfo.active">
                <label class="form-check-label" for="flexSwitchCheckChecked">Activités actives</label>
            </div>
        </div>
        <div class="d-flex flex-column flex-sm-row flex-wrap" v-if="activities">
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
                active: true,
                offset: 0,
                limit: 10,
            },
            activities: null,
            message: null,
            loading: false
        }
    },
    methods: {
        getActivities() {
            GestionActivities.getActiveUserActivities(this.activitiesRequestInfo).then((data) => {
            this.loading = false;
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
        this.getActivities()
    }
}
</script>