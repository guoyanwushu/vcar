<template>
    <div>
        <mt-header title="联系我们">
            <router-link to="/mine" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <section>
            <iframe v-bind:src="url" width="100%" height="100%"></iframe>
        </section>
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
          url:BASE_URL+'/systemConfig/url/Contact',
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
    section{
        position: absolute;
        top: 44px;
        left: 0;
        right: 0;
        bottom: 0;
        font-size: 17px;
        color: #999999;
        .big-mobile{
            margin-top: 29px;
        }
        p{
            text-align: center;    
        }
        .bottom-content{
            position: absolute;
            bottom: 0;
            height: 52px;
            width: 100%;
            font-size: 13px;
            color: #FF7D00;
            padding: 8px 0;
            text-align: center;
            box-sizing: border-box;
            line-height: 1.4;
            background: #FFF2E6;

        }
        img{
            width: 100%;
        }
        .small-mobile{
            font-size: 30px;
            color: #FF7D00;
            margin-top: 10px;
            img{
                width: 18px;
                height: 24px;
                display:inline-block;
            }
            a{
                text-decoration: none;
                color: #FF7D00;
            }

            
        }
    }
</style>

