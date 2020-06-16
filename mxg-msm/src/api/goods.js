import requset from "@/utils/request"
export default{
    search(page, size, serchMap) {
        return requset({
            url: `/goods/list/search/${page}/${size}`,
            method: "post",
            data: serchMap
        })
    },
    add(pojo) {
        return requset({
            url: "/goods",
            method: 'post',
            data: pojo
        })
    },
    getById(id) {
        return requset({
            url: `/goods/${id}`,
            method: 'get'
        })
    },
    updated(pojo) {
        return requset({
            url: `/goods/${pojo.id}`,
            method: 'put',
            data: pojo
        })

    },
    delete(id) {
        return requset({
            url: `/goods/del/${id}`,
            method: "delete"
        })
    }
}