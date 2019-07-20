import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
// we don't necessarily need to put '/index' after 'store', since if there's a file called 'index.js' in the directory, webpack will assume that's the file we're looking for
import store from "./store";
import AuthHandler from "./components/AuthHandler";
import ImageList from "./components/ImageList";
import UploadForm from "./components/UploadForm";
import LoadingMessage from "./components/LoadingMessage"

// the initial handshake between vue and Vue Router
Vue.use(VueRouter);

export const router = new VueRouter({
    // tell Vue Router to use 'browser router' mode not 'hash router' mode when inspecting our routes in the URL
    mode: "history",
    routes: [
        {
            path: "/",
            name: "/", 
            component: ImageList
        },
        {
            path: "/upload",
            name: "upload",
            component: UploadForm,
            beforeEnter: (to, from, next) => {
                if(to.params.logInStatus) {
                    next()
                } else {
                    next({name: "/"})
                }
            }
        },
        {
            path: "/loading",
            name: "loading",
            component: LoadingMessage,
            beforeEnter: (to, from, next) => {
                if(to.params.token) {
                    next()
                } else {
                    next({ name: "/" })
                }
            }
        },
        { path: "/oauth2/callback", component: AuthHandler }]
});

// now the formal talk begins by hooking store to vue
// now the formal talk begins by hooking router to vue
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");