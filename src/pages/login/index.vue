<template>
    <div class="login">
      <!--背景图-->
      <img src="../../assets/img/bg.jpg" class="bg">
      <!--内容-->
      <div class="login-content">
        <!--标题-->
        <div class="title">登录酒店客房管理信息系统</div>
        <!--表单-->
        <div class="form-content">
          <el-form :model="loginForm" ref="loginForm" :rules="rules" label-width="80px">
            <!--用户名-->
            <el-form-item prop="loginName" label="用户名：" class="whiteLabel">
              <el-input v-model="loginForm.loginName" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <!--密码-->
            <el-form-item prop="password" label="密码：" class="whiteLabel">
              <el-input v-model="loginForm.password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
            <!--权限角色-->
            <el-form-item prop="role" label="角色：" class="whiteLabel">
              <el-select v-model="loginForm.role" placeholder="请选择权限角色" style="width: 100%">
                <el-option label="管理员" value="admin"></el-option>
                <el-option label="员工" value="staff"></el-option>
                <el-option label="客户" value="user"></el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" plain @click="handleSubmit" style="width: 100px;margin-top: 30px">登录</el-button>
            <el-button @click="handleRegister" style="width: 100px;margin-top: 30px">去注册</el-button>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script>
  // 引入交互api
  import { User_api } from "../../api";
  // 引入js-cookie
  import Cookies from 'js-cookie'

  export default {
    name: "index",
    data() {
      return {
        // 表单数据
        loginForm: {
          loginName: "",
          password: "",
          role: null
        },
        // 表单验证
        rules: {
          loginName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          role: [
            { required: true, message: '请选择权限角色', trigger: 'change' }
          ]
        },
      }
    },
    methods: {
      // 登录
      handleSubmit() {
        // this.$refs["loginForm"].validate(valid) => {}) 是自动表单验证，element框架提供的
        // asnyc 与 下面的 await 是异步请求写法
        this.$refs["loginForm"].validate(async(valid) => {
          // 如果通过了表单验证
          if (valid) {
            // 发起异步请求
            // console.log(this.loginForm)
            const res = await User_api.login(this.loginForm)
            // 登录成功
            if(res.data.code === 0) {
              this.$notify({
                title: '恭喜你',
                message: '登录成功!',
                type: 'success'
              });
              // 将token、用户名 存到全局去
              const data = {
                token: res.data.data[0],
                userName: res.data.data[1].userName,
                role: this.loginForm.role
              }
              this.$store.commit('SET_USERINFO', data);
              Cookies.set('userInfo', data)
              this.$router.push({path: '/home'});
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
      // 跳转去注册
      handleRegister() {
        this.$router.push({ path: '/register'})
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
    height: 500px;
    transform: translate(-50%, -50%);
    background-color: rgba(24, 24, 24, .8);
    border-radius: 50px;
  }
  .title {
    margin-top: 50px;
    display: inline-block;
    width: 100%;
    color: #fff;
    font-size: 30px;
  }
  .form-content {
    margin-top: 80px;
    display: inline-block;
    width: 400px;
  }
  .whiteLabel .el-form-item__label{
    color: #fff !important;

  }
</style>
