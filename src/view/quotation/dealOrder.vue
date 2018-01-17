<template>
    <div>
        <mt-header title="完善投保信息">
            <mt-button icon="back" @click="goBack()" slot="left"></mt-button>
        </mt-header>
        <div class="container_nofoot bg_gary">
            <div class="company_logo">
                <h2>{{detail.prvName}}</h2>
            </div>
            <div class="cps_list_item">
                <div class="head">
                    <div>保险生效日期</div>
                </div>
                <div class="list">
                    <div class="cell f16" v-if="main['bizInsureInfo']">
                        <div class="cell_title">商业险</div>
                        <div class="cell_content_2">
                            {{main['bizInsureInfo']['startDate']}}
                        </div>
                    </div>
                    <div class="cell f16" v-if="main['efcInsureInfo']">
                        <div class="cell_title">交强险</div>
                        <div class="cell_content_2">
                            {{main['efcInsureInfo']['startDate']}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="cps_list_item">
                <div class="head">
                    <div>车主信息</div>
                    <div></div>
                </div>
                <div class="list">
                    <div class="cell f16">
                        <div class="cell_title">车主姓名</div>
                        <div class="cell_content_2">
                            <input type="text" disabled v-model="carOwner.name">
                        </div>
                    </div>
                    <div class="cell f16">
                        <div class="cell_title">车主身份证号</div>

                        <div class="cell_content_2">
                            <input type="text" disabled  v-model="carOwner.idcardNo">
                        </div>
                    </div>
                    <div class="cell f16">
                        <div class="cell_title">车主手机号码</div>
                        <div class="cell_content_2">
                            <input type="text" v-bind:disabled="isHebao" maxlength="11" placeholder="请输入车主手机号码" v-model="carOwner.phone">
                        </div>
                    </div>
                    <div class="cell f16">
                        <div class="cell_title">车主电子邮箱</div>
                        <div class="cell_content_2">
                            <input type="email" v-bind:disabled="isHebao" placeholder="请输入车主电子邮箱(非必填)" v-model="carOwner.email">
                        </div>
                    </div>
                </div>
            </div>
            <div class="cps_list_item">
                <div class="head">
                    <div>投保人信息</div>
                    <label class="checkbox">
                        <input type="checkbox" v-bind:disabled="isHebao" v-model="showlist1">
                        <span></span>
                        <h5>与车主一致</h5>
                    </label>
                </div>
                <div class="list" v-if="!showlist1">
                    <div class="cell f16">
                        <div class="cell_title">投保人姓名</div>
                        <div class="cell_content_2">
                            <input type="text" placeholder="请输入投保人姓名" v-model="applicant.name">
                        </div>
                    </div>
                    <div class="cell f16">
                        <div class="cell_title">投保人身份证号</div>
                        <div class="cell_content_2">
                            <input type="text" maxlength="18" placeholder="请输入投保人身份证号" v-model="applicant.idcardNo">
                        </div>
                    </div>
                    <div class="cell f16">
                        <div class="cell_title">投保人手机号码</div>
                        <div class="cell_content_2">
                            <input type="text" maxlength="11" placeholder="请输入投保人手机号码" v-model="applicant.phone">
                        </div>
                    </div>
                    <div class="cell f16">
                        <div class="cell_title">投保人电子邮箱</div>
                        <div class="cell_content_2">
                            <input type="text" placeholder="请输入投保人电子邮箱(非必填)" v-model="applicant.email">
                        </div>
                    </div>
                </div>
            </div>
            <div class="cps_list_item">
                <div class="head">
                    <div>被保人信息</div>
                    <label class="checkbox">
                        <input type="checkbox" v-bind:disabled="isHebao" v-model="showlist2">
                        <span></span>
                        <h5>与车主一致</h5>
                    </label>
                </div>
                <div class="list" v-if="!showlist2">
                    <div class="cell f16">
                        <div class="cell_title">被保人姓名</div>
                        <div class="cell_content_2">
                            <input type="text" placeholder="请输入被保人姓名" v-model="insured.name">
                        </div>
                    </div>
                    <div class="cell f16">
                        <div class="cell_title">被保人身份证号</div>
                        <div class="cell_content_2">
                            <input type="text" maxlength="18" placeholder="请输入被保人身份证号" v-model="insured.idcardNo">
                        </div>
                    </div>
                    <div class="cell f16">
                        <div class="cell_title">被保人手机号码</div>
                        <div class="cell_content_2">
                            <input type="text" maxlength="11" placeholder="请输入被保人手机号码" v-model="insured.phone">
                        </div>
                    </div>
                    <div class="cell f16">
                        <div class="cell_title">被保人电子邮箱</div>
                        <div class="cell_content_2">
                            <input type="text" placeholder="请输入被保人电子邮箱(非必填)" v-model="insured.email">
                        </div>
                    </div>
                </div>
            </div>
            <div class="cps_list_item">
                <div class="head">
                    <div>索赔权益人信息</div>
                    <label class="checkbox">
                        <input type="checkbox" v-bind:disabled="isHebao" v-model="showlist3">
                        <span></span>
                        <h5>与车主一致</h5>
                    </label>
                </div>
                <div class="list" v-if="!showlist3">
                    <div class="cell f16">
                        <div class="cell_title">索赔权益人姓名</div>
                        <div class="cell_content_1">
                            <input type="text" placeholder="请输入索赔权益人姓名" v-model="beneficiary.name">
                        </div>
                    </div>
                    <div class="cell f16">
                        <div class="cell_title">索赔权益人身份证号</div>
                        <div class="cell_content_1">
                            <input type="text" maxlength="18" placeholder="请输入索赔权益人身份证号" v-model="beneficiary.idcardNo">
                        </div>
                    </div>
                    <div class="cell f16">
                        <div class="cell_title">索赔权益人手机号码</div>
                        <div class="cell_content_1">
                            <input type="text" maxlength="11" placeholder="请输入索赔权益人手机号码" v-model="beneficiary.phone">
                        </div>
                    </div>
                    <div class="cell f16">
                        <div class="cell_title">索赔权益人电子邮箱</div>
                        <div class="cell_content_1">
                            <input type="text" placeholder="请输入索赔权益人电子邮箱(非必填)" v-model="beneficiary.email">
                        </div>
                    </div>
                </div>
            </div>
            <div class="cps_list_item">
                <div class="head" @click="openAddFile()">
                    <div>上传影像</div>
                    <div class="select"></div>
                </div>
            </div>
            <div class="btn_box_db">
                <p class="dec">
                    <label class="checkbox_s">
                        <input type="checkbox" v-model="makesure">
                        <span></span>
                    </label>
                    我已阅读并同意<a href="#" @click="openStateMent()">《投保声明》</a>
                </p>

                <div class="btn_group">
                    <a v-bind:href="servicePhone" class="btn">
                        <i class="icon"></i>
                        联系客服
                    </a>
                    <button class="btn" v-bind:disabled="!makesure" @click="submitInsure()">马上投保</button>
                </div>
            </div>
        </div>
        <mt-popup
                v-model="popupVisible"
                position="bottom"
                :modal="false"
                class="popState"
        >
            <mt-header title="投保声明">
                <mt-button icon="back" slot="left" @click="popupVisible=false"></mt-button>
            </mt-header>
            <i-decl></i-decl>
        </mt-popup>
        <!--附件模态框-->
        <mt-popup
                v-model="addVisible"
                position="right"
                :modal="false"
                class="popState"
        >
            <mt-header title="完善投保信息">
                <mt-button icon="back" @click="subMit()" slot="left"></mt-button>
            </mt-header>
            <div class="file_box">
                <div class="title">
                    {{msg}}
                </div>
                <div class="content">
                    <div class="transItem" v-for="(item,index) in upFiles">
                        <div class="main" v-if="item.load">
                            <b class="delete_icon" @click="deletefile(index)"></b>
                            <img v-bind:src="'data:image/png;base64,'+item.imageBase64" @click="preViewImg(item.imageBase64)" alt="">
                        </div>
                        <div class="main" v-if="!item.load">
                            <b class="delete_icon" @click="deletefileUp(index)" v-if="item.addBySelf"></b>
                            <div class="camera" @click="filePick(index)">
                                <!--<input type="file" runat="server"  accept="image/*" v-on:change="fileUp($event,index)">-->
                            </div>
                            <p>{{item.title}}</p>
                        </div>
                    </div>
                    <div class="transItem" @click="addFile()">
                        <label class="main">
                            <b class="addFile_icon"></b>
                        </label>
                    </div>
                </div>
            </div>
            <div class="btn_box">
                <button class="btn btn_block" @click="subMit()">
                    确认上传
                </button>
            </div>

        </mt-popup>

        <mt-popup v-model="addInfoVisible"
                  position="bottom"
                  :modal="false"
                  class="popState">
            <mt-header title="补充信息">
                <mt-button icon="back" slot="left" @click="addInfoVisible=false"></mt-button>
            </mt-header>
            <div class="container_nofoot">
                <div class="warning_box" v-if="showWaring">
                    补充信息错误
                </div>
                <div class="add_container">
                    <div class="addInfoItem">
                        <div class="title leftL">
                            补充信息
                        </div>
                    </div>
                    <div class="addInfoItem" v-for="(item,index) in insureSupplys">
                        <div class="title">
                            {{regs[item.itemCode].name}}
                        </div>
                        <div class="content" v-if="regs[item.itemCode]['type']=='date'">
                            <div class="selectItem_n" @click="openaddSelect(index)" v-if="!item.itemValue">请选择{{regs[item.itemCode].name}}</div>
                            <div class="selectItem_y" @click="openaddSelect(index)" v-if="item.itemValue">{{item.itemValue}}</div>
                        </div>
                        <div class="content" v-else-if="regs[item.itemCode]['type']=='select'">
                            <select  v-model="item.itemValue">
                                <option v-for="opt in regs[item.itemCode].options"
                                        v-bind:value="opt.value">{{opt.name}}</option>
                            </select>

                        </div>
                        <div class="content" v-else>
                            <input v-model="item.itemValue"
                                   v-bind:name="item.itemCode"
                                   v-bind:type = "regs[item.itemCode]['type']"
                                   v-bind:placeholder="'请选择'+regs[item.itemCode].name"
                            >

                        </div>
                    </div>
                    <div class="btn_box_db">
                        <button class="btn btn_block" type="button" @click="addInfomation()">确定</button>
                    </div>
                </div>
            </div>
            <mt-datetime-picker
                    :startDate="minDate"
                    :endDate="getMaxDate()"
                    ref="picker"
                    @confirm="handleConfirm"
                    type="date"
                    year-format="{value} 年"
                    month-format="{value} 月"
                    date-format="{value} 日"
            >
            </mt-datetime-picker>
        </mt-popup>

        <pre-view :visible.sync="showPrwView" :base64="showPrwViewBase64"></pre-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import addfiles from "src/view/quotation/addfiles.vue";
    import insuranceDeclaration from 'src/view/statements/insuranceDeclaration'
    import preView from 'src/components/preView'
    import {mapState,mapActions} from 'vuex'
    import {Indicator,Toast} from 'mint-ui'

//    匹配规则
    const addInfosReg = {
        "ownerMobile": {
            name: '车主手机号码',
            reg: /^1[3|4|5|7|8][0-9]\d{8}$/,// 正则
            type: "number",//类型
        },
        "ownerEmail": {
            name: '车主邮箱',
            reg: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            type: "email"
        },
        "ownerAddress": {
            name: '车主身份证地址',
            reg: "",
            type: "text"
        },
        "ownerIDCardValidDate": {
            name: '车主身份证有效止期',
            reg: "",
            type: "date"
        },
        "insuredMobile": {
            name: '被保人手机号码',
            reg: /^1[3|4|5|7|8][0-9]\d{8}$/,// 正则
            type: "number"
        },
        "insuredEmail": {
            name: '被保人邮箱',
            reg: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            type: "email"
        },
        "insuredAddress": {
            name: '被保人身份证地址',
            reg: "",
            type: "text"
        },
        "insuredIDCardValidDate": {
            name: '被保人身份证有效止期',
            reg: "",
            type: "date"
        },
        "applicantMobile": {
            name: '投保人手机号码',
            reg: /^1[3|4|5|7|8][0-9]\d{8}$/,// 正则
            type: "number"
        },
        "applicantEmail": {
            name: '投保人邮箱',
            reg: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            type: "email"
        },
        "applicantAddress": {
            name: '投保人身份证地址',
            reg: "",
            type: "text"
        },
        "applicantIDCardValidDate": {
            name: '投保人身份证有效止期',
            reg: "",
            type: "date"
        },
        "drivingLicenseAddress": {
            name: '行驶证地址',
            reg: "",
            type: "text"
        },
        "claimantDocumentName": {
            name: '权益索赔人姓名',
            reg: "",
            type: "text"
        },
        "claimantDocumentType": {
            name: '权益索赔人证件类型',
            reg: "",
            type: "select",
            options: [
                {
                    name: "身份证",
                    value: "0"
                }
            ]
        },
        "claimantDocumentNumber": {
            name: '权益索赔人证件号码',
            reg: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            type: "text"
        },
        "claimantMobile": {
            name: '权益索赔人手机号码',
            reg: /^1[3|4|5|7|8][0-9]\d{8}$/,// 正则
            type: "number"
        },
        "claimantEmail": {
            name: '权益索赔人邮箱',
            reg: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            type: "email"
        }
    }

    export default {
        name: '',
        data(){
            return {
                servicePhone: 'tel:' + SERVICEPHONE,
                makesure: false,
                showlist1: true,
                showlist2: true,
                showlist3: true,
                popupVisible: false,//声明模态框
                addVisible: false,//附件模态框
                addInfoVisible: false,//补充信息
                carInfo: {},
                carOwner: {},
                riskList: [],
                main: {
                    bizInsureInfo: null,
                    efcInsureInfo: null,
                    taxInsureInfo: null
                },
                applicant: {//投保人
                    "email": "",
                    "idcardNo": "",
                    "idcardType": "0",
                    "name": "",
                    "phone": ""
                },
                beneficiary: {//索赔权益人
                    "email": "",
                    "idcardNo": "",
                    "idcardType": "0",
                    "name": "",
                    "phone": ""
                },
                insured: {//被保人信息
                    "email": "",
                    "idcardNo": "",
                    "idcardType": "0",
                    "name": "",
                    "phone": ""
                },
                imageInfos: [],
                minDate:new Date(),
                images: [],
                upFiles: [],

                showWaring:false,
                insureSupplys: [],//补充资料信息资料
                regs:addInfosReg,
                onSelected:null,

                isHebao:false,
                imgLenBySelf:0,//用户自加图片个数

                showPrwView:false,
                showPrwViewBase64:"",

                insureRelationId:"",
                msg:""//提示上传的msg
            }
        },
        methods: {
            getMaxDate(){
                let _year = new Date().getFullYear()+20;
                return  new Date(`${_year}/12/31`);
            },

            loading(){
                Indicator.open({spinnerType: 'fading-circle'});
            },

            loadingClose(){
                Indicator.close();
            },

            openAddFile(){
                //独立出来附件上传
                this.addVisible = true;
            },
            //打开说明
            openStateMent(){
                this.popupVisible = true;
            },
            goBack(){
                this.$router.push({path: "/order"});
            },
            //获取全部信息
            getAllInfo(){
                this.$http.post(BASE_URL + '/offerStatus/getPrvOfferDetailInfo', {
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
                        this.carOwner = data.content['carOwner'];
//                        imageInfos 需要上传的照片
                        this.imageInfos = data.content['imageInfos'];
                        this.msg = data.content['msg'];
                        this.imageInfos.forEach((item)=> {
                            let nitem = {
                                title: item.imageName,
                                load: false,
                                imageBase64:"",
                                imageDetail: {
                                    "fileId": "",
                                    "imageMode": "",
                                    "imageType": item.imageType
                                }
                            };
                            this.upFiles.push(nitem);
                        })
                    } else if (data.status == 'PLEASE_LOGIN') {
                        this.$toast(data.msg);
                        this.$router.push({path: '/order'})
                    } else {
                        this.$toast(data.msg);
                    }
                }, err=> {
                    this.$router.push({path: '/offerDetail', query: {detail: this.detail}});
                })
            },
            //上传图片
            upImgs(){
                return new Promise((resolve, reject)=> {
                    let len1 = this.images.length,//用户选择上传的图片个数
                            len2 = this.imageInfos.length;//接口返回需要上传的图片个数
                    if (len1-this.imgLenBySelf == len2) {
                        this.$indicator.open({
                            text: '加载中...',
                            spinnerType: 'fading-circle'
                        });
                        this.$http.post(BASE_URL + '/car/image/v2/uploadImage', {
                            "imageInfos": this.images,
                            "token": this.token,
                            "offerId": this.detail['id'],
                            "prvId": this.detail['prvId']
                        }).then(response=> {
                            this.$indicator.close();
                            let res = response.data;
                            if (res.status == 'SUCCESS') {
                                resolve();
                            } else {
                                this.$toast(res.msg);
                                if (res.status == 'PLEASE_LOGIN') {
                                    this.$store.dispatch('showLoginBox')
                                }
                            }
                        }, err=> {
                            this.$indicator.close();
                            this.$toast('上传失败，请检查你的网络')
                        })
                    } else {
                        this.$toast('请上传完整影像');
                        reject();
                    }
                })
            },
            //提交核保
            submitInsure(){
                this.formVild().then(res=> {
                    //校验图片
                    if (this.imageInfos.length > 0) {
                        this.upImgs().then(res=> {
                            this.postForm()
                        }, err=> {
                        })
                    } else {
                        this.postForm()
                    }
                })
            },
            //发送核保请求
            postForm(){
                this.$http.post(BASE_URL + '/carInsurance/improveInsuranceInfo', {
                    "carOwner": this.carOwner,//车主信息
                    "applicant": this.showlist1 ? this.carOwner : this.applicant,//投保人,
                    "insured": this.showlist2 ? this.carOwner : this.insured,//被保人信息
                    "beneficiary": this.showlist3 ? this.carOwner : this.beneficiary,
                    "bizDate": this.main['bizInsureInfo']&&this.main['bizInsureInfo']['startDate'],
                    "efcDate": this.main['efcInsureInfo']&&this.main['efcInsureInfo']['startDate'],
                    "offerId": this.detail['id'],
                    "prvId": this.detail['prvId'],
                    "token": this.token
                }).then(responces=> {
                    let res = responces.data;
                    if (res.status == 'SUCCESS') {
                        //校验补充信息
                        this.insureRelationId = res.content.insureRelationId;
                        if (res.content && res.content.insureSupplys.length > 0) {
                            //需要补充信息
                            this.createAddForm(res.content.insureSupplys);
                        } else {
                            this.$router.push({
                                path: '/offerList',
                                query:{
                                    carLicenseNo:this.carInfo.carLicenseNo,
                                    insureRelationId:this.insureRelationId
                                }
                            })
                        }
                    } else if (res.status == 'PLEASE_LOGIN') {
                        this.$toast(res.msg);
                        this.$store.dispatch('showLoginBox');
                    } else {
                        this.$toast(res.msg);
                    }
                }, err=> {
                    this.$toast('提交失败，请检查你的网络');
                })
            },
            //保单校验
            formVild(){
                return new Promise((resolve, reject)=> {
                    if (!this.showlist1) {
                        this.itemReg(this.applicant) ? resolve() : reject();
                    } else if (!this.showlist2) {
                        this.itemReg(this.insured) ? resolve() : reject();
                    } else if (!this.showlist3) {
                        this.itemReg(this.beneficiary) ? resolve() : reject();
                    } else {
                        this.itemReg(this.carOwner) ? resolve() : reject();
                    }
                })
            },
            //校验
            itemReg(obj){
                let idReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,//身份证
                        phoneReg = /^1[3|4|5|7|8][0-9]\d{8}$/,
                        emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                if (!obj.name) {
                    this.$toast('请输入完整信息');
                    return false
                } else if (!idReg.test(obj.idcardNo)) {
                    this.$toast('身份证格式错误');
                    return false
                } else if (!phoneReg.test(obj.phone)) {
                    this.$toast('手机号码错误');
                    return false
                } else if (obj.email && !emailReg.test(obj.email)) {
                    this.$toast('邮箱格式错误');
                    return false
                } else {
                    return true
                }
            },

            //使用input 已经弃用
            fileUp(evt, index){
                this.$tools.filePick(evt.target).then(file=> {
                    let fileSize = Math.round(file.size / 1024 * 100) / 100;//单位kb
                    if (fileSize > 1024) {
                        this.$toast("上传附件过大请重新上传");
                    } else {
                        this.$tools.imgToBase64(file).then(res=> {
                            this.upFiles[index].load = true;
                            this.upFiles[index].imageDetail.imageBase64 = res;
                            this.upFiles[index].imageDetail.imageMode = file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length).toLowerCase();
                        });
                    }
                }, err=> {
                    if (err == 'typeErr') this.$toast(err);
                })
            },

            //微信sdk 附件上传
            filePick(index){
                let self = this;
                if (!this.token) {
                    this.$store.dispatch('showLoginBox');
                    return
                }
                this.$wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        var localIds = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        self.transImgbyWx(localIds,index);
                    }
                });
            },
            //step:上传到wx
            transImgbyWx(localIds,index){
                let self = this;
                this.$wx.uploadImage({
                    localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                        var serverId = res.serverId; // 返回图片的服务器端ID
                        self.getWximg(serverId,index);
                    }
                });
            },
            // step: 本地接口获取图片
            getWximg(fileId,index){
                if (!fileId) return;
                this.loading();
                this.$http.post(BASE_URL+'/car/image/wxUploadImage', {
                    "fileId": fileId,
                    "token": this.token
                }).then(result=> {
                    this.loadingClose();
                    if (result.data.status == 'SUCCESS') {
                        let base64 = result['data']['content']['base64'];
                        let fileId = result['data']['content']['fileId'];
                        this.upFiles[index].imageBase64 = base64;
                        this.upFiles[index].load = true;
                        this.upFiles[index].imageDetail.fileId = fileId;
                        this.upFiles[index].imageDetail.imageMode = 'png';
                    }else{
                        this.$toast('获取失败');
                    }
                }, err=> {
                    this.loadingClose();
                    this.$toast('获取失败')
                })
            },
            //预览
            preViewImg(base64){
                this.showPrwView=true;
                this.showPrwViewBase64 = base64;
                alert(base64);
            },
            //删除图片
            deletefile(index){
                this.upFiles[index].load = false;
            },

            deletefileUp(index){
                this.upFiles.splice(index,1);
            },
            //添加附件
            addFile(){
                this.upFiles.push({
                    title: '添加附件',
                    load: false,
                    addBySelf:true,
                    imageBase64:"",
                    imageDetail: {
                        "fileId": "",
                        "imageMode": "",
                        "imageType": ""// 作为用户自己增加的图片 可以移除
                    }
                })
            },
            //用户选择完成图片后生成的图片队列
            subMit(){
                this.images = [];
                let lenBySelf = 0;
                this.upFiles.forEach(item=> {
                    if (item.load) {
                        this.images.push(item['imageDetail']);
                        if(item.addBySelf){
                            lenBySelf++;
                        }
                    }
                });
                this.imgLenBySelf = lenBySelf;
                this.addVisible = false
            },
            //生成补充资料表单
            createAddForm(creatlist){
                this.addInfoVisible = true;
                this.insureSupplys = [];//先清空
                // 初始渲染form
                for(let i in creatlist){
                    if(creatlist[i]['itemCode']=='claimantDocumentType'){
                        this.insureSupplys.push({
                            itemCode:creatlist[i]['itemCode'],
                            itemValue:"0"
                        })
                    }else{
                        this.insureSupplys.push({
                            itemCode:creatlist[i]['itemCode'],
                            itemValue:""
                        })
                    }

                }
            },
            //处理时间选择问题
            handleConfirm(date){
                this.insureSupplys[this.onSelected].itemValue = this.$tools.dateFmt(date,'yyyy-MM-dd');
            },

            openaddSelect(index){
                this.onSelected = index;
                this.$refs.picker.open();
            },
            //补充资料
            addInfomation(){
                //验证
                let postform = true;
                for(let j in this.insureSupplys){
                    let val = this.insureSupplys[j].itemValue;
                    let reg = this.regs[this.insureSupplys[j]['itemCode']].reg;
                    if(!val){
                        postform = false;
                        break
                    }
                    if(reg){
                        if(!reg.test(val)){
                            postform = false;
                            break
                        }
                    }
                };
                if(postform){
                    this.addInfomationPost();
                }else{
                    this.showWaring = true;
                    setTimeout(()=>{
                        this.showWaring = false
                    },1000)
                }
//                //补充增加信息 表单验证
            },
            //请求接口
            addInfomationPost(){
                this.loading();
                this.$http.post(BASE_URL+'/carInsurance/improveInsureSupplys',{
                    "insureSupplys":this.insureSupplys,
                    "offerId": this.detail['id'],
                    "prvId": this.detail['prvId'],
                    "token": this.token
                }).then(responces=>{
                    this.loadingClose();
                    let res = responces.data;
                    if (res.status == 'SUCCESS') {
                        //校验补充信息
                        if (res.content && res.content.insureSupplys.length > 0) {
                            this.insureSupplys = res.content.insureSupplys
                        } else {
                            this.addInfoVisible = false;
                            this.$router.push({
                                path: '/offerList',
                                query:{
                                    carLicenseNo:this.carInfo.carLicenseNo,
                                    insureRelationId:this.insureRelationId
                                }
                            })
                        }
                    } else if (res.status == 'PLEASE_LOGIN') {
                        this.$toast(res.msg);
                        this.$store.dispatch('showLoginBox');
                    } else {
                        this.addInfoVisible = false;
                        this.$toast(res.msg);
                    }
                },err=>{
                    this.loadingClose();
                })
            }

        },
        mounted(){
            this.getAllInfo();
            if(this.$route.query.type=='hb'){
                this.isHebao = true;//当前订单属于核保退回 则需要禁止用户提交
            }
        },
        computed: {
            detail: function () {
                return this.$route.query.detail
            },
            ...mapState([
                'token'
            ])
        },
        components: {
            addFiles: addfiles,
            iDecl: insuranceDeclaration,
            preView
        }
    }
</script>

<style>
    .btn_box_db {
        position: relative;
        padding: 10px
    }

    .btn_box_db .dec {
        text-align: center;
        margin-bottom: 20px;
        font-size: 14px;
        color: #999999;
    }

    .btn_box_db .dec a {
        text-decoration: none;
        color: #FF7D00;
    }

    .btn_s[disabled=disabled] {
        background: #dddddd;
    }


    label.checkbox_s input {
        display: none
    }

    label.checkbox_s span {
        display: block;
        border: 1px solid #FF7D00;
        width: 100%;
        height: 100%;
        border-radius: 2px;
        vertical-align: middle;
        position: relative;
    }

    label.checkbox_s input:checked + span::after {
        content: " ";
        display: block;
        position: absolute;
        left: 4px;
        top: 1px;
        width: 4px;
        height: 8px;
        border-right: 1px solid #FF7D00;
        border-bottom: 1px solid #FF7D00;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    label.checkbox_s {
        display: inline-block;
        width: 14px;
        height: 14px;
        vertical-align: baseline;
        margin-right: 4px;
    }
    .cps_list_item {
        margin-bottom: 10px;
    }

    .cps_list_item .list {
        background-color: #ffffff
    }

    .f16 {
        font-family: PingFangSC-Regular;
        color: #666666;
        font-size: 16px !important;
    }

    .company_logo {
        display: flex;
        margin-bottom: 10px;
        padding: 10px;
        background-color: #ffffff;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 60px;
    }

    .company_logo h2 {
        font-family: PingFang-SC-Medium;
        font-size: 22px;
        color: #666666;
        letter-spacing: 0;
        line-height: 16px;
    }

    .company_logo .logo {
        display: block;
        width: 22px;
        height: 22px;
        margin-bottom: 10px;
        background-color: #999999;
    }

    .popState {
        width: 100%;
        height: 100%;
        background: #ffffff;
    }

    .text_center {
        text-align: center;
        font-family: PingFangSC-Medium;
        font-size: 17px;
        color: #666666;
        margin: 10px;
    }

    .article_content p {
        margin: 10px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #666666;
        line-height: 20px;
    }

    .addInfoItem {
        padding: 10px 0;
        border-bottom: 1px solid #C8C7CC;
    }

    .addInfoItem .title {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #666666;
    }

    .addInfoItem .content {
        padding-top: 5px;
    }
    .addInfoItem .content input {
        line-height: 20px;
        border: none;
        background: none;
        outline: none;
        width: 100%;
    }

    .addInfoItem .content select{
        line-height: 20px;
        border: none;
        background: none;
        outline: none;
        width: 100%;
        font-size: 12px;
        color: #333333;
    }
    .selectItem_n,.selectItem_y{
        line-height: 20px;
        border: none;
        background: none;
        outline: none;
        width: 100%;
        font-size: 12px;
    }
    .selectItem_n{
        color: #999999;
    }
    .selectItem_y{
        color: #333333;
    }

    .add_container {
        padding-left: 10px;
    }

    .leftL {
        position: relative;
        padding-left: 6px;
        height: 20px;
    }

    .leftL::before {
        content: " ";
        display: block;
        position: absolute;
        left: 0px;
        width: 4px;
        height: 100%;
        background-color: #FF7D00;
    }
    .file_box{
        height: -webkit-calc(100% - 114px);
        height: -moz-calc(100% - 114px);
        height: calc(100% - 114px);
        overflow: auto;
    }
    .btn_box{
        padding: 10px;
    }
    .warning_box{
        position: fixed;
        width: 100px;
        height: 20px;
        left: 50%;
        top: 50%;
        margin-left: -60px;
        margin-top: -40px;
        z-index: 19999999;
        background-color: rgba(0,0,0,.8);
        border-radius: 5px;
        line-height: 20px;
        padding: 10px;
        color: #ffffff;

    }
</style>
