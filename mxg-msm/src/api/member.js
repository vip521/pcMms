import requset from "@/utils/request"

export default{
    getlist(){
      return  requset({
            url:"/member/list",
            method:"get"
        })
    },
    search(page, size, serchMap){
        return requset({
            url: `/member/list/search/${page}/${size}`,
            method:"post",
            data:serchMap
        })
   },
   add(pojo){
       return requset({
           url: `/member`,
           method: "post",
           data: pojo
       })
   },
   getID(id){
        return requset({
            url:`/member/${id}`,
            method:"get"
        })
   },
    updata(pojo) {
        return requset({
            url: `/member/${pojo.id}`,
            method: "put",
            data:"pojo"
        })
    }, 
    delete(id){
        return requset({
            url:`/member/del/${id}`,
            method:"delete"
        })
    }
}