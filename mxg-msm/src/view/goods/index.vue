<template>
  <div>
    <!-- 表单 -->
    <el-form ref="aaa" :inline="true" :model="serchMap" style="margin-top:20px">
      <el-form-item prop="name">
        <el-input v-model="serchMap.name" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="serchMap.code" placeholder="商品编号"></el-input>
      </el-form-item>
      <el-form-item prop="supplicerName" @click.native="dialogFormVisible=true">
        <el-input readonly v-model="serchMap.supplicerName" placeholder="选择供应商"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="fetchdata">查询</el-button>
        <el-button type="primary" @click="handadd">新增</el-button>
        <el-button @click="$refs['aaa'].resetFields()">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="list" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="name" label="商品名称" width="120"></el-table-column>
      <el-table-column prop="code" label="商品编码" width="150"></el-table-column>
      <el-table-column prop="spec" label="商品规格"></el-table-column>
      <el-table-column prop="retailPrice" label="零售价"></el-table-column>
      <el-table-column prop="purchasePrice" label="进货价"></el-table-column>
      <el-table-column prop="storageNum" label="库存数量"></el-table-column>
      <el-table-column prop="supplierName" label="供应商"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope" width="180">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
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
      :total="total"
    ></el-pagination>
    <!-- 选择供应商弹框 -->
    <el-dialog title="供应商编辑" :visible.sync="dialogFormVisible" width="500px">
      <Supplier @optionSupp="optionSupplier" :isDialog="true"></Supplier>
    </el-dialog>
    <el-dialog title="编辑商品" :visible.sync="DialogFormVisible" width="500px">
      <el-form
        ref="prjoForm"
        :rules="rules"
        label-width="100px"
        label-position="right"
        style="width:400px"
        :model="pojo"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="pojo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品编码" prop="code">
          <el-input v-model="pojo.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品规格 " prop="spec">
          <el-input v-model="pojo.spec" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="零售价 " prop="retailPrice">
          <el-input v-model="pojo.retailPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="进货价" prop="purchasePrice">
          <el-input v-model="pojo.purchasePrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存数量 " prop="storageNum">
          <el-input v-model="pojo.storageNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="供应商 " prop="supplierName">
          <el-input
            readonly
            @click.native="eiad"
            v-model="pojo.supplierName"
            autocomplete="off"
            placeholder="选择供应商"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button @click="pojo.id===null ? addData('prjoForm') : updateData('prjoForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import goodsApi from "../../api/goods";
import Supplier from "@/view/supplier";
export default {
  components: { Supplier },
  data() {
    return {
      list: [],
      pageSize: 10,
      currentPage: 1,
      serchMap: {
        name: "",
        code: "",
        supplicerName: "",
        id: ""
      },
      total: 0,
      dialogFormVisible: false,
      DialogFormVisible: false, //编辑的弹框
      pojo: {
        name: "",
        code: "",
        spec: "",
        retailPrice: "",
        purchasePrice: "",
        storageNum: "",
        supplierName: "",
        id: null
      },
      rules: {
        name: [{ required: true, message: "商品名称不能为空", trigger: "blur" }]
      },
      isEiad: false //中间变量
    };
  },
  created() {
    this.fetchdata();
  },
  methods: {
    async fetchdata() {
      const res = await goodsApi.search(
        this.currentPage,
        this.pageSize,
        this.serchMap
      );
      this.list = res.data.data.rows;
      console.log(res.data.data);
      this.total = res.data.data.total;
    },
    handleEdit(id) {
      //编打开辑
      this.handadd();
      goodsApi.getById(id).then(res => {
        const resP = res.data;
        if (resP.flag) {
          // console.log(resP.data)
          this.pojo = resP.data;
        }
      });
    },
    //更新窗口 提交更新的内送
    updateData(formName) {
      this.$refs[formName].validate(vali => {
        if (vali) {
          goodsApi.updated(this.pojo).then(res => {
            const resP = res.data;
            if (resP.flag) {
              this.fetchdata();
              this.DialogFormVisible = false;
            } else {
              this.$message({
                message: resP.message,
                type: "warning"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    handleDelete(id) {
      this.$confirm("确认删除这条记录吗？", "提示", {
        confirmButtonText: "确认",
        cancleButtonText: "取消"
      })
        .then(() => {
          goodsApi.delete(id).then(res => {
            const resP = res.data;
            if (resP.flag) {
              this.fetchdata();
              this.$message({
                message: resP.message,
                type: resP.flag ? "success" : "warning"
              });
            } else {
              return false;
            }
          });
        })
        .catch(() => {
          this.$message({
            message: "已经取消",
            type: "success"
          });
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchdata();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchdata();
    },
    optionSupplier(currentRow) {
      if (this.isEiad) {
        this.pojo.supplierName = currentRow.name;
        this.pojo.id = currentRow.id;
      } else {
        console.log(currentRow);
        this.serchMap.supplicerName = currentRow.name;
        this.serchMap.id = currentRow.id;
      }
      this.isEiad = false;
      this.dialogFormVisible = false;
    },
    //新增
    handadd() {
      this.DialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["prjoForm"].resetFields();
      });
    },
    // 提交新增
    addData(prjoForm) {
      this.$refs[prjoForm].validate(vali => {
        if (vali) {
          //允许提交
          goodsApi.add(this.pojo).then(res => {
            if (res.data.flag) {
              this.fetchdata();
              this.DialogFormVisible = false;
            } else {
              this.$message({
                message: resP.message,
                type: "warning"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    eiad() {
      this.isEiad = true;
      this.dialogFormVisible = true;
    }
  }
};
</script>