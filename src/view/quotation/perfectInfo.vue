<template>
    <div>
        <mt-header title="完善车辆信息">
            <router-link :to="{path:'/quotation'}" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container_nofoot bg_gary">
            <div class="showFile">
                <img src="../../assets/icon_automobileinsurance_drivinglicense@3x.png">
                <!--<img v-bind:src="fileUrl" alt="" v-if="fileUrl">-->
                <div class="showfile_toolbar" @click="filePick()">
                    <label>
                        <!--<input type="file" v-on:change="fileUp($event)">-->
                    </label>
                    上传行驶证，影像识别车辆信息
                </div>
            </div>
            <div class="cell_box">
                <div class="cell">
                    <div class="cell_title">车主身份证号</div>
                    <div class="cell_content_2">
                        <input type="text" placeholder="请输入车主身份证号" v-on:blur="idReg()" v-model="postData.idcardNo"
                               maxlength="18">
                    </div>
                </div>
                <div class="cell" @click="openPicker(1)">
                    <div class="cell_title">初次登记日期</div>
                    <div class="cell_content_2" v-if="postData.registDate">
                        {{postData.registDate}}
                    </div>
                    <div class="cell_content_2 gary_t" v-if="!postData.registDate">
                        请选择初次登记日期
                    </div>
                </div>
                <div class="cell">
                    <div class="cell_title">车辆识别代号</div>
                    <div class="cell_content_2">
                        <input type="text" placeholder="请输入车辆识别代号" v-model="postData.vinCode" maxlength="17">
                    </div>
                </div>
                <div class="cell">
                    <div class="cell_title">发动机号码</div>
                    <div class="cell_content_2">
                        <input type="text" placeholder="请输入发动机号码" v-model="postData.engineNo" maxlength="17">
                    </div>
                </div>
                <div class="cell">
                    <div class="cell_title">品牌型号</div>
                    <div class="cell_content_2">
                        <span v-if="postData.vehicleName" @click="getCarModel()">{{postData.vehicleName}}</span>

                        <span v-if="!postData.vehicleName" class="gary_t" @click="getCarModel()">请输入品牌型号</span>
                    </div>
                </div>
                <div class="cell" v-if="showPrice">
                    <div class="cell_title">新车发票价格</div>
                    <div class="cell_content_2">
                        <input type="number" placeholder="请输入新车发票价格" maxlength="8" v-model="postData.priceAmount">
                    </div>
                </div>
                <div class="cell">
                    <div class="cell_title">车辆所属性质</div>
                    <div class="cell_content_2">

                        <!--<div class="cell_content_2" v-if="postData.property" @click="openSelect('property')">-->
                        <div class="cell_content_2" v-if="postData.property">
                            {{propertyTitle}}
                        </div>
                        <div class="cell_content_2 gary_t" v-if="!postData.property">

                            <!--<div class="cell_content_2 gary_t" v-if="!postData.property" @click="openSelect('property')">-->
                            请选择
                        </div>
                    </div>
                </div>
                <div class="cell">
                    <div class="cell_title">车辆使用性质</div>
                    <!--<div class="cell_content_2" v-if="postData.carProperty" @click="openSelect('carProperty')">-->
                    <div class="cell_content_2" v-if="postData.carProperty">
                        {{carPropertyTitle}}
                    </div>
                    <!--<div class="cell_content_2 gary_t" v-if="!postData.carProperty" @click="openSelect('carProperty')">-->
                    <div class="cell_content_2 gary_t" v-if="!postData.carProperty">
                        请选择
                    </div>
                </div>
                <div class="cell">
                    <div class="title">过户车</div>
                    <div class="cell_content_2">
                        <span class="inline_block">
                            <mt-switch v-model="transCar"></mt-switch>
                        </span>
                    </div>
                </div>
                <div class="cell" @click="openPicker(2)" v-if="transCar">
                    <div class="title">过户日期</div>
                    <div class="cell_content_2" v-if="postData.transferDate">
                        {{postData.transferDate}}
                    </div>
                    <div class="cell_content_2 gary_t" v-if="!postData.transferDate">
                        请选择过户日期
                    </div>
                </div>
            </div>
            <div class="foot_btn">
                <button class="btn btn_block" @click="next()">确认信息</button>
            </div>
        </div>
        <mt-datetime-picker
                ref="picker"
                type="date"
                :startDate="minDate"
                @confirm="handleConfirm"
                :endDate="resetDate"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日">
        </mt-datetime-picker>
        <picker v-model="localVisible" :data-items="selectItems" @change="onValuesChange">
            <div class="picker_toolbar" slot="top-content">
                <button @click="sure()">取消</button>
                <button @click="sure()">确定</button>
            </div>

        </picker>
        <transition name="slide-fade">
            <carModel
                    v-on:handlerSelect="selectedModel"
                    :visible.sync="showModal"
                    :registDate = "postData.registDate"
                    :carLicenseNo = 'carInfo.carLicenseNo'
            ></carModel>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
    import {Toast,Indicator} from 'mint-ui';
    import carModel from 'src/components/CarModel'
    import {mapState,mapActions} from 'vuex'
    export default {
        name: '',
        data(){
            return {
                minDate: new Date('1990-01-01'),
                file: null,//base64位 附件
                fileUrl: null,
                fileType: null,
                resetDate: new Date(),
                state: 1,//对应日期
                showPrice: false,
                transCar: false,//是否过户车
                localVisible: false,//选择框弹窗
                selectItems: [],//选择框选项
                selectType: null,//当前选择框类型
                showModal: false,//车型选择模态框打开模态框
                carBelongType: [],//车辆所属性质
                carUseType: [],//车辆使用性质
                carUseTypes: {},//将所有的车辆使用性质保存
                carPropertyTitle: "",
                propertyTitle: "",
                postData: {
                    carLicenseNo: '',
                    carProperty: "",//车辆使用性质 ,
                    engineNo: '',//发动机
                    idcardNo: '',//证件号
                    idcardType: '0',//证件类型 固定的
                    isNew: 'N',//是否未上牌
                    isTransferCar: 'N',//是否过户
                    priceAmount: '',//新车发票
                    property: "",//车辆所属性质
                    registDate: '',//初登日期
                    source: REGSOURCE,//来源
                    transferDate: '',//过户日期
                    vehicleCode: '',//品牌型号
                    vehicleName: "",//车辆名称
                    vehicleId: "",//车辆id
                    vinCode: '',//车辆识别代码
                    insureAreaCode: "",//车牌地区
                    carInfoId:""
                }
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
            //这里改成微信sdk 方式
            //微信上传附件
            //step:选取
            filePick(){
                let self = this;
                if (!this.token) {
                    this.showLoginBox();
                    return
                }
                this.$wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        self.transImgbyWx(res.localIds[0]);
                    }
                });
            },
            //step:上传到wx
            transImgbyWx(localIds){
                let self = this;
                this.$wx.uploadImage({
                    localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                        var serverId = res.serverId; // 返回图片的服务器端ID
                        self.getWximg(serverId);
                    }
                });
            },
            // step: 本地接口获取图片
            getWximg(fileId){
                if (!fileId) return;
                this.loading();
                this.$http({
                    method:"POST",
                    timeout:0,
                    data:{
                        "fileId": fileId,
                        "token": this.token
                    },
                    url:BASE_URL+'/car/image/wxUploadImage'
                }).then(result=> {
                    if (result.data.status == 'SUCCESS') {
                        let base64 = result['data']['content']['base64'];
                        this.fileUrl = 'data:image/png;base64,' + base64;
                        this.file = base64;
                        this.fileType = 'png';
                        this.upImg().then((res)=> {
                            this.loadingClose();
                            let data = res.data;
                            if (data.status == 'SUCCESS') {
                                //图片上传成功后的逻辑处理
                                this.$toast('识别成功');
                                let drivingInfo = data['content']['drivingInfo'];
                                for (let dinfo in drivingInfo) {
                                    for (let key in this.postData) {
                                        if (drivingInfo[dinfo] != "") {
                                            if (dinfo == key) {
                                                if (dinfo == 'registDate') {
                                                    this.postData[key] = this.dateStringTrans(drivingInfo[dinfo]);
                                                } else if (dinfo == 'vinCode' || dinfo == 'engineNo') {
                                                    if (!this.carInfo[dinfo]) {
                                                        this.postData[key] = drivingInfo[dinfo]
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                let personInfo = data['content']['personInfo'];
                                for (let pinfo in personInfo) {
                                    if (personInfo[pinfo] != "") {
                                        for (let key in this.postData) {
                                            if (pinfo == key) {
                                                if (pinfo == 'registDate') {
                                                    this.postData[key] = this.dateStringTrans(personInfo[pinfo]);
                                                } else if (pinfo == 'idcardNo') {
                                                    if (!this.carInfo[pinfo]) {
                                                        this.postData[key] = personInfo[pinfo]
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }else{
                              this.$toast('识别失败');
                            }
                        }, err=> {
                            this.loadingClose();
                        });
                    }else{
                        this.loadingClose();
                    }
                }, err=> {
                    this.loadingClose();
                    this.$toast('获取失败')
                })
            },

            dateStringTrans(str){
                if (!str) return "";
                return [str.slice(0, 4), str.slice(4, 6), str.slice(6, 8)].join('-')
            },
            //表单校验
            formValid(){
                let postData = this.postData;
                return new Promise((resolve, reject)=> {
                    let idReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

                    if (!postData.engineNo || !postData.idcardNo || !postData.registDate || !postData.vinCode) {
                        this.$toast('请填写完整信息');
                        reject();
                    } else if (this.showPrice && !postData.priceAmount) {
                        this.$toast('请输入新车发票价');
                        reject();
                    } else if (postData.isTransferCar == 'Y' && !postData.transferDate) {
                        this.$toast('请选择过户日期');
                        reject();
                    }
                    else if (!idReg.test(postData.idcardNo)) {
                        this.$toast('身份证输入不合法');
                        reject()
                    } else if (this.showPrice && postData.priceAmount > 99999999) {
                        this.$toast('输入不合法');
                        reject()
                    } else {
                        if (postData.isTransferCar == 'Y') {
                            if (new Date(postData.registDate).getTime() > new Date(postData.transferDate).getTime()) {
                                this.$toast('过户日期非法');
                                reject();
                            } else {
                                resolve();
                            }
                        } else {
                            resolve();
                        }
                    }
                })
            },

            next(){
                //执行操作前 先判断用户是否登录
                if (!this.isLogin) {
                    this.showLoginBox();
                    return
                }
                this.formValid().then(()=> {
                    //先执行附件base64的上传
                    let data = Object.assign(this.postData, {token: this.token});
                    this.$http({
                        method: 'POST',
                        url: BASE_URL + '/car/submitCarInfo',
                        data: data
                    }).then(res=> {
                        let pdata = res.data;
                        if (pdata.status == 'SUCCESS') {
                            //将获取的content
                            this.$router.push({path: '/selectInsurance',query:{content:pdata.content}})
                        } else if (pdata.status == 'PLEASE_LOGIN') {
                            this.$toast(pdata.msg);
                            setTimeout(this.showLoginBox(), 1000);
                        } else {
                            this.$toast(pdata.msg);
                        }
                    }, err=> {
                        this.$toast('上传失败，请检查你的网络');
                        this.$store.dispatch('loadErr', true)
                    })
                }, err=> {
                    console.log("校验失败")
                });
            },
            //影像可传 可不传
            upImg(){
                return new Promise((resolve, reject)=> {
                    if (!this.file) {
                        reject();// 这里添加影像上传的限制
                        return
                    };
                    this.$http.post(BASE_URL + '/car/image/recognizeImage', {
                        "imageBase64": this.file,
                        "imageMode": this.fileType,
                        "imageType": "3",
                        "token": this.token
                    }).then(res=> {
                        resolve(res)
                    }, err=> {
                        reject();
                        this.$toast('上传影像数据失败，请检查你的网络');
                    });
                })
            },
            //时间选择
            openPicker(state) {
                this.state = state;
                this.$refs.picker.open();
            },
            //时间选择回调
            handleConfirm(d){
                d = this.$tools.dateFmt(d, 'yyyy-MM-dd');
                if (this.state == 1) {
                    this.postData.registDate = d;
                    this.newCarPrice();
                } else {
                    this.postData.transferDate = d;
                }
            },
            //两个类型选择
            onValuesChange(res){
                let type = this.selectType;
                if (!res) {
                    return;
                }
                if (type == 'property') {
                    let list = this.carUseTypes[res.systemDefinedValue];
                    if (!list) return;
                    //默认第一项为选中项
                    this.carUseType = list;
                    this.postData.carProperty = list[0].value;
                    this.carPropertyTitle = list[0].frontTitle;

                    this.postData.property = res.value;
                    this.propertyTitle = res.frontTitle
                } else {
                    this.postData.carProperty = res.value;
                    this.carPropertyTitle = res.frontTitle
                }
            },
            //关闭弹窗
            sure(){
                this.localVisible = false;
            },
            //打开选择框
            openSelect(type){
                this.selectType = type;
                if (type == 'property') {
                    this.selectItems = [{
                        name: 'frontTitle',
                        values: this.carBelongType
                    }]
                } else if (type == 'carProperty') {
                    this.selectItems = [{
                        name: 'frontTitle',
                        values: this.carUseType,
                    }]
                }
                this.localVisible = true;
            },
            //获取车辆类型
            getCarModel(){
                if (!this.postData.registDate) {
                    this.$toast('请选择初次登记日期');
                    return
                }
                this.showModal = true;
            },

            selectedModel(type){
                this.postData.vehicleCode = type.vehicleCode;
                this.postData.vehicleId = type.vehicleId;
                this.postData.vehicleName = type.vehicleName;
            },
            //金额fmt
            moneyTrans(s){
                if (!this.postData.priceAmount) return;
                this.postData.priceAmount = this.mt(this.postData.priceAmount);
            },
            //判断是否显示新车发票价格
            newCarPrice(){
                /*判断是否显示新车发票价*/
                if (!this.postData.registDate) return;
                let registDate = this.postData.registDate.replace(/-/g, "");
                let nowDate = this.$tools.dateFmt(new Date(), 'yyyyMMdd');
                let year1 = registDate.substr(0, 4);//注册年
                let year2 = nowDate.substr(0, 4);//当前年
                let month1 = registDate.substr(4, 2);//注册月
                let month2 = nowDate.substr(4, 2);//当前月
                let len = (year2 - year1) * 12 + (month2 - month1);

                let day1 = registDate.substr(6,2);
                let day2 = nowDate.substr(6,2);

                //间隔小于9个月显示>9个月不显示
                len >= 9&&day2>day1 ? this.showPrice = true : this.showPrice = false;
            },
            //获取字典
            getDiction(type){
                return new Promise((resolve, reject)=> {
                    this.$http.post(`${BASE_URL}/dictionary/getDictionarys/${type}`).then(res=> {
                        if (res.data.content) {
                            resolve(res.data);
                        } else {
                            this.$toast('获取类型失败')
                        }
                    }, err=> {
                        this.$toast(err)
                    });
                })
            },

            idReg(){
                let idReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if (!idReg.test(this.postData.idcardNo)) {
                    this.$toast('身份证输入不合法');
                }
            }
        },
        watch: {
            transCar(value){
                if (value) {
                    this.postData.isTransferCar = 'Y';
                } else {
                    this.postData.isTransferCar = 'N';
                    this.postData.transferDate = null;
                }
            }
        },

        mounted(){
            /**
             * 初始化选项数据 将所有的选项异步请求到然后保存
             **/
            this.getDiction('VEHICLE_PROPERTY').then(data=> {
                this.carBelongType = data.content;
                let waitList = [];
                data.content.forEach(item=> {
                    waitList.push(this.getDiction(item.systemDefinedValue).then(da=> {
                        this.carUseTypes[item.systemDefinedValue] = da.content;
                    }));
                });
                Promise.all(waitList).then(()=> {
                    let defaultSelect = data.content[0];
                    this.postData.property = defaultSelect.value;//默认显示
                    this.propertyTitle = defaultSelect.frontTitle;//显示字段
                    let type = defaultSelect.systemDefinedValue;
                    this.carUseType = this.carUseTypes[type];
                    this.postData.carProperty = this.carUseTypes[type][0].value;
                    this.carPropertyTitle = this.carUseTypes[type][0].frontTitle;
                });
            });
            /*将查出来的数据进行合并 这里的数据存入vuex*/
            let getData = Object.assign({
                token: this.token
            }, this.carInfo);

            this.postData = Object.assign(this.postData, getData);


            if (this.postData.isNew == 'Y') {
                this.showPrice = true;
            } else {
                this.newCarPrice();
            }
        },
        components: {
            carModel
        },
        computed: {
            ...mapState([
                'isLogin',
                'token',
                'carInfo'
            ])
        }
    }
</script>

<style>
    .foot_btn {
        padding: 34px 10px
    }

    .gary_t {
        color: #999999
    }
</style>
