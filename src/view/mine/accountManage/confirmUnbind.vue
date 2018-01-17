<template>
    <div >
      <mt-header title="确认解绑">
        <router-link to="/mine" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="container_nofoot" v-if="1">
          <div class="content-container">
              <p>已发送验证码到</p>
              <p class="bind-mobile">{{phone|phoneShielderFmt}}</p>
              <div class="checkcode">
                  <label for="checkcode">验证码</label>
                  <input type="text" id="checkcode" placeholder="请输入验证码" v-model="verificationCode">
                  <span  :class="{'disabled':timeClock}" @click="getMark()">{{timeClock?markTime+'s后重新获取':'重新获取'}}</span>
              </div>
          </div>
          <div class="btn-container">
                 <button class="btn btn_block" @click="confirmUnbind">确认解绑</button>
          </div>          
      </div> 
  </div>
</template>
<script type="text/ecmascript-6">
import {mapState} from 'vuex'
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            verificationCode: null,
        }
    },
    computed:{
      ...mapState([
          'phone',
          'token',
          'timeClock',
          'markTime'
      ])
    },
    methods:{
      getMark(){
        if(!this.timeClock){
            this.$store.dispatch('createTimeout');
            this.$http({
                method:"POST",
                url: BASE_URL+"/customer/sendUnbindVerifyCode/"+this.phone,
            }).then((res)=>{
                let content = res.data;
                if(content.status=='SUCCESS'){
                    let tost = Toast({
                        message: '验证码发送成功',
                    });
                }
                else{
                    Toast({
                        message: content.msg,
                    });
                }
            },(err)=>{
                Toast({
                    message: content.msg,
                });
                return;
            });
        }
    },
    confirmUnbind(){
        if(!this.verificationCode){
            Toast({
                message: "请输入验证码",
            });
            return;
        }
        else{
            this.$http({
                method:"POST",
                url: BASE_URL+"/customer/unbindWeiXin",
                data:{
                    token:this.token,
                    verificationCode:this.verificationCode,
                    mobile:this.phone
                }
            }).then(res=>{
                let content = res.data;
                if(content.status=='SUCCESS'){
                    let tost = Toast({
                        message: '解绑成功',
                    });
                    this.$store.dispatch('loginOut');
                    this.$router.push({path:'/'});
                }
                else{
                    Toast({
                        message: content.msg,
                    });
                }
            });
        }
    }
  }
}
</script>
<style lang="less" scoped>
    .checkcode{
        height: 44px;
        line-height: 44px;
        background-color: #fff;
        padding-left: 10px;
        position: relative;
        display: flex;
        align-items: center;
        label{
            font-size: 16px;
            color: #666666;
        }
        input{
            border: none;
            outline: none;
            font-size: 16px;
            line-height: 22px;
            height: 22px;
            margin-left: 12px;
            &::-webkit-input-placeholder{
                font-size: 16px;
                color: #ccc;
            }
        }
        span{
            position: absolute;
            right: 0;
            top: 0;
            height: 44px;
            width: 96px;
            text-align: center;
            font-size: 13px;
            color: #FFFFFF;
            background: #FF7D00;
            &.disabled{
                background: #CCCCCC;
                pointer-events: none;
            }
        }
    }
    .container_nofoot{
        background-color: #EFEFF4;
    }
    .content-container{
        padding: 0 12px;
        margin-top: 10px;
        p{
            font-size: 16px;
            color: #666666;
            line-height: 22px;
        }
        p.bind-mobile{
            font-size: 30px;
            color: #666666;
            text-align: center;
            margin: 6px 0  13px 0;
            line-height: 42px;
        }
        .tips{
            font-size: 14px;
            color: #FF7D00;
            padding-left: 17px;
            line-height: 20px;
            position: relative;
            img{
                width: 14px;
                height: 14px;
                position: absolute;
                left: 0;
                top: 3px;
            }
        }
    }
    .container_nofoot{
        background-color: #EFEFF4;
    }
    .btn-container{
        box-sizing: border-box;
        padding:0 12px;
        position: relative;
        top: 56px;
        width: 100%;
        button{
            opacity: 1;
        }
    }
</style>


