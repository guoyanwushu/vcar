<template>
  <div class="container">
      <div class="banner"><img src="../../assets/register/img_huyoo_banner@3x.png" alt=""></div>
      <div class="input-item">
          <input type="tel" placeholder="请输入您的手机号" v-model="phone">
          <img src="../../assets/register/icon_huyoo_iphonenumber@3x.png" alt="" class="phone-icon">
      </div>
      <div class="input-item">
          <input type="text" placeholder="请输入验证码" v-model="verifyCode">
          <button class="getcode" @click="getVerifyCode" v-bind:class="{'disabled':disableFlag}">{{buttonTxt}}</button>
      </div>
      <button class="register" @click="register">立即注册虎优</button>
      <p class="tips">点击注册，即表示您同意<a href="#" @click="openStateMent()">《虎优车险平台注册服务协议》</a></p>
      <footer>
          <p>版权所有©上海维信荟智金融科技有限公司</p>
          <p>沪ICP备11048686号-9</p>
      </footer>
      <mt-popup
                v-model="popupVisible"
                position="bottom"
                :modal="false"
                class="popState"
        >
            <mt-header title="虎优车险平台服务协议" class="login_head">
                <mt-button icon="back" slot="left" @click="openStateMent()"></mt-button>
            </mt-header>
            <div class="container_nofoot">
                <lgdel></lgdel>
            </div>
        </mt-popup>
  </div>
</template>
<script>
import {Toast} from 'mint-ui'
import axios from 'axios'
import {getUrlQuery} from 'src/utils/tools';
import loginDel from 'src/view/statements/loginStatement'
export default {
    name:'',
    data(){
        return {
            phone:'',
            verifyCode:'',
            time:60,
            buttonTxt:'获取验证码',
            disableFlag:false,
            popupVisible:false
        }
    },
    components:{
        lgdel:loginDel
    },
    methods:{
        openStateMent(){
            this.popupVisible = !this.popupVisible;
        },
        getVerifyCode(){
            let self = this;
            let mobileReg = /^1[3|4|5|7|8][0-9]\d{8}$/;
            if(!mobileReg.test(this.phone)){
                Toast({
                    message:'请输入正确的手机号'
                })
                return;
            }
            axios({
                url:BASE_URL+'/eventShare/sendMsg',
                method:"POST",
                params:{
                    mobile:this.phone,
                    
                }}).then((res)=>{
                    let data = res.data;
                    if(data.status == 'SUCCESS'){
                        Toast({
                            message:data.content
                        })
                    }
                    else{
                        Toast({
                            message:data.msg
                        })
                    }
                    let tim = setInterval(function(){
                        if(self.time==0){
                            self.buttonTxt = '重新发送';
                            self.disableFlag = false;
                            self.time = 60;
                            clearInterval(tim);
                        }
                        else{
                            self.buttonTxt = `${self.time}s后重新获取`;
                            self.time--;
                            self.disableFlag = true;
                        }
                    },1000)

            },(err)=>{
                Toast({
                    message:"网络错误!"
                })
            })
        },
        register(){
            console.log(getUrlQuery()['code']);
            let mobileReg = /^1[3|4|5|7|8][0-9]\d{8}$/;
            if(!mobileReg.test(this.phone)){
                Toast({
                    message:'请输入正确的手机号'
                })
                return;
            }
            if(!this.verifyCode){
                Toast({
                    message:'请输入验证码'
                })
                return;
            }
            axios({
                url:BASE_URL+'/eventShare/register',
                method:"POST",
                params:{
                    regMobile:this.phone,
                    tmpVerify:this.verifyCode,
                    invitationCode:getUrlQuery()['code'],
                }
            }).then((res)=>{
                let data = res.data;
                if(data.status == "SUCCESS"){
                    //注册成功跳转
                    window.location.href = "registerSuccess.html"
                }
                else{
                    
                    Toast({
                        message:data.msg
                    })
                }
            },(err)=>{
                Toast({
                    message:"网络错误"
                })
            })
            
        },
    }
}
</script>

<style lang="less" scoped>
    .container_nofoot {
    position: absolute;
    overflow-y: auto;
    top: 44px;
    right: 0;
    left: 0;
    bottom: 0;
    }
    .statement_box h1 {
        font-size: 16px;

    }
    .statement_box h2 {
        font-size: 14px;
    }
    button,a,span,p,div{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .container{
        position: absolute;
        top: 0;
        left:0;
        right: 0;
        bottom: 0;
        background-color: #ffeddc;
        max-width: 640px;
        margin: 0 auto;
        overflow: scroll;
    }
    .banner{
        min-width: 180px;
        margin-bottom: 27px;
        img{
            width: 100%;
        }

    }
    .input-item{
        width: 92.5%;
        margin: 0 auto;
        height: 44px;
        display: flex;
        align-items: center;
        border: 1px solid #FF7D00;
        background-color: #fff;
        border-radius: 100px;
        justify-content: space-between;
        padding-left: 21px;
        margin-bottom: 10px;
        overflow: hidden;
        position: relative;
        .phone-icon{
            width: 16px;
            height: 27px;
            margin-right: 17px;
        }
        input{
            font-size: 16px;
            color: #999999;
            height: 22px;
            line-height: 22px;
            border: none;
            outline: none;
        }
        button.getcode{
            background: #FF7D00;
            position: absolute;
            right: -1px;
            top:-1px;
            border-radius: 100px;
            display: block;
            width: 110px;
            border: none;
            outline: none;
            height: 44px;
            font-size: 14px;
            color: #FFFFFF;
            text-align: center;
            &.disabled{
                user-select: none;
                pointer-events: none;
            }
        }
        

    }
    .register{
        width: 92.5%;
        margin: 0 auto;
        height: 44px;
        background:url("");
        margin-bottom:9px;
        display: block;
        outline: none;
        border: none;
        position: relative;
        text-align: center;
        font-size: 16px;
        margin-top: 15px;
        color: #FFFFFF;
        padding: 0;
        background-image:url("../../assets/register/btn_huyoo_zhuc@3x.png");
        background-size: 100% 100% ;
        img{
            position: absolute;
            left:0;
            top: 0;
            width: 100%;
            height: 100%;
        }
    }
    .tips{
        font-size: 13px;
        color: #999999;
        line-height: 18px;
        text-align: center;
        a{
            color: #FF7D00;
            text-decoration: none;

        }
    }
    footer{
        position: absolute;
        width: 100%;
        bottom: 0;
        font-size: 11px;
        color: #999999;
        line-height: 16px;
        padding-bottom: 10px;
        text-align: center;
    }
    .login_head{
        line-height: 44px;
        background-color: #ffffff;
        color: #333333;
        font-size: 17px;
        border-bottom: 1px solid #eeeeee;
    }

    .popState{
        width: 100%;
        height: 100%;
        background: #ffffff;
        overflow: scroll;
        /*left: 0;*/
        /*position: absolute;*/
        /*z-index: 99999;*/
        /*right: 0;*/
        /*top: 0;*/
        /*bottom: 0;*/
    }
    .satement_title{
        text-align: center;
    }
    .satement_detail{
        line-height: 16px;
        padding-left: 10px;
    }
    
</style>

