<template>
    <div>
      <!--标题行-->
      <div class="my-title">新增员工信息</div>
      <!--表单内容-->
      <div class="form-container">
        <div class="add-form">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 400px;">
            <el-form-item label="登录账号：" prop="loginName">
              <el-input v-model="ruleForm.loginName" style="width: 100%"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名：" prop="userName">
              <el-input v-model="ruleForm.userName" style="width: 100%"></el-input>
            </el-form-item>
            <el-form-item label="登录密码：" prop="password">
              <el-input v-model="ruleForm.password" style="width: 100%"></el-input>
            </el-form-item>
            <el-form-item label="手机号码：" prop="phone">
              <el-input v-model="ruleForm.phone" style="width: 100%"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱：" prop="email">
              <el-input v-model="ruleForm.email" style="width: 100%"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm()">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script>
  // 引入用户相关的api
  import { User_api } from "../../../../api";

  export default {
    name: "index",
    data() {
      return {
        // 表单数据
        ruleForm: {
          hotelId: 1,
          role: 'staff',
          loginName: null,
          userName: null,
          password: null,
          phone: null,
          email: null
        },
        // 表单验证数据
        rules: {
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
        }
      };
    },
    methods: {
      // 点击了提交按钮
      submitForm() {
        // 饿了么框架自带的表单验证判断，官方写法
        this.$refs['ruleForm'].validate(async(valid) => {
          // 通过了表单验证
          if (valid) {
            console.log(this.ruleForm)
            // 调取后台接口
            const res = await User_api.addStaff(this.ruleForm)
            if (res.data.code === 0) {
              // 饿了么提示UI
              this.$message.success('新增员工成功！')
              // 路由跳转到宠物管理页面
              this.$router.push({ path: '/admin/staff' })
            }
            // 错误，显示错误
            else {
              this.$message({
                message: res.data.message,
                type: 'warning'
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 点击了重置按钮
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>
