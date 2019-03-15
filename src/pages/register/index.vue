<template>
  <div class="login">
    <!--背景图-->
    <img src="../../assets/img/bg.jpg" class="bg">
    <!--内容-->
    <div class="login-content">
      <!--标题-->
      <div class="title">注册--酒店客房管理信息系统</div>
      <!--表单-->
      <div class="form-content">
        <el-form :model="registerForm" ref="registerForm" :rules="rules" label-width="120px">
          <!--登录账号-->
          <el-form-item prop="loginName" label="登录账号：" class="whiteLabel">
            <el-input v-model="registerForm.loginName" placeholder="请输入登录账号"></el-input>
          </el-form-item>
          <!--密码-->
          <el-form-item prop="password" label="密码：" class="whiteLabel">
            <el-input v-model="registerForm.password" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
          <!--重复密码-->
          <el-form-item prop="password2" label="重复密码：" class="whiteLabel">
            <el-input v-model="registerForm.password2" placeholder="请重复输入密码" type="password"></el-input>
          </el-form-item>
          <!--真实姓名-->
          <el-form-item prop="userName" label="真实姓名：" class="whiteLabel">
            <el-input v-model="registerForm.userName" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <!--手机号码-->
          <el-form-item prop="phone" label="手机号码：" class="whiteLabel">
            <el-input v-model="registerForm.phone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <!--性别-->
          <el-form-item prop="sex" label="性别：" class="whiteLabel">
            <el-select v-model="registerForm.sex" placeholder="请选择性别" style="width: 100%">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <!--身份证号码-->
          <el-form-item prop="idCard" label="身份证号：" class="whiteLabel">
            <el-input v-model="registerForm.idCard" placeholder="请输入身份证号"></el-input>
          </el-form-item>
          <!--民族-->
          <el-form-item prop="nation" label="民族：" class="whiteLabel">
            <el-input v-model="registerForm.nation" placeholder="请输入民族"></el-input>
          </el-form-item>
          <!--出生日期-->
          <el-form-item prop="birth" label="出生日期：" class="whiteLabel">
            <el-date-picker
              v-model="registerForm.birth"
              type="date"
              placeholder="选择出生日期"
              style="width: 100%"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <!--身份证住址-->
          <el-form-item prop="address" label="身份证住址：" class="whiteLabel">
            <el-input v-model="registerForm.address" placeholder="请输入身份证住址"></el-input>
          </el-form-item>
          <!--按钮-->
          <el-button type="primary" plain @click="handleSubmit" style="width: 100px;margin-top: 10px">注册</el-button>
          <el-button @click="handleLogin" style="width: 100px;margin-top: 10px">去登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  // 引入交互api
  import { User_api } from "../../api";
  // 引入js-cookie
  // import Cookies from 'js-cookie'

  export default {
    name: "index",
    data() {
      // 确认密码是否一样规则
      var validatePass2 = (rule, value, callback) => {
        if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        // 表单数据
        registerForm: {
          loginName: "",
          password: "",
          password2: null,
          userName: null,
          phone: null,
          sex: null,
          idCard: null,
          nation: null,
          birth: null,
          address: null
        },
        // 表单验证
        rules: {
          loginName: [
            { required: true, message: '请输入登录账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          password2: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' },
          ],
          idCard: [
            { required: true, message: '请输入身份证号', trigger: 'blur' },
            { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号' }
          ],
          nation: [
            { required: true, message: '请输入民族', trigger: 'blur' }
          ],
          birth: [
            { required: true, message: '请选择出生日期', trigger: 'change' }
          ],
          address: [
            { required: true, message: '请输入身份证住址', trigger: 'blur' }
          ],
        },
      }
    },
    methods: {
      // 注册
      handleSubmit() {
        // this.$refs["registerForm"].validate(valid) => {}) 是自动表单验证，element框架提供的
        // asnyc 与 下面的 await 是异步请求写法
        this.$refs["registerForm"].validate(async(valid) => {
          // 如果通过了表单验证
          if (valid) {
            // 发起异步请求
            // console.log(this.registerForm)
            const res = await User_api.addCustomer(this.registerForm)
            // 登录成功
            if(res.data.code === 0) {
              this.$notify({
                title: '注册成功！',
                message: '已前往登录',
                type: 'success'
              });
              this.$router.push({path: '/login'});
            }
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
      // 跳转去登录
      handleLogin() {
        this.$router.push({ path: '/login'})
      }
    },
  }
</script>

<style>
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .login-content {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 800px;
    height: 800px;
    transform: translate(-50%, -50%);
    background-color: rgba(24, 24, 24, .8);
    border-radius: 50px;
  }
  .title {
    margin-top: 30px;
    display: inline-block;
    width: 100%;
    color: #fff;
    font-size: 30px;
  }
  .form-content {
    margin-top: 30px;
    display: inline-block;
    width: 400px;
  }
  .whiteLabel .el-form-item__label{
    color: #fff !important;

  }
</style>
