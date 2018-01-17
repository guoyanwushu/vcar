
import Vue from 'vue'
import ad from 'src/assets/production/txt_carinsurancehandbook_title@3x.png'
import arrow from 'src/assets/production/icon_carinsurancehandbook_flip@3x.png'
import bg from 'src/assets/production/logo_carinsurancehandbook_huyoulogo@3x.png'
import ad1 from 'src/assets/production/img_carinsurancehandbook_content@3x.png'  
import ad2 from 'src/assets/production/txt_carinsurancehandbook_title01@3x.png' 
import jqx from 'src/assets/production/txt_carinsurancehandbook_jqx@3x.png' 
import jqxdesc from 'src/assets/production/img_carinsurancehandbook_jqx@3x.png'    
import jdcssx from 'src/assets/production/txt_carinsurancehandbook_jdcssx@3x.png'  
import jdcssxdesc from 'src/assets/production/img_carinsurancehandbook_jdcssx@3x.png' 
import qcdqx from 'src/assets/production/txt_carinsurancehandbook_qcdqx@3x.png'  
import qcdqxdesc from 'src/assets/production/img_carinsurancehandbook_qcdqx@3x.png'  
import dszzrx from 'src/assets/production/txt_carinsurancehandbook_dszzrx@3x.png'  
import dszzrxdesc from 'src/assets/production/img_carinsurancehandbook_jdcssx@3x.png'  
import cszwzrx from 'src/assets/production/txt_carinsurancehandbook_cszwzrx@3x.png'  
import cszwzrxdesc from 'src/assets/production/img_carinsurancehandbook_dszzrx@3x.png'  
import Swiper from 'swiper/dist/js/swiper.min.js'
import  'swiper/dist/css/swiper.min.css'
import 'src/styles/css/introduce.css'

var app = new Vue({
  el: '#app',
  data: {
    ad,ad1,ad2,jqx,jqxdesc,jdcssx,jdcssxdesc,qcdqx,qcdqxdesc,dszzrx,dszzrxdesc,cszwzrx,cszwzrxdesc,arrow,
      swiper:null
  },
  mounted(){
      this.$nextTick(()=>{
          this.swiper = new Swiper('.swiper-container', {
              autoplay: 5000,//可选选项，自动滑动
              direction:'vertical',
              navigation: {
                  prevEl: '.arrow',
              }
          })
      })
  }
})