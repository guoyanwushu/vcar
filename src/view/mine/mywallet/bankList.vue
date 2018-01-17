<template>
  <div >
      <mt-header title="请选择银行">
        <router-link to="/mine" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="container_nofoot" v-if="1">
          <div class="bank-item ">
              <span>中国银行</span>
          </div> 
          <div class="bank-item">
              <span>中国银行</span>
          </div>  
          <div class="bank-item active">
              <span>中国银行</span>
          </div>  
          <div class="bank-item">
              <span>中国银行</span>
          </div>  
          <div class="bank-item">
              <span>中国银行</span>
          </div>         
      </div> 
  </div>
</template>
<style lang="less" scoped>
    .bank-item{
        width: 100%;
        padding: 0 12px;
        box-sizing: border-box;
        height: 44px;
        line-height: 44px;
        box-shadow: 0 1px 0 0 #C8C7CC;
        border-bottom: 1px;
        position: relative;
        span{
            display: inline-block;
            font-size: 14px;
            color: #333333;
        }
        &.active:after{
            content:'';
            width: 14px;
            height: 10px;
            position: absolute;
            top:17px;
            right: 12px;
            background-image:url("../../../assets/icon_automobileinsurance_checkedcurrentcity@3x.png");
            background-size: contain;
        }
    }
</style>
<script>
export default {
  
}
</script>


