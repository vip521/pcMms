import request from '../utils/request'

const BASE_URL = process.env.VUE_APP_BASE_API
// request.get('/db.json').then(res=>{
//     console.log(res.data)
// })
 
//  2request({
//      method:"GET",
//      url:'/db.json',

//  }).then(res=>{
//      console.log(res)
//  })
// 3
 export default {
     getlist(){
         const req=request({
             method: "GET",
            //  url: BASE_URL+'/db.json',
             url:'/db.json',
         })
         return req
     }
 }