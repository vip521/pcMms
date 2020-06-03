module.exports ={
    devServer:{
        port:8080,
        host:'localhost',//端口号 如果端口号被占用，自动提1
        https:false,//主机名127.0.01
        open:true,//启动服务时候，自动打开浏览器
        proxy: {
             '/dev-api':{//代理
                //目标服务器
                target: 'http://mengxuegu.com:7300/mock/5eb6377a5a06b51372b13007',//动态引用
                changeOrigin: true,//开启代理服务器
                pathRewrite: {
                    // /dev-api/db.json 最终会转发到"http://localhost:8001/db.json"
                    '^/dev-api':''
                }
            }
        }
        // proxy:{
        //     // '/dev-api':{//代理
        //     [process.env.VUE_APP_BASE_API]:{
        //         //目标服务器
        //         target: process.env.VUE_APP_SERVICE_URL,//动态引用
        //         changeOrigin:true,//开启代理服务器
        //         pathRewrite:{
        //             // /dev-api/db.json 最终会转发到"http://localhost:8001/db.json"
        //             // '^/dev-api':'',
        //             ['^'+process.env.VUE_APP_BASE_API]:'',//动态获取
        //         }
        //     }
        // }
    },
    lintOnSave:false,//关闭格式检查
    productionSourceMap:false,//打包不会生产.map文件 加快打包
}