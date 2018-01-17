<template>
  <div >
      <mt-header title="提现">
        <router-link to="/mine" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="container_nofoot">
        <router-link tag="div" class="card-info no-card" v-if='1' to="/mine/mywallet/chosedebitcard">
            <p><span>+</span>添加到账储蓄卡</p>
        </router-link>
        <div class="card-info" v-if='0'>
            <img src="../../../assets/img_my_headportrait.png" alt="" class="bankicon">
            <p class="bankname">中国建设银行</p>
            <P class="cardno">尾号7523储蓄卡</P>
            <img src="../../../assets/icon_automobileinsurance_rightarrorw@3x.png" alt="" class="link">
        </div>
        <p class="withdraw-amount">
          <span>可提现金额: 1,999,99 元</span>
          <span>全部提现</span>
        </p>
        <div class="actual-amount">
           <label for="amount">金额     ￥</label>  
           <input type="tel" placeholder="请输入金额"> 
        </div>
        <p class="fee">收取手续费:<span>1,000元</span></p>
        <div class="btn-container">
                 <button class="btn btn_block">确定</button>
        </div>      
      </div> 
      <Alert :title="alertTitle" :visible="visible">
        <div slot="content">
        </div>
      </Alert>
  </div>
</template>
<script>
import Alert from '../../../components/Alert'
export default {
  data(){
    return {
      visible:true,
      alertTitle:'请输入短信验证码确认'
    }
  },
  components:[Alert]
}
</script>
<style lang="less" scoped>
    p.fee{
      font-size: 14px;
      color: #9B9B9B;
      text-align: right;
      padding-right: 12px;
      line-height: 20px;
      margin-top: 5px;
      span{
        color:#FF7D00;
        margin-left: 5px;
      }
    }

    .btn-container{
        box-sizing: border-box;
        padding:0 12px;
        position: absolute;
        bottom: 20px;
        width: 100%;
        pointer-events: none;
        button{
            opacity: 0.5;
            &.active{
                opacity: 1;
                pointer-events: auto;
            }
        }

    }
    .actual-amount{
      height: 44px;
      line-height: 44px;
      padding: 0 12px;
      background-color: #fff;
      font-size: 16px;
      display: flex;
      align-items: center;
      color: #666666;
      label{
        height: 44px;
        display: inline-block;
      }
      input{
        border: none;
        outline: none;
        text-align: left;
        padding: 0;
        font-size: 16px;
        color: #666666;
        height: 20px;
        line-height: 20px;
        margin: 0;
        &::-webkit-input-placeholder{
                font-size: 14px;
                color: #CCCCCC;
                text-align: left;
        }
      }
    }
   .withdraw-amount{
     padding: 0 12px;
     box-sizing: border-box;
     display: flex;
     justify-content: space-between;
      margin: 11px 0 8px 0;
      font-size: 14px;
      color: #9B9B9B;
      line-height: 17px;
      span:last-child{
        color: #FF7D00;
        font-size: 13px;
      }
   }
   .container_nofoot{
     background-color: #EFEFF4;
   }
   .card-info{
       margin-top: 10px;
       width: 100%;
       height: 60px;
       background-color: #fff;
       overflow: hidden;
       position: relative;
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
       &.no-card{
         
         color: #FF7D00;
         text-align: center;
         vertical-align: middle;
         line-height: 72px;
         height: 72px;
         p{
           width: 100%;
           height: 72px;
           line-height: 60px;
           padding-left: 0;
           font-size: 16px;
         }
         span{
           font-size: 25px;
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
   }
</style>



