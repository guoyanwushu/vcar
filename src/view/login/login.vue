<template>
    <div class="login" v-show="showLogin">
        <mt-header title="登录" class="login_head">
            <mt-button icon="back" slot="left" @click="back()"></mt-button>
        </mt-header>
        <div class="login_box">
            <div class="form_input">
                <label>手机号码</label>
                <input type="number" placeholder="请输入您的手机号码" v-model="mobile">
            </div>
            <div class="form_input">
                <label>验证码</label>
                <div class="markbox">
                    <input type="text" placeholder="请输入验证码" v-model="verificationCode">
                    <button class="mark" @click="getMark()" v-bind:disabled="isgetingmark">{{isgetingmark?time+'s后重新获取':'获取验证码'}}</button>
                </div>

            </div>
        </div>
        <p class="tip">
            <!--<label class="checkbox">-->
                <!--<input type="checkbox" v-model="checked">-->
                <!--<span></span>-->
            <!--</label>-->
            点击登录，即表示您同意 <a href="#" @click="openStateMent()">《虎优车险平台服务协议》</a>
        </p>
        <div style="padding: 10px">
            <button class="btn btn_block login_btn" @click="loginIn()">登录</button>
        </div>
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

<script type="text/ecmascript-6">
    import {mapState,mapActions} from 'vuex'
    import {Toast} from 'mint-ui'
    import loginDel from 'src/view/statements/loginStatement'
    export default {
        name: '',
        data(){
            return {
                mobile: '',
                verificationCode: null,
                checked:false,
                isgetingmark:false,
                time:60,
                popupVisible:false
            }
        },
        methods: {
            ...mapActions([
                'showLoginBox',
                'hideLoginBox'
            ]),
            back(){
                this.hideLoginBox();
            },
            loginIn(){
                var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
                if(!this.mobile||!reg.test(this.mobile)){
                    Toast({
                        message: '请输入正确的手机号码'
                    });
                    return;
                }else if(!this.verificationCode){
                    Toast({
                        message: '请输入验证码'
                    });
                    return
                }
                let targetUrl = null;
                if(DevEnv=='prod'){
                    targetUrl = BASE_URL+"/customer/weiXinLogin";
                }else if(DevEnv == 'dev'){
                    targetUrl = BASE_URL+"/customer/loginForSms"
                }

                this.$http({
                    method:"POST",
                    url:targetUrl,
                    data:{
                        mobile:this.mobile,
                        verificationCode:this.verificationCode,
                        regSource:REGSOURCE,
                        openIdEncrypt:this.openId
                    }
                }).then(res=>{
                    let data = res.data;
                    if(data.status=='SUCCESS'){
                        this.$store.dispatch('loginIn',{token:data.content.token,phone:this.mobile}).then(()=> {
                            this.back();
                        });
                    }else{
                        let tost = Toast({
                            message: data.msg
                        });
                    }
                },err=>{
                    this.$toast('网络错误，请检查你的网络')
                });
            },
            getMark(){
                let reg  = new RegExp("^((1[3-9][0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$");
                if(!reg.test(this.mobile)){
                    let tost = Toast({
                        message:'请输入正确的手机号码',
                    });
                    return;
                }
                if(this.isgetingmark) return;
                this.isgetingmark = true;
                let st = setInterval(()=>{
                    this.time--;
                    if(this.time==0){
                        this.time=60;
                        clearInterval(st);
                        this.isgetingmark = false;
                    }
                },1000);
                this.$http({
                    method:"POST",
                    url: BASE_URL+"/customer/sendLoginVerifyCode",
                    data:{
                        mobile:this.mobile,
                    }
                }).then(res=>{
                    let content = res.data;
                    if(content.status!='SUCCESS'){
                        let tost = Toast({
                            message: content.msg,
                        });
                    }
                });
            },
            openStateMent(){
                this.popupVisible = !this.popupVisible;
            }
        },
        computed: mapState([
            'isLogin',
            'showLogin',
            'openId',
        ]),
        components:{
           lgdel:loginDel
        }
    }
</script>

<style lang="less" scoped>
    .login{
        position: absolute;
        left: 0;
        top:0;
        bottom:0;
        right: 0;
        z-index: 10;
        background: #ffffff;
    }
    .login_box{
        padding: 20px 12px;
    }
    .form_input {
        border: 1px solid #eee;
        height: 44px;
        line-height: 44px;
        padding-left: 10px;
        display: flex;
        &:first-child{border-bottom: none}
        label {
            max-width: 66px;
            flex: 1;
        }
        input{
            border: none;
            outline: none;
            font-size: 16px;
            padding-left: 14px;
            flex: 1;
        }
        .markbox{
            flex:1;
            display:flex;
            input{
                width:60%;
            }
            .mark{
                outline: none;
                font-size: 12px;
                width: 40%;
                border:none;
                background-color: #FF7D00;
                color:#ffffff;
                &:active{
                    background-color: lighten(#FF7D00,10%);
                 }
            }
            .mark[disabled=disabled]{
                background-color: #eeeeee;
                color: #333333;
            }
        }


    }
    .tip {
        padding: 10px;
        font-size: 14px;
        color: #999;
        text-align: center;
        margin-bottom: 10px;
        a{
            text-decoration: none;
            color:#FF7D00;
        }
    }
    .login_btn{
        padding: 0;
        line-height: 44px;
        font-size: 16px;
    }
    .forget {
        .tip;
        text-align: right;
        color: #01C0FF;
    }
    label.checkbox{
        font-size: 14px;
    input{display: none};
    span{
        display: inline-block;
        border:1px solid #FF7D00;
        width: 14px;
        height: 14px;
        border-radius: 2px;
        vertical-align: middle;
        position: relative;
    }
    input:checked+span::after{
        content:" ";
        display: block;
        position: absolute;
        left: 4px;
        top:1px;
        width: 4px;
        height:8px;
        border-right:1px solid #FF7D00;
        border-bottom:1px solid #FF7D00;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
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
