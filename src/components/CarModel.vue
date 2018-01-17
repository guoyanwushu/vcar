<template>
    <div class="modal" v-if="visible">
        <mt-header title="选择车型">
            <mt-button icon="back" slot="left" @click="close()"></mt-button>
        </mt-header>
        <div class="searchbar searchbar_lg">
            <input type="text" v-on:keyup.enter="search($event)" v-model="key" placeholder="请输入车型关键字">
            <i class="close" @click="clearSearch()"></i>
            <button @click="search()">搜索</button>
        </div>
        <div class="serchWarning" v-if="!searchResult">
            <div>
                <h5>精确查找</h5>
                <p>请按照行驶证上的车型输入</p>
            </div>
            <div>
                <h5>
                    模糊查找
                </h5>
                <p>
                    输入车辆品牌、车系名称、排气量等关键词，支持中文、
                    英文和拼音输入，如“奔驰”、“马自达2.0“等。
                </p>
            </div>
            <div>
                <h5>
                    进口车查找
                </h5>
                <p>
                    请按照行驶证上的VIN码输入
                </p>
            </div>
        </div>
        <div class="result_box" v-if="searchResult">
            <h2 class="title">车价不含税</h2>
            <div
                    class="model_list_detail"
                    v-infinite-scroll="loadMoreModel"
                    infinite-scroll-disabled="loadState"
                    infinite-scroll-distance="10"
            >
                <div class="result_item" @click="select(item)" v-for="item in modelList">
                    <h5>{{item.vehicleName}}</h5>
                    <p>{{item.vehicleName}}<span class="yellow"> ¥{{item.price}}</span></p>
                </div>
                <p v-if="!loadState" class="loadmore_tip">
                    loading
                </p>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { Indicator,Toast,InfiniteScroll} from 'mint-ui';
    export default {
        name: '',
        data(){
            return {
                value: null,
                key: null,
                searchResult: false,
                modelList:[],
                loadState:false,
                page:1
            }
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            //初登日期
            registDate:{
                type:String,
                default:"",
            },
            //车牌号
            carLicenseNo:{
                type:String,
                default:"",
            }
        },
        methods: {
            close(){
                this.key = null;
                this.searchResult = false;
                this.$emit('update:visible', false);
            },
            select(val){
                this.$emit('update:visible', false);
                this.$emit('handlerSelect', val)
            },
            loading(){
                Indicator.open({spinnerType: 'fading-circle'});
            },
            loadClose(){
                Indicator.close();
            },
            search(){
                if (!this.key) {
                    this.searchResult = false;
                    return
                }
                this.loading();
                //初始化

                this.modelList = [];
                this.page = 1;
                this.loadState = false;
                this.getModel().then(res=>{
                    this.loadClose();
                    if(res&&res.length>0){
                        this.searchResult = true;
                        this.modelList = this.modelList.concat(res);
                    }else{
                        this.$toast('暂无搜索结果');
                        this.modelList = [];
                        this.searchResult = false
                    }

                },err=>{
                    this.loadClose();
                    this.searchResult = false
                });

            },
            loadMoreModel(){
                this.page++;
                this.getModel().then(res=>{
                    this.loadClose();
                    if(res&&res.length>0){
                        this.modelList = this.modelList.concat(res);
                    }else{
                        this.loadState = true;
                    }
                },err=>{
                    this.loadClose();
                    this.searchResult = false
                });
            },

            clearSearch(){
                 //初始化
                 this.key = null;
                 this.searchResult = false;
                 this.loadState = true;
                 this.modelList = [];
                 this.page = 1;
            },
            getModel(){
                return new Promise((resolve,reject)=>{
                    if(!this.registDate||!this.carLicenseNo){
                        reject();
                        return
                    }
                    // 分页查询
                    this.$http.post(BASE_URL + '/car/queryPageCarModelInfos',{
                        vehicleName:this.key,
                        registDate:this.registDate,
                        carLicenseNo:this.carLicenseNo,
                        pageNum:this.page
                    }).then(res=> {
                        if(res.data.status=='SUCCESS'){
                            resolve(res.data.content.carModelInfos)
                        }else {
                            Toast({
                                message: res.data.msg,
                            });
                            reject();
                        }
                    },err=>{
                        reject();
                        Toast({
                            message: '获取信息失败检查你的网络',
                        });
                    });
                })

            }
        },
    }
</script>

<style lang="less" scoped>
    .modal {
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 3;
        background-color: #eeeeee;
        transition: all .5s;
    }

    .searchbar {
        height: 34px;
        background-color: #ffffff;
        text-align: center;
        padding: 4px 12px;
        display: flex;
    }

    .searchbar input::-webkit-input-placeholder{
        color: #FF7D00;
    }
    .searchbar input {
        outline: none;
        text-align: left;
        padding: 0;
        padding-left: 36px;
        flex: 1;
        border: 1px solid #FF7D00;
        border-radius: 100px;
        line-height: 30px;
        height: 30px;
    }
    .searchbar_lg{
        height: 60px;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .searchbar_lg>input{
        height: 34px;
        margin-left: 12px;
    }
    .searchbar_lg::before{
        display: block;
        z-index: 2;
        content: "";
        width: 14px;
        height: 14px;
        position: absolute;
        top:50%;
        margin-top: -7px;
        left: 36px;
        background-image: url("../assets/icon_automobileinsurance_search@3x.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
    }
    .searchbar_lg>i.close{
        display: block;
        z-index: 2;
        content: "";
        width: 14px;
        height: 14px;
        border-radius: 50%;
        position: absolute;
        top:50%;
        margin-top: -7px;
        right: 70px;
        background-image: url("../assets/icon_automobileinsurance_delete@3x.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
    }
    .searchbar_lg>button{
        padding: 0;
        margin-left: 16px;
        background: none;
        border: none;
        outline: none;
        color: #FF7D00;
    }
    .serchWarning{
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #ffffff;
        padding-top: 12px;
    }
    .serchWarning div{
        padding: 0 12px 12px 12px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #666666;
    }
    .serchWarning div h5{
        line-height: 20px;
        font-weight: 500;
    }
    .serchWarning div p {
        font-size: 12px;
        line-height: 16px;
        color: #999999;
    }

    .result_box{
        padding-left: 12px;
        background-color: #ffffff;
    }
    .result_box .title{
        height: 25px;
        line-height: 25px;
        font-size: 12px;
        margin-left: -12px;
        padding-left: 12px;
        color: #999999;
        font-weight: 500;
        background-color: #eeeeee;

    }
    .result_box .result_item{
        background-color: #ffffff;
        padding: 12px;
        padding-left: 0;
        border-bottom: 1px solid #CCCCCC;
        display: flex;
        flex-direction: column;
    }
    .result_box .result_item:last-child{
        border-bottom: none;
        box-shadow: 12px 0 0 0 #CCCCCC;
    }
    .result_box .result_item h5{
        font-family: PingFangSC-Regular;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #666666;
    }
    .result_box .result_item p{
        line-height: 17px;
        font-size: 12px;
        color: #999999;
    }
    .result_box .result_item p .yellow{
        color: #FF7D00;
    }
    .model_list_detail{
        background-color: #ffffff;
        position: absolute;
        top:135px;
        bottom:0;
        left: 0;
        right: 0;
        padding-left: 10px;
        overflow: auto;
    }
    .model_list_detail p.loadmore_tip{
        text-align: center;
        line-height: 44px;
        color: #666666;
    }

</style>
