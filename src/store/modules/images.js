// There are four parts structured in a Module:
// State: The State section holds all of the raw data (defined as key-value object) related to this particular Module.
// Getters: Getters are functions that take the data in State section, and do some filtering or computation.
// Mutations: Mutations are functions that do one single thing to modify the data in State section.
// Actions: Actions are functions that assemble together multiple Mutations, and call those Mutations in some sequence or series at a very particular time. (Note that it’s fine to call ONLY ONE Mutation in an Action.)

// Purpose of Module:
// working with image resource, like fetching them from Imgur, uploading and deleting images

// Automatic Components Updates:
// anytime we call an ACTION that updates our STATE, it cause every single component that is using one of the module GETTERS to update as well


import api from "../../api/imgur";
import router from "../../router";

const state = {
    images: [],
};

const getters = {
    allImages: state => state.images,
};

// Rootstate is another helper methods, and is a reference to all of the state that is held inside of our vuex store (index.js)
// so it allows us to go into different modules to access state or other data
const actions = {
    async fetchImages({ rootState, commit}) {
        const { token } = rootState.auth; // it's ES6 shorthand syntax for 'const token = rootState.auth.token'
        const response = await api.fetchImages(token);
        commit("setImages", response.data.data);
    },
    async uploadImages({ rootState }, images) {
        // Get the access token
        const { token } = rootState.auth;

        // Call our API (imgur.js) module to do the upload
        await api.upload(images, token);

        // Redirect our user to ImageList component
        router.push("/");
    },
    async deleteImages({rootState}, hashes) {
        const { token } = rootState.auth;
        await api.delete(hashes, token);
        router.push("/");
    },
};
const mutations = {
    setImages: (state, images) => {
        state.images = images;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
}