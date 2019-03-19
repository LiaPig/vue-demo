<template>
  <div>
    <!--标题行-->
    <div class="my-title">入住房间管理</div>
    <!--身份证查询、刷新表格按钮、添加客户按钮-->
    <div style="margin-top: 20px;text-align: left">
      身份证号：<el-input placeholder="请输入身份证号" v-model="idCard" clearable style="width: 200px"></el-input>
      <el-button @click="searchCustomer">搜索客户</el-button>
      <el-button @click="handleAdd" type="primary" style="float: right">添加客户</el-button>
    </div>
    <!--客房信息管理表格-->
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
            label="客房ID">
          </el-table-column>
          <el-table-column
            sortable
            prop="name"
            label="房间号">
          </el-table-column>
          <el-table-column
            sortable
            prop="typeName"
            label="房间类型">
          </el-table-column>
          <el-table-column
            sortable
            prop="nowStatus"
            label="当前状态">
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
              <el-button v-if="scope.row.nowStatus === '入住'" disabled type="text" size="small" style="margin-left: 10px;">入住</el-button>
              <el-button v-else @click="handleCheckIn(scope.row)" type="text" size="small" style="margin-left: 10px;">入住</el-button>
              <el-button @click="handleDetail(scope.row)" type="text" size="small" style="margin-left: 10px;color: #67C23A;">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-row>

    <!--新增客户弹窗-->
    <el-dialog title="新增客户信息" :visible.sync="showAdd" width="65%">
      <el-form :model="form" ref="form" label-width="120px" :rules="formRules">
        <!--登录账号-->
        <el-row>
          <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
            <el-form-item prop="loginName" label="登录账号：">
              <el-input v-model="form.loginName" placeholder="请输入登录账号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--密码-->
        <el-row>
          <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
            <el-form-item prop="password" label="密码：">
              <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--真实姓名-->
        <el-row>
          <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
            <el-form-item prop="userName" label="真实姓名：">
              <el-input v-model="form.userName" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--手机号码-->
        <el-row>
          <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
            <el-form-item prop="phone" label="手机号码：">
              <el-input v-model="form.phone" placeholder="请输入手机号码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--性别-->
        <el-row>
          <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
            <el-form-item prop="sex" label="性别：">
              <el-select v-model="form.sex" placeholder="请选择性别" style="width: 100%">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--身份证号-->
        <el-row>
          <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
            <el-form-item prop="idCard" label="身份证号：">
              <el-input v-model="form.idCard" placeholder="请输入身份证号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--民族-->
        <el-row>
          <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
            <el-form-item prop="nation" label="民族：">
              <el-input v-model="form.nation" placeholder="请输入民族"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--出生日期-->
        <el-row>
          <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
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
          </el-col>
        </el-row>
        <!--身份证住址-->
        <el-row>
          <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
            <el-form-item prop="address" label="身份证住址：">
              <el-input v-model="form.address" placeholder="请输入身份证住址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAdd = false">取 消</el-button>
        <el-button type="warning" @click="submitAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!--入住弹出框-->
    <el-dialog title="填写入住客户信息" :visible.sync="showCheckIn">
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-row v-for="(idCard, index) in dynamicValidateForm.idCards" :key="idCard.key">
          <el-col :span="14" :offset="5" style="height: 40px;margin-bottom: 20px;">
            <el-form-item
              :label="'身份证' + (index + 1) + '：'"
              :prop="'idCards.' + index + '.value'"
              :rules="{ required: true, message: '请输入身份证号', trigger: 'blur' }">
              <el-input v-model="idCard.value" style="width: calc(100% - 80px)"></el-input>
              <el-button @click.prevent="removeDomain(idCard)" style="margin-left: 5px;width: 70px">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14" :offset="5" style="height: 40px;margin-bottom: 20px;">
            <el-form-item label="退房日期：" prop="endTime" :rules="{ required: true, message: '退房日期不能为空', trigger: 'change'}">
              <el-date-picker
                v-model="dynamicValidateForm.endTime"
                type="date"
                placeholder="选择退房日期"
                style="width: 100%"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showCheckIn = false">取 消</el-button>
        <el-button type="primary" @click="addIdCard">新增入住客户</el-button>
        <el-button type="warning" @click="formSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!--详情弹窗-->
    <el-dialog title="查看客房信息详情" :visible.sync="showDetail">
      <div class="dialogDetail">
        <div class="row">
          <span class="label">客房ID：</span>
          <span class="text">{{ detail.id }}</span>
        </div>
        <div class="row">
          <span class="label">房间号：</span>
          <span class="text">{{ detail.name }}</span>
        </div>
        <div class="row">
          <span class="label">房间类型ID：</span>
          <span class="text">{{ detail.typeId }}</span>
        </div>
        <div class="row">
          <span class="label">房间类型：</span>
          <span class="text">{{ detail.typeName }}</span>
        </div>
        <div class="row">
          <span class="label">当前状态：</span>
          <span class="text">{{ detail.nowStatus }}</span>
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
  import { Housing_api, User_api } from "../../../api/index";

  export default {
    name: "index",
    data() {
      return {
        // 表格数据
        tableData: [],
        // 表格的loading
        tableLoading: false,

        // 是否显示新增客户弹窗
        showAdd: false,
        // 新增客户弹窗里的表单
        form: {
          loginName: "",
          realName: '',
          password: "",
          sex: '',
          idCard: '',
          phone: ''
        },
        // 新增客户表单验证
        formRules: {
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

        // 是否显示编辑弹窗
        showCheckIn: false,
        // 录入弹窗里的表单
        // 动态身份证表单
        dynamicValidateForm: {
          roomId: null,
          idCards: [{
            value: ''
          }],
          endTime: null
        },

        // 是否显示详情弹窗
        showDetail: false,
        // 详情弹窗的数据
        detail: {},

        // 搜索框中的身份证号
        idCard: ''
      }
    },
    // 一进来页面就调用
    mounted() {
      this.getTableData()
    },
    methods: {
      // 获取表格数据
      async getTableData() {
        // 打开loading动画
        this.tableLoading = true
        // 调用后台api，进行交互
        const res = await Housing_api.canCheckIn()
        // console.log(res)
        if (res.data.code === 0) {
          this.tableData = []
          // 后台返回的数据有三种状态，入住、空闲、预约，不显示入住的
          for (let item of res.data.data) {
            if (item.nowStatus !== '入住') {
              this.tableData.push(item)
            }
          }
        } else {
          this.$message.warning(res.data.data)
        }
        // 关闭loading动画
        this.tableLoading = false;
      },

      // 点击某一行里的入住按钮
      handleCheckIn(data) {
        // console.log(data)
        // 打开弹窗
        this.showCheckIn = true
        // 把这一行的数据给到表单
        this.dynamicValidateForm = {
          roomId: data.id,
          idCard: null,
          idCards: [{
            value: ''
          }],
          endTime: null
        }
      },
      // 点击弹窗里的确认按钮
      formSubmit() {
        this.$refs["dynamicValidateForm"].validate(async(valid) => {
          if (valid) {
            this.dynamicValidateForm.idCard = []
            for(let item of this.dynamicValidateForm.idCards) {
              this.dynamicValidateForm.idCard.push(item.value)
            }
            delete this.dynamicValidateForm.idCards
            // console.log(this.dynamicValidateForm)
            const res = await Housing_api.checkIn(this.dynamicValidateForm)
            if(res.data.code === 0) {
              this.$message.success("办理入住成功！")
              this.getTableData()
              // 关闭弹窗
              this.showCheckIn = false
            } else {
              this.$message.warning(res.data.data)
            }
          }
        });
      },
      // 点击弹窗里的身份证表单项的删除按钮
      removeDomain(item) {
        const index = this.dynamicValidateForm.idCards.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.idCards.splice(index, 1)
        }
      },
      // 点击弹窗里的新增入住客户按钮
      addIdCard() {
        this.dynamicValidateForm.idCards.push({
          value: '',
          key: Date.now()
        });
      },

      // 点击某一行里的查看详情
      handleDetail(data) {
        // console.log(data)
        this.detail = data;
        // 打开弹窗
        this.showDetail = true;
      },

      // 点击了搜索客户按钮
      async searchCustomer() {
        const params = {
          idCard: this.idCard
        }
        const res = await User_api.getCustomerByIdCard(params)
        if (res.data.code === 0) {
          this.$message.success('有这个客户信息！')
        } else {
          this.$message.warning(res.data.data)
        }
      },
      // 点击了添加客户按钮
      handleAdd() {
        // 把这一行的数据给到表单
        this.form = {
          address: null,
          birth: null,
          idCard: null,
          loginName: null,
          nation: null,
          password: null,
          phone: null,
          sex: null,
          userName: null,
        }
        // 打开弹窗
        this.showAdd = true
      },
      // 点击了添加客户弹窗里的确定
      submitAdd() {
        this.$refs["form"].validate(async(valid) => {
          if (valid) {
            const res = await User_api.addCustomer(this.form)
            if(res.data.code === 0) {
              this.$message.success("新增客户成功！")
              this.getTableData()
              // 关闭弹窗
              this.showAdd = false
            } else {
              this.$message.warning(res.data.data)
            }
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
