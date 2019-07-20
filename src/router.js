import VueRouter from "vue-router";
import AuthHandler from "./components/AuthHandler";
import ImageList from "./components/ImageList";
import UploadForm from "./components/UploadForm";
import LoadingMessage from "./components/LoadingMessage";

export default new VueRouter({
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