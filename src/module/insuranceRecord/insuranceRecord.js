import Vue from 'vue'
import MintUI from 'mint-ui';//ui
import App from './App'
import { router } from 'src/routers/recordRouter'//路由
import {Toast,Indicator} from 'mint-ui'
import store from 'src/vuex'//vuex
import axios from 'axios';//ajax
import * as tools from 'src/utils/tools';
import picker from 'vue-3d-picker';
import wx from 'weixin-js-sdk'
import 'mint-ui/lib/style.css';
import 'src/styles/css/common.css';
import 'src/styles/css/main.css';
import 'src/styles/css/app.css'
Vue.config.productionTip = false;

Vue.use(MintUI)
Vue.component(picker.name, picker);

//工具类
//配置 axios 请求超时 设置

axios.defaults.time = 20000;

Vue.prototype.$http = axios;
Vue.prototype.$md5 = require('js-md5');
Vue.prototype.$tools = tools;
//高德地图地址搜索 定位


/*自定义过滤器*/
import * as flters from 'src/utils/filters';

history.pushState(null, null, document.URL);

window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
});

new Vue({
    el: '#app',
    template: '<App/>',
    store,
    router,
    components: { App }
});
