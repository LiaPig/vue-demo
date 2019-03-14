<template>
  <div>
    <!--标题行-->
    <div class="my-title">新增房间类型</div>
    <!--表单内容-->
    <div class="form-container">
      <div class="add-form">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" style="width: 400px;">
          <el-form-item label="房间号：" prop="room">
            <el-input v-model="ruleForm.room" style="width: 100%"></el-input>
          </el-form-item>
          <el-form-item label="房间类型：" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择房间类型" style="width: 100%">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否有效：" prop="status">
            <el-select v-model="ruleForm.status" placeholder="请选择是否有效" style="width: 100%">
              <el-option label="有" value="1"></el-option>
              <el-option label="无" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="当前状态：" prop="nowStatus">
            <el-select v-model="ruleForm.nowStatus" placeholder="请选择当前状态" style="width: 100%">
              <el-option label="空闲" value="空闲"></el-option>
              <el-option label="预定" value="预定"></el-option>
              <el-option label="入住" value="入住"></el-option>
            </el-select>
          </el-form-item>
          <!--按钮-->
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
        // 房间类型选项
        options: [],
        // 表单数据
        ruleForm: {
          hotel_id: 1,
          room: null,
          type: null,
          status: null,
          nowStatus: null
        },
        // 表单验证数据
        rules: {
          room: [
            { required: true, message: '请填写房间号', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择房间类型', trigger: 'change' },
          ],
          status: [
            { required: true, message: '请选择是否有效', trigger: 'change' },
          ],
          nowStatus: [
            { required: true, message: '请选择当前状态', trigger: 'change' },
          ]
        }
      };
    },
    // 一进来页面就调用
    mounted() {
      // 获取房间类型选项
      this.getDeviceOptions();
    },
    methods: {
      // 获取房间类型选项
      async getDeviceOptions() {
        // 调用后台api，进行交互
        const res = await Hotel_api.getDevice()
        if (res.data.code === 0) {
          this.options = res.data.data
        } else {
          this.$message.warning(res.data.data)
        }
      },
      // 点击了提交按钮
      submitForm() {
        // 饿了么框架自带的表单验证判断，官方写法
        this.$refs['ruleForm'].validate(async(valid) => {
          // 通过了表单验证
          if (valid) {
            // console.log(this.ruleForm)
            // 调取后台接口
            const res = await Hotel_api.addRoom(this.ruleForm)
            if (res.data.code === 0) {
              // 饿了么提示UI
              this.$message.success('新增客房信息成功！')
              // 路由跳转到宠物管理页面
              // this.$router.push({ path: '/admin/room' })
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
