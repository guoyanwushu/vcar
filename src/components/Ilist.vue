<template>
    <div class="modal" v-if="visible">
        <mt-header title="选择城市">
            <mt-button icon="back" slot="left" @click="close()"></mt-button>
        </mt-header>
        <div class="container_nofoot bg_gary">
            <div class="searchbar searchbar_lg">
                <input type="text" v-on:keyup.enter="search($event)" v-model="key" placeholder="输入城市名称或者首字母">
                <b class="clearInput"></b>
                <button @click="search()">确定</button>
            </div>
            <div class="localtion" v-if="searchResult">
                <h5>搜索结果</h5>
                <div class="cell" @click="select(adInfo)" v-for="adInfo in searchResultInfo">
                    {{adInfo.cityName}}
                </div>
                <div class="cell" v-if="searchResultInfo.length==0">
                    暂无搜索结果(或者尚未支持当前城市)
                </div>
            </div>
            <div class="localtion" v-if="!searchResult">
                <h5>当前位置</h5>
                <div class="localtion_detail">
                    <div class="address" v-if="!location.cityName">定位失败,请重试</div>
                    <div class="address" @click="select(location)" v-if="location.cityName">
                        {{location.cityName}}
                    </div>
                    <div @click="getLocation()">
                        GPRS定位 <i class="icon"></i>
                    </div>
                </div>
            </div>
            <mt-index-list  v-if="!searchResult">
                <mt-index-section v-bind:index="key" v-for="key in keys" :key="key">
                    <div class="mint-cell" @click="select(city)" v-for="city in cityList[key]">
                        <p class="mint-cell-wrapper">{{city['cityName']}}</p>
                    </div>
                </mt-index-section>
            </mt-index-list>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { Indicator } from 'mint-ui';
    import {lazyAMapApiLoaderInstance} from 'vue-amap'
    export default {
        name: '',
        data(){
            return {
                value: null,
                key: null,
                searchResult: false,
                keys: [],
                cityList: {},
                location: {},
                geolocation:null,
                mapReady:false,
                placeSearch:null,
                searchResultInfo:[]
            }
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            close(){
                this.$emit('update:visible', false);
            },
            select(val){
                this.key = null;
                this.searchResult = false;
                this.$emit('update:visible', false);
                this.$emit('handlerSelect', val)
            },
            loading(){
                Indicator.open({spinnerType: 'fading-circle'});
            },
            loadClose(){
                Indicator.close();
            },
            clearSearch(){
                this.key = null;
                this.searchResult = false;
            },
            search(){
                if (!this.key) {
                    this.searchResult = false;
                    return
                }else{
                    this.loading();
                    let self = this;
                    if (this.key) {
                        this.searchResult = true;
                        this.$http.post(BASE_URL+'/carPlateCity/searchCityPlateInfo',{
                            key:this.key
                        }).then(res=>{
                            this.loadClose();
                            let data = res.data;
                            if(data.status=='SUCCESS'){
                                this.searchResultInfo = data.content;
                            }else{
                                this.searchResultInfo = null;
                                this.$toast('暂无搜索结果')
                            }
                        },err=>{
                            this.loadClose();
                            this.$toast('网络错误')
                        });
                    } else {
                        self.loadClose();
                        this.searchResult = false
                    }
                }
            },

            getLocation(){
                this.loading();
                if(this.mapReady){
                    let self = this;
                    self.geolocation.getCityInfo(function (status, result) {
                        self.mapReady = true;
                        self.loadClose();
                        if (status == 'complete') {
                            self.getLocal(result.adcode).then((re)=>{
                                self.location = re
                            });
                        } else {
                            self.$toast('载入定位信息失败')
                        }
                    });
                }else{
                    this.loadClose();
                    return
                }
            },

            getLocal(code){
                return new Promise((resolve,reject)=>{
                    this.$http.post(BASE_URL+'/carPlateCity/getCityPlateInfo',{
                        "insureAreaCode": code
                    }).then(result=>{
                        let data = result.data;
                        if(data.status=="SUCCESS"){
                            resolve(data.content);
                        }else{
                            reject()
                        }
                    },err=>{
                        reject();
                    })
                })

            },

            //渲染车牌地市
            getCity(){
                this.$http.post(BASE_URL + '/carPlateCity/all').then(res=> {
                    let data = res.data.content;
                    let cityList = {};
                    let keys = [];
                    data.forEach(item=> {
                        let key = item['pingyin'];
                        if (cityList[key] && cityList[key].length > 0) {
                            cityList[key].push(item)
                        } else {
                            cityList[key] = [];
                            cityList[key].push(item);
                        }
                    });
                    Object.keys(cityList).forEach(key=> {
                        keys.push(key);
                    });
                    this.cityList = cityList;
                    this.keys = keys.sort();
                });
            }
        },
        created(){
            this.getCity();
            let self = this;
            lazyAMapApiLoaderInstance.load().then(()=>{
                self.geolocation = new AMap.Geolocation({
                    enableHighAccuracy: false,//是否使用高精度定位，默认:true
                    noIpLocate: 0
                });
                self.geolocation.getCityInfo(function (status, result) {
                    self.mapReady = true;
                    if (status == 'complete') {
                        self.getLocal(result.adcode).then((re)=>{
                            self.location = re
                        });
                    } else {
                        self.$toast('载入定位信息失败')
                    }
                });

                self.placeSearch = new AMap.PlaceSearch({
                    pageSize:1,
                    pageIndex:1,
                    cityLimit: 'true',
                    panel:'temp'
                })
            });
        }
    }
</script>

<style lang="less">
    .modal {
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 3;
        background-color: #ffffff;
        transition: all .5s;
    }

    .searchbar {
        background-color: #FF7D00;
        text-align: center;
        padding: 4px 12px;
        display: flex;
    }

    .searchbar input {
        text-align: center;
        padding: 0;
        flex: 1;
        border: none;
        border-radius: 100px;
        line-height: 30px;
        height: 30px;
    }

    .searchbar_lg{
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
    .searchbar_lg>button{
        padding: 0;
        margin-left: 16px;
        background: none;
        border: none;
        outline: none;
        color: #ffffff;
    }
    #temp{
        display: none;
    }
    .amap_lib_placeSearch{
        display: none;
    }
    /*.clearInput{*/
        /*display: block;*/
        /*width: 14px;*/
        /*height: 14px;*/
        /*background-color: #FF7D00;*/
        /*position: absolute;*/
    /*}*/

    .mint-indexlist-content{
        height: auto !important;
    }
</style>
