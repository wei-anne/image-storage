<template>
    <div class="ui secondary pointing menu">
        <router-link to="/" class="active item">
        Image Storage
        </router-link>
        
        <div class="right menu">
            <div v-if="isLoggedIn" class="horizontal">
                <!-- anytime we click anchor tages, it's going to create a full page reload, and we don't want that if not necessary (especially to a one-page application) so we use router-link provided by Vue Router-->
                <router-link to="/" class="item">Galleries</router-link>
                <router-link :to="{name: 'upload', params: { logInStatus: isLoggedIn } }" class="item">Upload</router-link>
                <a class="item" @click="logout">Logout</a>
            </div>

            <a v-else href="#" class="item" @click="login">
                Login
            </a>
        </div>
    </div>
</template>                         

<script>
// to connect an action to a component,  import it and then hook it up to the methods property
// to pull data from getters, import it and then hook it up to the computed property
import { mapActions, mapGetters } from "vuex"

export default {
    name: "AppHeader",
    computed: mapGetters(["isLoggedIn"]),
    methods: {
        ...mapActions(["login", "logout",]),
        // in case you have other methods, use the object literal and three-dots syntax; otherwise, they can be removed
    }
}
</script>

<style scoped>
.horizontal {
    display: flex;
    flex-direction: row;
}
a {
    margin-left: 10px;
}
</style>
