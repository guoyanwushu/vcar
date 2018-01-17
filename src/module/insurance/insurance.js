import Vue from 'vue'
import MintUI from 'mint-ui';//ui
import App from './App'
import { router } from 'src/routers/insuranceRouter'//路由
import {Toast,Indicator} from 'mint-ui'
import store from 'src/vuex'//vuex
import axios from 'axios';//ajax
import * as tools from 'src/utils/tools';
import picker from 'vue-3d-picker';
import AMap from 'vue-amap'
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

axios.defaults.timeout = 20000;

Vue.prototype.$http = axios;
Vue.prototype.$md5 = require('js-md5');
Vue.prototype.$tools = tools;
//高德地图地址搜索 定位
Vue.use(AMap);
AMap.initAMapApiLoader({
    key:AMapKey,
    plugin: ['AMap.PlaceSearch', 'AMap.Geolocation']
});


/*自定义过滤器*/
import * as flters from 'src/utils/filters';


Object.keys(flters).forEach(key => {
    Vue.filter(key, flters[key])
})
// 生成环境 要经过微信验证 绑定openID
if(DevEnv=='prod'){
    router.beforeEach((to,from,next)=>{
        let loginFlag = store.state.isLogin;
        let code = to.query.code ||tools.getUrlQuery()['code'];
        if(loginFlag||store.state.openId){
            next();
        }
        else if((!code&&!loginFlag)||(localStorage.getItem('code')&&code)){
            localStorage.removeItem('code');
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${AppId}&redirect_uri=${encodeURIComponent(REDIRECT_URL)}&response_type=code&scope=snsapi_base&state=state#wechat_redirect`;
        }
        else{
            if(to.path != '/'){
                return;
            }
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            localStorage.removeItem('token');
            axios({
                method:"POST",
                url:BASE_URL+'/customer/getOpenId/'+code,
                timeout:70000
            }).then((res)=>{
                Indicator.close();
                let data = res.data;
                if(data.status == 'SUCCESS'){
                    if(!data.content){
                        return;
                    }
                    if(data.content.openIdEncrypt&&!data.content.token){
                        store.dispatch('setOpenId',{openId:data.content.openIdEncrypt});
                        localStorage.setItem('code',code);
                        localStorage.removeItem('token');
                        next()
                    }
                    else if(data.content.token){
                        console.log(data.content.regMobile);
                        store.dispatch('setOpenId',{token:data.content.token,phone:data.content.regMobile});
                        localStorage.setItem('code',code);
                        localStorage.setItem('token',data.content.token);
                        next()
                    }
                    else{
                        Toast({
                            message:'获取微信信息失败,请稍后再试'
                        })
                    }
                }
                else{
                    Indicator.close();
                    Toast({
                        message:'获取微信授权信息失败，请稍后再试'
                    })
                }
            },(err)=>{
                Indicator.close();
                if(String(err).indexOf("timeout")!=-1){
                    //window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${AppId}&redirect_uri=${encodeURIComponent(REDIRECT_URL)}&response_type=code&scope=snsapi_base&state=state#wechat_redirect`;
                    Toast({
                        message:'网络超时，请退出重试'
                    })
                }
                else{
                    Toast({
                        message:'网络错误，请稍后再试'
                    })
                } 
            })
        }
    })
}

//weixin js sdk
axios.post(BASE_URL+'/weixin/config/getSignatureconfig',{
    url:location.href.split("#")[0],
    source:REGSOURCE

}).then(res=>{
        let data = res.data.content;
        if(!data){
            console.log("配置参数错误!");
            return;
        }
        wx.config({
            debug: false,
            appId : data.appId,
            timestamp: data.timestamp,
            nonceStr : data.nonceStr,
            signature : data.signature,
            jsApiList: [
                'onMenuShareAppMessage',
                'onMenuShareTimeline',
                'onMenuShareQQ',
                'chooseImage',
                'getLocalImgData',
                'getNowLocationByWx',
                'uploadImage',
                'closeWindow'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        Vue.prototype.$wx = wx;
});

history.pushState(null, null, document.URL);

window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
});

new Vue({
    el: '#app',
    template: '<App/>',
    router,
    store,
    components: { App }
});
