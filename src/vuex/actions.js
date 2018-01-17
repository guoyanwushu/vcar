//根级别的 action
//设置触发函数
export const setOpenId = ({commit},data)=>{
    console.log(data);
    return new Promise((resolve,reject)=>{
        commit('SETOPENID',data);
        resolve;
    })
}

export const loginIn = ({commit}, token)=> {
    return new Promise((resolve, reject)=> {
        commit('LOGININ', token);
        resolve()
    })
}

export const loginOut = ({commit})=> {
    return new Promise((resolve, reject)=> {
        commit('LOGINOUT');
        resolve()
    })
}

export const hadToken = ({commit})=>{
    commit('HADTOKEN')
}

export const setCarInfo = ({commit}, carInfo)=> {
    return new Promise((resolve, reject)=> {
        commit('SETCARINFO', carInfo);
        resolve()
    })
}
//设置车牌信息
export const setCarPlate = ({commit}, query)=> {
    return new Promise((resolve, reject)=> {
        commit('SETCARPLATE', query);
        resolve()
    })
}

export const showLoginBox = ({commit})=> {
    return new Promise((resolve, reject)=> {
        commit('SHOWLOGIN');
        resolve()
    })
}

export const hideLoginBox = ({commit})=> {
    return new Promise((resolve, reject)=> {
        commit('HIDELOGIN');
        resolve()
    })
}

export const setOrderList = ({commit},data)=> {
    return new Promise((resolve, reject)=> {
        commit('SETORDERLIST',data);
        resolve()
    })
}

export const setparam = ({commit},param)=>{
    commit("SETPARAMS",param)
}


export const loadErr = ({commit},type)=>{
    commit("LOADERR",type)
}

export const createTimeout = ({commit})=>{
    commit('CREATETIMEOUT');
}















