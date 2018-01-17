<template>
    <div class="nav_foot">
        <div class="content">
            <div class="item" :class="{'active':activeType==1}" @click="jump('/')">
                <div class="icon">
                    <img v-if="activeType!=1" src="../assets/icon_home_home_n@3x.png">
                    <img v-if="activeType==1" src="../assets/icon_home_home_p@3x.png">
                </div>
                <div>首页</div>
            </div>
            <div class="item" :class="{'active':activeType==2}" @click="jump('/order')">
                <div class="icon">
                    <img v-if="activeType!=2" src="../assets/icon_home_order_n@3x.png">
                    <img v-if="activeType==2" src="../assets/icon_home_order_p@3x.png">
                </div>
                <div>订单</div>
            </div>
            <div class="item" :class="{'active':activeType==3}" @click="jump('/mine')">
                <div class="icon">
                    <img v-if="activeType!=3" src="../assets/icon_home_my_n@3x.png">
                    <img v-if="activeType==3" src="../assets/icon_home_my_p@3x.png">
                </div>
                <div>我的</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        data(){
            return {
                activeType: 1,
            }
        },
        methods: {
            jump(path){
                this.$router.push({path})
            }
        },
        props: {
            selected: {
                type: String,
                default: '/'
            }
        },
        mounted(){
            switch (this.$route.path){
                case "/order":this.activeType=2;
                    break;
                case "/mine":this.activeType=3;
                    break;
                default : this.activeType=1;
            }
        }
    }
</script>

<style>

</style>
