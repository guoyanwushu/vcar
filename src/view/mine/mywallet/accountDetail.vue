<template>
  <div >
      <mt-header title="账户明细">
        <router-link to="/mine" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="container_nofoot" v-if="1">
          <router-link class="detail-item" to="/mine/mywallet/inDetail" tag="div">
            <span class="desc">提现</span>
            <span class="date">2017-10-26</span>
            <span class="remainamount">余额:0.00</span>
            <span class="amount">-60.00</span>
          </router-link> 
          <div class="detail-item">
            <span class="desc">购买车险(返现)</span>
            <span class="date">2017-10-26</span>
            <span class="remainamount">余额:0.00</span>
            <span class="amount">+60.00</span>
          </div>  
          <div class="detail-item">
            <span class="desc">购买车险(返现)</span>
            <span class="date">2017-10-26</span>
            <span class="remainamount">余额:0.00</span>
            <span class="amount">+60.00</span>
          </div> 
          <div class="detail-item">
            <span class="desc">购买车险(返现)</span>
            <span class="date">2017-10-26</span>
            <span class="remainamount">余额:0.00</span>
            <span class="amount">+60.00</span>
          </div> 
          <div class="detail-item">
            <span class="desc">购买车险(返现)</span>
            <span class="date">2017-10-26</span>
            <span class="remainamount">余额:0.00</span>
            <span class="amount">+60.00</span>
          </div> 
          <div class="detail-item">
            <span class="desc">购买车险(返现)</span>
            <span class="date">2017-10-26</span>
            <span class="remainamount">余额:0.00</span>
            <span class="amount">+60.00</span>
          </div> 
          <div class="detail-item">
            <span class="desc">购买车险(返现)</span>
            <span class="date">2017-10-26</span>
            <span class="remainamount">余额:0.00</span>
            <span class="amount">+60.00</span>
          </div> 
          <div class="detail-item">
            <span class="desc">购买车险(返现)</span>
            <span class="date">2017-10-26</span>
            <span class="remainamount">余额:0.00</span>
            <span class="amount">+60.00</span>
          </div> 
          <div class="detail-item">
            <span class="desc">购买车险(返现)</span>
            <span class="date">2017-10-26</span>
            <span class="remainamount">余额:0.00</span>
            <span class="amount">+60.00</span>
          </div>   
          <div class="detail-item">
            <span class="desc">购买车险(返现)</span>
            <span class="date">2017-10-26</span>
            <span class="remainamount">余额:0.00</span>
            <span class="amount">+60.00</span>
          </div>        
      </div> 
  </div>
</template>
<style lang="less" scoped>
    .container_nofoot{
        overflow: scroll;
    }
    .detail-item{
       position: relative;
       box-shadow: 0 1px 0 0 #C8C7CC;
       margin-bottom: 1px;
       width: 100%;
       height: 59px;
       padding: 12px;
       box-sizing:border-box;
       span{
           position: absolute;
       }
       .desc{
           top: 10px;
           left: 12px;
           font-size: 16px;
            color: #333333;
       }
       .date{
           font-size: 12px;
            color: #999999;
            top: 13px;
            right:11px;
       }
       .remainamount{
           font-size: 12px;
           color: #333333;
           bottom: 9px;
           line-height: 17px;
           left: 12px;
       }
       .amount{
           font-size: 16px;
           color: #333333;
           font-weight: bold;
           bottom: 11px;
           right: 11px;
       }
    }
</style>
<script>
export default {
  
}
</script>


