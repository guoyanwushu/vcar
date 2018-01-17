<template>
    <div>
        <mt-header v-bind:title="title">
            <router-link :to="{path:'/order'}" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <div slot="right">
                <i class="recall" @click="reCall()"></i>
                <i class="home" @click="goHome()"></i>
            </div>
        </mt-header>
        <div class="container_nofoot bg_gary">
            <div class="offer_list">
                <div v-for="item in orderList">
                    <div class="item" v-if="!item.taskState||item.taskState==2">
                        <div class="item_content">
                            <div></div>
                            <div>{{item.prvName}}</div>
                            <div></div>
                        </div>
                        <div class="item_detail">
                            <div>正在获取精确报价中<i class="icon_shalou"></i></div>
                        </div>
                    </div>
                    <div class="item" v-else-if="item.taskState==13">
                        <div class="item_content">
                            <div></div>
                            <div>{{item.prvName}}</div>
                            <div>
                                <span>

                                </span>
                            </div>
                        </div>
                        <div class="item_detail">
                            <div class="collspan_nav" @click.self="collspan($event)">
                                {{item.taskStateDescription}}
                                <i class="up"></i>
                            </div>
                            <div class="show_box item_detail_list_hide">
                                {{item.errorMsg}}
                            </div>
                        </div>
                    </div>
                    <div class="item" v-else-if="item.taskState==14">
                        <div class="item_content">
                            <div></div>
                            <div>{{item.prvName}}</div>
                            <div><span>
                                 ￥{{item.totalPremium}}
                            </span></div>
                        </div>
                        <div class="item_detail">
                            <div class="deal_success">
                                <div class="title">{{item.taskStateDescription}}</div>
                                <div class="content">报价有效期：{{item.quoteValidTime}}</div>
                            </div>
                            <div class="btn_group">
                                <button @click="checkDetail(item)">查看详情</button>
                                <button @click="dealOrder(item)">马上投保</button>
                            </div>
                        </div>
                    </div>
                    <div class="item" v-else-if="item.taskState==16">
                        <div class="item_content">
                            <div></div>
                            <div>{{item.prvName}}</div>
                            <div></div>
                        </div>
                        <div class="item_detail">
                            <div class="deal_success">
                                <div class="title">{{item.taskStateDescription}}<i class="icon_shalou"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="item" v-else-if="item.taskState==19">
                        <div class="item_content">
                            <div></div>
                            <div>{{item.prvName}}</div>
                            <div><span></span></div>
                        </div>
                        <div class="item_detail">
                            <div class="collspan_nav" @click="collspan($event)">
                                {{item.taskStateDescription}}
                                <i class="up"></i>
                            </div>
                            <div class="show_box item_detail_list_hide">
                                {{item.errorMsg}}
                            </div>
                            <button class="edit" @click="editConfigHb(item,'hb')">
                                上传影像
                            </button>
                        </div>
                    </div>
                    <div class="item" v-else-if="item.taskState==20">
                        <div class="item_content">
                            <div></div>
                            <div>{{item.prvName}}</div>
                            <div>
                               <span class="yellow">
                                  ￥{{item.totalPremium}}
                                </span>
                            </div>
                        </div>
                        <div class="item_detail">
                            <div class="deal_success">
                                <div class="title">{{item.taskStateDescription}}</div>
                                <div class="content">支付有效期：{{item.payValidTime}}</div>
                            </div>
                            <div class="btn_group">
                                <button @click="checkDetailHb(item)">查看详情</button>
                                <button @click="dealOrderHb(item)">马上支付</button>
                            </div>
                        </div>
                    </div>
                    <div class="item" v-else-if="item.taskState==23">
                        <div class="item_content">
                            <div></div>
                            <div>{{item.prvName}}</div>
                            <div></div>
                        </div>
                        <div class="item_detail">
                            <div class="deal_success">
                                <div class="title">{{item.taskStateDescription}}</div>
                            </div>
                            <div class="item_detail">
                                <button class="edit" @click="checkSuccess(item)">
                                    查看详情
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="item" v-else-if="item.taskState==25">
                        <div class="item_content">
                            <div></div>
                            <div>{{item.prvName}}</div>
                            <div></div>
                        </div>
                        <div class="item_detail">
                            <div class="deal_success">
                                <div class="title">{{item.taskStateDescription}}</div>
                            </div>
                            <div class="item_detail">
                                <button class="edit" @click="checkSuccess(item)">
                                    查看详情
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="item" v-else-if="item.taskState==33">
                        <div class="item_content">
                            <div></div>
                            <div>{{item.prvName}}</div>
                            <div></div>
                        </div>
                        <div class="item_detail">
                            <div class="deal_success">
                                <div class="title">{{item.taskStateDescription}}</div>
                            </div>
                            <div class="item_detail">
                                <button class="edit" @click="checkSuccess(item)">
                                    查看详情
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="item" v-else-if="item.taskState==51">
                        <div class="item_content">
                            <div></div>
                            <div>{{item.prvName}}</div>
                            <div></div>
                        </div>
                        <div class="item_detail">
                            <div class="collspan_nav" @click.self="collspan($event)">
                                {{item.taskStateDescription}}
                                <i class="up"></i>
                            </div>
                            <div class="show_box item_detail_list_hide">
                                {{item.errorMsg}}
                            </div>
                            <button class="edit" @click="editConfig(item)">
                                修改保险配置
                            </button>
                        </div>
                    </div>
                    <div class="item" v-else>
                        <div class="item_content">
                            <div></div>
                            <div>{{item.prvName}}</div>
                            <div></div>
                        </div>
                        <div class="item_detail">
                            <div>{{item.taskStateDescription}}</div>
                            <div class="show_box">
                                {{item.errorMsg}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a v-bind:href="'tel:'+servicePhone" class="call_service">
                <i class="icon"></i>
                联系客服
            </a>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapState,mapActions} from 'vuex'
    import {Toast,Indicator} from 'mint-ui'
    export default {
        name: '',
        data(){
            return {
                servicePhone: SERVICEPHONE,
                orderList: [],
                requestTime: 1,
                goCheck: true,
                title: null
            }
        },
        methods: {
            ...mapActions([
                'showLoginBox'
            ]),

            reCall(){
                this.loading();
                this.getList();
            },
            goHome(){
              this.$router.push({path:"/"})
            },

            loading(){
                Indicator.open({spinnerType: 'fading-circle'});
            },

            loadingClose(){
                Indicator.close();
            },
            collspan(evt){
                let el = evt.target,
                        icon = el.querySelector('i'),
                        list = el.parentNode.querySelector('.show_box');
                if (icon.className == 'up') {
                    list.className = ['show_box', 'item_detail_list_show'].join(' ');
                    icon.className = 'down'
                } else {
                    list.className = ['show_box', 'item_detail_list_hide'].join(" ");
                    icon.className = 'up'
                }

            },

            //承保政策限制 修改
            editConfig(item){
                this.$router.push({
                    path: '/selectInsurance',
                    query: {
                        edit: item,
                        insureRelationId:this.$route.query.insureRelationId,
                        carLicenseNo:this.title
                    }
                })
            },
            //核保退回修改
            editConfigHb(item){
                this.$router.push({
                    path: '/addfiles',
                    query: {
                        detail: item,
                        insureRelationId:this.$route.query.insureRelationId,
                        carLicenseNo:this.title
                    }
                })
            },
            //立即投保
            dealOrder(detail, type){
                this.$router.push({path: '/dealOrder', query: {detail, type}})
            },
            //报价详情
            checkDetail(detail){

                this.$router.push({path: '/orderDetail', query: {detail, step: "bj"}})
            },
            //支付
            dealOrderHb(detail){
                this.$router.push({path: '/pay', query: {detail}})
            },
            //核保详情
            checkDetailHb(detail){
                this.$router.push({path: '/orderDetail', query: {detail, step: 'hb'}})
            },
            //支付成功
            checkSuccess(item){
                this.$router.push({path: '/paySuccessDetail', query: {detail: item}})
            },
            // 10s轮训
            reCheck(){
                let st = setInterval(()=> {
                    if (this.goCheck) {
                        this.getList();
                    } else {
                        clearInterval(st);
                    }
                }, 4000)
            },
            // 查询订单状态 token  和 insureRelationId
            getList(){
                this.$http.post(BASE_URL + '/offerStatus/getAllOfferStatus', {
                    token:this.token,
                    insureRelationId:this.$route.query.insureRelationId
                }).then(res=> {
                    this.$indicator.close();
                    let data = res.data;
                    if (data.status == 'SUCCESS') {
                        this.orderList = data.content;
                    } else {
                        this.goCheck = false;
                        this.$toast(data.msg);
                        if (data.status == 'PLEASE_LOGIN') {
                            this.showLoginBox();
                        }
                    }
                }, err=> {
                    this.goCheck = false;
                    this.$indicator.close();
                    this.$toast('获取报价信息失败，请检查你的网络');
                    this.$store.dispatch('loadErr', true)
                })
            }
        },
        watch: {
            showLogin(val){
                if (!val) {
                    if (this.isLogin) {
                        this.getList();
                    } else {
                        this.$router.push({path: '/'})
                    }
                }
            }

        },
        computed: {
            ...mapState([
                'token',
                'showLogin',
                'isLogin',
                'carInfo'
            ])
        },
        mounted(){
            this.$indicator.open({
                text: '加载中... ',
                spinnerType: 'fading-circle'
            });
            this.getList();
            this.reCheck();
            if (this.$route.query.carLicenseNo) {
                this.title = this.$route.query.carLicenseNo;
            } else {
                this.title = this.carInfo.carLicenseNo;
            }
        },
        beforeDestroy(){
            //销毁掉计时器
            this.goCheck = false;
        }
    }
</script>

<style>
    .offer_list {
        min-height: -webkit-calc(100% - 65px);
        min-height: -moz-calc(100% - 65px);
        min-height: calc(100% - 65px);
    }
</style>
