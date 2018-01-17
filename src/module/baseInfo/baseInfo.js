import Vue from 'vue'
import App from './baseInfo.vue'
import MintUI from 'mint-ui';//ui
import 'mint-ui/lib/style.css';
Vue.use(MintUI)
var app = new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
});