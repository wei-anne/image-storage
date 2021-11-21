<template>
    <div>
        <div v-if="isLoggedIn">
            <a href="#">
                <div
                v-sticky="{ zIndex: 0, stickyTop: 20, disabled: false }"
                class="ui segment" 
                :class="{deleteA: deletedImages.length > 0}"
                @click="deleteAndRefresh"
                >
                    <div class="trashIcon"><i class="trash icon"></i></div>
                </div>
            </a>

            <div class="image-container">    
                <SingleImage
                v-for="image in allImages" 
                :image="image" 
                :key="image.id"
                @hashArray="push"
                >
                </SingleImage>
            </div>
        </div>

        <h2 v-else>Log in to get started!</h2>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VueSticky from "vue-sticky";
import SingleImage from "./SingleImage";

export default {
    name: "ImageList",
    data() {
        return {
            imageSectionClicked: null,
            deletedImages: [],
        }
    },
    components: {
        SingleImage,
    },
    directives: {
        "sticky": VueSticky,
    },
    computed: {
        ...mapGetters(["allImages", "isLoggedIn"]),
        },
    methods: {
        ...mapActions(["fetchImages", "deleteImages"]),
        pushImageToArray(image, arr) {
            var index = arr.indexOf(image);
            if (index === -1) {
                arr.push(image);
            } else {
                arr.splice(index, 1)
            }
        },
        push(deletedImage) {
            this.pushImageToArray(deletedImage, this.deletedImages);
        },
        async deleteAndRefresh() {
            this.deleteImages(this.deletedImages);
            this.deletedImages = [];
        }
    },
    created() {
        if (this.isLoggedIn) {
            this.fetchImages();
        }
    },
}
</script>

<style scoped>
.segment {
    text-align: center;
    color: black;
}
.image-container{
    column-count: 3;
    column-gap: 5px;
    margin-top: 15px;
}
img {
    max-width: 100%;
    padding: 10px;
}
.trashIcon {
    font-size: 20px;
}
/* v-bind:class */
.deleteA {
    background-color: black;
    color: whitesmoke;
}
</style>