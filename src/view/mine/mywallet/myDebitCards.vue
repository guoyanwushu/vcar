<template>
  <div >
      <mt-header title="我的储蓄卡">
        <router-link to="/mine" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="container_nofoot" v-if="1">
          <div class="debitcard-item">
              <p class="bankname">中信银行</p>
              <p>储蓄卡</p>
              <p class="cardnumber"><span>****  ****  ****  </span>1634</p>
              <img src="../../../assets/icon_automobileinsurance_waiting@3x.png" alt="银行图标">
          </div>
          <div class="debitcard-item">
              <p class="bankname">中信银行</p>
              <p>储蓄卡</p>
              <p class="cardnumber"><span>****  ****  ****  </span>1634</p>
              <img src="../../../assets/icon_automobileinsurance_waiting@3x.png" alt="银行图标">
          </div>
          <div class="debitcard-item">
              <p class="bankname">中信银行</p>
              <p>储蓄卡</p>
              <p class="cardnumber"><span>****  ****  ****  </span>1634</p>
              <img src="../../../assets/icon_automobileinsurance_waiting@3x.png" alt="银行图标">
          </div>
          <div class="debitcard-item">
              <p class="bankname">中信银行</p>
              <p>储蓄卡</p>
              <p class="cardnumber"><span>****  ****  ****  </span>1634</p>
              <img src="../../../assets/icon_automobileinsurance_waiting@3x.png" alt="银行图标">
          </div>
          <div class="debitcard-item">
              <p class="bankname">中信银行</p>
              <p>储蓄卡</p>
              <p class="cardnumber"><span>****  ****  ****  </span>1634</p>
              <img src="../../../assets/icon_automobileinsurance_waiting@3x.png" alt="银行图标">
          </div>
      </div>
      <div class="container_nofoot nocards" v-if="1">
          <p><img src="../../../assets/icon_mycard_cardsnocards.png" alt=""></p>
          <p>还未添加储蓄卡</p>
          <p>快来添加吧~</p>
      </div>
      <div class="opt">
        <router-link tag='button' class="btn btn_block" to="/mine/mywallet/adddebitcard">添加银行卡</router-link>
      </div>
  </div>
</template>
<style lang="less" scoped>
    .nocards{
        font-size: 14px;
        color: #CCCCCC;
        letter-spacing: -0.12px;
        line-height: 20px;
        text-align: center;
        display: flex;
        flex-direction:column;
        padding-bottom: 44px;
        justify-content: center;

        img{
            width: 110px;
            height: 110px;
        }
    }
    .opt{
        position: absolute;
        width: 100%;
        padding: 0 12px;
        box-sizing: border-box;
        bottom: 0;
    }
    .container_nofoot{
        background-color: #EFEFF4;
        overflow: scroll;
    }
    .debitcard-item{
        background: #FF6B71;
        box-sizing: border-box;
        border-radius: 4px;
        height: 100px;
        width: 92.5%;
        margin: 0 auto;
        padding-left: 41px;
        position: relative;
        color: #fff;
        font-size: 13px;
        margin-top: 10px;
        overflow: hidden;
        p{
            line-height: 18px;
        }
        .bankname{
            font-size: 16px;
            line-height: 20px;
            margin-top: 12px;
        }
        .cardnumber{
            line-height: 29px;
            font-size: 24px;
            margin-top: 8px;
            vertical-align: top;
            overflow: hidden;
            padding-left:156PX; 
            position: relative;
            span{
                position: absolute;
                left: 0;
                top:5px;
                font-size: 22px;
            }
        }
        img{
            width: 30px;
            height: 30px;
            position: absolute;
            left:8px;
            top: 16px;
        }

    }
</style>
<script>
export default {
  
}
</script>


