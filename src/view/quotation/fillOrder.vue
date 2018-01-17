
<style>
    .btn_box_pay {
        padding-left: 10px;
        padding-right: 10px;
        height: 70px;
    }
    .pay_box{
        overflow: auto;
        height: -webkit-calc(100% - 80px);
        height: -moz-calc(100% - 80px);
        height: calc(100% - 80px);
    }
</style>

<template>
    <div>
        <mt-header title="支付订单">
            <mt-button icon="back" slot="left"></mt-button>
        </mt-header>
        <div class="container_nofoot bg_gary">
            <div class="pay_box">
                <div class="pay_item">
                    <div class="pay_item_head islink" @click="showAdSelect()">
                        <i class="icon local_icon"></i> 填写保单配送地址
                    </div>
                </div>
                <div class="pay_item">
                    <div class="pay_item_head">
                        <i class="icon time_icon"></i> 保险期间
                    </div>
                    <div class="pay_item_content">
                        <div class="time_dec">
                            保险生效日期 2016-07-08 0:00 至2017-07-07 24:00
                        </div>
                        <div class="time_dec">
                            交强险生效日期 2016-07-08 0:00 至2017-07-07 24:00
                        </div>
                    </div>
                </div>
                <div class="pay_item">
                    <div class="pay_item_head">
                        <i class="icon money_icon"></i> 订单金额
                    </div>
                    <div class="pay_item_content">
                        <div class="money_dec">
                            <span>交强险</span>
                            <span>￥5900</span>
                        </div>
                        <div class="money_dec">
                            <span>交强险</span>
                            <span>￥5900</span>
                        </div>
                        <div class="money_dec">
                            <span>合计</span>
                            <span class="yellow">￥5900</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn_box_pay">
                <button class="btn btn_block" @click="toPay()">确 定</button>
            </div>
        </div>
        <address-select :visible.sync="popupVisible"></address-select>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {Toast,Popup} from 'mint-ui'
    import AddressSelect from 'src/components/AddressSelect'
    export default {
        name: '',//支付
        data(){
          return {
              popupVisible:false
          }
        },
        methods:{
            toPay(){
              this.$router.push({path:'/pay'})
            },
            showAdSelect(){
                this.popupVisible = true;
            }
        },
        computed: {
            ...mapState([
                "token"
            ])
        },
        components:{
           addressSelect:AddressSelect
        }
    }
</script>

