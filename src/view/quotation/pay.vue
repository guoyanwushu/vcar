<template>
    <div>
        <mt-header title="支付订单">
            <mt-button icon="back" slot="left" @click="goback()"></mt-button>
        </mt-header>
        <div class="container_nofoot bg_gary">
            <div class="pay_box">
                <div class="pay_item">
                    <div class="pay_item_head islink" @click="openSelect()" v-if="!recvAddressInfo">
                        <i class="icon local_icon"></i> 填写保单配送地址
                    </div>
                </div>

                <div class="pay_item islink" @click="openSelect()" v-if="recvAddressInfo">
                    <div class="pay_item_head flex">
                        <div>
                            <i class="icon local_icon"></i>保单配送方式
                        </div>
                        <div>
                            {{typeTrans(recvAddressInfo.deliveryType)}}
                        </div>
                    </div>
                    <div class="pay_item_content noborder">
                        <div class="person_info">
                            <div>{{recvAddressInfo.recvName}}</div>
                            <div>{{recvAddressInfo.recvMobile}}</div>
                        </div>
                        <div class="address_dec">
                            {{recvAddressInfo.detailAddress}}
                        </div>
                    </div>
                </div>
                <div class="pay_item">
                    <div class="pay_item_head">
                        <i class="icon time_icon"></i> 保险期间
                    </div>
                    <div class="pay_item_content">
                        <div class="time_dec">
                            保险生效日期 {{bstartDate}} 至{{bendDate}}
                        </div>
                        <div class="time_dec">
                            交强险生效日期 {{estartDate}} 至{{eendDate}}
                        </div>
                    </div>
                </div>
                <div class="pay_item">
                    <div class="pay_item_head">
                        <i class="icon money_icon"></i> 订单金额
                    </div>
                    <div class="pay_item_content">
                        <div class="money_dec" v-if="bPremium">
                            <span>商业险</span>
                            <span>￥{{bPremium}}</span>
                        </div>
                        <div class="money_dec" v-if="ePremium">
                            <span>交强险</span>
                            <span>￥{{ePremium}}</span>
                        </div>
                        <div class="money_dec" v-if="tPremium">
                            <span>车船税</span>
                            <span>￥{{tPremium}}</span>
                        </div>
                        <div class="money_dec">
                            <span>合计</span>
                            <span class="yellow">￥{{totalPremium}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn_group">
                <a v-bind:href="servicePhone" class="btn">
                    <i class="icon"></i>
                    联系客服
                </a>
                <button class="btn" @click="payment()">马上支付</button>
            </div>
        </div>

        <mt-popup v-model="popupVisible"
                  position="right"
                  :modal="false"
                  class="popStateA">
            <mt-header title="保单配送地址">
                <mt-button icon="back" slot="left" @click="popupVisible=false"></mt-button>
            </mt-header>
                <div class="container_nofoot">
                    <div class="address-item" v-for="address in addressList">
                        <div class="account-box">
                            <p class="flex-between">
                                <span>{{address.name}}</span><span>{{address.mobile}}</span>
                            </p>
                            <p class="addressdetail">{{address.provinces}}{{address.detailAddress}}</p>
                        </div>
                        <div class="flex-between">
                            <div class="select-box">
                                <input
                                        type="radio"
                                        v-bind:value="address"
                                        name="address"
                                        v-model="selectedAdd"
                                        v-bind:id="address.addressId"
                                        v-on:change="selectOrderAddress()"
                                >
                                <label v-bind:for="address.addressId"></label>
                                <span>选中地址</span>
                            </div>
                            <div class="opt-box" @click="deleteAddress(address)">
                                <img src="../../assets/icon_autoinsurance_delete@3x.png" alt="删除小图标">
                                <span>删除</span>
                            </div>
                        </div>
                    </div>
                    <!--<div class="addaddress" @click="addNewAddress()">-->
                        <!--<img src="../../assets/btn_withdrawals_add@3x.png" alt=""><span>新增收货地址</span>-->
                    <!--</div>-->
                    <div class="btn-container">
                        <button class="btn btn_block"  @click="addNewAddress()">+ 新增收货地址</button>
                    </div>
                    <address-select
                            :visible.sync="addressAddNew"
                            v-on:fillover="filledover"
                    ></address-select>
                </div>
        </mt-popup>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapState,mapActions} from 'vuex'
    import {Toast,Popup,MessageBox} from 'mint-ui'
    import AddressSelect from 'src/components/AddressSelect'

    export default {
        name: '',
        data(){
            return {
                popupVisible: false,//选择地址展示
                addressAddNew:false,//新增收货地址
                servicePhone: 'tel:' + SERVICEPHONE,
                recvAddressInfo: null,
                bstartDate:null,
                bendDate:null,
                estartDate:null,
                eendDate:null,
                bPremium:0,
                ePremium:0,
                tPremium:0,
                totalPremium:0,
                addressList:null,
                selectedAdd:null
            }
        },
        methods: {
            ...mapActions([
                    'showLoginBox'
            ]),
            openSelect(){
                this.loadAddressList();
                this.popupVisible = true
            },
            //增加收货地址
            filledover(data){
                //这里执行订货单保存
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
                        this.loadAddressList();
                    }
                },err=>{

                })
            },

            typeTrans(type){
                switch (type){
                    case "1" : return "快递";
                    default : return "快递"
                }
            },
            //
            selectOrderAddress(){
                this.popupVisible = false;
                if(this.selectedAdd){
                    this.saveOrderAdd(this.selectedAdd).then(res=>{
                        this.loadAddress();
                    },err=>{
                        this.$toast('设置保单收货地址失败，请重试')
                    })
                }
            },
            //保存保单收货地址
            saveOrderAdd(add){
                return new Promise((resolve,reject)=>{
                    if(!add){
                        reject()
                    }else{
                        this.$http.post(BASE_URL+'/policy/delivery/saveDeliveryAddress',{
                            areaCode:add.areaCode,
                            cityCode:add.cityCode,
                            deliveryType:"1",
                            detailAddress:add.detailAddress,
                            offerId: this.detail['id'],
                            prvId: this.detail['prvId'],
                            provinceCode:add.provinceCode,
                            recvMobile:add.mobile,
                            recvName:add.name,
                            token:this.token
                        }).then(res=>{
                            let data = res.data;
                            if(data.status=='SUCCESS'){

                                resolve()
                            }else{
                                reject()
                            }
                        },err=>{
                            reject()
                        })
                    }
                })
            },

            deleteAddress(address){
                this.$messagebox.confirm("确认删除该地址?").then(action=>{
                    this.$http.post(BASE_URL+'/customer/receiveAddress/delete',{
                        "addressId": address.addressId,
                        "token": this.token
                    }).then(res=>{
                        if(res.data.status=='SUCCESS'){
                            this.loadAddressList();
                        }else{
                            this.$toast(res.data.msg);
                        }
                    },err=>{
                        this.$store.dispatch('loadErr',true);
                    })
                },rej=>{})
            },
            //支付
            payment(){
                //支付接口
                this.$http.post(BASE_URL+'/pay/request',{
                    "offerId": this.detail['id'],
                    "prvId": this.detail['prvId'],
                    "source": REGSOURCE,
                    "token": this.token
                }).then(res=>{
                    let data = res.data;
                    if(data.status=='SUCCESS'){
                        window.location.href = data.content.payUrl;
                    }else if(data.status=='PLEASE_LOGIN'){
                        this.$toast(data.msg);
                        this.showLoginBox();
                    }else{
                        this.$toast(data.msg);
                    }
                })
            },

            goback(){
                this.$router.push({path: '/order'})
            },
            // 载入收货地址
            loadAddress(){
                this.$http.post(BASE_URL+'/policy/delivery/getDeliveryAddress',{
                    token:this.token,
                    offerId: this.detail['id'],
                    prvId: this.detail['prvId'],
                }).then(res=>{
                    let data = res.data, content = data.content;
                    if(data.status=='SUCCESS'){
                        if(content){
                            this.recvAddressInfo = {
                                areaCode:content.area,
                                cityCode:content.city,
                                deliveryType:content.deliveryType,
                                detailAddress:content.address,
                                provinceCode:content.province,
                                recvMobile:content.phone,
                                recvName:content.name
                            }
                        }
                    }else if(data.status=='PLEASE_LOGIN'){
                        this.$toast(data.msg);
                        this.showLoginBox();
                    }else{
                        this.$toast(data.msg);
                    }
                },err=>{
                    this.$toast('网络错误，请检查你的网络连接');
                })
            },
            //载入收货地址列表
            loadAddressList(){
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
            //获取订单详情
            getDetail(){
                this.$http.post(BASE_URL + '/offerStatus/getPrvUnderwritingDetailInfo', {
                    "offerId": this.detail['id'],
                    "token": this.token,
                    "prvId": this.detail['prvId'],
                }).then(res=> {
                    let data = res.data;
                    if (data.status == 'SUCCESS') {
                        let main = data.content['insureInfo'];
                                this.bstartDate=main['bizInsureInfo']&&main['bizInsureInfo'].startDate;
                                this.bendDate=main['bizInsureInfo']&&main['bizInsureInfo'].endDate;
                                this.estartDate=main['efcInsureInfo']&&main['efcInsureInfo'].startDate;
                                this.eendDate=main['efcInsureInfo']&&main['efcInsureInfo'].endDate;
                                this.bPremium=main['bizInsureInfo']&&main['bizInsureInfo'].premium;
                                this.ePremium = main['efcInsureInfo']&&main['efcInsureInfo'].premium;
                                this.tPremium = main['taxInsureInfo']&&main['taxInsureInfo'].taxFee;
                                this.totalPremium = main.totalPremium;
//
                    } else if (data.status == 'PLEASE_LOGIN') {
                        this.$router.push({path: '/'})
                    } else {
                        this.$toast(data.msg);
                    }
                }, err=> {
                    this.$toast('获取详情失败，请检查你的网络')
                })
            },
            //打开新增页面
            addNewAddress(){
                this.addressAddNew = true
            }
        },
        watch:{
            isLogin(val){
                if(val){
                    this.loadAddress();
                }
            }
        },
        mounted(){
            this.loadAddress();
            this.getDetail();

        },
        components: {
            addressSelect: AddressSelect
        },
        computed: {
            detail(){
                return this.$route.query.detail;
            },
            ...mapState([
                'isLogin',
                'token'
            ])
        }
    }
</script>

<style scoped>

    .popStateA{
        width: 100%;
        height: 100%;
    }
    .btn {
        text-decoration: none;
    }

    .text_right {
        text-align: right;
    }

    .btn_box_pay {
        padding-left: 10px;
        padding-right: 10px;
        height: 70px;
    }

    .pay_box {
        overflow: auto;
        height: -webkit-calc(100% - 80px);
        height: -moz-calc(100% - 80px);
        height: calc(100% - 80px);
    }

    .btn-container {
        box-sizing: border-box;
        padding: 10px 12px;
        position: absolute;
        bottom: 0px;
        width: 100%;
    }
    .btn-container button.active {
        opacity: 1;
    }
    .addaddress {
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
    }
    .addaddress img {
        width: 14px;
        height: 14px;
        margin-right: 5px;
    }
    .account-box {
        padding-top: 14px;
        padding-right: 12px;
        box-shadow: 0 0.5px 0 0 #C8C7CC;
        margin-bottom: 1px;
        overflow: hidden;
    }
    .account-box .addressdetail {
        margin-top: 10px;
        margin-bottom: 2px;
    }
    .container_nofoot {
        box-sizing: border-box;
        background-color: #EFEFF4;
    }
    .flex-between {
        display: flex;
        justify-content: space-between;
    }
    .address-item {
        padding-left: 12px;
        font-size: 14px;
        line-height: 20px;
        background-color: #fff;
        margin-bottom: 10px;
        color: #4D4D4D;
    }
    .select-box {
        height: 44px;
        line-height: 44px;
        display: flex;
        align-items: center;
    }
    .select-box label {
        display: inline-block;
        width: 14px;
        height: 14px;
        background-image: url("../../assets/icon_autoinsurance_unchecked@3x.png");
        background-size: contain;
        margin-right: 5px;
        -webkit-tap-highlight-color: transparent;
    }
    .select-box input {
        width: 0;
        height: 0;
        visibility: hidden;
    }
    .select-box input:checked + label {
        background-image: url("../../assets/icon_automobileinsurance_checkedcircle@3x.png");
    }
    .select-box input:checked + label + span {
        color: #FF7D00;
    }
    .opt-box {
        height: 44px;
        padding-right: 15px;
        line-height: 44px;
        display: flex;
        align-items: center;
    }
    .opt-box img {
        width: 14px;
        height: 14px;
        margin-right: 4px;
    }

</style>
