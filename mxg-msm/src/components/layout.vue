<template>
    <div>
        <app-header></app-header>
        <app-main></app-main>
        <app-navbar></app-navbar>
    </div>
</template>
<script>
import AppHeader from "./AppHeader"
import AppMain from "./AppMain"
import AppNavbar from "./AppNavbar"
export default {
    components:{
        AppHeader,
        AppMain,
        AppNavbar
    }
}
</script>
<style scope>
    .head{
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        line-height: 50px;
        background-color: #2d3a4b;
    }
    .navbar{
        position: absolute;
        left: 0;
        top: 50px;
        bottom: 0;
        background-color: #545c64;
        width: 230px;
    }
    .main{
        position: absolute;
        top: 50px;
        left: 230px;
        right: 0;
        /* background-color: #ccc; */
        padding: 10px;
        bottom: 0;
    }
</style>