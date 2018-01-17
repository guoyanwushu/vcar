<template>
    <div class="popState" v-show="visible">
        <mt-header title="保单配送信息">
            <mt-button icon="back" slot="left" @click="hide()"></mt-button>
        </mt-header>
        <div class="container_nofoot bg_gary">
            <div class="warning_box" v-if="createErr">
                {{errMsg}}
            </div>
            <div class="pay_box">
                <div class="cell">
                    <div class="cell_title">配送方式</div>
                    <div class="cell_content_1 text_right">快递</div>
                </div>
                <div class="cell">
                    <div class="cell_title">姓名</div>
                    <div class="cell_content_1">
                        <input type="text" placeholder="请输入姓名" v-model="recvName ">
                    </div>
                </div>
                <div class="cell">
                    <div class="cell_title">手机号码</div>
                    <div class="cell_content_1">
                        <input type="number" maxlength="11" placeholder="请输入手机号码" v-model="recvMobile ">
                    </div>
                </div>
                <div class="cell islink" @click="setAddress()">
                    <div class="cell_title">省市区</div>
                    <div class="cell_content_1 pd_10">
                        {{addName}}
                    </div>
                </div>
                <div class="cell">
                    <textarea maxlength="100" class="detail_add" v-model="detailAddress" placeholder="请输入详细地址（不少于5个字）"></textarea>
                </div>
            </div>
            <div class="btn_box_pay">
                <button class="btn btn_block" @click="createAdd()">保存</button>
            </div>
        </div>
        <mt-popup
                v-model="addVisible"
                position="right"
                :modal="false"
                class="addresDel"
        >
            <mt-header title="所在地区">
                <mt-button icon="back" @click="back()" slot="left"></mt-button>
            </mt-header>
            <div class="container_nofoot bg_gary" v-if="state==1">
                <div class="cell islink" @click="chosenPcode(pro)" v-for="pro in proList">
                    <div class="cell_title">
                       {{pro.provinceName}}
                    </div>
                </div>
            </div>
            <div class="container_nofoot bg_gary" v-if="state==2">
                <div class="cell islink" @click="chosenCcode(city)" v-for="city in cityList">
                    <div class="cell_title" v-if="city.level==2">
                        {{city.cityName}}
                    </div>
                    <div class="cell_title" v-else>
                        {{city.areaName}}
                    </div>
                </div>
            </div>
            <div class="container_nofoot bg_gary" v-if="state==3">
                <div class="cell islink" @click="chosenAcode(area)" v-for="area in areaList">
                    <div class="cell_title">
                        {{area.areaName}}
                    </div>
                </div>
            </div>
        </mt-popup>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapActions} from 'vuex'
    export default {
        name: '',
        data(){
            return{
                addVisible:false,
                state:1,
                addName:"",
                createErr:false,
                errMsg:"",
                //省级列表
                proList:[],
                //市
                cityList:[],
                //区
                areaList:[],
                //生成一个详细的收货地址
                recvName:"",
                recvMobile:"",
                detailAddress:"",

                recvAddressInfo: {
                    areaCode: "",
                    cityCode: "",
                    provinceCode: "",
                    deliveryType: "1",
                    detailAddress: "",
                    recvMobile: "",
                    recvName: "",
                }
            }
        },
        props:{
            visible:{
                type:Boolean,
                default:false
            }
        },
        methods:{
            back(){
                if(this.state==1){
                    this.hidePop();
                }else{
                    this.state--;
                }
            },

            hide(){
                this.$emit('update:visible',false);
            },
            hidePop(){
                this.addVisible = false;
            },
            setAddress(){
                this.addVisible = true;
            },
            chosenPcode(pro){
                //港澳台 判断
                let expCode = ["710000","820000","810000"];
                if(expCode.indexOf(pro.govCode)!=-1){
                    this.recvAddressInfo.provinceCode = pro.govCode;//省
                    this.recvAddressInfo.areaCode = "";//市
                    this.recvAddressInfo.cityCode = "";//区
                    this.addName = pro.provinceName;
                    this.state=1;
                    this.hidePop();
                }else{
                    this.recvAddressInfo.provinceCode = pro.govCode;
                    this.getChildArea(pro.govCode).then(res=>{
                        this.cityList = res.content;
                        this.state++;
                    });
                }
            },

            chosenCcode(city){
                if(city.level==2){
                    this.recvAddressInfo.cityCode = city.govCode;
                    this.getChildArea(city.govCode).then(res=>{
                        this.areaList = res.content;
                        if(res.content.length>0){
                            this.state++;
                        }else{
                            this.recvAddressInfo.areaCode = "";
                            this.addName = city.provinceName+city.cityName;
                            this.state=1;
                            this.hidePop();
                        }
                    });
                }else{
                    this.recvAddressInfo.areaCode = city.govCode;
//                    this.recvAddressInfo.cityCode = city.govCode;
                    this.addName = city.cityName+city.areaName;
                    this.state=1;
                    this.hidePop();
                }
            },

            chosenAcode(area){
                this.recvAddressInfo.areaCode = area.govCode;
                this.addName = `${area.provinceName}${area.cityName}${area.areaName}`;
                this.hidePop();
                this.state=1;
            },
            getChildArea(code){
                return new Promise((resolve,reject)=>{
                    this.$http.post(BASE_URL+'/city/city/'+code).then(res=>{
                        let data = res.data;
                        if(data.status=='SUCCESS'){
                            resolve(data)
                        }else{
                            reject()
                        }
                    },err=>{
                        reject()
                    })
                })
            },

            createAdd(){
                this.recvAddressInfo.detailAddress = this.detailAddress;
                this.recvAddressInfo.recvName = this.recvName;
                this.recvAddressInfo.recvMobile = this.recvMobile;
                let phoneReg = /^1[3|4|5|7|8][0-9]\d{8}$/;
                if(!this.recvName||!this.recvMobile||!this.addName){
                    this.errMsg = ('请填写完整信息');
                    this.showErr();
                    return
                }
                if(!phoneReg.test(this.recvMobile)){
                    this.errMsg = ('请填写正确的手机号码');
                    this.showErr();
                    return
                }
                if(!this.detailAddress||this.detailAddress.length<5){
                    this.errMsg = ('请输入详细地址（不少于5个字）');
                    this.showErr();
                    return
                }
                this.$emit('update:visible',false);
                this.$emit('fillover',this.recvAddressInfo);
            },

            showErr(){
                this.createErr = true;
                setTimeout(()=>{
                    this.createErr = false;
                },2000)
            }
        },
        mounted(){
            this.$http.post(BASE_URL+'/city/province').then(res=>{
                let data = res.data;
                if(data.status=='SUCCESS'){
                    this.proList = data.content
                }
            });
        },
    }
</script>

<style scoped>
    .popState{
        position: fixed;
        top:0;
        right: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .text_right{
        text-align: right;
    }
    .detail_add{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        width: 100%;
        height: 100px;
        margin-left: -10px;
        margin-bottom: 10px;
        padding: 10px;
        outline: none;
        border: none;

    }
    .addresDel{
        width: 100%;
        height: 100%;
    }
    .pd_10{
        text-align: right;
        padding: 10px;
    }

    .pay_box{
        overflow: auto;
        height: -webkit-calc(100% - 80px);
        height: -moz-calc(100% - 80px);
        height: calc(100% - 80px);
    }
    .btn_box_pay {
        padding-left: 10px;
        padding-right: 10px;
        height: 70px;
    }
    .warning_box{
        position: fixed;
        padding: 10px;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        z-index: 19999999;
        background-color: rgba(0,0,0,.7);
        border-radius: 5px;
        line-height: 20px;
        padding: 10px;
        color: #ffffff;
    }
</style>
