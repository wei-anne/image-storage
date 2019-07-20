import Vue from "vue";
import VueRouter from "vue-router";
import dotenv from "dotenv";
import App from "./App";
// we don't necessarily need to put '/index' after 'store', since if there's a file called 'index.js' in the directory, webpack will assume that's the file we're looking for
import store from "./store";
import router from "./router";

// in Vue runtime, the name of each name-value pairs must start with "VUE_APP_"
dotenv.config();

// the initial handshake between vue and Vue Router
Vue.use(VueRouter);

// now the formal talk begins by hooking store to vue
// now the formal talk begins by hooking router to vue
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");