<template>
  <div class="container">
      <mt-header title="常见问题">
        <router-link to="/mine" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <iframe v-bind:src="url" width="100%" height="100%"></iframe>
  </div>
</template>
<script>
export default {
  data(){
      return {
          url:''
      }
  },
  mounted(){
      this.$http({
          url:BASE_URL+'/systemConfig/url/FAQ',
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
    .container{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #EFEFF4;
    }
    .question{
        margin-top: 9px;
    }
    .question-item{
        margin-bottom: 16px;
        padding: 0 12px;
        p{
            font-size: 12px;
            color: #666666;
            letter-spacing: 0.01px;
            line-height: 14px;
            position: relative;
            text-indent: 16px;
            &:before{
                content: '';
                position: absolute;
                left: 0;
                top: 1px;
                background-image: url("../../assets/icon_commonproblem_answer@3x.png");
                background-size: 100% 100%;
                width: 12px;
                height: 12px;
            }
        }
        h5{
            position: relative;
            text-indent: 16px;
            margin-bottom: 6px;
            font-size: 14px;
            &:before{
                content: '';
                position: absolute;
                left: 0;
                top: 1px;
                background-image: url("../../assets/icon_commonproblem_question@3x.png");
                background-size: 100% 100%;
                width: 12px;
                height: 12px;
            }
        }
        &:first-child{
            margin-top: 9px;
        }
        
    }
</style>


