<template>
    <div >
      <mt-header title="保单收货地址">
        <router-link to="/mine" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="container_nofoot" v-if="1">
          <div class="address-item" v-for="address in addressList">
              <div class="account-box">
                <p class="flex-between">
                    <span>{{address.name}}</span><span>{{address.mobile}}</span>
                </p>
                <p class="addressdetail">{{address.provinces}}{{address.detailAddress}}</p>
              </div>
              <div class="flex-between">
                  <div class="select-box">
                      <!--<input type="radio" v-bind:value="address.addressId" name="address" v-bind:id="address.addressId">-->
                      <!--<label v-bind:for="address.addressId"></label>-->
                      <!--<span>默认地址</span>-->
                  </div>
                  <div class="opt-box" @click="deleteAddress(address)">
                      <img src="../../../assets/icon_autoinsurance_delete@3x.png" alt="删除小图标">
                      <span>删除</span>
                  </div>
              </div>
          </div>
          <!--<div class="addaddress" @click="openAdd()">-->
                <!--<img src="../../../assets/btn_withdrawals_add@3x.png" alt=""><span>新增收货地址</span>-->
          <!--</div>-->
          <div class="btn-container">
                 <button class="btn btn_block" @click="openAdd()">+新增收货地址</button>
          </div>
      </div>
        <address-select
                :visible.sync="popupVisible"
                v-on:fillover="filledover"
        ></address-select>
  </div>
</template>
<script>
    import AddressSelect from 'src/components/AddressSelect'
    import {mapState} from 'vuex'
    import {Toast,MessageBox} from 'mint-ui'
    export default {
        data(){
            return {
                popupVisible: false,
                addressList:[]
            }
        },
        methods: {
            openAdd(){
                this.popupVisible = true
            },
            filledover(data){
                this.$http.post(BASE_URL+'/customer/receiveAddress/add',{
                    "address": data.detailAddress,
                    "areaCode": data.areaCode,
                    "cityCode": data.cityCode,
                    "mobile": data.recvMobile,
                    "name": data.recvName,
                    "provinceCode": data.provinceCode,
                    "token": this.token
                }).then(res=> {
                    let status = res.data.status;
                    if (status == 'SUCCESS') {
                        this.loadUserAddress();
                    }
                },err=>{

                })
//                保存用户地址
            },
//        载入用户地址
            loadUserAddress(){
                this.$http.post(BASE_URL + '/customer/receiveAddress/query', {token: this.token}).then(responces=> {
                    let res = responces.data;
                    if (res.status == 'SUCCESS') {
                        this.addressList = res.content;
                    } else if (res.status == 'PLEASE_LOGIN') {
                        this.$toast(res.msg);
                        this.$store.dispatch('showLoginBox');
                    } else {
                        this.$toast(res.msg);
                    }
                })
            },
            //删除用户地址
            deleteAddress(address){
                this.$messagebox.confirm("确认删除该地址?").then(action=>{
                    this.$http.post(BASE_URL+'/customer/receiveAddress/delete',{
                        "addressId": address.addressId,
                        "token": this.token
                    }).then(res=>{
                        if(res.data.status=='SUCCESS'){
                            this.loadUserAddress();
                        }else{
                            this.$toast(res.data.msg);
                        }
                    },err=>{
                        this.$store.dispatch('loadErr',true);
                    })
                },rej=>{})
            },
        },
        mounted(){
          this.loadUserAddress();
        },
        components: {
            addressSelect: AddressSelect
        },
        computed: {
            ...mapState([
                'token'
            ])
        }
    }
</script>
<style lang="less" scoped>
    .btn-container{
        box-sizing: border-box;
        padding:0 12px;
        position: absolute;
        bottom: 0px;
        width: 100%;
        button{
            &.active{
                opacity: 1;
            }
        }
    }
    .addaddress{
        width: 90.3%;
        box-sizing: border-box;
        margin-top: 14px;
        margin-left: 4.85%;
        padding: 0 4.85%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px dotted #FF7D00;
        height: 116px;
        text-align: center;
        font-size: 16px;
        color: #FF7D00;
        img{
            width: 14px;
            height: 14px;
            margin-right: 5px;
        }
    }
    .account-box{
        padding-top:14px;
        padding-right: 12px;
        box-shadow: 0 0.5px 0 0 #C8C7CC;
        margin-bottom: 1px;
        overflow: hidden;
        .addressdetail{
            margin-top: 10px;
            margin-bottom: 2px;
        }
    }
    .container_nofoot{
        box-sizing: border-box;
        background-color: #EFEFF4;
    }
    .flex-between{
        display: flex;
        justify-content: space-between;
    }
    .address-item{
        padding-left: 12px;
        font-size: 14px;
        line-height: 20px;
        background-color: #fff;
        margin-bottom: 10px;
        color: #4D4D4D;
        p{

        }

    }
    .select-box{
        height: 44px;
        line-height: 44px;
        display:flex;
        align-items: center;
        label{
            display: inline-block;
            width: 14px;
            height: 14px;
            background-image: url("../../../assets/icon_autoinsurance_unchecked@3x.png");
            background-size: contain;
            margin-right: 5px;
            -webkit-tap-highlight-color: transparent;
        }
        input{
            width: 0;
            height: 0;
            visibility: hidden;
            &:checked+label{
                background-image: url("../../../assets/icon_automobileinsurance_checkedcircle@3x.png");
                &+span{
                    color: #FF7D00;
                }
            }

        }
    }
    .opt-box{
        height: 44px;
        padding-right: 15px;
        line-height: 44px;
        display:flex;
        align-items: center;
        img{
            width: 14px;
            height: 14px;
            margin-right: 4px;
        }
    }
</style>


