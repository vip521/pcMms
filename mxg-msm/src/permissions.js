import router from "./router"
import {getuseinfor} from "./api/login"
router.beforeEach((to ,from,next) => {
    const token = localStorage.getItem("token")
    console.log(token)
    if(!token){
        if(to.path !=='/login'){
            next({path:'/login'})
        }else{
            next()
        }
    }else{
        if(to.path==='/login'){
            next()
        }else{
            //fei 登陆页
            const infor = localStorage.getItem("infor")
            if (infor){
                next()
            }else{
                getuseinfor(token).then(res=>{
                    const resP =res.data
                    if(resP.flag){
                        localStorage.setItem("infor", JSON.stringify(resP.data))
                        next()
                    }else{
                        //为获取到，重新登入
                        next({ path: '/login' })
                    }
                })
            }
        }
    }
});