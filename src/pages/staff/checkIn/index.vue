<template>
  <div>
    <!--标题行-->
    <div class="my-title">已预约入住客房</div>
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
              <el-button @click="handleCheckIn(scope.row)" type="text" size="small" style="margin-left: 10px;">入住</el-button>
              <el-button @click="handleDetail(scope.row)" type="text" size="small" style="margin-left: 10px;color: #67C23A;">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-row>

    <!--入住弹出框-->
    <el-dialog title="填写入住客户信息" :visible.sync="showDialog">
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
                placeholder="选择出生日期"
                style="width: 100%"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
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
  import { Housing_api } from "../../../api/index";

  export default {
    name: "index",
    data() {
      return {
        // 表格数据
        tableData: [],
        // 表格的loading
        tableLoading: false,

        // 房间类型选项
        options: [],

        // 是否显示编辑弹窗
        showDialog: false,
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
          this.tableData = res.data.data
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
        this.showDialog = true
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
              this.showDialog = false
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
    }
  }
</script>

<style scoped>

</style>
