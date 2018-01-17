<template>
    <div>
        <router-view></router-view>
        <login></login>
        <errload></errload>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapState,mapActions} from 'vuex'
    import loginModel from 'src/view/login/login'
    import errload from 'src/view/404'
    export default {
        name: '',
        data(){
            return {
                showlogin: false
            }
        },
        methods: {
            ...mapActions([
                'showLoginBox',
                'hiedLoginBox'
            ])
        },
        mounted(){
            // 根路径直接进首页  不需要进行登录判定    update by yingang 2017/12/13
            if(window.localStorage.getItem('token')){
                this.$store.dispatch('hadToken')
            }
//            this.$router.push({path: '/'});
        },
        components: {
            login: loginModel,
            errload
        },
        computed: {
            ...mapState([
                'isLogin'
            ])
        }
    }
</script>


<style>

</style>
