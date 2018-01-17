<template>
    <div>
        <mt-header v-bind:title="orderList.title">
            <router-link :to="{path:'/order'}" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container_nofoot bg_gary">
            <div class="offer_list">
                <div v-for="item in orderList.list">
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
                                <div class="content">报价有效期：{{item.quoteValidTime}}</div>
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
                servicePhone:SERVICEPHONE,
                requestTime:1,
                goCheck:true,
                title:null
            }
        },
        methods:{
            ...mapActions([
                'showLoginBox'
            ]),

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

            //具体修改 要把 insureRelationId 带入
            //承保政策限制 修改
            editConfig(item){
                this.$router.push({path:'/selectInsurance',query:{
                    edit:item,
                    insureRelationId:this.orderList.insureRelationId
                }})
            },
            //核保退回修改
            editConfigHb(item){
                this.$router.push({
                    path:'/addfiles',
                    query:{
                        detail:item,
                        insureRelationId:this.orderList.insureRelationId
                    }
                })
            },
            //立即投保
            dealOrder(detail,type){
                this.$router.push({path:'/dealOrder',query:{detail,type}})
            },
            //报价详情
            checkDetail(detail){
                this.$router.push({path:'/orderDetail',query:{detail,step:"bj"}})
            },
            //支付
            dealOrderHb(detail){
                this.$router.push({path:'/pay',query:{detail}})
            },
            //核保详情
            checkDetailHb(detail){
                this.$router.push({path:'/orderDetail',query:{detail,step:'hb'}})
            },
            //支付成功
            checkSuccess(item){
                this.$router.push({path:'/paySuccessDetail',query:{detail:item}})
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
                'isLogin',
                'orderList'
            ])
        },
        mounted(){

        },
        beforeDestroy(){
            //销毁掉计时器
            this.goCheck = false;
        }
    }
</script>

<style>
    .offer_list{
        min-height: -webkit-calc(100% - 50px);
        min-height: -moz-calc(100% - 50px);
        min-height: calc(100% - 50px);
    }
</style>
