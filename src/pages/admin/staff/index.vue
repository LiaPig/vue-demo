<template>
    <div>
      <!--标题行-->
      <div class="my-title">员工信息管理</div>
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
              label="员工ID">
            </el-table-column>
            <el-table-column
              sortable
              prop="loginName"
              label="用户名">
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
              prop="email"
              label="邮箱地址">
            </el-table-column>
            <el-table-column
              sortable
              label="创建时间">
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
          <!--登录账号-->
          <el-row>
            <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
              <el-form-item label="登录账号：" prop="loginName">
                <el-input v-model="form.loginName" disabled style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--真实姓名-->
          <el-row>
            <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
              <el-form-item label="真实姓名：" prop="userName">
                <el-input v-model="form.userName" style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--登录密码-->
          <el-row>
            <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
              <el-form-item label="登录密码：" prop="password">
                <el-input v-model="form.password" style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--手机号码-->
          <el-row>
            <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
              <el-form-item label="手机号码：" prop="phone">
                <el-input v-model="form.phone" style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--电子邮箱-->
          <el-row>
            <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
              <el-form-item label="电子邮箱：" prop="email">
                <el-input v-model="form.email" style="width: 100%"></el-input>
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
            <span class="text">员工</span>
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
          form: {},
          // 表单验证
          formRules: {
            loginName: [
              { required: true, message: '请填写登录账号', trigger: 'blur' }
            ],
            userName: [
              { required: true, message: '请填写真实姓名', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '请填写登录密码', trigger: 'blur' }
            ],
            phone: [
              { required: true, message: '请输入手机号码', trigger: 'blur' },
              { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码' }
            ],
            email: [
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, message: '请输入正确的邮箱地址' }
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
          const res = await User_api.getStaff()
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
          // console.log(data)
          // 打开弹窗
          this.showDialog = true
          // 把这一行的数据给到表单
          this.form = {
            email: data.email,
            hotelId: data.hotelId,
            id: data.id,
            role: data.role,
            loginName: data.loginName,
            password: data.password,
            phone: data.phone,
            userName: data.userName
          }
        },
        // 点击弹窗里的确认按钮
        formSubmit() {
          this.$refs["form"].validate(async(valid) => {
            if (valid) {
              const res = await User_api.updateStaff(this.form)
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
          // console.log(data)
          this.detail = data;
          // 打开弹窗
          this.showDetail = true;
        }
      }
    }
</script>

<style scoped>

</style>
