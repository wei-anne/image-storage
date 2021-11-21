<template>
    <div class="dropper ui segment">
        <!-- by adding the $ sign, it telles vue that we want to take the event object that comes from the change event;
        without $, vue will be looking at anything named 'event' that is tied to this component-->
        <input type="file" 
        multiple
        accept="image/*" 
        @change="uploadImages($event.target.files)"
        />
        <div class="uploadIcon"><i class="upload icon"></i></div>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "UploadForm",
    methods: mapActions(["uploadImages"]),
}
</script>

<style scoped>
.dropper {
    margin-top: 140px !important;
    height: 30vh;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
.dropper:hover {
    background-color: black;
    color: whitesmoke;
}
.uploadIcon {
    font-size: 50px;
}
input {
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0;
}
</style>
