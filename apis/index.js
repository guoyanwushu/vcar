/*default url configs*/
module.exports = {
    dev: {
        'BASE_URL': '"http://10.103.7.99:8080/vcar"',//测试接口地址   10.103.7.124   10.103.7.100:8080/vcar
        'REGSOURCE': '"weixin"',
        'AMapKey': '"9f93acbb7cb0eb764158a2e0fe3f684c"',//高德定位开发者账号key
        'SERVICEPHONE':"'400-101-5500'",//客服电话
        "AppId":'"wx0568472270c95f91"',
        "REDIRECT_URL":'"http://hl.vcash.cn/test-vcar/test/insurance.html"',//微信重定向地址
        "DevEnv":"'dev'"//开发环境
    },
    /*生产环境配置*/
    prod: {
        'BASE_URL': '"https://hy.vcash.cn/api-app"',
        'REGSOURCE': '"weixin"',
        'AMapKey': '"6419755792b82c618b5fb303f262f685"',//高德定位key
        'SERVICEPHONE':"'400-101-5500'",//客服电话
        "AppId":"'wx64916183d04a77d7'",
        "REDIRECT_URL":"'https://hy.vcash.cn/huyoo/insurance.html'",//微信重定向地址
        "DevEnv":"'prod'"//开发环境
    }
}
