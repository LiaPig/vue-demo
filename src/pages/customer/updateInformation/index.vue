<template>
  <div>
    <!--标题行-->
    <div class="my-title">更新个人信息</div>
    <!--表单内容-->
    <div class="form-container">
      <div class="add-form">
        <el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-form" style="width: 400px;">
          <!--登录账号-->
          <el-form-item prop="loginName" label="登录账号：">
            <el-input v-model="form.loginName" disabled placeholder="请输入登录账号"></el-input>
          </el-form-item>
          <!--登录密码-->
          <el-form-item prop="loginName" label="登录密码：" style="text-align: left;cursor: pointer;color: #409EFF;">
            <span @click="editPass">修改密码</span>
          </el-form-item>
          <!--真实姓名-->
          <el-form-item prop="userName" label="真实姓名：">
            <el-input v-model="form.userName" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <!--手机号码-->
          <el-form-item prop="phone" label="手机号码：">
            <el-input v-model="form.phone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <!--性别-->
          <el-form-item prop="sex" label="性别：">
            <el-select v-model="form.sex" placeholder="请选择性别" style="width: 100%">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <!--身份证号-->
          <el-form-item prop="idCard" label="身份证号：">
            <el-input v-model="form.idCard" placeholder="请输入身份证号"></el-input>
          </el-form-item>
          <!--民族-->
          <el-form-item prop="nation" label="民族：">
            <el-input v-model="form.nation" placeholder="请输入民族"></el-input>
          </el-form-item>
          <!--出生日期-->
          <el-form-item prop="birth" label="出生日期：">
            <el-date-picker
              v-model="form.birth"
              type="date"
              placeholder="选择出生日期"
              style="width: 100%"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <!--身份证住址-->
          <el-form-item prop="address" label="身份证住址：">
            <el-input v-model="form.address" placeholder="请输入身份证住址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">立即更新</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!--修改密码弹窗-->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitPass('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  // 引入用户相关的api
  import { User_api } from "../../../api";

  export default {
    name: "index",
    data() {
      // 修改密码弹窗中的密码的表单验证
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      // 修改密码弹窗中的确认密码的表单验证
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        // 表单数据
        form: {
          loginName: "",
          realName: '',
          password: "",
          sex: '',
          idCard: '',
          phone: ''
        },
        // 表单验证数据
        rules: {
          loginName: [
            { required: true, message: '请输入登录账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
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

        // 是否显示修改密码弹窗
        dialogFormVisible: false,
        // 修改密码弹窗数据
        ruleForm2: {
          pass: '',
          checkPass: ''
        },
        // 修改密码弹窗的表单验证
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    // 一进来页面就调用
    mounted() {
      // 获取表格数据
      this.getFormData();
    },
    methods: {
      // 获取个人信息数据
      async getFormData() {
        // 调用获取个人信息接口
        // const res = await User_api.updateCustomer(this.form)
        // if (res.data.code === 0) {
        //   this.form = res.data.data
        // }
        // // 错误，显示错误
        // else {
        //   this.$message({
        //     message: res.data.message,
        //     type: 'warning'
        //   });
        // }
      },
      // 点击了提交按钮
      submitForm() {
        // 饿了么框架自带的表单验证判断，官方写法
        this.$refs['form'].validate(async(valid) => {
          // 通过了表单验证
          if (valid) {
            // console.log(this.form)
            // 调取后台接口
            const res = await User_api.updateCustomer(this.form)
            if (res.data.code === 0) {
              // 饿了么提示UI
              this.$message.success('更新个人信息成功！')
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
      // 点击了修改密码按钮
      editPass() {
        this.dialogFormVisible = true
      },
      //
      submitPass(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>
