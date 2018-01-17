<template>
    <div>
        <mt-header title="核保中">
            <router-link :to="{path:'/order'}" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container_nofoot bg_gary">
            <div class="offer_list">
                <div v-for="item in orderList">
                    <div class="item" v-if="item.taskState==16">
                        <div class="item_content">
                            <div></div>
                            <div>{{item.prvName}}</div>
                            <div></div>
                        </div>
                        <div class="item_detail">
                            <div class="deal_success">
                                <div class="title">核保中<i class="icon_shalou"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="item" v-if="item.taskState==19">
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
                            <button class="edit" @click="editConfig(item,'hb')">
                               上传影像
                            </button>
                        </div>
                    </div>
                    <div class="item" v-if="item.taskState==20">
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
                                <div class="content">报价有效期：{{item.quoteValidTime}}</div>
                            </div>
                            <div class="btn_group">
                                <button @click="checkDetail(item)">查看详情</button>
                                <button @click="dealOrder(item)">马上支付</button>
                            </div>
                        </div>
                    </div>
                    <!--<div class="item" v-if="item.taskState==51">-->
                        <!--<div class="item_content">-->
                            <!--<div></div>-->
                            <!--<div>{{item.prvName}}</div>-->
                            <!--<div></div>-->
                        <!--</div>-->
                        <!--<div class="item_detail">-->
                            <!--<div class="collspan_nav" @click="collspan($event)">-->
                                <!--承保政策限制-->
                                <!--<i class="up"></i>-->
                            <!--</div>-->
                            <!--<div class="show_box item_detail_list_hide">-->
                                <!--{{item.errorMsg}}-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="item" v-if="item.taskState==25">-->
                        <!--<div class="item_content">-->
                            <!--<div></div>-->
                            <!--<div>{{item.prvName}}</div>-->
                            <!--<div></div>-->
                        <!--</div>-->
                        <!--<div class="item_detail">-->
                            <!--<div class="deal_success">-->
                                <!--<div class="title">支付成功</div>-->
                            <!--</div>-->
                            <!--<div class="item_detail">-->
                                <!--<button class="edit" @click="checkSuccess(item)">-->
                                    <!--查看详情-->
                                <!--</button>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapState,mapActions} from 'vuex'
    import {Toast,Indicator} from 'mint-ui'
    export default {
        name: '',
        data(){
            return{
                orderList:[],
                requestTime:1,
                goCheck:true
            }
        },
        methods:{
            ...mapActions([
                'showLoginBox'
            ]),

            loadTop(){
                setTimeout(()=>{
                    this.$refs.loadmore.onTopLoaded();
                },1500)
            },

            collspan(evt){
                let el = evt.target,
                        icon = el.querySelector('i'),
                        list = el.parentNode.querySelector('.show_box');
                if(icon.className=='up'){
                    list.className = ['show_box','item_detail_list_show'].join(' ');
                    icon.className = 'down'
                }else{
                    list.className = ['show_box','item_detail_list_hide'].join(" ");
                    icon.className = 'up'
                }

            },

            editConfig(detail,type){
                this.$router.push({path:'/addfiles',query:{detail,type}})
            },
            //支付
            dealOrder(detail){
                this.$router.push({path:'/pay',query:{detail}})
            },
            //看详情
            checkDetail(detail){
//                this.$router.push({path:'/underwritingDetail',query:{detail}})
                this.$router.push({path:'/orderDetail',query:{detail,step:"hb"}})
            },
            checkSuccess(detail){
                this.$router.push({path:'/paySuccessDetail',query:{detail}})
            },
            reCheck(){
                let st =  setInterval(()=>{
                    if(this.goCheck){
                        this.getList();
                    }else{
                        clearInterval(st);
                    }
                },4000)
            },

            getList(){
                this.$http.post(BASE_URL+'/offerStatus/getAllOfferStatus',{token:this.token}).then(res=>{
                    this.$indicator.close();
                    let data = res.data;
                    if(data.status=='SUCCESS'){
                        this.orderList = data.content;
                    }else{
                        this.goCheck = false;
                        this.$toast(data.msg);
                        if(data.status=='PLEASE_LOGIN'){
                            this.showLoginBox();
                        }
                    }
                } ,err=>{
                    this.goCheck = false;
                    this.$indicator.close();
                    this.$toast('获取报价信息失败，请检查你的网络')
                })
            }
        },
        watch:{
            showLogin(val){
                if(!val){
                    if(this.isLogin){
                        this.getList();
                    }else{
                        this.$router.push({path:'/'})
                    }
                }
            }
        },

        computed:{
            ...mapState([
                'token',
                'showLogin',
                'isLogin'
            ])
        },
        mounted(){
            this.$indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.getList();
            this.reCheck();
        },
        beforeDestroy(){
            //销毁掉计时器
            this.goCheck = false;
        }
    }
</script>

<style>
    .yellow{
        color: #FF7D00;
    }
    .offer_list{
        min-height: -webkit-calc(100% - 50px);
        min-height: -moz-calc(100% - 50px);
        min-height: calc(100% - 50px);
    }
</style>
