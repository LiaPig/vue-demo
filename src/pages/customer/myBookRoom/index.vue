<template>
  <div>
    <!--标题行-->
    <div class="my-title">我的预约列表</div>
    <!--入住日期区间查询、搜索客房按钮-->
    <div style="margin-top: 20px;text-align: left">
      入住日期区间： <el-date-picker
      v-model="searchDate"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
      <el-button @click="searchCustomer">搜索客房</el-button>
    </div>
    <!--我的预约列表表格-->
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
            prop="bedType"
            label="房间类型">
          </el-table-column>
          <el-table-column
            sortable
            label="预定入住时间">
            <template slot-scope="scope">
              {{ baseJs.formatDate.format(new Date(scope.row.planInTime), 'yyyy-MM-dd') }}
            </template>
          </el-table-column>
          <el-table-column
            sortable
            label="预定退房时间">
            <template slot-scope="scope">
              {{ baseJs.formatDate.format(new Date(scope.row.planOutTime), 'yyyy-MM-dd') }}
            </template>
          </el-table-column>
          <el-table-column
            sortable
            label="预约操作时间">
            <template slot-scope="scope">
              {{ baseJs.formatDate.format(new Date(scope.row.bookTime), 'yyyy-MM-dd hh:mm:ss') }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="handleCancel(scope.row)" type="text" size="small" style="color: #F56C6C;">取消预定</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-row>
  </div>
</template>

<script>
  import { Housing_api, Hotel_api } from "../../../api";

  export default {
    name: "index",
    data() {
      return {
        // 搜索框中的日期区间
        searchDate: [],
        //
        searchBedType: '',
        // 表格数据
        tableData: [],
        // 表格的loading
        tableLoading: false,

        // 房间类型选项
        options: [],

        // 是否显示编辑弹窗
        showDialog: false,
        // 录入弹窗里的表单
        form: {
          loginName: "",
          realName: '',
          password: "",
          sex: '',
          idCard: '',
          phone: ''
        },
        // 表单验证
        formRules: {
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
      // 获取房间类型选项
      this.getDeviceOptions()
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

      // 点击了搜索客户按钮
      searchCustomer() {
        this.getTableData()
      },

      // 获取表格数据
      async getTableData() {
        // 打开loading动画
        this.tableLoading = true
        const params = {
          idCard: this.$store.getters.idCard,
          bedType: this.searchBedType,
          planInTime: this.searchDate[0],
          planOutTime: this.searchDate[1]
        }
        // 调用后台api，进行交互
        const res = await Housing_api.getBookList(params)
        if (res.data.code === 0) {
          this.tableData = res.data.data
        } else {
          this.$message.warning(res.data.data)
        }
        // 关闭loading动画
        this.tableLoading = false;
      },

      // 点击弹窗里的确认按钮
      formSubmit() {
        this.$refs["form"].validate(async(valid) => {
          if (valid) {
            if (!this.form.wifi) {
              this.form.wifiName = ''
              this.form.wifiPassword = ''
            }
            const res = await Hotel_api.updateDevice(this.form)
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
      handleCancel(data) {
        this.$confirm('此操作将取消预定此房间, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const params = {
            bedType: this.searchBedType,
            idCard: data.idCard,
            planInTime: data.planInTime,
            planOutTime: data.planOutTime
          }
          console.log(params)
          const res = await Housing_api.cancelBook(params)
          if (res.data.code === 0) {
            this.$message.success('取消预定成功！')
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
