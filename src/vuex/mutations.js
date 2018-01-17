//根级别的 mutation
//设置分发函数
export const SETOPENID = (state,{openId,token,phone})=>{
  console.log(openId);
  state.openId = openId;
  if(token){
    state.token = token;
    state.isLogin = true;
    state.phone = phone;
  }

}

export const LOGININ = (state,{token,phone})=> {
  //user 载荷
  state.isLogin = true;
  state.token = token;
  state.phone = phone;
  //
  window.localStorage.setItem('token',token);
}

export const LOGINOUT = (state)=> {
  state.isLogin = false;
  state.token = null;
  state.openId = null;
  localStorage.removeItem('token');
  //localStorage.removeItem('code');
}


export const HADTOKEN = (state)=>{
  state.isLogin = true
}

export const SETCARINFO = (state,carInfo)=>{
  state.carInfo = carInfo
}

//设置车牌信息
export const SETCARPLATE = (state,carPlate)=>{
  state.carPlate = carPlate;
}

//showlogin 弹窗登录框 全局组件

export const SHOWLOGIN = (state)=>{
  state.isLogin = false;
  state.showLogin = true
}

export const HIDELOGIN = (state)=>{
  state.showLogin = false
}

export const SETORDERLIST = (state,data)=>{
  state.orderList = data

}

export const SETPARAMS = (state,param)=>{
  state.params = Object.assign(state.params,param);
}


export const LOADERR = (state,type)=>{
  state.loaderror = type
}


export const CREATETIMEOUT = (state,type)=>{
  state.timeClock = setInterval(()=>{
    state.markTime--;
    if(state.markTime==0){
      clearInterval(state.timeClock);
      state.markTime = 60;
      state.timeClock = null;
    }
  },1000)
}