<template>
    <div class="ui container">
        <div class="message">
            <h2>
                Loading...<span class="rocketIcon"><i class="rocket icon"></i></span>
            </h2>
        </div>
    </div>
</template>

<script>

export default {
    name: "LoadingMessage",
}
</script>

<style scoped>
.message {
    text-align: center;
}
h2 {
    margin-top: 200px;
}
.rocketIcon {
font-size: 100px;
}
</style>
