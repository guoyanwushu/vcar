<template>
  <div >
      <mt-header title="提现成功">
        <router-link to="/mine" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="container_nofoot">
        <p class="img"><img src="../../assets/icon_withdrawals_success@3x.png" alt=""></p>
        <p>意见提交成功</p>
        <p>{{time}}秒后自动返回个人中心</p>
      </div>
  </div>
</template>
<script>
export default {
  data(){
      return{
          time:3
      }
  },
  mounted(){
      let st = setInterval(()=>{
         this.time--;
         if(this.time==0){
             clearInterval(st);
             this.$router.push('/mine');
         }
      },1000);
  }
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
    p:nth-child(3){
        font-size: 14px;
        color: #666666;
        line-height: 28px;
    }
    p:last-child{
        font-size: 14px;
        color: #FF7D00;
        line-height: 17px;;
    }
</style>
