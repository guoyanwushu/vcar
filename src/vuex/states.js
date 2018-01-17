/**
 * Created by chen on 2017/11/29.
 */
export default  {
    //是否登录标识
    isLogin: false,
    openId:null,
    //token
    token: window.localStorage.getItem('token'),
    //弹窗登录窗标识
    showLogin: false,
    //车牌地址信息
    carPlate: {},
    //车辆信息
    carInfo: {},
    //登录手机号 
    phone:"",
    //用户信息
    admin: {
        expressWay: '',//快递方式
        name: "",//姓名
        cellPhone: "",//手机号
        address: {}//地址信息
    },
    //订单列表
    orderList:{},

     //paramQuery
    params:{},

    //404
    loaderror:false,

    markTime:60,

    timeClock:null//计时器

}