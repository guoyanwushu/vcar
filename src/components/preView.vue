<template>
    <div v-if="visible" class="preView">
        <img v-bind:src="'data:image/png;base64,'+base64" alt="" @click="hide()">
        这是图片预览的功能
    </div>
</template>

<script>
    export default {
        name: '',//图片预览
        methods:{
          hide(){
              this.$emit('update:visible',false)
          }
        },
        props:{
            visible:{
              type:Boolean,
              default:false
            },
            base64:{
                type:String,
                default:""
            }
        }
    }
</script>

<style>
    .preView{
        position: fixed;
        top:0;
        left: 0;
        z-index: 9999;
        width: 100%;
        height: 100%;
    }
    .preView img{
        width: 100%;
        height: 100%;
    }
</style>
