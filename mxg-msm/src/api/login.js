import request from "@/utils/request"


export function login(username,password){
    return request({
        url:'/user/login',
        method:'post',
        data:{
            username,
            password
        }
    })
      
}
export function getuseinfor(token){
    return request({
        url:`/user/infor/${token}`,
        method:'get'
    })
}

export function logout(token) {
    return request({
        url: `/user/logout`,
        method: 'post',
        data: { token}
    })
}

export function text() {
    return request({
        url: '/text',
        method: 'get'
    })
}