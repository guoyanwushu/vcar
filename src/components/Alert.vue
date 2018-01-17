<template>
    <div class="Alert_warp" v-show="visible">
        <div class="alert-wrapper">
            <div class="alert-head">
                <h2 class="alert-title">
                    {{title}}
                </h2>
            </div>
            <div class="alert-message">
                <slot name="content"></slot>
            </div><!---->
            <div class="alert-button-group"><!---->
                <button  @click="handleCancel" v-if="alertType==1">取消</button>
                <button  @click="handleSure">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        props: {
          /**弹窗类型**/
          alertType:{
              type:Number,
              default:1
            },
            visible: {
                type: Boolean,
                default: false
            },
            title:{
                type: String,
                default:'提示'
            }
        },
      methods:{
//        取消
        handleCancel(){
          this.$emit('handleCancel','cancel');
        },
//        确认
        handleSure(){
          this.$emit('handleSure','sure');
        }
      }
    }
</script>

<style>
</style>
