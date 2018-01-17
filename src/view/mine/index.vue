<template>
    <div>
        <!--<mt-header title="个人中心"></mt-header>-->
        <div class="container bg_gary">
            <div>
                <div class="avatar">
                    <div class="headImg"></div>
                    <span v-if="isLogin">{{phone | phoneShielderFmt}}</span>
                    <span v-else @click="login">登录/注册</span>
                </div>
                <div>
                    <mt-cell title="保单收货地址" is-link to="/mine/addressmanage" v-if="isLogin">
                        <img slot="icon" src="../../assets/icon_my_dress@3x.png" width="18" height="18">
                    </mt-cell>
                    <!--<mt-cell title="我的储蓄卡" is-link to="/mine/mywallet/debitcards" v-if="isLogin">
                        <img slot="icon" src="../../assets/icon_my_wallet@3x.png" width="18" height="18">
                    </mt-cell>-->
                    <mt-cell title="常见问题" is-link to="/mine/questions">
                        <img slot="icon" src="../../assets/icon_my_commonproblem@3x.png" width="18" height="18">
                    </mt-cell>
                    <mt-cell title="意见反馈" is-link to="/mine/feedback" v-if="isLogin">
                        <img slot="icon" src="../../assets/icon_my_opinionfeedback@3x.png" width="18" height="18">
                    </mt-cell>
                    <mt-cell title="关于我们" is-link to="/mine/about">
                        <img slot="icon" src="../../assets/icon_my_aboutus@3x.png" width="18" height="18">
                    </mt-cell>
                    <mt-cell title="联系方式" is-link to="/mine/contactus">
                        <img slot="icon" src="../../assets/icon_my_contactus@3x.png" width="18" height="18">
                    </mt-cell>
                    <mt-cell title="账户管理" is-link to="/mine/accountmanage" v-if="isLogin">
                        <img slot="icon" src="../../assets/icon_my_account@3x.png" width="18" height="18">
                    </mt-cell>
                </div>
                <!--<div class="btn_box_mine" v-if="isLogin">-->
                    <!--<button class="btn_block" @click="exit()">退出登录</button>-->
                <!--</div>-->
            </div>
        </div>
        <navbar :selected="'/mine'"></navbar>
    </div>
</template>

<script type="text/ecmascript-6">
    import navbar from 'components/Navbar';
    import {mapActions,mapState} from 'vuex';
    export default {
        name: '',
        methods: {
            ...mapActions([
                'loginOut',
                'showLoginBox',
                'hideLoginBox',
            ]),
            exit(){
                this.loginOut().then(()=> {
                    this.$router.push({path: "/"})
                })
            },
            login(){
                this.showLoginBox();
            }
        },
        mounted(){
          if(this.token){
//              this.isLogin = true;
              if(!this.phone){
                  this.$http.post(BASE_URL+'/customer/getCustomerInfo',{
                      token:this.token
                  }).then(res=>{
                      let data = res.data;
                      if(data.status=='SUCCESS'){
                          this.$store.dispatch('loginIn',{
                              token:this.token,
                              phone:data.content['regMobile']
                          })
                      }
                  })
              }
          }
        },
        components: {
            navbar
        },
        computed: mapState(['token','isLogin','phone'])
    }
</script>

<style lang="less" scoped>
    .container{
        margin-top: -44px;
    }
    span.mint-cell-text{
        font-size: 16px !important;
    }
    .avatar {
        height: 120px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        background-image: url("../../assets/img_my_bj@3x.png");
        background-size: cover;

        .headImg {
            align-self: center;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin-bottom: 10px;
            background-image: url("../../assets/img_my_headportraitgray@3x.png");
            background-size: cover;
            img{
                width: 100%;
                height: 100%;
            }
        }

        span {
            font-weight: 600;
            color: #ffffff;
            align-self: center;
        }

    }
    .mint-cell-text{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #666666;
    }

    .btn_box_mine{
        padding-top: 10px;
    }
    .btn_box_mine button{
        background-color: #ffffff;
        min-height: 48px;
        line-height: 48px;
        border:none;
    }
</style>
