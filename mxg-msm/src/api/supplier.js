import requset from "@/utils/request"

export default{
    getList(){
        return requset({
            url:'/supplier/list',
            method:'get'
        })
    },
    search(page, size, serchMap) {
        return requset({
            url: `/supplier/list/search/${page}/${size}`,
            method: "post",
            data: serchMap
        })
    },
    add(pojo){
        return requset({
            url:"/supplier",
            method:'post',
            data:pojo
        })
    },
    getById(id){
        return requset({
            url:`/supplier/${id}`,
            method:'get'
        })
    },
    updated(pojo) {
        return requset({
            url: `/supplier/${pojo.id}`,
            method: 'put',
            data:pojo
        })
        
    },
    delete(id) {
        return requset({
            url: `/supplier/del/${id}`,
            method: "delete"
        })
    }
    
}