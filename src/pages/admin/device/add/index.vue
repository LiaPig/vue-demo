<template>
  <div>
    <!--标题行-->
    <div class="my-title">新增房间类型</div>
    <!--表单内容-->
    <div class="form-container">
      <div class="add-form">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" style="width: 400px;">
          <el-form-item label="房间类型名字：" prop="name">
            <el-input v-model="ruleForm.name" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="床型：" prop="bedType">
            <el-input v-model="ruleForm.bedType" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="房间头图：" prop="bathroom">
            <el-input v-model="ruleForm.bathroom" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="容纳人数：" prop="contain">
            <el-input v-model="ruleForm.contain" type="number" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="有无窗户：" prop="casement">
            <el-select v-model="ruleForm.casement" placeholder="请选择有无窗户" style="width: 100%">
              <el-option label="有" value="1"></el-option>
              <el-option label="无" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="有无wifi：" prop="wifi">
            <el-select v-model="ruleForm.wifi" placeholder="请选择有无wifi" style="width: 100%">
              <el-option label="有" value="1"></el-option>
              <el-option label="无" value="0"></el-option>
            </el-select>
          </el-form-item>
          <!--有wifi才显示-->
          <template v-if="ruleForm.wifi === '1'">
            <el-form-item label="wifi名：" prop="wifiName">
              <el-input v-model="ruleForm.wifiName" style="width: 100%"></el-input>
            </el-form-item>
            <el-form-item label="wifi密码：" prop="wifiPassword">
              <el-input v-model="ruleForm.wifiPassword" style="width: 100%"></el-input>
            </el-form-item>
          </template>
          <el-form-item label="房间面积：" prop="size">
            <el-input v-model="ruleForm.size" type="number" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="房间价格：" prop="price">
            <el-input v-model="ruleForm.price" type="number" style="width: 100%"></el-input>
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
  import { Hotel_api } from "../../../../api";

  export default {
    name: "index",
    data() {
      return {
        // 表单数据
        ruleForm: {
          name: null,
          bedType: null,
          bathroom: null,
          contain: null,
          casement: null,
          wifi: null,
          wifiName: null,
          wifiPassword: null,
          size: null,
          price: null
        },
        // 表单验证数据
        rules: {
          name: [
            { required: true, message: '请填写房间类型名字', trigger: 'blur' }
          ],
          bedType: [
            { required: true, message: '请填写床型', trigger: 'blur' }
          ],
          bathroom: [
            { required: true, message: '请填写卫浴类型', trigger: 'blur' }
          ],
          contain: [
            { required: true, message: '请输入容纳人数', trigger: 'blur' },
          ],
          casement: [
            { required: true, message: '请选择有无窗户', trigger: 'change' },
          ],
          wifi: [
            { required: true, message: '请选择有无wifi', trigger: 'change' },
          ],
          size: [
            { required: true, message: '请输入房间面积', trigger: 'blur' },
          ],
          price: [
            { required: true, message: '请输入房间价格', trigger: 'blur' },
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
            if (!this.ruleForm.wifi) {
              this.ruleForm.wifiName = ''
              this.ruleForm.wifiPassword = ''
            }
            // console.log(this.ruleForm)
            // 调取后台接口
            const res = await Hotel_api.addDevice(this.ruleForm)
            if (res.data.code === 0) {
              // 饿了么提示UI
              this.$message.success('新增房间类型成功！')
              // 路由跳转到宠物管理页面
              this.$router.push({ path: '/admin/device' })
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
