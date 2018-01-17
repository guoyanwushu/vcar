<template>
    <div>
        <div class="headbar">
            <!--<div class="logo">-->
            <!--<img src="../../assets/img_home_logo@3x.png" alt="虎优车险">-->
            <!--</div>-->
            <div class="title">虎优</div>
        </div>
        <div class="bg_gary container_nofoot">
            <div class="banner">
                <mt-swipe :auto="4000">
                    <mt-swipe-item>
                        <!--<a v-bind:href="banner.contentUrl">-->
                        <img src="../assets/record/banner_autoinsurance_banner01@3x.png" alt="">
                        <!--</a>-->
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <div class="banner_all">
                <div class="banner_box">
                    <div class="title">
                        <span>
                            车险直通车
                        </span>
                    </div>
                    <div class="cx_link">
                        <button @click="toBaseInfoPage">车险直通车 <i class="icon_car"></i></button>
                        <!--<p>车险比价 实时查询 直击行业低价</p>-->
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
            </div>
        </div>
        <errload></errload>
    </div>
</template>


<script type="text/ecmascript-6">
    import navbar from 'components/Navbar'
    import errload from 'src/view/404'
    import {Toast,Indicator} from 'mint-ui'
    import {mapActions,mapState} from 'vuex'
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
            }
        },
        methods: {
            ...mapActions([
                'setparam',
                'loadErr'
            ]),
            toBaseInfoPage(){
//                window.location.href = 'baseInfo.html'
                this.$router.push({path:"/baseInfo"});
            },
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
            }
        },
        mounted(){
            let self = this;
            //获取广告
            this.getBanners();
            //获取位置信息
        },

        computed: {
            ...mapState([
                'carPlate'
            ])
        },
        components: {
            errload
        }
    }
</script>

<style lang="less" scoped>
    a {
        text-decoration: none;
    }
    .banner {
        height: 180px;
    }
    .banner img {
        width: 100%;
        height: 100%;
    }
    .car_n {
        -webkit-appearance: none;
    }
    .banner_all .banner_box .outlinks {
        overflow: scroll;
    }
    .law_info {
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
    .friends-link {
        display: flex;
        width: 100%;
        max-height: none;
        overflow: scroll;
        flex-wrap: wrap;
    }
    .friends-link li {
        width: 33%;
        text-align: center;
        list-style: none;
    }
    .friends-link li img {
        display: inline-block;
        width: 92px;
        height: 44px;
    }
    .outlinks {
        height: 180px;
        padding: 0;
    }
    .outlinks img {
        width: 33%;
        height: auto;
    }
    .cx_link{
        padding: 10px 32px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .cx_link button{
        flex: 1;
        background: #FF7D00;
        box-shadow: 0 2px 4px 0 rgba(172,84,0,0.30);
        border-radius: 100px;
        border:none;
        line-height: 44px;
        margin-bottom: 10px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #FFFFFF;
    }
    .cx_link button i.icon_car{
        display: inline-block;
        width: 26px;
        height: 15px;
        background-image: url("../assets/record/icon_home_car@3x.png");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        vertical-align: middle;
    }
    .cx_link p{
        flex: 1;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #999999;
        text-align: center;
    }
</style>
