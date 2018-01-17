/**
 * Created by bao on 2017/11/7.
 */
//工具类的函数

//ssionstorage 操作函数
const ls = {
    setStorage: function (name, value) {
        if (!name || !value) return;
        if (window.sessionStorage) {
            if (typeof value == 'object') {
                value = JSON.stringify(value);
            }
            sessionStorage.setItem(name, value);
        } else {
            if (typeof value == 'object') {
                value = JSON.stringify(value);
            }
            var key = encodeURIComponent(name);

            var val = encodeURIComponent(value);

            var path = ';path=' + RootPath;

            var t = new Date();

            var expires = ";expires=" + t.toGMTString();

            document.cookie = key + '=' + val + path;
        }
    },//设置缓存

    getStorage: function (name) {
        if (window.sessionStorage) {
            if (!name) return null;
            var val = sessionStorage.getItem(name);
            if (!val) return null;
            var rag = /\{/;
            if (val.match(rag)) {
                return eval('(' + val + ')');
            } else {
                return val
            }
        } else {
            var pluses = /\+/g;

            function decoded(s) {
                return decodeURIComponent(s.replace(pluses, ' '));
            }

            function converted(s) {
                if (s.indexOf('"') === 0) {
                    s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
                }
                try {
                    var rag = /\s*^\{[^{}]*}/;
                    if (s.match(rag)) {
                        return eval('(' + s + ')');
                    } else {
                        return s
                    }
                } catch (er) {

                }
            }

            var cookies = document.cookie.split('; ');

            var result = name ? undefined : {};

            for (var i = 0, l = cookies.length; i < l; i++) {
                var parts = cookies[i].split('=');

                var key = decoded(parts.shift());

                var cookie = decoded(parts.join('='));

                if (name && name === key) {
                    result = converted(cookie);
                    break;
                }
            }
            return result;
        }
    },//获取缓存

    removeStorage: function (name) {
        if (!name) return;
        if (window.sessionStorage) {
            sessionStorage.removeItem(name);
        } else {
            var cval = $.cookie(name);
            if (cval) {
                var key = encodeURIComponent(name);

                var val = "";

                try {
                    val = JSON.stringify(cval);
                } catch (e) {
                    val = String(val);
                }

                val = encodeURIComponent(val);

                var path = ';path=' + RootPath;

                var exp = new Date();

                exp.setDate(exp.getDate() - 1);

                var expires = ";expires=" + exp.toGMTString();

                document.cookie = key + '=' + val + path + expires;
            }
        }
    },//移除缓存

    removeAllStorage: function () {
        var self = this;
        if (window.sessionStorage) {
            var ws = sessionStorage;
            for (var k in ws) {
                self.removeStorage(k);
            }
        } else {
            var cookies = document.cookie.split('; ');
            var pluses = /\+/g;

            function decoded(s) {
                return decodeURIComponent(s.replace(pluses, ' '));
            }

            for (var i = 0, l = cookies.length; i < l; i++) {
                var parts = cookies[i].split('=');
                var key = decoded(parts.shift());
                self.removeStorage(key);
            }
        }
    },//清空缓存
};

const getUrlQuery = ()=> {
    var request = new Object();
	var param = window.location.search;
	if(param != ''){
		param = param.substring(1);
		var params = param.split("&");
		for(var i = 0; i < params.length;i++){
			var kv = params[i].split("=");
	 		request[kv[0]] = kv[1];	
		}
	}
	return request;
};
//原生附件选择
const filePick = (file)=> {
    return new Promise((resolve, reject)=> {
        if (!file.value) {
            reject('not find el');
            return
        }
        var filextension = file.value.substring(file.value.lastIndexOf("."), file.value.length).toLowerCase();
        if ((filextension != '.jpg') && (filextension != '.gif') && (filextension != '.jpeg') && (filextension != '.png') && (filextension != '.bmp')) {
            reject('typeErr');
            file.files = [];
            return
        }
        let filemin = file.files[0];
        resolve(filemin);
    })

};

import {dateFmt} from './filters'


const imgToBase64 = (file)=> {
    return new Promise((resolve, reject)=> {
        var ofReader = new FileReader();
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            let image_base64 = this.result.split(",")[1];
            //就是base64
            resolve(image_base64);
        }
    })
}

const getLocation = () => {
    let remoteLoad = function (url, hasCallback) {
        return createScript(url)
        /**
         * 创建script
         * @param url
         * @returns {Promise}
         */
        function createScript(url) {
            var scriptElement = document.createElement('script')
            document.body.appendChild(scriptElement)
            var promise = new Promise((resolve, reject) => {
                scriptElement.addEventListener('load', e => {
                    removeScript(scriptElement)
                    if (!hasCallback) {
                        resolve(e)
                    }
                }, false)

                scriptElement.addEventListener('error', e => {
                    removeScript(scriptElement)
                    reject(e)
                }, false)

                if (hasCallback) {
                    window.____callback____ = function () {
                        resolve()
                        window.____callback____ = null
                    }
                }
            })

            if (hasCallback) {
                url += '&callback=____callback____'
            }

            scriptElement.src = url

            return promise
        }

        /**
         * 移除script标签
         * @param scriptElement script dom
         */
        function removeScript(scriptElement) {
            document.body.removeChild(scriptElement)
        }
    };

    let nextFn = (resolve,reject)=>{
      AMap.plugin('AMap.Geolocation',function(){
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: false,//是否使用高精度定位，默认:true
          noIpLocate:0
        });
          geolocation.getCityInfo(function(status,result){
            if(status=='complete'){
              resolve(result)
            }else{
              reject(result)
            }
          });
      })
    }

    return new Promise((resolve, reject)=> {
        if (window.AMap&&AMap.plugin) {
            nextFn(resolve,reject)
        } else {
          remoteLoad(`http://webapi.amap.com/maps?v=1.3&key=`+AMapKey).then(res=> {
            nextFn(resolve,reject)
          })
        }
    })
}

export {
    ls,
    filePick,
    dateFmt,
    imgToBase64,
    getUrlQuery
}
