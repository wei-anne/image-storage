// There are four parts structured in a Module:
// State: The State section holds all of the raw data (defined as key-value object) related to this particular Module.
// Getters: Getters are functions that take the data in State section, and do some filtering or computation.
// Mutations: Mutations are functions that do one single thing to modify the data in State section.
// Actions: Actions are functions that assemble together multiple Mutations, and call those Mutations in some sequence or series at a very particular time. (Note that it’s fine to call ONLY ONE Mutation in an Action.)

// Automatic Components Updates:
// anytime we call an ACTION that updates our STATE, it cause every single component that is using one of the module GETTERS to update as well

// Purpose of Module:
// handling authentication, like accessing token from Imgur and logging in and out

import api from "../../api/imgur";
import qs from "qs";
// because it's not default, when importing we need to add curly braces
import router from "../../router";

// localstorage is a global browser feature that can be found in the console; it allows us to store variables that will be persisted specifically to the domain that we're on
const state = {
    token: window.localStorage.getItem("imgur_token"),
};

const getters = {
    isLoggedIn: state => !!state.token,
};

// the first argument that gets passed to any action is an object that has a bunch of helper methods tied to it that allow us to modify our vuex module
// for example, it's an object that contains the "commit" function that allow us to call mutations
const actions = {
    login: () => {
        api.login();
    },
    finalizeLogin({ commit }, hash) {
        // use qs parse to parse through the query string with # removed, and divide the result into name-value pairs to get the value of access_token
        const query = qs.parse(hash.replace("#", ""));

        commit("setToken", query.access_token);
        window.localStorage.setItem("imgur_token", query.access_token);
        // navigate users to the root page
        router.push("/");
    },
    logout: ({ commit }) => {
        commit("setToken", null);
        // to make sure when a user logout, the token stored in the browser is cleaned as well
        window.localStorage.removeItem("imgur_token");
        router.push("/");
    },
};

const mutations = {
    setToken: (state, token) => {
        state.token = token;
    },
};

// correct spelling of each object is very important
export default {
    state,
    getters,
    actions,
    mutations,
}