<template>
    <div>
        <mt-header title="查看详情">
            <mt-button icon="back" slot="left" @click="goBack()"></mt-button>
        </mt-header>
        <div class="container_nofoot bg_gary">
            <div class="offerDetail">
                <div class="table">
                    <div class="item">
                        <div class="title">保单状态：</div>
                        <div class="content">{{detail.taskStateDescription}}</div>
                    </div>
                    <div class="item">
                        <div class="title">保险公司：</div>
                        <div class="content">{{detail.prvName}}</div>
                    </div>
                    <div class="item">
                        <div class="title">保费合计：</div>
                        <div class="content yellow">￥{{main.totalPremium}}</div>
                    </div>
                    <div class="item" v-if="main.bizInsureInfo">
                        <div class="title">商业保险生效日期：</div>
                        <div class="content_l">{{main.bizInsureInfo.startDate}}至{{main.bizInsureInfo.endDate}}</div>
                    </div>
                    <div class="item" v-if="main.efcInsureInfo">
                        <div class="title">交强险生效日期：</div>
                        <div class="content_l">{{main.efcInsureInfo.startDate}}至 {{main.efcInsureInfo.endDate}}</div>
                    </div>
                    <div class="item" v-if="main.bizInsureInfo&&main.bizInsureInfo.policyNo">
                        <div class="title">商业险保单号：</div>
                        <div class="content">{{main.bizInsureInfo.policyNo}}</div>
                    </div>
                    <div class="item" v-if="main.efcInsureInfo&&main.efcInsureInfo.policyNo">
                        <div class="title">交强险保单号：</div>
                        <div class="content">{{main.efcInsureInfo.policyNo}}</div>
                    </div>
                    <div class="item" v-if="insureDetail.deliveryAddress">
                        <div class="title">配送地址：{{insureDetail.deliveryAddress.name}},{{insureDetail.deliveryAddress.phone}},{{insureDetail.deliveryAddress.province}}{{insureDetail.deliveryAddress.city}}{{insureDetail.deliveryAddress.area}}{{insureDetail.deliveryAddress.address}},{{insureDetail.deliveryAddress.zip}}</div>
                    </div>
                    <div class="item" v-if="insureDetail.deliveryAddress&&insureDetail.deliveryAddress.expressCompanyName">
                        <div class="title">快递公司：</div>
                        <div class="content">{{insureDetail.deliveryAddress.expressCompanyName}}</div>
                    </div>
                    <div class="item" v-if="insureDetail.deliveryAddress&&insureDetail.deliveryAddress.expressNumber">
                        <div class="title">快递单号：</div>
                        <div class="content">{{insureDetail.deliveryAddress.expressNumber}}</div>
                    </div>
                </div>
                <mt-navbar v-model="selected">
                    <mt-tab-item id="1">基本信息</mt-tab-item>
                    <mt-tab-item id="2">险种详情</mt-tab-item>
                </mt-navbar>
                <mt-tab-container v-model="selected">
                    <mt-tab-container-item id="1">
                        <div class="cps_list_item">
                            <div class="head">
                                <div>车辆信息</div>
                            </div>
                            <div class="cell">
                                <div class="cell_title">车牌号码</div>
                                <div class="cell_content">
                                    {{carInfo.carLicenseNo}}
                                </div>
                            </div>
                            <div class="cell">
                                <div class="cell_title">品牌型号</div>
                                <div class="cell_content">
                                    {{carInfo.vehicleName}}
                                </div>
                            </div>
                            <div class="cell">
                                <div class="cell_title">车辆识别代码</div>
                                <div class="cell_content">
                                    {{carInfo.vinCode}}
                                </div>
                            </div>
                            <div class="cell">
                                <div class="cell_title">发动机号</div>
                                <div class="cell_content">
                                    {{carInfo.engineNo}}
                                </div>
                            </div>
                            <div class="cell">
                                <div class="cell_title">初登日期</div>
                                <div class="cell_content">
                                    {{carInfo.registDate}}
                                </div>
                            </div>
                            <div class="cell" v-if="carInfo.transferDate">
                                <div class="cell_title">过户日期</div>
                                <div class="cell_content">
                                    {{carInfo.transferDate}}
                                </div>
                            </div>
                        </div>
                        <div class="cps_list_item">
                            <div class="head">
                                <div>车主信息</div>
                            </div>
                            <div class="cell">
                                <div class="cell_title">姓名</div>
                                <div class="cell_content">
                                    {{carOwner.name}}
                                </div>
                            </div>
                            <div class="cell">
                                <div class="cell_title">身份证号</div>
                                <div class="cell_content">
                                    {{carOwner.idcardNo}}
                                </div>
                            </div>
                            <div class="cell" v-if="step=='hb'">
                                <div class="cell_title">手机号</div>
                                <div class="cell_content">
                                    {{carOwner.phone}}
                                </div>
                            </div>
                        </div>
                        <div class="cps_list_item" v-if="step=='hb'">
                            <div class="head">
                                <div>投保人信息</div>
                            </div>
                            <div class="cell">
                                <div class="cell_title">姓名</div>
                                <div class="cell_content">
                                    {{applicant.name}}
                                </div>
                            </div>
                            <div class="cell">
                                <div class="cell_title">身份证号</div>
                                <div class="cell_content">
                                    {{applicant.idcardNo}}
                                </div>
                            </div>
                            <div class="cell">
                                <div class="cell_title">手机号</div>
                                <div class="cell_content">
                                    {{applicant.phone}}
                                </div>
                            </div>
                        </div>
                        <div class="cps_list_item" v-if="step=='hb'">
                            <div class="head">
                                <div>被保人信息</div>
                            </div>
                            <div class="cell">
                                <div class="cell_title">姓名</div>
                                <div class="cell_content">
                                    {{insured.name}}
                                </div>
                            </div>
                            <div class="cell">
                                <div class="cell_title">身份证号</div>
                                <div class="cell_content">
                                    {{insured.idcardNo}}
                                </div>
                            </div>
                            <div class="cell">
                                <div class="cell_title">手机号</div>
                                <div class="cell_content">
                                    {{insured.phone}}
                                </div>
                            </div>
                        </div>
                        <div class="cps_list_item" v-if="step=='hb'">
                            <div class="head">
                                <div>索赔权益人保人信息</div>
                            </div>
                            <div class="cell">
                                <div class="cell_title">姓名</div>
                                <div class="cell_content">
                                    {{beneficiary.name}}
                                </div>
                            </div>
                            <div class="cell">
                                <div class="cell_title">身份证号</div>
                                <div class="cell_content">
                                    {{beneficiary.idcardNo}}
                                </div>
                            </div>
                            <div class="cell">
                                <div class="cell_title">手机号</div>
                                <div class="cell_content">
                                    {{beneficiary.phone}}
                                </div>
                            </div>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">
                        <div class="cps_list_item" v-if="main['bizInsureInfo']">
                            <div class="head">
                                <div>商业险</div>
                            </div>
                            <div v-for="item in riskList" class="cps_cell">
                                <div class="cell">
                                    <div class="cell_title_s">{{item.riskName}}</div>
                                    <div class="cell_content_1">
                                        {{item.amountFormat}}
                                    </div>
                                    <div class="cell_content_1">
                                        ￥{{item.premium}}
                                    </div>
                                </div>
                                <div class="cell" v-if="judgeNf(item)">
                                    <div class="cell_title_s">不计免赔（{{item.riskName}}）</div>
                                    <div class="cell_content_1">
                                        投保
                                    </div>
                                    <div class="cell_content_1">
                                        ￥{{item.ncfPremium}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="cps_list_item" v-if="main['efcInsureInfo']||main['taxInsureInfo']">
                            <div class="head">
                                <div>交强险和车船税</div>
                            </div>
                            <div class="cell" v-if="main['efcInsureInfo']">
                                <div class="cell_title_s">交强险</div>
                                <div class="cell_content_1">
                                    购买
                                </div>
                                <div class="cell_content_1">
                                    ￥{{main['efcInsureInfo']['premium']}}
                                </div>
                            </div>
                            <div class="cell" v-if="main['taxInsureInfo']">
                                <div class="cell_title_s">车船税</div>
                                <div class="cell_content_1">
                                    代缴
                                </div>
                                <div class="cell_content_1">
                                    ￥{{main['taxInsureInfo']['taxFee']}}
                                </div>
                            </div>
                        </div>
                        <div class="cps_list_item">
                            <div class="cell">
                                <div class="cell_title_s"></div>
                                <div class="cell_content_2">
                                    <h4>合计：<span class="money">￥{{main.totalPremium}}</span></h4>
                                </div>
                            </div>
                        </div>
                    </mt-tab-container-item>
                </mt-tab-container>
                <div class="btn_group" v-if="step=='hb'">
                    <a v-bind:href="servicePhone" class="btn">
                        <i class="icon"></i>
                        联系客服
                    </a>
                    <button class="btn" @click="dealOrder()">马上支付</button>
                </div>
                <div class="btn_group" v-if="step=='bj'">
                    <a v-bind:href="servicePhone" class="btn">
                        <i class="icon"></i>
                        联系客服
                    </a>
                    <button class="btn" @click="toHb()">马上投保</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapState,mapActions} from 'vuex'
    import {Toast} from 'mint-ui'
    export default {
        name: '',//详情
        data(){
            return {
                selected: '1',
                servicePhone:"tel:"+SERVICEPHONE,
                main: {},//保险基本信息
                carInfo: {},
                carOwner: {
                    email: "",
                    idcardNo: "",
                    name: "",
                    phone: ""
                },
                applicant:{
                    email: "",
                    idcardNo: "",
                    name: "",
                    phone: ""
                },
                beneficiary:{
                    email: "",
                    idcardNo: "",
                    name: "",
                    phone: ""
                },
                insured:{
                    email: "",
                    idcardNo: "",
                    name: "",
                    phone: ""
                },
                riskList: [],
                insureDetail:{},
            }
        },
        methods: {
            ...mapActions([
                'showLoginBox'
            ]),
            judgeNf(item){
                let m_ = parseFloat(item['ncfPremium']);
                if(item['notDeductible']=='Y'&&m_>0){
                    return true
                }else{
                    return false
                }
            },
            toHb(){
                this.$router.push({path: '/dealOrder', query: {
                    detail: this.detail,
                }})
            },
            dealOrder(){
                this.$router.push({path: '/pay', query: {
                    detail: this.detail
                }})
            },

            getDetail(){
                this.$http.post(BASE_URL + '/offerStatus/getPrvUnderwritingDetailInfo', {
                    "offerId": this.detail['id'],
                    "prvId": this.detail['prvId'],
                    "token": this.token
                }).then(res=> {
                    let data = res.data;
                    if (data.status == 'SUCCESS') {
                        this.insureDetail = data.content;
                        this.main = data.content['insureInfo'];
                        this.riskList = data.content['insureInfo']['bizInsureInfo']&&data.content['insureInfo']['bizInsureInfo']['riskKinds'];
                        this.carInfo = data.content['carInfo'];
                        this.carOwner = Object.assign(this.carOwner,data.content['carOwner']);//车主
                        this.applicant =Object.assign(this.applicant,data.content['applicant']) ;//投保人
                        this.insured =Object.assign(this.insured,data.content['insured']) ;//被保人
                        this.beneficiary =Object.assign(this.beneficiary,data.content['beneficiary']);//索赔权益人
                    } else if (data.status == 'PLEASE_LOGIN') {
                        this.$router.push({path: '/'})
                    } else {
                        this.$toast(data.msg);
                    }
                }, err=> {
                    this.$toast('获取详情失败，请检查你的网络')
                })
            },

            goBack(){
                this.$router.push({path:'/order'});
            }
        },
        mounted(){
            this.getDetail();
        },
        computed: {
            ...mapState([
                'token'
            ]),
            detail: function () {
                return this.$route.query.detail
            },
            step:function(){
                return this.$route.query.step
            }
        }
    }
</script>

<style>
    .btn_box {
        padding: 10px;
    }
    .money {
        font-family:PingFang-SC-Medium;
        font-size: 18px;
        color: #FF7D00;
    }
    .cps_cell>.cell:last-child{
        border-bottom: 1px solid #eeeeee;
    }
</style>
