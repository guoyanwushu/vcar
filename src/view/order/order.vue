<template>
    <div>
        <mt-header title="车险订单"></mt-header>
        <div class="container bg_gary"
             v-if="isLogin"
             v-infinite-scroll="loadMore"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="20"
             infinite-scroll-immediate-check="ifLoading"
        >
            <mt-loadmore :top-method='loadTop' ref="loadmore">
                <div class="order_item" v-for="(item,index) in list" v-if="item.offerList">
                    <div class="media">
                        <div class="media_left">
                            <img src="../../assets/img_my_headportrait@3x.png" alt="">
                        </div>
                        <div class="media_body">
                            <div class="body_left">
                                <h5>{{item.carLicenseNo}}</h5>
                                <p>共<span>{{item.offerList?item.offerList.length:0}}</span>家完成报价</p>
                            </div>
                            <div class="body_right">
                                <h5>{{item.ownerName}}</h5>
                                <p>{{item.offerDate}}</p>
                            </div>
                        </div>
                    </div>
                    <template v-if='optFlag[index]'>
                        <div class="order_item_list" @click="goDetail(item)">
                            <div v-for="sitem in sliceData(item.offerList)">
                                <div class="cell cell_s">
                                    <div class="cell_title">
                                        {{sitem.prvName}}
                                    </div>
                                    <div class="cell_content_1">
                                        {{sitem.taskStateDescription}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="collspan_btn" @click="toggle(index)" v-if='item.offerList.length>2'>
                            还有{{item.offerList.length-2}}家报价，
                            <span>点击展开</span><img src="../../assets/icon_order_downarrorw@3x.png" alt="">
                        </button>
                    </template>
                    <template v-if="!optFlag[index]">
                        <div class="order_item_list" @click="goDetail(item)">
                            <div v-for="sitem in item.offerList">
                                <div class="cell cell_s">
                                    <div class="cell_title">
                                        {{sitem.prvName}}
                                    </div>
                                    <div class="cell_content_1">
                                        {{sitem.taskStateDescription}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="collspan_btn" @click="toggle(index)" v-if='item.offerList.length>2'>
                            共{{item.offerList.length}}家报价，<span>点击收起</span>
                            <img src="../../assets/icon_order_uparrorw@3x.png" alt="">
                        </button>
                    </template>
                </div>
                <div class="loading-box" v-if="loading">
                    <mt-spinner type="fading-circle"></mt-spinner>
                </div>
                <div v-if="list.length==0" class="no_order_list">
                    <div class="info">暂无订单</div>
                </div>
            </mt-loadmore>
        </div>
        <navbar :selected="'/order'"></navbar>
    </div>
</template>

<script type="text/ecmascript-6">
    import navbar from 'components/Navbar'
    import {mapState,mapActions} from 'vuex'
    import {Toast,Indicator} from 'mint-ui'
    export default {
        name: '',
        data(){
            return {
                selected: '1',
                ifLoading:true,
                topStatus:"",
                loading:false,
                optFlag:[],
                list:[]
            }
        },
        methods:{
            ...mapActions([
                'showLoginBox',
                'setOrderList'
            ]),
            toggle(index){
                this.optFlag.splice(index,1,!this.optFlag[index]);
            },
            sliceData(data){
                if(!data) return [];
                return data.slice(0,2);
            },
            loadTop(){
                this.loadList(()=>{
                    this.$refs.loadmore.onTopLoaded();
                })
            },
            loadMore() {
                this.loading = false
                this.loadList();
            },
            loadList(successCallback){
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                this.$http.post(BASE_URL+'/offer/getCustomerOffer',{
                    token:this.token
                }).then(res=>{
                    this.$indicator.close();
                    if(successCallback) successCallback();
                    let data = res.data;
                    if(data.status=='SUCCESS'){
                        this.list = data.content;
                        for(let i=0;i<data.content.length;i++){
                            this.optFlag.push(true)
                        }
                    }else if(data.status=='PLEASE_LOGIN'){
                        this.$toast('请先登录');
                        this.showLoginBox();
                    }else{
                        this.$toast(data.msg)
                    }
                },err=>{
                    this.$indicator.close()
                    if(successCallback)  successCallback();
                    this.$toast('网络错误')
                    this.$store.dispatch('loadErr',true)
                })

            },
            //获取订单信息 传入车牌号和关联id
            goDetail(item){
                this.$router.push({path:"/offerList",query:{
                    insureRelationId:item['insureRelationId'],
                    carLicenseNo:item['carLicenseNo']
                }})
            }
        },
        created(){
            if(this.isLogin||this.token){
                this.loadList();
            }else{
                this.showLoginBox();
            }

        },
        components: {
            navbar
        },
        computed:{
            ...mapState([
                'token',
                'isLogin'
            ])
        }
    }
</script>

<style lang="less" scoped>
    .container{
        overflow: scroll;
    }
    .collspan_btn{
        img{
            vertical-align: 1px;
            width: 11px;
            margin-left: 5px;
            height: 7px;
        }
        span{
            color: #FF7D00 
        }
    }
    .body_left {
        color: #666;
        h5{color: #FF7D00 }
        span{
            color: #FF7D00;
         }
    }
    .body_right{
        color: #999999;
        h5{
            color: #666666;
        }
    }
    .media_left{
         img{
            width: 42px;
            height: 42px;
         }
    }
    .article {
        padding-top: 10px;
    }
    .loading-box{
        text-align: center;
        margin: 0 auto;
        padding: 10px;
    }
    .loading-box>span{
        display: inline-block;
    }
    .mint-loadmore{
    overflow: scroll;
    }
  
    .order_item .order_item_list {
        margin-bottom: 0px;
    }
    .order_item .collspan_btn{
        padding: 8px;
    }
    .order_item{
        padding: 0;
    }
    .media{
        background-image: -webkit-gradient(linear, left bottom, left top, from(#d9d9d9), color-stop(50%, #d9d9d9), color-stop(50%, transparent));
        background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%); 
        background-size: 100% 1px;
        background-repeat: no-repeat;
        background-position: bottom;
    }
    .order_item .mint-cell  .mint-cell-wrapper{
        background-image: none!important;
    }

    .cell_s{
        padding-top: 5px;
        min-height: 20px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #666666;
        letter-spacing: 0;
        line-height: 16px;
    }

    .cell_s div.cell_content_1{
        text-align: right;
        color: #FF7D00;
    }
</style>
