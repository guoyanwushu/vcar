<template>
    <div>
        <mt-header title="基本信息">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container_nofoot bg_gary">
            <div class="base_main">
                <div class="banner">
                    <a href="javascript:;">
                        <img src="../../assets/banner/banner_automobileinsurance_banner@3x.png" alt="">
                    </a>
                </div>
                <div class="content">
                    <div class="cell">
                        <div class="cell_title">车牌号码</div>
                        <div class="cell_content_1 flex_1">
                            <button class="address_s" @click="chosen()">{{carPlate.carPlateCode}}</button>
                            <input class="carn" v-model="carNum" maxlength="6">
                        </div>
                        <!--<div class="cell_content_1 cell_check">-->
                        <!--<input type="checkbox" id="noCard" v-model="noCard">-->
                        <!--<label for="noCard"></label>-->
                        <!--<span class="check_title">未上牌</span>-->
                        <!--</div>-->
                    </div>
                    <div class="cell">
                        <div class="cell_title">车主姓名</div>
                        <div class="cell_content_2">
                            <input type="text" placeholder="输入车主姓名" v-model="name">
                        </div>
                    </div>
                    <div class="cell" v-if="showVinCode">
                        <div class="cell_title">车架号</div>
                        <div class="cell_content_2">
                            <input type="text" maxlength="17" placeholder="输入车驾号" v-model="vinCode">
                        </div>
                    </div>
                    <p class="tip">*你的信息将严格保密</p>
                    <div class="foot">
                        <button class="btn btn_block" @click="jump()">下一步</button>
                    </div>
                </div>
            </div>
        </div>
        <transition name="slide-fade">
            <Ilist
                    v-on:handlerSelect="selectedAddress"
                    :visible.sync="showModal"
            ></Ilist>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
    import Ilist from 'components/Ilist'
    import { Indicator,Toast } from 'mint-ui';
    import {mapState} from 'vuex'

    const needVicodes = ['320500']//需要车架号的城市行政代码
    export default {
        data(){
            return {
                showModal: false,
                noCard: false,
                name: null,
                carNum: '',
                isNew: "N",
                vinCode: null,
                showVinCode: false
            }
        },
        methods: {
            loading(){
                Indicator.open({spinnerType: 'fading-circle'});
            },
            loadingClose(){
                Indicator.close();
            },
            jump(){
                let reg = new RegExp('^[\u4e00-\u9fa5][A-Z]((?![IO])[A-Z0-9]){4}((?![IO])[A-Z0-9挂学警港澳])$');
                //勾选尚无车牌后
                if (!this.carPlate.carPlateCode) {
                    let tost = Toast({
                        message: '车牌号码格式错误',
                        position: 'bottom',
                    });
                    return
                }

                if (this.noCard) {
                    this.isNew = "Y";
                } else {
                    //验证
                    if (!reg.test((this.carPlate.carPlateCode + this.carNum).toUpperCase())) {
                        let tost = Toast({
                            message: '车牌号码格式错误',
                            position: 'bottom',
                        });
                        return
                    }
                }
                if (!this.name) {
                    Toast({
                        message: '填写完整信息',
                        position: 'bottom',
                    });
                    return
                } else if (this.showVinCode && !this.vinCode) {
                    Toast({
                        message: '填写完整信息',
                        position: 'bottom',
                    });
                    return
                }
                let data = {
                    name: this.name,
                    vinCode: this.vinCode ? this.vinCode.toUpperCase() : "",
                    carLicenseNo: [this.carPlate.carPlateCode, this.carNum].join('').toUpperCase(),
                    insureAreaCode: this.carPlate.insureAreaCode
                }
                if(this.token) {
                    data.token = this.token;
                }
                this.postForm(data);
            },

            postForm(data){
                this.loading();
                this.$http.post(BASE_URL + '/car/queryCarInfo', data).then(res=> {
                    this.loadingClose()
                    if (res.data.status == 'SUCCESS') {
                        /*存入车辆信息*/
                        /**
                         * 这里将车辆信息存入vuex 里面
                         */
                        let carData = Object.assign({
                            isNew: this.isNew,//是否是新车牌
                            carLicenseNo: data.carLicenseNo,//车牌号
                            insureAreaCode: data.insureAreaCode,
                            vinCode: data.vinCode,
                            ownerName:data.name,
                            carInfoId:res.data.content.carInfoId
                        }, res.data.content.carInfo);
                        this.$store.dispatch('setCarInfo', carData).then(res=> {
                            this.$router.push({path: "/perfectInfo"})
                        })
                    } else {
                        //没有返回 那么要把用户填写数据更新到store
                        this.$store.dispatch('setCarInfo', {
                            isNew: this.isNew,//是否是新车牌
                            carLicenseNo: data.carLicenseNo,//车牌号
                            insureAreaCode: data.insureAreaCode,
                            vinCode: data.vinCode,
                            ownerName:data.name
                        }).then(res=> {
                            this.$router.push({path: "/perfectInfo"})
                        })
                    }
                }, err=> {
                    this.loadingClose();
                    this.$store.dispatch('loadErr',true)
                })
            },

            selectedAddress(type){
                this.$store.dispatch('setCarPlate', type);
                let vincode = type.insureAreaCode;
                needVicodes.indexOf(vincode) > -1 ? this.showVinCode = true : this.showVinCode = false;
            },

            chosen(){
                this.showModal = true
            },
        },
        components: {
            Ilist
        },
        mounted(){
            this.carNum = this.params.carN;
            //指定区域要传vincode
            if (this.carPlate && this.carPlate.insureAreaCode) {
                needVicodes.indexOf(this.carPlate.insureAreaCode) > -1 ? this.showVinCode = true : this.showVinCode = false
            }
        },
        computed: {
            ...mapState([
                'carPlate',
                'params',
                'token'
            ])
        }
    }
</script>

<style scoped>
    .base_main {
        /*display: flex;*/
        flex-direction: column;
        height: 100%;
    }

    .banner {
        /*flex: 1;*/
        background: #eeeeee;
        text-align: center;
        padding-bottom: 10px;
        overflow: hidden;
    }

    .banner img {
        width: 100%;
        height: 100%;
    }

    .content {
        /*flex: 4;*/
    }

    .content .foot {
        padding: 10px;
    }

    .tip {
        font-size: 13px;
        color: #bcbcbc;
        margin: 10px 0;
        padding-left: 14px;
    }

    .address_s {
        outline: none;
        max-width: 44px;
        /*display: inline-block;*/
        flex: 1;
        width: 44px;
        height: 20px;
        border: 1px solid #FF7D00;
        color: #FF7D00;
        background: none;
        border-radius: 5px;
        position: relative;
        text-align: left;
        font-size: 12px;
        margin-right: 10px;
        padding: 0;
        padding-left: 8px;
    }

    .address_s::after {
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        margin-top: -2px;
        right: 4px;
        width: 0;
        height: 0;
        border-width: 4px 4px 0;
        border-style: solid;
        border-color: #FF7D00 transparent transparent; /*灰 透明 透明 */
    }

    .cell .cell_title {
        max-width: 75px;
    }

    .flex_1 {
        flex: 2;
        display: flex;
    }

    .cell_check {
        flex: 1;
    }

    .cell .cell_content_1 input.carn {
        text-align: left;
        border: none;
        padding: 0;
        margin: 0;
        flex: 1;
        -webkit-border-radius: 0;
        -moz-border-radius: 0;
        border-radius: 0;
        outline: none;
    }
</style>
