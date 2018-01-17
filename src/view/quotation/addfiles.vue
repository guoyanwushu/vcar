<template>
    <div>
        <mt-header title="完善投保信息">
            <mt-button icon="back" @click="goback()" slot="left"></mt-button>
        </mt-header>
        <div class="file_box">
            <div class="title">
                {{detail.msg}}
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
        <pre-view :visible.sync="showPrwView" :base64="showPrwViewBase64"></pre-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import {Indicator,Toast} from 'mint-ui'
    import preView from 'src/components/preView'
    export default {
        name: '',//上传附件
        data(){
            return {
                upFiles: [],
                imageInfos:null,        // imageInfos 需要上传的照片
                showPrwView:false,
                showPrwViewBase64:""
            }
        },
        methods: {
            loading(){
                Indicator.open({spinnerType: 'fading-circle'});
            },

            loadingClose(){
                Indicator.close();
            },
//            增加附件上传 已经弃用
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
            //微信附件上传方式

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
                        this.upFiles[index].load = true;
                        this.upFiles[index].imageBase64 = base64;
                        this.upFiles[index].imageDetail.imageMode = 'png';
                        this.upFiles[index].imageDetail.fileId = fileId;
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
            },

            // 作为用户自己增加的图片 可以移除
            addFile(){
                this.upFiles.push({
                    title: '添加附件',
                    load: false,
                    addBySelf:true,
                    imageBase64: "",
                    imageDetail: {
                        "fileId":"",
                        "imageMode": "",
                        "imageType": ""
                    }
                })
            },

            deletefile(index){
                this.upFiles[index].load = false;
            },

            deletefileUp(index){
                this.upFiles.splice(index,1);
            },

            subMit(){
                let tmparr = [];//上传图片数组
                let lenBySelf = 0; //用户自加图片个数
                this.upFiles.forEach(item=> {
                    if (item.load) {
                        tmparr.push(item['imageDetail']);
                        if(item.addBySelf){
                            lenBySelf++;
                        }
                    }
                });
                let len1 = tmparr.length,//用户选择上传的图片个数
                    len2 = this.imageInfos.length;//接口返回需要上传的图片个数
                if (len1-lenBySelf/*必传附件个数*/ == len2) {
                    this.$indicator.open({
                        text: '加载中...',
                        spinnerType: 'fading-circle'
                    });
                    this.$http.post(BASE_URL + '/car/image/uploadUnderWritingImageV2', {
                        "imageInfos": tmparr,
                        "token": this.token,
                        "offerId": this.detail['id'],
                        "prvId": this.detail['prvId']
                    }).then(response=> {
                        this.$indicator.close();
                        let res = response.data;
                        if (res.status == 'SUCCESS') {
                            let insureRelationId = this.$route.query.insureRelationId;
                            this.$router.push({path:'/offerList',query:{
                                insureRelationId,
                                carLicenseNo:this.$route.query.carLicenseNo
                            }});
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
                }else{
                    this.$toast('请上传完整影像');
                }


            },

            goback(){
                this.$router.push({path:"/order"});
            },
            loadImgsUp(){
                this.$http.post(BASE_URL + '/offerStatus/getPrvOfferDetailInfo', {
                    "offerId": this.detail['id'],
                    "prvId": this.detail['prvId'],
                    "token": this.token
                }).then(res=>{
                    let data = res.data;
                    if (data.status == 'SUCCESS') {
//                        imageInfos 需要上传的照片
                        this.imageInfos = data.content['imageInfos'];
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
                })
            }
        },
        mounted(){
            if(this.detail){
                this.loadImgsUp();
            }else{
                history.go(-1);
            }
        },
        computed: {
            detail(){
              return this.$route.query.detail;
            },
            token(){
                return this.$store.state.token
            }
        },
        components:{
            preView
        }
    }
</script>

<style scoped>
    .btn_box {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 10px;
    }
</style>
