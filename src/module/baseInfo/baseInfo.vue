<template>
  <div>
      <!--<mt-header title="基本信息">
            <a to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </a>
      </mt-header>-->
      <div class="container_nofoot bg_gary">
        <p class="tips">温馨提示：此页面暂时无法下单</p>
        <div class="banner">
            <a href="javascript:;">
                <img src="../../assets/record/banner_automobileinsurance_banner@3x.png" alt="">
            </a>
        </div>
        <div class="cell_box">
            <div class="cell">
                <div class="cell_title">投保地区</div>
                <div class="cell_content_2 fixaddress">
                    <span>四川省 成都市</span>
                    <img src="../../assets/icon_automobileinsurance_rightarrorw@3x.png" alt="">
                </div>
            </div>
            <div class="cell" >
                <div class="cell_title">车牌号码</div>
                <div class="cell_content_2">
                    <input type="text" placeholder="请输入车牌号" >
                </div>
            </div>
            <div class="cell">
                <div class="cell_title">车主姓名</div>
                <div class="cell_content_2">
                    <input type="text" placeholder="请输入正确的车主姓名" >
                </div>
            </div>
        </div>
        <p class="tip-info">*您的信息我们将严格保密</p>
        <p class="agreement"><a href="#" @click="openStateMent(1)">《中国保险行业协会机动车综合商业保险示范条款》</a></p>
        <p class="agreement"><a href="#" @click="openStateMent(2)">《机动车交通事故责任强制保险条款》</a></p>
        <div class="foot_btn">
            <button class="btn btn_block">下一步</button>
        </div>
      </div>
      <mt-popup
                v-model="flag1"
                position="bottom"
                :modal="false"
                class="popState"
        >
            <mt-header title="中国保险行业协会机动车综合商业保险示范条款" class="login_head">
                <mt-button icon="back" slot="left" @click="openStateMent(1)"></mt-button>
            </mt-header>
            <div class="container_nofoot">
                <agree1></agree1>
            </div>
        </mt-popup>
        <mt-popup
                v-model="flag2"
                position="bottom"
                :modal="false"
                class="popState"
        >
            <mt-header title="机动车交通事故责任强制保险条款" class="login_head">
                <mt-button icon="back" slot="left" @click="openStateMent(2)"></mt-button>
            </mt-header>
            <div class="container_nofoot">
                <agree2></agree2>
            </div>
        </mt-popup>
  </div>
</template>
<script>
import 'src/styles/css/common.css'
import 'src/styles/css/app.css'
import 'src/styles/css/agreement.css'
import agree1 from 'src/view/statements/carModelClauses'
import agree2 from 'src/view/statements/carRiskItems'
export default {
    data(){
        return {
            flag1:false,
            flag2:false
        }
    },
    methods:{
        openStateMent(state){
            if(state==1)
                this.flag1 = !this.flag1;
            else
                this.flag2 = !this.flag2;
        },
    },
    components:{
        agree1:agree1,
        agree2:agree2
    },
}
</script>

<style lang="less" scoped>
.login_head{
    z-index: 9999;
}
.container_nofoot{
    top: 0;
}
.cell_box{
    padding-left: 12px;
    background-color: #fff;
    .fixaddress{
        font-size: 16px;
        color: #CCCCCC;
    }
    img{
        width: 9px;
        height: 14px;
    }
    .cell{
        height: 44px;
        line-height: 44px;
    }
}
    *{
        box-sizing: border-box;
    }
    .foot_btn{
        padding: 0 12px;
        position: absolute;
        width: 100%;
        bottom: 10px;
        button{
            background: #CCCCCC;
        }
    }
    .mint-header{
        background-color: #FF7D00;
        height: 44px;
        line-height: 44px;
    }
    .tips{
        background: #FEEBD9;
        font-size: 14px;
        color: #D0021B;
        font-family: ".PingFang-SC-Medium";
        font-weight: bold;
        text-align:center;
        height: 30px;
        line-height: 30px;
    }
    input::-webkit-input-placeholder{
        font-size: 14px;
        color: #CCCCCC;
    }
    .banner{
        width: 100%;
        img{
            width: 100%;
        }
    }
    .tip-info{
        font-size: 13px;
        margin-top: 5px;
        color: #BCBCBC;
        line-height: 18px;
        margin-bottom: 15px;
        padding:0 12px;
    }
    .agreement{
        padding: 0 12px;
        a{
            font-size: 12px;
            color: #FF7D00;
            line-height: 17px;
            text-decoration: none;
        }
        
    }
    .login_head{
        line-height: 44px;
        background-color: #ffffff;
        color: #333333;
        font-size: 17px;
        border-bottom: 1px solid #eeeeee;
    }

    .popState{
        width: 100%;
        height: 100%;
        background: #ffffff;
        overflow: scroll;
        /*left: 0;*/
        /*position: absolute;*/
        /*z-index: 99999;*/
        /*right: 0;*/
        /*top: 0;*/
        /*bottom: 0;*/
    }
    .satement_title{
        text-align: center;
    }
    .satement_detail{
        line-height: 16px;
        padding-left: 10px;
    }
</style>

