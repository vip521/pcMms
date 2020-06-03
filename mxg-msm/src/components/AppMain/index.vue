<template>
  <div>
    <div class="main">
      <Applimk v-show="$route.path !=='/home'"></Applimk>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Applimk from "./link"
export default {
    components:{Applimk}
}
</script>
<style  scoped>
    .el-breadcrumb{
        height: 10px;
        padding: 20px;
        border-radius:4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
       
    }
    .line{
        border-left: 3px solid #31c17b;
        padding-left: 10px;
    }
</style>