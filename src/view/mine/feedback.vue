<template>
  <div class="container">
      <mt-header title="意见反馈">
        <router-link to="/mine" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="inputbox">
        <textarea name="" v-model="content" id="" cols="30" rows="10" maxlength=300 placeholder="请在此留下您宝贵的意见，让我们不断进步，谢谢！"></textarea>
        <div class="input-amount">
            <span>{{content.length}}</span>/<span>300</span>
        </div>
      </div>
      <button type="primary" :class="{'active':content.length>0}" class="submit" @click="setComment">提交</button>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {Toast} from 'mint-ui'
export default {
  data(){
      return {
          content:'',
      }
  },
  computed:{
      ...mapState(['token'])
  },
  methods:{
      getComment(){
          this.$http({
              url:BASE_URL+'/feedback/getComment',
              method:'POST',
              data:{
                  token:this.token,
              }
          }).then((res)=>{
                let data = res.data;
                if(data.status=='SUCCESS'){
                    console.log(data.content[data.content.lenth-1].content);
                    this.content = data.content[data.content.lenth-1].content;
                }else{
                    let tost = Toast({
                        message: data.msg
                    });
                }
          })
      },
      setComment(){
          this.$http({
              url:BASE_URL+'/feedback/addcomment',
              method:'POST',
              data:{
                  token:this.token,
                  content:this.content
              }
          }).then((res)=>{
                let data = res.data;
                if(data.status=='SUCCESS'){
                    this.$router.push({path:'feedBackSuccess'});
                }else{
                    let tost = Toast({
                        message: data.msg
                    });
                }
          })
      }
  },
  mounted(){
      //this.getComment();
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
    .inputbox{
        margin-top: 10px;
        position: relative;
        padding: 10px 12px;
        background-color: #fff;
        .input-amount{
            position: absolute;
            right: 6px;
            bottom: 2px;
            font-size: 14px;
            color: #999999;
            span:first-child{
                  color:#FF7D00  
            }
        }
    }
    textarea{
        width: 100%;
        outline: none;
        resize: none;
        border: none;
        &::-webkit-input-placeholder{
            font-size: 12px;
            color: #CCCCCC;
        }
    }
    button.submit{
        width: 92.5%;
        margin: 0 auto;
        background: #FF7D00;
        border-radius: 6px;
        position: absolute;
        color: #fff;
        opacity: 0.5;
        font-size: 16px;
        bottom: 20px;
        border:none;
        outline: none;
        height: 44px;
        line-height: 44px;
        left: 50%;
        pointer-events: none;
        margin-left: -46.25%;
        &.active{
            opacity: 1;
            pointer-events: auto;
        }
    }

</style>

