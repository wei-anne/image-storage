<template>
    <div>
        Please wait...
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "AuthHandler",
    methods: mapActions(["finalizeLogin"]),
    // the created hook from vue's instance lifecycle can be used to run code after an instance is created
    created() {
        // use window.location.hash to get all the info after the hash in URL that we got after Imgur send us back
        this.finalizeLogin(window.location.hash);
    },
};
</script>
