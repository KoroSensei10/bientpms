<template>
    <div>
        <h1>{{ this.username }}</h1>
        <div> {{ this.infos }}</div>
        <div v-if="error">
            {{ this.error }}
        </div>
    </div>
</template>

<script>
import SportivesInformations from "../services/sportives.services.js"
export default {
    name: "User",
    data () {
        return {
            username: this.$route.params.username,
            infos: null,
            loading: false,
            error: null,
        }
    },
    methods: {
        getInformations(){
            SportivesInformations.getSportivesWithUsername(this.$route.params.username).then((data) => {
                this.loading = false;
                this.infos = data;
            }).catch((error) => {
                this.loading = false;
                this.error = error;
            })
        },
    },
    beforeMount(){
        this.getInformations();
    }
}
</script>

<style>

</style>