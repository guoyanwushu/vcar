<template>
    <div >
      <mt-header title="账户管理">
        <router-link to="/mine" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <router-link class="container_nofoot" v-if="1" tag="div" to="/mine/accountmanage/wechatunbind">
          <div class="btn-container">
                 <button class="btn btn_block">微信解绑</button>
          </div>          
      </router-link> 
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
    .container_nofoot{
        background-color: #EFEFF4;
    }
    .btn-container{
        box-sizing: border-box;
        padding:0 12px;
        position: relative;
        top: 56px;
        width: 100%;
        button{
            opacity: 1;
        }
    }
</style>


