<template>
  <div>
    <!--标题行-->
    <div class="my-title">客户信息管理</div>
    <!--员工信息管理表格-->
    <el-row class="aaa_table" v-loading="tableLoading" element-loading-text="拼命加载中">
      <template style="">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            width="80">
          </el-table-column>
          <el-table-column
            sortable
            prop="id"
            label="客户ID">
          </el-table-column>
          <el-table-column
            sortable
            prop="loginName"
            label="登录账号">
          </el-table-column>
          <el-table-column
            sortable
            prop="userName"
            label="真实姓名">
          </el-table-column>
          <el-table-column
            sortable
            prop="phone"
            label="手机号码">
          </el-table-column>
          <el-table-column
            sortable
            prop="sex"
            label="性别">
          </el-table-column>
          <el-table-column
            sortable
            prop="birth"
            label="出生日期">
          </el-table-column>
          <el-table-column
            sortable
            prop="nation"
            label="民族">
          </el-table-column>
          <el-table-column
            sortable
            prop="idCard"
            label="身份证号">
          </el-table-column>
          <el-table-column
            sortable
            prop="address"
            label="身份证住址">
          </el-table-column>
          <el-table-column
            sortable
            label="注册时间">
            <template slot-scope="scope">
              {{ baseJs.formatDate.format(new Date(scope.row.createTime), 'yyyy-MM-dd hh:mm:ss') }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="handleDelete(scope.row)" type="text" size="small" style="color: #F56C6C;">删除</el-button>
              <el-button @click="handleEdit(scope.row)" type="text" size="small" style="margin-left: 10px;">编辑</el-button>
              <el-button @click="handleDetail(scope.row)" type="text" size="small" style="margin-left: 10px;color: #67C23A;">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-row>

    <!--编辑弹出框-->
    <el-dialog title="编辑员工信息" :visible.sync="showDialog" width="65%">
      <el-form :model="form" ref="form" label-width="100px" :rules="formRules">
        <!--用户名-->
        <el-row>
          <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
            <el-form-item label="用户名：" prop="loginName">
              <el-input v-model="form.loginName" placeholder="请输入用户名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--真实姓名-->
        <el-row>
          <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
            <el-form-item label="真实姓名：" prop="realName">
              <el-input v-model="form.realName" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--密码-->
        <el-row>
          <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
            <el-form-item label="密码：" prop="password">
              <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--性别-->
        <el-row>
          <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
            <el-form-item prop="sex" label="性别：">
              <el-switch
                v-model="form.sex"
                active-color="#ff4949"
                inactive-color="#13ce66"
                active-text="女"
                inactive-text="男"
                active-value="女"
                inactive-value="男"
                style="float: left;margin-top: 10px;margin-left: 10px;">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <!--电话号码-->
        <el-row>
          <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
            <el-form-item label="电话号码：" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入电话号码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--身份证号-->
        <el-row>
          <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
            <el-form-item label="身份证号：" prop="idCard">
              <el-input v-model="form.idCard" placeholder="请输入身份证号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="warning" @click="formSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!--详情弹窗-->
    <el-dialog title="查看员工详情" :visible.sync="showDetail">
      <div class="dialogDetail">
        <div class="row">
          <span class="label">员工ID：</span>
          <span class="text">{{ detail.id }}</span>
        </div>
        <div class="row">
          <span class="label">登录账号：</span>
          <span class="text">{{ detail.loginName }}</span>
        </div>
        <div class="row">
          <span class="label">真实姓名：</span>
          <span class="text">{{ detail.userName }}</span>
        </div>
        <div class="row">
          <span class="label">手机号码：</span>
          <span class="text">{{ detail.phone }}</span>
        </div>
        <div class="row">
          <span class="label">邮箱地址：</span>
          <span class="text">{{ detail.email }}</span>
        </div>
        <div class="row">
          <span class="label">角色权限：</span>
          <span class="text">客户</span>
        </div>
        <div class="row">
          <span class="label">创建时间：</span>
          <span class="text">{{ baseJs.formatDate.format(new Date(detail.createTime), 'yyyy-MM-dd hh:mm:ss') }}</span>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="warning" @click="showDetail = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { User_api } from "../../../api";

  export default {
    name: "index",
    data() {
      return {
        // 表格数据
        tableData: [],
        // 表格的loading
        tableLoading: false,

        // 是否显示编辑弹窗
        showDialog: false,
        // 录入弹窗里的表单
        form: {
          loginName: "",
          realName: '',
          password: "",
          sex: '',
          idCard: '',
          phone: ''
        },
        // 表单验证
        formRules: {
          loginName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          realName: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码' }
          ],
          idCard: [
            { required: true, message: '请输入身份证号', trigger: 'blur' },
            { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号' }
          ]
        },


        // 是否显示详情弹窗
        showDetail: false,
        // 详情弹窗的数据
        detail: {
          "createTime": "2019-03-14T02:43:25.242Z",
          "email": "string",
          "hotelId": 0,
          "id": 0,
          "loginName": "string",
          "password": "string",
          "phone": "string",
          "role": "string",
          "upTime": "2019-03-14T02:43:25.242Z",
          "userName": "string"
        },
      }
    },
    // 一进来页面就调用
    mounted() {
      // 获取表格数据
      this.getTableData();
    },
    methods: {
      // 获取表格数据
      async getTableData() {
        // 打开loading动画
        this.tableLoading = true
        // 调用后台api，进行交互
        const res = await User_api.getCustomer()
        if (res.data.code === 0) {
          this.tableData = res.data.data
        } else {
          this.$message.warning(res.data.data)
        }
        // 关闭loading动画
        this.tableLoading = false;
      },
      // 点击某一行里的编辑按钮
      handleEdit(data) {
        // 打开弹窗
        this.showDialog = true
        // 把这一行的数据给到表单
        this.form = data
      },
      // 点击弹窗里的确认按钮
      formSubmit() {
        this.$refs["form"].validate(async(valid) => {
          if (valid) {
            const res = await User_api.updateUser(this.form)
            if(res.data.code === 0) {
              this.$message.success("修改成功！")
              this.getTableData()
              // 关闭弹窗
              this.showDialog = false
            } else {
              this.$message.warning(res.data.data)
            }
          }
        });
      },
      // 点击某一行里的删除按钮
      handleDelete(data) {
        this.$confirm('此操作将删除该员工, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const params = {
            id: data.id
          }
          const res = await User_api.deleteStaff(params)
          if (res.data.code === 0) {
            this.$message.success('删除成功')
            this.getTableData();
          } else {
            this.$message.warning(res.data.data)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 点击某一行里的查看详情
      handleDetail(data) {
        console.log(data)
        this.detail = data;
        // 打开弹窗
        this.showDetail = true;
      }
    }
  }
</script>

<style scoped>

</style>
