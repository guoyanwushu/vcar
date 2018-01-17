<template>
    <div>
      <mt-header title="我的车辆">
        <router-link to="/mine" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="fixbtn">
          <button class="btn btn_block">+新增车辆</button>
      </div>
    </div>
</template>

<script>
    export default {
        name: ''
    }
</script>

<style>
  .fixbtn{
    position: absolute;
    bottom:0;
    left: 0;
    right: 0;
    padding: 10px;
  }
</style>
