<template>
    <div>
        <mt-header title="自选保险配置">
            <router-link :to="{path:'/order'}" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container_nofoot bg_gary">
            <p class="warning">
                *投保具体金额以保险公司报价为准
            </p>
            <div class="cps_list_item">
                <div class="head" :class="{'noborder':!showlist1}">
                    <div>商业险</div>
                    <mt-switch v-model="showlist1"></mt-switch>
                </div>
                <div class="list" v-if="showlist1">
                    <div class="cell" v-for="(select,index) in selectList" v-if="select.show">
                        <div class="cell_title_s">{{select.riskName}}</div>
                        <div class="cell_content_1">
                            <div class="select" @click="selectOp(select,index)" v-bind:class="{'gary':select.val.value=='N'}">
                                {{select.val.name}}
                            </div>
                        </div>
                        <div class="cell_content_1">
                            <label class="checkbox" v-if="select.delitem==2&&select.val.value!='N'">
                                <input type="checkbox" v-bind:disabled="select.val.value=='N'" v-model="select.notDeductible">
                                <span class="check_title">不计免赔</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cps_list_item">
                <div class="head" :class="{'noborder':!showlist2}">
                    <div>交强险和车船税险</div>
                    <mt-switch v-model="showlist2"></mt-switch>
                </div>
                <div class="list" v-if="showlist2">
                    <div class="cell">
                        <div class="cell_title_s">交强险</div>
                        <div class="cell_content">购买</div>
                    </div>
                    <div class="cell">
                        <div class="cell_title_s">车船税</div>
                        <div class="cell_content">代缴</div>
                    </div>
                </div>
            </div>
            <!--<div class="cps_list_item">-->
                <!--<div class="head">-->
                    <!--<div>保险生效日期</div>-->
                <!--</div>-->
                <!--<div class="list">-->
                    <!--<div class="cell" v-if="showlist1">-->
                        <!--<div class="cell_title_s">商业险</div>-->
                        <!--<div class="cell_content_2">-->
                            <!--{{bizStartDate}}-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="cell" v-if="showlist2">-->
                        <!--<div class="cell_title_s">交强险</div>-->
                        <!--<div class="cell_content_2">-->
                            <!--{{efcStartDate}}-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <div class="btn_box">
                <button class="btn btn_block" @click="getOffer()" v-bind:disabled="!showlist1&&!showlist2">开始报价</button>
            </div>
        </div>

        <picker v-model="selectModel" :data-items="selectItems" @change="onValuesChange">
            <div class="picker_toolbar" slot="top-content">
                <button @click="selectModel=false">取消</button>
                <button @click="selectModel=false">确定</button>
            </div>
        </picker>
    </div>
</template>

<script type="text/ecmascript-6">
    import {Toast,MessageBox,Indicator} from 'mint-ui'
    import {mapState,mapActions} from 'vuex'
    export default {
        name: '',//自选保单配置
        data(){
            return {
                showlist1: true,
                showlist2: true,
                bizStartDate:"",
                efcStartDate:"",
                selectModel: false,
                selectItems: [],
                selectedIndex: 0,
                selectList: [
                    {
                        riskName: "机动车损失险",
                        riskCode: 'VehicleDemageIns',
                        val: {
                            name: '不投保',
                            value: 'N'
                        },
                        options: [
                            {
                                name: "不投保",
                                value: "N"
                            },
                            {
                                name: "投保",
                                value: "Y"
                            }
                        ],
                        notDeductible: false,
                        delitem: 2,
                        show: true,
                    },
                    {
                        riskName: "第三方责任险",
                        riskCode: "ThirdPartyIns",
                        val: {
                            name: "不投保",
                            value: "N"
                        },
                        options: [
                            {
                                name: "不投保",
                                value: "N"
                            },
                            {
                                name: "5万",
                                value: 50000
                            },
                            {
                                name: "10万",
                                value: 100000
                            },
                            {
                                name: "15万",
                                value: 150000
                            },
                            {
                                name: "20万",
                                value: 200000
                            },
                            {
                                name: "30万",
                                value: 300000
                            },
                            {
                                name: "50万",
                                value: 500000
                            },
                            {
                                name: "100万",
                                value: 1000000
                            },
                            {
                                name: "150万",
                                value: 1500000
                            },
                            {
                                name: "200万",
                                value: 2000000
                            },
                            {
                                name: "250万",
                                value: 2500000
                            },
                            {
                                name: "300万",
                                value: 3000000
                            }
                        ],
                        notDeductible: false,
                        delitem: 2,
                        show: true
                    },
                    {
                        riskName: "盗抢险",
                        riskCode: 'TheftIns',
                        val: {
                            name: "不投保",
                            value: "N"
                        },
                        options: [
                            {
                                name: "不投保",
                                value: "N"
                            },
                            {
                                name: "投保",
                                value: "Y"
                            }
                        ],
                        notDeductible: false,
                        delitem: 2,
                        show: true
                    },
                    {
                        riskName: "司机责任险",
                        riskCode: 'DriverIns',
                        val: {
                            name: "不投保",
                            value: "N"
                        },
                        options: [
                            {
                                name: "不投保",
                                value: "N"
                            },
                            {
                                name: "5千",
                                value: 5000
                            },
                            {
                                name: "1万",
                                value: 10000
                            },
                            {
                                name: "2万",
                                value: 20000
                            },
                            {
                                name: "3万",
                                value: 30000
                            },
                            {
                                name: "4万",
                                value: 40000
                            },
                            {
                                name: "5万",
                                value: 50000
                            },
                            {
                                name: "10万",
                                value: 100000
                            },
                            {
                                name: "15万",
                                value: 150000
                            },
                            {
                                name: "20万",
                                value: 200000
                            },
                            {
                                name: "50万",
                                value: 500000
                            }
                        ],
                        notDeductible: false,
                        delitem: 2,
                        show: true
                    },
                    {
                        riskName: "乘客责任险",
                        riskCode: "PassengerIns",
                        val: {
                            name: "不投保",
                            value: "N"
                        },
                        options: [
                            {
                                name: "不投保",
                                value: "N"
                            },
                            {
                                name: "5千",
                                value: 5000
                            },
                            {
                                name: "1万",
                                value: 10000
                            },
                            {
                                name: "2万",
                                value: 20000
                            },
                            {
                                name: "3万",
                                value: 30000
                            },
                            {
                                name: "4万",
                                value: 40000
                            },
                            {
                                name: "5万",
                                value: 50000
                            },
                            {
                                name: "10万",
                                value: 100000
                            },
                            {
                                name: "15万",
                                value: 150000
                            },
                            {
                                name: "20万",
                                value: 200000
                            },
                            {
                                name: "50万",
                                value: 500000
                            }
                        ],
                        notDeductible: false,
                        delitem: 2,
                        show: true
                    },
                    {
                        riskName: "玻璃单独破碎险",
                        riskCode: "GlassIns",
                        val: {
                            name: "不投保",
                            value: "N"
                        },
                        options: [
                            {
                                name: "不投保",
                                value: "N"
                            },
                            {
                                name: "国产",
                                value: 1
                            },
                            {
                                name: "进口",
                                value: 2
                            }
                        ],
                        delitem: 1,
                        show: true
                    },
                    {
                        riskName: "自燃损失险",
                        riskCode: "CombustionIns",
                        val: {
                            name: "不投保",
                            value: "N"
                        },
                        options: [
                            {
                                name: "不投保",
                                value: "N"
                            },
                            {
                                name: "投保",
                                value: "Y"
                            }
                        ],
                        notDeductible: false,
                        delitem: 2,
                        show: true
                    },
                    {
                        riskName: "车身划痕险",
                        riskCode: "ScratchIns",
                        val: {
                            name: "不投保",
                            value: "N"
                        },
                        options: [
                            {
                                name: "不投保",
                                value: "N"
                            },
                            {
                                name: "2千",
                                value: 2000
                            },
                            {
                                name: "5千",
                                value: 5000
                            },
                            {
                                name: "1万",
                                value: 10000
                            },
                            {
                                name: "2万",
                                value: 20000
                            }
                        ],
                        notDeductible: false,
                        delitem: 2,
                        show: true
                    },
                    {
                        riskName: "涉水损失险",
                        riskCode: "WadingIns",
                        val: {
                            name: "不投保",
                            value: "N"
                        },
                        options: [
                            {
                                name: "不投保",
                                value: "N"
                            },
                            {
                                name: "投保",
                                value: "Y"
                            }
                        ],
                        notDeductible: false,
                        delitem: 2,
                        show: true
                    },
                    {
                        riskName: "机动车损失保险无法找到第三方特约险",
                        riskCode: "VehicleDemageMissedThirdPartyCla",
                        val: {
                            name: "不投保",
                            value: "N"
                        },
                        options: [
                            {
                                name: "不投保",
                                value: "N"
                            },
                            {
                                name: "投保",
                                value: "Y"
                            }
                        ],
                        delitem: 1,
                        show: true
                    },
                    {
                        riskName: "指定专修厂险",
                        riskCode: "SpecifyingPlantCla",
                        val: {
                            name: "不投保",
                            value: "N"
                        },
                        options: [
                            {
                                name: "不投保",
                                value: "N"
                            },
                            {
                                name: "投保",
                                value: "Y"
                            }
                        ],
                        delitem: 1,
                        show: true
                    },
                    {
                        riskName: "车上货物责任险",
                        riskCode: "GoodsOnVehicleIns",
                        val: {
                            name: "不投保",
                            value: "N"
                        },
                        options: [
                            {
                                name: "不投保",
                                value: "N"
                            },
                            {
                                name: "1万",
                                value: 10000
                            },
                            {
                                name: "2万",
                                value: 20000
                            },
                            {
                                name: "5万",
                                value: 50000
                            },
                            {
                                name: "10万",
                                value: 100000
                            },
                            {
                                name: "20万",
                                value: 200000
                            }
                        ],
                        notDeductible: false,
                        delitem: 2,
                        show: true
                    },
                    {
                        riskName: "精神抚慰金责任险",
                        riskCode: "CompensationForMentalDistressIns",
                        val: {
                            name: "不投保",
                            value: "N"
                        },
                        options: [
                            {
                                name: "不投保",
                                value: "N"
                            },
                            {
                                name: "1万",
                                value: 10000
                            },
                            {
                                name: "2万",
                                value: 20000
                            },
                            {
                                name: "3万",
                                value: 30000
                            },
                            {
                                name: "4万",
                                value: 40000
                            },
                            {
                                name: "5万",
                                value: 50000
                            }
                        ],
                        notDeductible: false,
                        delitem: 2,
                        show: true
                    }
                ],
            }
        },
        methods: {
            ...mapActions([
                'showLoginBox',
                'hideLoginBox'
            ]),
            loading(){
                Indicator.open({spinnerType: 'fading-circle'});
            },
            loadingClose(){
                Indicator.close();
            },
            /**
             * 触发选择事件
             * @param val
             */
            onValuesChange(val){
                if (!val) return;
                this.selectList[this.selectedIndex].val = val;
                if (this.selectedIndex === 0) {
                    this.optionsFmt();
                }
                if(val.value=='N'){
                    this.selectList[this.selectedIndex].notDeductible = false;
                }else{
                    this.selectedIndex<5?this.selectList[this.selectedIndex].notDeductible = true:"";
                }
            },
            /**
             * 选项关联
             */
            optionsFmt(){
                //机动车损失险
                let s_ = this.selectList[0];
                let show_ = true;
                if (s_.val.value != 'Y') {
                    show_ = false;
                } else {
                    show_ = true;
                }
                for (let i = 5; i < 11; i++) {
                    this.selectList[i].show = show_;
                    this.selectList[i].val = {
                        name: "不投保",
                        value: "N"
                    };
                    this.selectList[i].notDeductible = false;
                }
            },
            /**
             * 唤起下拉选择
             * @param select
             * @param index
             */
            selectOp(select, index){
                this.selectItems = [{
                    name: 'name',
                    values: select.options
                }];
                this.selectedIndex = index;
                this.selectModel = true;
            },
            /**
             * 获取保险生效日期
             */
            getRiskDate(token){
                return new Promise((resolve,reject)=>{
                    this.$http.post(BASE_URL+'/carInsurance/getInsuranceEffectiveDate',{token}).then(res=>{
                        if(res.data.status=='SUCCESS'){
                            resolve(res.data);
                        }else if(res.data.status=='PLEASE_LOGIN'){
                            this.showLoginBox();
                            reject();
                        }else {
                            reject();
                        }
                    },err=>{
                        reject()
                    })
                })

            },
            /**
             * 生成任务
             */
            getOffer(){
                let riskKinds = [];
                this.selectList.forEach(item=>{
                    if(item.val.value!='N'){
                        riskKinds.push({
                            "amount": typeof item.val.value=="number"?item.val.value:0,
                            "notDeductible": item.notDeductible?"Y":"N",
                            "riskCode": item.riskCode,
                            "riskName": item.riskName,
                        })
                    }
                });
                let postData = {
                    "insureInfo": {
                        "bizInsureInfo": {
                                "startDate":'',
                                "endDate":'',
                            "riskKinds": riskKinds,
                        },
                        "taxInsureInfo": {
                            "isPaymentTax": "Y"
                        },
                        "efcInsureInfo": {
                                "startDate":'',
                                "endDate":'',
                        }
                    },
                    "token": this.token
                };
                //商业险全部不投保（或者关闭） 交强险不购买
                if(riskKinds.length==0){
                    this.showlist1 = false;
                    if(!this.showlist2){
                        return
                    }
                }
                if(!this.showlist1&&!this.showlist2){
                    return
                }
                // 关闭
                if(!this.showlist1){
                    delete postData['insureInfo']["bizInsureInfo"];
                }
                // 关闭交强险
                if(!this.showlist2){
                    delete postData['insureInfo']['taxInsureInfo'];
                    delete postData['insureInfo']['efcInsureInfo'];
                }

                /*提交自选保单配置 或者修改保单配置*/
                if(this.$route.query.edit){
                  console.log(this.$route.query.edit)
                    postData.offerId = this.$route.query.edit.id;
                    //修改
                    this.editOffer(postData);
                }else{
                    //生成
                    postData['insureRelationId'] = this.$route.query.content;
                    this.orderOffer(postData);
                }
            },
            /**
             * orderoffer 自选提交 接口返回的relationId 传到下个页面查询
             */
            orderOffer(postData){
                this.loading();
                this.$http({
                    method:"POST",
                    url:BASE_URL+'/carInsurance/submitInsuranceConfig',
                    data:postData
                }).then(res=>{
                    let data = res.data;
                    if(data.status=='PLEASE_LOGIN'){
                        this.$toast(data.msg);
                        setTimeout(this.showLoginBox,1000);
                    }else if(data.status=="SUCCESS"){
                        this.loadingClose();
                        this.$router.push({
                            path: '/offerList',
                            query:{
                                insureRelationId:data.content.insureRelationId
                            }
                        })
                    }else{
                        this.loadingClose()
                        this.$toast(data.msg);
                    }
                },err=>{
                    this.$toast('请检查你的网络设置');
                })
            },
            //订单修改某一条 将上个页面的relation id 再传回去
            editOffer(postData){
                this.loading();
                this.$http({
                    method:"POST",
                    url:BASE_URL+'/carInsurance/submitInsurancePrvConfig',
                    data:postData
                }).then(res=>{
                    let data = res.data;
                    if(data.status=='PLEASE_LOGIN'){
                        this.$toast(data.msg);
                        setTimeout(this.showLoginBox,1000);
                    }else if(data.status=="SUCCESS"){
                        this.$router.push({
                          path: '/offerList',
                          query:{
                            insureRelationId:this.$route.query.insureRelationId,
                            carLicenseNo:this.$route.query.carLicenseNo
                          }
                        })
                    }else{
                        this.loadingClose()
                        this.$toast(data.msg);
                    }
                },err=>{
                    this.$toast('请检查你的网络设置');
                    this.$store.dispatch('loadErr',true)
                })
            }
        },
        watch:{
            showlist1(val){
                if(!val){
                    this.$messagebox.confirm("确认不购买商业险?").then(action=>{
                    },rej=>{
                        this.showlist1 = true;
                    })
                }
            },
            showlist2(val){
                if(!val){
                    this.$messagebox.confirm("确认不购买交强险和车船税险?").then(action=>{
                    },rej=>{
                        this.showlist2 = true;
                    })
                }
            }
        },
        mounted(){
            this.getRiskDate(this.token).then(res=>{
                this.bizStartDate = res.content.bizStartDate;
                this.efcStartDate = res.content.efcStartDate;
            },err=>{});
            //当前处理关联选项
            this.optionsFmt();
        },
        computed:{
            ...mapState([
                'token'
            ])
        }
    }
</script>

<style>
    .btn_box {
        margin-top: 10px;
        padding: 10px;
    }

    .warning {
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #FF7D00;
        background: #FFEFDF;
        text-align: center;
        line-height: 30px;
    }
</style>
