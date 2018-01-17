import Vue from 'vue'
import Router from 'vue-router'
import home from 'src/viewRecord/home'//首页
import baseInfo from 'src/viewRecord/baseInfo'//首页
import queryOrder from  'src/view/home/orderQuery'//保单查询
import queryClaim from  'src/view/home/claimQuery'//保单查询


Vue.use(Router);

const routerConfig = [
    {
        path: '/',
        name: '主页',
        component: home,
    },
    {
        path: '/baseInfo',
        name: '基本信息',
        component: baseInfo,
    },
    {
        path: '/orderquery',
        name: '保单查询',
        component: queryOrder,
    },
    {
        path: '/claimquery',
        name: '车险理赔',
        component: queryClaim,
    }
];
const router = new Router({
    routes: routerConfig
});
export {
    routerConfig,
    router
}
