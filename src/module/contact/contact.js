import Vue from 'vue'
import bigPhone from 'src/assets/img_contact_bg@3x.png'
import smallPhone from 'src/assets/img_contact_call@3x.png'
var app = new Vue({
  el: '#app',
  data: {
    bigPhone,
    smallPhone,
    servicePhone:SERVICEPHONE
  }
})