<template>
  <div>
    <div class="head">
      <a href="#/">
        <img class="logo" src="../../../src/assets/logo.png" width="20px" />
        <span class="title">梦学谷管理系统</span>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
           {{user.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-edit" command="a">修改密码</el-dropdown-item>
            <el-dropdown-item icon="el-icon-s-fold" command="b">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </a>
    </div>
     <el-dialog  title="重置密码" :visible.sync="dialogFormVisible" width="400px">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" style="width:300px">
            <el-form-item label="原密码" prop="oldpass">
              <el-input type="password" v-model="ruleForm.oldpass" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="新密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="$refs['ruleForm'].resetFields()">重置</el-button>
            </el-form-item>
    </el-form>
  </el-dialog>
  </div>
 
</template>
<script>
import {logout} from "@/api/login"
import passwordApi from "@/api/password"
  export default {
    data(){
      const validateoldpass  = (rule,value,callback)=>{
        passwordApi.checkPwd(this.user.id,value).then(res=>{
          const resP = res.data
          if(resP.flag){
            callback()
          }else{
            callback(new Error(resP.message))
          }
        })
      }
      const validatepass = (rule,value,callback)=>{
        if(value !==this.ruleForm.pass){
          callback(new Error('两次输入的密码不一致'))
        }else(
          callback()
        )
      }
      return{
        user:JSON.parse(localStorage.getItem('infor')),
        dialogFormVisible:false,
        ruleForm:{
          oldpass:'',
          pass:'',
          checkPass:''
        },
        rules:{
          oldpass:[
            {required:true,message:"密码不能为空",trigger:'blur'},
            {validator:validateoldpass,trigger:'blur'}
          ],
          pass:[
            {required:true,message:"新密码不能为空",trigger:'blur'}
          ],
          checkPass:[
            {required:true,message:"确认密码不能为空",trigger:'blur'},
             {validator:validatepass,trigger:'change'}
          ]
        }
      }
    },
    methods: {
      handleCommand(command) {
        switch (command) {
          case 'a':
            this.handlePed()
            break;
             case 'b':
               this.handleLogout()
            break;
        
          default:
            break;
        }
      },
      handleLogout(){
          //退出系统
           const token= localStorage.getItem("token");
            logout(token).then(res=>{
              const resP=res.data;
              if(resP.flag){
                //退出成功-清除数据
                localStorage.removeItem("token")
                localStorage.removeItem("infor")
                this.$router.push('/login')
              }else{
                  this.$message({
                  message:resP.message ,
                  type: 'warning',
                  duration:1000
        });
              }
            })
      },
      handlePed(){
        this.dialogFormVisible=true
      },
      submitForm(formName){
        this.$refs[formName].validate(vali=>{
          if(vali){
            console.log('校验通过')
            passwordApi.upDataPwd(this.user.id,this.ruleForm.checkPass).then(res=>{
              console.log(res)
              const resP = res.data
              this.$message({
                message:resP.message,
                type:resP.flag?'succsess':'warning'
              })
              if(resP.flag){
                this.handleLogout()
                this.dialogFormVisible =false
              }
            })
          }else{
            return false
          }
        })
      }
    }
  }
</script>
<style  scoped>
.logo {
  vertical-align: middle;
  padding: 0 10px 0 40px;
}
.title {
  position: absolute;
  color: white;
}
.el-dropdown{
    float: right;
    margin-right: 40px;
    
}
.el-dropdown-link{
    color: white;
    cursor: pointer;
}
</style>