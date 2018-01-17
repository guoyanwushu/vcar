<template>
    <div>
        <div class="headbar">
            <!--<div class="logo">-->
            <!--<img src="../../assets/img_home_logo@3x.png" alt="虎优车险">-->
            <!--</div>-->
            <div class="title">虎优车险</div>
        </div>
        <div class="bg_gary" v-bind:class="{'container':showNav,'container_nofoot':!showNav}">
            <div class="banner">
                <mt-swipe :auto="4000">
                    <mt-swipe-item v-for="(banner,key) in banners" :key="key">
                        <!--<a v-bind:href="banner.contentUrl">-->
                        <img v-bind:src="banner.imageUrl" alt="">
                        <!--</a>-->
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <div class="address_select">
                <span class="address" @click="chosen()">
                    {{carPlate?carPlate.carPlateCode:""}}
                </span>
                <input
                        type="text"
                        maxlength="6"
                        @focus="showNav=false"
                        @blur="showNav=true"
                        v-model="carN"
                        class="car_n"
                        placeholder="请输入车牌号"
                />
                <button @click="findReport">车险报价</button>
            </div>
            <div class="banner_all">
                <div class="banner_box" v-if="baoxianzhitongche.length>0">
                    <div class="title">
                        <span>
                            {{baoxianzhitongche[0].title}}
                        </span>
                    </div>
                    <div class="content">
                        <router-link tag="a" to="/baseInfo" class="media" v-for="(item,key) in baoxianzhitongche"
                           :key="key">
                            <div class="left">
                                <img v-bind:src="item.imageUrl" bind:alt="item.title">
                            </div>
                            <div class="right">
                                <h5>{{item.remark1}}</h5>
                                <p>{{item.remark2}}</p>
                            </div>
                        </router-link>
                    </div>
                </div>
                <div class="banner_box" v-if="serverItems.length>0">
                    <div class="title">
                        <span>
                            {{serverItems[0].title}}
                        </span>
                    </div>
                    <div class="content">
                        <div class="links" v-for="item in serverItems" @click="selectItem(item.contentUrl,item.id)" :key="item.id">
                            <i class="icon">
                                <img v-bind:src="item.imageUrl" alt="">
                            </i>
                            <span class="tip">{{item.remark1}}</span>
                        </div>
                    </div>
                </div>
                <div class="banner_box" v-if="xianshitejia.length>0">
                    <div class="title">
                        <span>
                            {{xianshitejia[0].title}}
                        </span>
                    </div>
                    <div class="content">
                        <div v-bind:href="item.contentUrl" class="tj" v-for="(item,key) in xianshitejia" :key="key">
                            <div class="left">
                                <h2>
                                    {{item.remark1}}
                                </h2>
                                <h2>
                                    {{item.remark2}}
                                </h2>
                                <p>
                                    {{item.remark3}}
                                </p>
                            </div>
                            <div class="logo">
                                <img v-bind:src="item.imageUrl" v-bind:alt="item.title">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="banner_box" v-if="friendsLinks.length>0">
                    <div class="title">
                        <span>{{friendsLinks[0].title}}</span>
                    </div>
                    <div class="outlinks">
                        <!--<ul class="friends-link">
                            <li v-for="item in friendsLinks" :key="item.id"><img v-bind:src="item.imageUrl" alt=""></li>
                        </ul>-->
                        <mt-swipe :auto="0" :show-indicators="true">
                            <mt-swipe-item v-for="item in friendsLinksForScroll" :key="item.index">
                                <div class="flex-box">
                                    <img v-bind:src="subitem.imageUrl" alt="" v-for="subitem in item" :key="subitem.id">
                                </div>
                            </mt-swipe-item>
                        </mt-swipe>
                    </div>
                </div>
                <!--<div class="law_info">-->
                    <!--<p>中国保监会互联网保险资格备案</p>-->
                    <!--<p>中国保险行业协会互联网保险信息披露备案</p>-->
                    <!--<p>京公网安备11010502030904号</p>-->
                    <!--<p>京ICP备15004797号—1</p>-->
                <!--</div>-->
            </div>
        </div>
        <transition name="slide-fade">
            <Ilist
                    v-on:handlerSelect="selectedAddress"
                    :visible.sync="showModal"
            ></Ilist>
        </transition>
        <navbar :selected="'/home'" v-if="showNav"></navbar>
    </div>
</template>


<script type="text/ecmascript-6">
    import navbar from 'components/Navbar'
    import Ilist from 'components/Ilist'
    import {Toast,Indicator} from 'mint-ui'
    import {mapActions,mapState} from 'vuex'
    import { lazyAMapApiLoaderInstance } from 'vue-amap';
    export default {
        name: '',
        data(){
            return {
                popupVisible: false,
                selected: '1',
                showModal: false,
                carN: null,
                banners: [],
                baoxianzhitongche: [],
                xianshitejia: [],
                serverItems:[],
                friendsLinks: [],
                friendsLinksForScroll:[],
                showNav:true
            }
        },
        methods: {
                ...mapActions([
                   'setparam',
                    'loadErr'
                ]),
            loading(){
                Indicator.open({spinnerType: 'fading-circle'});
            },
            loadClose(){
                Indicator.close();
            },

            getBanners(){
                this.loading();
                this.$http.post(BASE_URL + '/spead/all').then(res=> {
                    this.loadErr(false);
                    this.loadClose();
                    let data = res.data.content;
                    data.forEach(item=> {
                        if (item.type == 'BANNER') {
                            this.banners = item.list;
                        } else if (item.type == 'THROUGH') {
                            this.baoxianzhitongche = item.list;
                        } else if (item.type == 'INSURANCE_RECOMMEND') {
                            this.xianshitejia = item.list;
                        }
                        else if(item.type == 'VIP'){
                            this.serverItems = item.list;
                        }   
                        else if(item.type == 'INSURANCE_AGENCY'){
                            let arr = [];
                            this.friendsLinks = item.list;
                            this.friendsLinks.forEach((item,index)=>{
                                if((index)%6==0)
                                    arr = [];
                                arr.push(item);
                                this.friendsLinksForScroll[Math.floor(index/5)]=arr;
                                //console.log(this.friendsLinksForScroll[Math.floor(index/5)])
                            })
                        }
                    });
                }, err=> {
                    this.loadClose();
                    this.$toast('网络错误，请检查你的网络');
                    this.loadErr(true);
                })
            },

            selectItem(url,id){
                if(id==14){
                    this.$router.push("/orderquery");
                }
                else if(id==16){
                    this.$router.push("/claimquery");
                }
                else if(!url){
                    Toast({
                        message:'敬请期待'
                    })
                }
                else{
                    window.location.href = url;
                }
            },

            selectedAddress(type){
                this.$store.dispatch('setCarPlate', type);
            },

            chosen(){
                this.showModal = true
            },
            selectN(){
                this.popupVisible = true
            },
            findReport(){

                let carNum = new String(`${this.carPlate.carPlateCode}${this.carN}`).toUpperCase();

                let reg = new RegExp('^[\u4e00-\u9fa5][A-Z]((?![IO])[A-Z0-9]){4}((?![IO])[A-Z0-9挂学警港澳])$');
                if(reg.test(carNum)){
                    this.setparam({carN:this.carN})
                    this.$router.push({path:'/quotation',query:{carN:this.carN}})
                }else{
                  if(!this.carN){
                      this.setparam({carN:''});
                      this.$toast('请填写完整的车牌号码');
                  }else{
                    let tost = Toast({
                      message: '车牌号码格式错误',
                      position: 'bottom'
                    });
                  }
                }
            },
            getLocal(res){
                this.$http.post(BASE_URL + '/carPlateCity/getCityPlateInfo', {
                        "insureAreaCode": res.adcode
                    }).then(result=> {
                        let data = result.data;
                        if (data.status == "SUCCESS") {
                            //把获取到的当地车牌地址 存入store
                            this.$store.dispatch('setCarPlate',data.content);
                        }
                    },err=>{

                    })
            }
        },
        mounted(){
            let self = this;
            //获取广告
            this.getBanners();
            //获取位置信息
            lazyAMapApiLoaderInstance.load().then(()=>{
                let geolocation = new AMap.Geolocation({
                    enableHighAccuracy: false,//是否使用高精度定位，默认:true
                    noIpLocate: 0
                });
                geolocation.getCityInfo(function (status, result) {
                    if (status == 'complete') {
                        self.getLocal(result);
                    } else {
                        self.$toast('载入定位信息失败')
                    }
                });
            })
        },
        computed: {
            ...mapState([
                'carPlate'
            ])
        },
        components: {
            navbar,
            Ilist
        }
    }
</script>

<style lang="less" scoped>
    a{
        text-decoration: none;
    }
    .banner {
        height: 180px
    }

    .banner img {
        width: 100%;
        height: 100%
    }

    .car_n {
        -webkit-appearance: none;
    }
    .banner_all .banner_box .outlinks{
        overflow: scroll;
    }
    .law_info{
        font-family: PingFangSC-Regular;
        margin-top: -10px;
        height: 108px;
        line-height: 17px;
        font-size: 12px;
        color: #999999;
        display: flex;
        text-align: center;
        flex-direction: column;
        justify-content: center;
    }
    .friends-link{
        display: flex;
        width: 100%;
        //justify-content: space-around;
        max-height: none;
        overflow: scroll;
        flex-wrap: wrap;
        li{
            width: 33%;
            text-align: center;
            list-style: none;
            img{
                display: inline-block;
                width: 92px;
                height: 44px;
            }
        }
    }
    .outlinks{
        height:180px;
        padding: 0;
        img{
            width: 33%;
            height: auto;
        }
    }
</style>
