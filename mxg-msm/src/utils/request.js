import axios from 'axios'
import { Loading } from 'element-ui';
import { Message } from 'element-ui';

const loading = {
    loadingInstance: null,
    open: function () {
        if (this.loadingInstance === null) {
            this.loadingInstance = Loading.service({ target: ".main" });
        }

    },
    close: function () {
        if (this.loadingInstance !== null) {
            this.loadingInstance.close()
        }
        this.loadingInstance = null
    }
 }



 
const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    // baseURL:'/',
    timeout: 5000,//请求超时
})






//1请求拦截器
request.interceptors.request.use(config => {
    loading.open()
    return config
 }, error => {
    //出现异常---抛出去
    console.log("庞贵宾")
    loading.close()
    return Promise.reject(error)
})
//2数据相应
request.interceptors.response.use(response => {
    loading.close()
    const resP = response.data


    if (resP.code !== 2000) {
        Message({
            message: resP.message || '系统异常',
            type: 'warning',
            duration: 5 * 1000
        })
    }
    return response
}, error => {
    Message({
        message: resP.message || '系统异常',
        type: 'error',
        duration: 5 * 1000
    })
    //出现异常---抛出去
    return Promise.reject(error)
})



export default request