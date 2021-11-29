<template>
    <div class="d-flex flex-sm-column">
        <h1>Page activités de l'user</h1>
        <Activity v-for="activity in activities" v-bind:key="activity.id" :activity-info="activity"/>
    </div>
</template>
<script>
import Activity from "../components/Activity.vue"
export default {
    name: "UserActivities",
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
            activities: [],
        }
    },
    methods: {
        getActivities() {

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

    }
}
</script>