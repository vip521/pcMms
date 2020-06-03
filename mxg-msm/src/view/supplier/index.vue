<template>
    <div>
 <!-- 表单 -->
  <el-form ref='aaa' :inline="true" :model="serchMap" style="margin-top:20px">
      <el-form-item prop="name">
        <el-input v-model="serchMap.name" placeholder="供应商名称" ></el-input>
      </el-form-item>
      <el-form-item prop="linkman" >
        <el-input v-model="serchMap.linkman" placeholder="联系人" ></el-input>
      </el-form-item>
      <el-form-item prop="mobile" >
        <el-input v-model="serchMap.mobile" placeholder="电话号码" ></el-input>
      </el-form-item>
      
        <el-form-item >
          <el-button type="primary" @click="fetchData">查询</el-button>
          <el-button type="primary" @click="handadd">新增</el-button>
          <el-button  @click="resetForm('aaa')">重置</el-button>
      </el-form-item>
  </el-form>
  <!-- 表格 -->
   <el-table :data="list" height="380" border style="width: 100%">
    <el-table-column type="index" label="序号" ></el-table-column>
    <el-table-column prop="name" label="供应商名称" width="120" ></el-table-column>
    <el-table-column prop="linkman" label="联系人" width="150"></el-table-column>
    <el-table-column prop="mobile" label="联系电话" ></el-table-column>
    <el-table-column prop="remark" label="备注" ></el-table-column>
     <el-table-column label="操作">
      <template slot-scope="scope" width="180">
        <el-button
          size="mini"
          @click="handleEdit(scope.row.id)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
   </el-table>
    <!-- 分页 --> 
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

 <!-- 弹框 -->
  <el-dialog title="供应商编辑" :visible.sync="dialogFormVisible" width="500px">
      <el-form 
      ref="prjoForm"
      :rules="rules"
      label-width="100px"
      label-position="right"
      style="width:400px"
      :model="pojo">
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="pojo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="linkman">
          <el-input v-model="pojo.linkman" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码 " prop="mobile">
          <el-input v-model="pojo.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input  type="textarea" v-model="pojo.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button  @click="pojo.id===null ? addData('prjoForm') : updateData('prjoForm')">确 定</el-button>   
      </div>
 </el-dialog>
    </div>
</template>
<script>
import supplierApi from "@/api/supplier"
export default {
    data(){
        return{
            list:[],
            pageSize:10,
            currentPage:1,
            serchMap:{
                name:'',
                linkman:'',
                mobile:''
            },
            total:0,
            dialogFormVisible:false,
            pojo:{
                    id:null,
                    name:"",
                    linkman:"",
                    mobile:"",
                    remark:""
                },
             // 校验
      rules:{
        name:[
          {required:true,message:'供应商不能为空',trigger:"blur"}
        ],
        linkman:[
          {required:true,message:"名字不能为空",trigger:"blur"}
        ]
      }
        }
    },
    created() {
        this.fetchData()
    },
    methods:{
       //数据请求，刷新
        fetchData(){
            // supplierApi.getList().then(res=>{ 
             supplierApi.search(this.currentPage,this.pageSize,this.serchMap).then(res=>{
                  console.log(res.data.data)
                  const resP =res.data.data
                  this.list=resP.rows
                  this.total=resP.total
              
            })
        },
        //编辑按钮
        handleEdit(id){
          //清楚表单
          this.handadd()
          supplierApi.getById(id).then(res=>{
            const resP= res.data
            if(resP.flag){
              this.pojo = resP.data            
              }else{
                this.$message({
                  message:resP.message,
                  type:'warning'
                })
              }
          })
          
           
        },
        // 删除按钮
        handleDelete(id){
          this.$confirm('确认删除这条记录吗？','提示',{
            confirmButtonText:'确认',
             confirmButtonText:'取消',
          }).then(()=>{
              supplierApi.delete(id).then(res=>{
               const resP =res.data
               if(resP.flag){
                 this.fetchData()
                 this.$message({
                   message:resP.message,
                   type:resP.flag ?'success':'warning'
                 })
               }else{
                 return false
               }
             })
          }).catch(()=>{
              this.$message({
                   message:'已经取消',
                   type:'success'
                 })
          })
             
        },
        handleSizeChange(val){
            this.pageSize=val
            this.fetchData()
        },
        handleCurrentChange(val){
            this.currentPage=val
            this.fetchData()
        },
        resetForm(aaa){
             this.$nextTick(()=>{
            this.$refs[aaa].resetFields();
              })
        },
        handadd(){
            this.dialogFormVisible=true
        },
        addData(prjoForm){
            this.$refs[prjoForm].validate(vali=>{
                if(vali){
                    //允许提交
                    supplierApi.add(this.pojo).then(res=>{
                        if(res.data.flag){
                            this.fetchData()
                            this.dialogFormVisible=false
                        }else{
                            this.$message({
                            message:resP.message,
                            type:'warning'
                            })
                        }
                    })
                }else{
                    return false
                }
            })
        },
        //数据更新
        updateData(formName){
          this.$refs[formName].validate(vali=>{
            if(vali){
              supplierApi.updated(this.pojo).then(res=>{
                const resP = res.data
                if(resP.flag){
                  this.fetchData()
                  this.dialogFormVisible =false
                }else{
                  this.$message({
                    message:resP.message,
                    type:'warning'
                  })
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