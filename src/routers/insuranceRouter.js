import Vue from 'vue'
import Router from 'vue-router'
import home from 'src/view/home/home'//首页
import order from 'src/view/order/order'//订单
import mine from 'src/view/mine/mine'//我的
import login from 'src/view/login/login'//登录
import quotation from 'src/view/quotation/index'//主业务
import queryOrder from  'src/view/home/orderQuery'//保单查询
import queryClaim from  'src/view/home/claimQuery'//保单理赔
/**/
import baseInfo from 'src/view/quotation/baseInfo'//基本信息
import perfectInfo from 'src/view/quotation/perfectInfo'//基本信息
import selectInsurance from 'src/view/quotation/selectInsurance'//自选保险配置
import offerList from 'src/view/quotation/offerList'//报价列表
import dealOrder from 'src/view/quotation/dealOrder'//完善投保信息
import fillOrder from 'src/view/quotation/fillOrder'//填写订单 信息详情
import pay from 'src/view/quotation/pay'//提交订单
import paySuccessDetail from 'src/view/quotation/paySuccessDetail'//支付成功查看详情

/** */
import mineIndexfrom from 'src/view/mine/index'       //个人中心首页
import mineQuestions from 'src/view/mine/questions'  //个人中心 常见问题
import mineContact from 'src/view/mine/contactUs'  //个人中心 联系我们
import mineAbout from 'src/view/mine/aboutUs'  //个人中心 联系我们
import mineFeedback from 'src/view/mine/feedback'  //个人中心 反馈
import mineFeedbackSuccess from 'src/view/mine/feedBackSuccess'  //个人中心 反馈成功
import mineWalletIndex from 'src/view/mine/mywallet/index'  //个人中心 钱包
import mineWalletDebitCard from 'src/view/mine/mywallet/myDebitCards'  //个人中心 我的银行卡列表
import mineWalletAddCard from 'src/view/mine/mywallet/addDebitCard'  //个人中心 添加银行卡
import mineWalletBankList from 'src/view/mine/mywallet/bankList'  //个人中心 银行卡列表
import mineWalletWithDraw from 'src/view/mine/mywallet/withDraw'  //个人中心 提现
import mineWalletChoseDebitCards from 'src/view/mine/mywallet/choseDebitCards'  //个人中心 提现  选择银行卡
import mineAccountDetail from 'src/view/mine/mywallet/accountDetail'  //个人中心 账户明细
import mineWithDrawSuccess from 'src/view/mine/mywallet/withDrawSuccess'  //个人中心 提现成功
import mineInDetail from 'src/view/mine/mywallet/inDetail'  //个人中心 收入明细
import mineAccountManage from 'src/view/mine/accountManage/index'  //个人中心 账户管理
import mineWechatUnbind from 'src/view/mine/accountManage/wechatUnbind'  //个人中心 账户管理
import mineConfirmUnbind from 'src/view/mine/accountManage/confirmUnbind'  //个人中心 确认解绑
import mineAddressManage from 'src/view/mine/address/index'  //个人中心 保单地址

import mycars from 'src/view/mine/mycars/mycars'
//订单
import orderList from 'src/view/order/orderList'
import orderDetail from 'src/view/order/orderDetail'
import addfiles from 'src/view/quotation/addfiles'

Vue.use(Router);

const routerConfig = [
    {
        path: '/',
        name: '主页',
        component: home,

    },
    {
        path: '/order',
        name: '订单',
        component: order,
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
    },
    {
        path: '/orderList',
        name: '订单列表',
        component: orderList,
    },
    {
        path: '/orderDetail',
        name: '订单详情',
        component: orderDetail,
    },
    {
        path: '/mine',
        component: mine,
        name:'我的',
        redirect:'/',
        children:[{
            path:'/',
            component:mineIndexfrom
        },{
            path:'questions',
            name:'常见问题',
            component:mineQuestions
        },{
            path:'contactus',
            name:'联系我们',
            component:mineContact
        },{
            path:'about',
            name:'关于我们',
            component:mineAbout
        },{
            path:'feedback',
            name:'用户反馈',
            component:mineFeedback
        },{
            path:'feedbacksuccess',
            name:'用户反馈成功',
            component:mineFeedbackSuccess
        },{
            path:'accountmanage',
            component:mine,
            children:[{
                path:'',
                name:'账户管理',
                component:mineAccountManage
            },{
                path:'wechatunbind',
                name:'微信解绑',
                component:mineWechatUnbind
            },{
                path:'confirmunbind',
                name:'确认解绑',
                component:mineConfirmUnbind
            }]
        },{
            path:'addressmanage',
            component:mine,
            children:[{
                path:'',
                name:'我的地址',
                component:mineAddressManage
            }]
        },{
            path:'mywallet',
            component:mine,
            name:'我的钱包',
            redirect:'/mine/mywallet/index',
            children:[{
                path:'index',
                component:mineWalletIndex
            },
            {
                path:"debitcards",
                name:'借记卡列表',
                component:mineWalletDebitCard
            },{
                path:'adddebitcard',
                name:'添加储蓄卡',
                component:mineWalletAddCard
            },{
                path:'banklist',
                name:'银行列表',
                component:mineWalletBankList
            },{
                path:'withdraw',
                name:'提现',
                component:mineWalletWithDraw
            },{
                path:'chosedebitcard',
                name:'选择借记卡',
                component:mineWalletChoseDebitCards
            },{
                path:'accountdetail',
                name:'账户详情',
                component:mineAccountDetail
            },{
                path:'indetail',
                name:'收入详情',
                component:mineInDetail
            },{
                path:'success',
                name:'提现成功',
                component:mineWithDrawSuccess
            }]
        }]
    },
    {
        path: '/quotation',
        name: '车险主业务',
        component: quotation,
        redirect:"/baseInfo",
        children:[
            {
                path:'/baseInfo',
                name:'基本信息',
                component:baseInfo,
            },
            {
                path:'/perfectInfo',
                name:'完善信息',
                component:perfectInfo,
            },
            {
                path:'/selectInsurance',
                name:'自选保险配置',
                component:selectInsurance,
            },
            {
                path:'/offerList',
                name:'报价列表',
                component:offerList,
            },
            {
                path:'/dealOrder',
                name:'完善投保信息',
                component:dealOrder,
            },
            {
                path:'/fillOrder',
                name:"填写订单",
                component:fillOrder
            },
            {
                path:'/pay',
                name:"提交支付",
                component:pay
            },
            {
                path:'/paySuccessDetail',
                name:"提交支付成功",
                component:paySuccessDetail
            },
            {
                path:'/addfiles',
                name:"核保退回修改",
                component:addfiles
            },

        ]
    },
    {
        path: '/mycars',
        name: '我的车辆',
        component: mycars,
    },
];
const router = new Router({
    routes: routerConfig
});
export {
    routerConfig,
    router
}
