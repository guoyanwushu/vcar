<template>
  <div >
      <mt-header title="账户明细">
        <router-link to="/mine" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="container_nofoot" v-if="1">
          <div class="detail-item">
              <span>收入</span>
              <span class="amount">+￥200.00</span>
          </div> 
          <div class="detail-item">
              <span>交易名称</span>
              <span>购买车险</span>
          </div>  
          <div class="detail-item">
              <span>付款方式</span>
              <span>中国建设银行(尾号1440)</span>
          </div>  
          <div class="detail-item">
              <span>时间</span>
              <span>2016-10-26 21:43:42</span>
          </div>  
          <div class="detail-item">
              <span>交易单号</span>
              <span>2013544565456465</span>
          </div>            
      </div> 
  </div>
</template>
<style lang="less" scoped>
    .detail-item{
       height: 26px;
       line-height: 26px;
       display: flex;
       justify-content: space-between;
       padding: 0 12px;
       font-size: 15px;
        color: #8D8D8D;
        .amount{
            font-size: 15px;
            color: #333333;
            font-weight: bold;
        }
        &:first-child{
            box-shadow: 0 1px 0 0 #C8C7CC;
            margin-bottom: 1px;
            height: 37px;
            line-height: 37px;
        }
        &:nth-child(2){
            margin-top: 4px;
        }

    }
</style>
<script>
export default {
  
}
</script>


