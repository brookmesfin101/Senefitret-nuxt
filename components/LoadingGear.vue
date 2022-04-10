<template>
    <div v-show='loadingComputed' id='LoadingBackground'>
        <div id='LoadingGear'>
        
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            loadingComputed(){
                return this.$store.getters.getLoadingStatus;
            }
        }
    }
</script>

<style scoped>
    #LoadingGear {
        position: relative;
        z-index: 9999;
        background-image: url('/images/Backgrounds/LoadingGear.svg');
        background-repeat: no-repeat;
        width: 200px;
        height: 200px;
        margin: 0 auto;
        margin-top: 300px;
    }
    #LoadingBackground {
        background-color: rgba(265, 265, 265, .2);
        z-index: 9998;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
    }
</style>