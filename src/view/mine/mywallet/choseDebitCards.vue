<template>
  <div >
      <mt-header title="选择银行卡   ">
        <router-link to="/mine" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="container_nofoot" v-if="1">
          <div class="card-container">
            <div class="card-info active" v-if='1'>
                <img src="../../../assets/img_my_headportrait.png" alt="" class="bankicon">
                <p class="bankname">中国建设银行</p>
                <P class="cardno">尾号7523储蓄卡</P>
            </div>
            <div class="card-info" v-if='1'>
                <img src="../../../assets/img_my_headportrait.png" alt="" class="bankicon">
                <p class="bankname">中国建设银行</p>
                <P class="cardno">尾号7523储蓄卡</P>
            </div>
            <div class="card-info" v-if='1'>
                <img src="../../../assets/img_my_headportrait.png" alt="" class="bankicon">
                <p class="bankname">中国建设银行</p>
                <P class="cardno">尾号7523储蓄卡</P>
            </div>
            <div class="card-info" v-if='1'>
                <img src="../../../assets/img_my_headportrait.png" alt="" class="bankicon">
                <p class="bankname">中国建设银行</p>
                <P class="cardno">尾号7523储蓄卡</P>
            </div>
            <div class="card-info" v-if='1'>
                <img src="../../../assets/img_my_headportrait.png" alt="" class="bankicon">
                <p class="bankname">中国建设银行</p>
                <P class="cardno">尾号7523储蓄卡</P>
            </div>  
        </div>        
      </div> 
  </div>
</template>
<style lang="less" scoped>
    .container_nofoot{
        background-color: #EFEFF4;
    }
    .card-container{
        padding-left: 12px;
        margin-top: 10px;
        background-color: #fff;
    }
    .card-info{
       margin-top: 10px;
       width: 100%;
       height: 60px;
       background-color: #fff;
       overflow: hidden;
       position: relative;
       box-shadow: 0 1px 0 0 #C8C7CC;
       margin-bottom: 1px;
       p{
         padding-left: 65px;
         &.bankname{
           margin-top: 8px;
           font-size: 16px;
           color: #333333;
           line-height: 22px;
         }
         &.cardno{
           font-size: 14px;
           color: #666666;
           line-height: 20px;
           margin-top: 2px;
         }
       }
       .bankicon{
         width: 35px;
         height: 35px;
         position: absolute;
         left: 12px;
         top: 12px;
       }
       .link{
         width: 9px;
         height: 16px;
         top: 5px;
         right: 2px;
         position: absolute;
         padding: 15px 10px;
       }
       &.active:after{
            content:'';
            width: 14px;
            height: 10px;
            position: absolute;
            top:24px;
            right: 12px;
            background-image:url("../../../assets/icon_automobileinsurance_checkedcurrentcity@3x.png");
            background-size: contain;
        }
        &:last-child{
            box-shadow: none ;   
        }
   }
</style>
<script>
export default {
  
}
</script>


