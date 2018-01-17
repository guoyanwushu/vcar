import Vue from 'vue'
import 'src/styles/css/registerSuccess.css'
import print from 'src/assets/register/img_fingerprint@3x.png'
import code from 'src/assets/register/img_publicsign@3x.png'
var app = new Vue({
  el: '#app',
  data: {
    print,
    code
  }
})