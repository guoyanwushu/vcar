/**
 * Created by bao on 2017/11/6.
 */
let dateFmt = (d,f) => {
    if(!d) return "";
    d = new Date(d);
    var t = {
        "y+" : d.getFullYear(),
        "M+" : d.getMonth()+1,
        "d+" : d.getDate(),
        "H+" : d.getHours(),
        "m+" : d.getMinutes(),
        "s+" : d.getSeconds(),
        "S+" : d.getMilliseconds()
    };
    var _t;
    for(var k in t){
        while(new RegExp("(" + k + ")").test(f)){
            _t = (RegExp.$1.length == 1) ? t[k] :
                ("0000000000".substring(0, RegExp.$1.length) + t[k]).substr(("" + t[k]).length);
            f = f.replace(RegExp.$1, _t + "");
        }
    }
    return f;
};
let currency = (s)=>{
    if(typeof s !='number'){
        return "未知"
    }
    var n = 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    var t = "";
    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}
let phoneShielderFmt = (s)=>{
    s = String(s);
    return s.substring(0,3)+"****"+s.substring(7);
}
export {
    dateFmt,
    currency,
    phoneShielderFmt
}