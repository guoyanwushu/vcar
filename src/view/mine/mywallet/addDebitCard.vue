<template>
  <div >
      <mt-header title="添加储蓄卡">
        <router-link to="/mine" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="container_nofoot" v-if="1">
          <div class="input-container">
            <div class="input-item">
                <label for="name">姓名</label>
                <input type="text" id="name" placeholder="请输入卡主姓名">
            </div>
            <div class="input-item">
                <label for="identifyno">卡主身份证号</label>
                <input type="text" id="identifyno" placeholder="请输入卡主身份证号">
            </div>
            <router-link tag="div" to="/mine/mywallet/banklist" class="input-item bankname-input">
                <label for="bankname">银行名称</label>
                <div>
                    <span id="bankname">请点击选择银行</span>
                    <img src="../../../assets/icon_automobileinsurance_rightarrorw@3x.png" alt="">
                </div>
            </router-link>
            <div class="input-item">
                <label for="name">储蓄卡号</label>
                <input type="text" id="name" placeholder="请填写储蓄卡卡号">
            </div>
            <div class="input-item">
                <label for="name">手机号</label>
                <input type="text" id="name" placeholder="请填写银行预留手机号">
            </div>
          </div>
          <div class="btn-container">
                 <button class="btn btn_block">确定</button>
          </div>          
      </div> 
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            name:null,
            identityNo:null,
            bankCode:null,
            debitCardNo:null,
            mobile:null,

        }
    }
}
</script>
<style lang="less" scoped>
    .btn-container{
        box-sizing: border-box;
        padding:0 12px;
        position: absolute;
        bottom: 20px;
        width: 100%;
        button{
            opacity: 0.5;
            &.active{
                opacity: 1;
            }
        }
    }
    .container_nofoot{
        
        box-sizing: border-box;
        background-color: #EFEFF4;
    }
    .input-container{
        padding: 0 12px;
        background-color: #fff;
    }
    .input-item{
        width: 100%;
        height: 44px;
        margin-bottom: 1px;
        line-height: 44px;
        font-size: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 1px 0 0 #C8C7CC;
        input{
            width: 160px;
            appearance: none;
            border: none;
            outline: none;
            font-size: 16px;
            height: 20px;
            line-height: 20px;
            text-align: right;
            &::-webkit-input-placeholder{
                    font-size: 14px;
                    color: #CCCCCC;
                    text-align: right;
            }
        }
        &:last-child{
            box-shadow: 0 0px 0 0 #C8C7CC;
        }
    }
    .bankname-input{
        img{
            width: 9px;
            height: 16px;
            vertical-align: -3px;
            display: inline-block;
            margin-right: 5px;
        }
        span{
            font-size: 14px;
            color: #CCCCCC;
        }
    }
</style>


