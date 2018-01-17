<template>
  <div>
      <mt-header title="关于我们">
        <router-link to="/mine" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="container_nofoot">
          <iframe v-bind:src="url" width="100%" height="100%"></iframe>
      </div>
  </div>
</template>
<script type="text/ecmascript-6">
import {Toast} from 'mint-ui'
export default {
  data(){
      return {
          url:'./about.html'
      }
  },
  mounted(){
      this.$http({
          url:BASE_URL+'/systemConfig/url/AboutUs',
          method:'POST'
      }).then((res)=>{
          var data = res.data;
          if(data.status == "SUCCESS"){
            this.url = data.content;
          }
          else{
              Toast({
                  message:data.msg
              })
          }
      }).catch((err)=>{
                Toast({
                    message:'网络错误'
                })
      })
  }
  
}
</script>

<style lang="less" scoped>
    .container_nofoot{
        padding: 0 12px;
    }
    .logo{
        text-align: center;
        margin: 14px 0;
        img{
            width: 50px;
            height: 50px;
        }
    }
    p{
        font-size: 14px;
        color: #666666;
        line-height: 20px;
    }
</style>

