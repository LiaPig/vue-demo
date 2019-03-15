<template>
  <div>
    <!--标题行-->
    <div class="my-title">退还房间管理</div>
    <!--表单内容-->
    <div class="form-container">
      <div class="add-form">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 400px;">
          <el-form-item label="房间号码：" prop="room">
            <el-input v-model="ruleForm.room" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">立即退房</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  // 引入用户相关的api
  import { Housing_api } from "../../../api";

  export default {
    name: "index",
    data() {
      return {
        // 表单数据
        ruleForm: {
          room: null
        },
        // 表单验证数据
        rules: {
          room: [
            { required: true, message: '请填写房间号码', trigger: 'blur' }
          ],
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
            // console.log(this.ruleForm)
            // 调取后台接口
            const res = await Housing_api.checkOut(this.ruleForm)
            if (res.data.code === 0) {
              // 饿了么提示UI
              this.$message.success('退还房间成功！')
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
