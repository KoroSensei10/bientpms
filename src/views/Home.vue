<template>
    <div>
        <h1>La page Home wesh</h1>
        <div class="d-flex flex-sm-column" v-if="activities">
            <Activity v-for="activity in activities" v-bind:key="activity.id" :activity-info="activity"/>
        </div>
    </div>
</template>

<script>
import Activity from "../components/Activity.vue"
import GestionActivities from '../services/activities.service.js'
export default {
    name: "Home",
    components: {
        Activity
    },
    data() {
        return {
            activitiesRequestInfo : {
                active: false,
                sport_id: null,
                postcode: null,
                offset: 0,
                limit: 10,
                levels: []
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