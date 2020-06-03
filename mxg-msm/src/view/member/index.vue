<template>
<div>
  <!-- 表单 -->
  <el-form ref='aaa' :inline="true" :model="serchMap" style="margin-top:20px">
      <el-form-item prop="card">
        <el-input v-model="serchMap.card" placeholder="会员卡号" ></el-input>
      </el-form-item>
      <el-form-item prop="user" style="width:90px">
        <el-input v-model="serchMap.user" placeholder="会员名字" ></el-input>
      </el-form-item>
      <el-form-item  prop="region" style="width:120px">
        <el-select  v-model="serchMap.region" placeholder="支付类型">
          <el-option v-for="v in payoption " :key="v.type" :label="v.name" :value="v.type"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
      <el-date-picker v-model="serchMap.birthday" type="date" placeholder="出生日期"> </el-date-picker>
      </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="fetchlist">查询</el-button>
           <el-button type="primary" @click="handadd">新增</el-button>
          <el-button  @click="resetForm('aaa')">重置</el-button>
      </el-form-item>
  </el-form>
  <!-- 表格 -->
    <el-table :data="list" height="380" border style="width: 100%">
    <el-table-column type="index" label="序号" ></el-table-column>
    <el-table-column prop="name" label="会员姓名" width="90" ></el-table-column>
    <el-table-column prop="birthday" label="会员生日" width="150"></el-table-column>
    <el-table-column prop="phone" label="手机号码" ></el-table-column>
    <el-table-column prop="integral" label="可用积分" ></el-table-column>
    <el-table-column prop="money" label="开卡金额" ></el-table-column>
    <el-table-column prop="payType" label="支付类型" width="90"  >
          <template slot-scope="scope">
              <span>{{scope.row.payType | payTypeFilter}}</span>
          </template>
    </el-table-column>
    <el-table-column prop="address" label="会员地址" ></el-table-column>
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
      :current-page="currentpage"
      :page-sizes="[10, 20, 30]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  <!-- 弹框 -->
  <el-dialog title="会员编辑" :visible.sync="dialogFormVisible" width="500px">
      <el-form 
      ref="prjoForm"
      :rules="rules"
      label-width="100px"
      label-position="right"
      style="width:400px"
      :model="pojo">
        <el-form-item label="会员卡号" prop="card">
          <el-input v-model="pojo.card" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="pojo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员生日 " prop="birthday">
          <el-date-picker v-model="pojo.birthday" type="date" placeholder="会员生日"> </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码"  prop="phone">
          <el-input v-model="pojo.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="可以积分" prop="integral">
          <el-input v-model="pojo.integral" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额" prop="money">
          <el-input v-model="pojo.money" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  label="支付类型" prop="type">
          <el-select  v-model="pojo.type" placeholder="支付类型">
            <el-option v-for="v in payoption " :key="v.type" :label="v.name" :value="v.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" prop="adress">
          <el-input  type="textarea" v-model="pojo.adress" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!-- <el-button  @click="addData('prjoForm')">确 定</el-button> -->
         <el-button  @click="pojo.id===null? addData('prjoForm'): updata('prjoForm')">确 定</el-button>
      </div>
 </el-dialog>
</div>
  
</template>
<script>
import memberApi from "@/api/member";
// 过滤器当中不能引用当前实例，就是不能用this 所以定义到全局
const payoption  =[
    {type:'1',name:'现金'},
    {type:'2',name:'支付宝'},
    {type:'3',name:'微信'},
    {type:'4',name:'银行卡'},
]
export default {
  data() {
    return {
      list: [],
      currentpage:1,
      total:0,
      pagesize:10,
      serchMap:{
        card:"",
        user:"",
        region:"",
        birthday:""
      },
      payoption,
      dialogFormVisible:false,
      pojo:{
        id:null,
        card:"",
        name:"",
        birthday:"",
        phone:"",
        integral:0,
        money:0,
        type:"",
        adress:"",
      },
      // 校验
      rules:{
        card:[
          {required:true,message:'卡号不能为空',trigger:"blur"}
        ],
        name:[
          {required:true,message:"姓名不能为空",trigger:"blur"}
        ],
         type:[
          {required:true,message:"支付类型不能为空",trigger:"change"}
        ]
      }
    };
  },
  created() {
    this.fetchlist();
  },
  
  methods: {
    fetchlist() {
      memberApi.search(this.currentpage,this.pagesize,this.serchMap).then(res => {
        console.log(res.data.data);
       const resP =res.data.data;
       this.total=resP.total;
       this.list=resP.rows
      });
    },
    handleEdit(id){
        //编辑
        console.log(id)
        this.handadd()//清空
        memberApi.getID(id).then(res=>{
          const resP =res.data
          if(resP.flag){
            this.pojo=resP.data
          }
        })
    },
    //删除按钮
    handleDelete(id){
        console.log(id)
          this.$confirm('确认删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          memberApi.delete(id).then(res=>{
            const resP = res.data
            this.$message({
            type: resP.flag?'success':"error",
            message: '删除成功!'
          });
            if(resP.flag){
              this.fetchlist()
            }
          })
        }).catch(() => {
                   
        });
    },
    handleSizeChange(val){
      this.pagesize =val;
      this.fetchlist()
    },
    handleCurrentChange(val){
      this.currentpage=val;
      this.fetchlist()
    },
    //重置
    resetForm(serchMap){
      console.log(serchMap,"binbinbin")
      this.$nextTick(()=>{
        this.$refs[serchMap].resetFields();
      })
      
    },
    //新增
    addData(prjoForm){
      this.$refs[prjoForm].validate(validate=>{
        if(validate){
          //可以提交
          console.log(11111)
          memberApi.add(this.pojo).then(res=>{
            const resP = res.data;
              if(resP.flag){
                this.fetchlist()
                this.dialogFormVisible=false;
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
    //更新
    updata(prjoForm){
        console.log("ffff")
        this.$refs[prjoForm].validate(va=>{
          if(va){
            //校验成功，可以提交
            memberApi.updata(this.pojo).then(res=>{
              const resP=res.data
              if(resP.flag){
                this.fetchlist()//刷新
                this.dialogFormVisible=false
              }else{
                this.$message({
                  message:resP.message,
                  type:"warning"
                })
              }
            })
          }
        })
    },
    //清空
    handadd(){
      // this.pojo={}方案1
      this.dialogFormVisible=true
      this.$nextTick(()=>{
        //  if (this.$refs['prjoForm']!==undefined) {
        this.$refs['prjoForm'].resetFields()
      //  }
        
      })
      // this.$nextTick(()=>{
      //    this.$refs['pojoForm'].resetFields()
      // })
     
    }
  },
  filters:{
      payTypeFilter(type){
        const payobj =  payoption.find(obj=>{
              return obj.type===type
          })
        return  payobj ? payobj.name : null
      }
  }
};
</script>