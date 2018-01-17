<template>
    <div class="errplane" v-if="loaderror">
        <mt-header title="出错了">
            <router-link :to="{path:'/'}" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container_nofoot">
            <div class="errBg">
                <div class="errDetail"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex'
    export default {
        name: '',
        computed:{
            ...mapState([
                 'loaderror'
            ])
        }
    }
</script>

<style>
    .errplane{
        position: absolute;
        left: 0;
        top:0;
        bottom:0;
        right: 0;
        z-index: 10;
        background: #ffffff;
    }
</style>
