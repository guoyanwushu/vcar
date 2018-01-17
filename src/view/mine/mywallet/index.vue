<template>
  <div >
      <mt-header title="我的钱包">
        <router-link to="/mine" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="container_nofoot">
        <div class="amount">
            <div class="amount-desc">
                <p >账户余额(元)</p>
                <p class="wallet-amount">0.00</p>
            </div>
            <div class="btns">
                <router-link tags="span" to="/mine/mywallet/debitcards">我的储蓄卡</router-link>
                <router-link tags="span" to="/mine/mywallet/withdraw">余额提现</router-link>
            </div>
        </div>
        <div class="router-item">
            <router-link to="/mine/mywallet/accountdetail" tag="div">
                <span>账户明细</span>
                <i><img src="../../../assets/icon_automobileinsurance_rightarrorw@3x.png" alt=""></i>
            </router-link>
        </div>

  </div>
  </div>
</template>
<style lang="less" scoped>
    .router-item{
        >div{
            height: 44px;
            padding: 0 12px;
            line-height: 44px;
            font-size: 16px;
            color: #666;
            display: flex;
            justify-content: space-between;
            background-color: #fff;
            img{
                width: 9px;
                height: 14px;
            }
        }
    }
    .container_nofoot{
        background-color: #EFEFF4;
    }
    .amount{
        background-color: #FF7D00;
        font-size: 14px;
        color: #FFFFFF;
        padding-top: 10px;
        overflow: hidden;
        .amount-desc{
            padding: 0 12px;
        }
        .wallet-amount{
            font-size: 40px;
            line-height: 31px;
            margin-top: 12px;
        }
        .btns{
            background-color:#FF8815;
            display: flex;
            justify-content: space-between;
            height: 46px;
            line-height: 46px;
            margin-top: 21px;
            a{
                width: 50%;
                line-height: 19px;
                display: inline-block;
                height: 19px;
                text-align: center;
                text-decoration: none;
                font-size: 14px;
                color: #fff;
                margin-top: 14px;
                &:first-child{
                    border-right: 1px solid rgba(255,255,255,0.4);
                }
            }
        }
    }
</style>
<script>
export default {
  
}
</script>


