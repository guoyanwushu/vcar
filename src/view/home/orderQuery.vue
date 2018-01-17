<template>
  <div>
      <mt-header title="保单查询">
        <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
     <div class="order-item" v-for="item in queryList" :key="item.id" @click="selectItem(item.contentUrl)">
         <div>
             <img v-bind:src="item.imageUrl" alt="" class="logo">
             <span class="title">{{item.remark1}}</span>
         </div>
         <img src="../../assets/icon_automobileinsurance_rightarrorw@3x.png" alt="" class="arrow">
     </div>
  </div>
</template>
<script>
export default {
    data(){
        return {
            queryList:[]
        }
    },
    methods:{
        selectItem(url){
            if(!url){
                Toast({
                    message:'暂未开通'
                })
            }
            else{
                window.location.href = url;
            }
        },
    },
    mounted(){
        this.$http.post(BASE_URL + '/spead/all').then(res=> {
            //this.loadClose();
            let data = res.data.content;
            data.forEach(item=> {
                if (item.type == 'QURY_INSURANCE_POLICY') {
                    this.queryList = item.list;
                } 
            });
        }, err=> {
            //this.loadClose();
            this.$toast('网络错误，请检查你的网络')
        })
    }
}
</script>
<style lang="less" scoped>
    .mint-header-button > a{
        color: #fff !important;
    }
    .order-item{
        padding: 0 12px;
        height: 44px;
        line-height: 44px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 1px 0 0 #C8C7CC;
        .logo{
            width: 22px;
            height: 22px;
            vertical-align: middle;
        }
        .arrow{
            width: 9px;
            height: 14px;
        }
    }
</style>


