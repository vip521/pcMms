import requset from "@/utils/request"
export default{
    //校验密码
    checkPwd(userId, password){
        return requset({
            url:`/user/pwd`,
            method:'post',
            data:{
                userId,
                password
            }
        })
    },
    upDataPwd(userId, password) {
        return requset({
            url: `/user/pwd`,
            method: 'put',
            data: {
                userId,
                password
            }
        })
    },
}