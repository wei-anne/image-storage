<template>
    <img :src="getImageLink" 
    @click="extractAndEmitAndToggle"
    :class="{ imageClicked: clicked }"
    />
</template>

<script>

export default {
    name: "SingleImage",
    props: ["image"],
    data() {
        return {
            clicked: null,
            deletedImage: null,
        }
    },
    computed: {
        getImageLink() {
            return this.image.link;
        }
    },
    methods: {
        extractHash() {
            this.deletedImage = this.image.deletehash
        },
        emitHashArray() {
            this.$emit("hashArray", this.deletedImage);
        },
        toggleClass() {
            this.clicked = !this.clicked;
        },
        extractAndEmitAndToggle() {
            this.extractHash();
            this.emitHashArray();
            this.toggleClass();
        }
    }
}
</script>

<style>
/* v-bind:class */
.imageClicked {
    background-color: black;
}
</style>

