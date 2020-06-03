<template>
  <div class="login-content">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="login-from">
        <h2 class="login-title">会员管理系统</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
     <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {login,getuseinfor,text}from "../../api/login"
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules:{
          username:[
            { required: true, message: '账号不能为空', trigger: 'blur' }
          ],
           password:[
         { required: true, message: '密码不能为空', trigger: 'blur' }
          ]
      }
    };
  },
  methods: {
      submitForm(formName) {
       this.$refs[formName].validate((valid) => {
           if(valid){
               //后台验证
           login(this.form.username,this.form.password).then(res=>{
             const resP= res.data
             console.log(resP,resP.data.token)
            if(resP.flag){
              getuseinfor(resP.data.token).then(res=>{
                console.log(res)
                const useinfo = res.data
                if(useinfo.flag){
                  localStorage.setItem("token",resP.data.token);
                  localStorage.setItem("infor",JSON.stringify(useinfo.data));
                  this.$router.push('/')
                }else{
                      this.$message({
                      message: useinfo.message,
                      type: 'warning'
                });
                }
                
              })
            }else{
              this.$message({
              message: '验证失败',
              type: 'warning'
        });
            }
           })
          
           }else{
               alert("验证失败")
               return false
           }
       })
      }
  }
}
</script>
<style  scoped>
.login-content{
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('../../../public/login.jpg');
}
.login-title{
    color: #303133;
    text-align: center;
}
.login-from{
    width: 350px;
    margin: 160px auto;
    background-color: rgb(255,255,255,0.8);
    padding: 30px;
    border-radius: 20px;
}
</style>