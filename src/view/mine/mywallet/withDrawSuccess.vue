<template>
  <div >
      <mt-header title="提现成功">
        <router-link to="/mine" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="container_nofoot">
        <p class="img"><img src="src/assets/icon_withdrawals_success@3x.png" alt=""></p>
        <p>成功提现200.50元！</p>
        <p>（预计1-2个工作日到账）</p>
      </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
    p{
        text-align: center;
    }
    p.img{
        text-align: center;
        margin-top: 26px;
        margin-bottom: 17px;
        img{
            width: 70px;
            height: 70px;
        }
    }
    p:nth-child(2){
        font-size: 20px;
        color: #333333;
        line-height: 28px;
        font-weight: bold;
    }
    p:last-child{
        font-size: 12px;
        color: #666666;
        line-height: 17px;;
    }
</style>
