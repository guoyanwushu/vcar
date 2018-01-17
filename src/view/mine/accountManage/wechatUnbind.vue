<template>
    <div >
      <mt-header title="微信解绑">
        <router-link to="/mine" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="container_nofoot" v-if="1">
          <div class="content-container">
              <p>当前绑定账号</p>
              <p class="bind-mobile">{{phone|phoneShielderFmt}}</p>
              <p class="tips"><img src="../../../assets/icon_account_redprompt@3x.png">解绑后使用微信登录可以实现微信绑定</p>
          </div>
          <div class="btn-container">
                 <button class="btn btn_block"  @click="unbind">微信解绑</button>
          </div>          
      </div> 
  </div>
</template>
<script type="text/ecmascript-6">
import {mapState} from 'vuex'
import {Toast} from 'mint-ui'
export default {
  
  computed:{
      ...mapState(['phone','token','timeClock'])
  },
  methods:{
      unbind(){
        if(!this.timeClock){
            this.$store.dispatch('createTimeout');
            this.$http({
                method:"POST",
                url: BASE_URL+"/customer/sendUnbindVerifyCode/"+this.phone,
            }).then(res=>{
                let content = res.data;
                if(content.status!='SUCCESS'){
                    let tost = Toast({
                        message: content.msg,
                    });
                }
            });
        }
        this.$router.push({path:'confirmunbind'});
    },
  }
  
}
</script>
<style lang="less" scoped>
    .content-container{
        padding: 0 12px;
        margin-top: 10px;
        p{
            font-size: 16px;
            color: #666666;
            line-height: 22px;
        }
        p.bind-mobile{
            padding-left: 10px;
            width: 100%;
            height: 44px;
            line-height: 44px;
            background: #E6E6E6;
            font-size: 16px;
            color: #666666;
            margin: 10px 0 7px 0;

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


