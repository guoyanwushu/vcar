import Vue from 'vue'
import ansicon from 'src/assets/icon_commonproblem_answer@3x.png'
import reqicon from 'src/assets/icon_commonproblem_question@3x.png'
var app = new Vue({
  el: '#app',
  data: {
    ansicon,
    reqicon,
    servicePhone:SERVICEPHONE
  }
})