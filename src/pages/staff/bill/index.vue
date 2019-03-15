<template>
  <div>
    <!--标题行-->
    <div class="my-title">账单信息管理</div>
    <!--日期搜索框、查看所有按钮-->
    <div style="margin-top: 20px;text-align: left">
      时间段：<el-date-picker
      v-model="searchTime"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
      style="width: 280px">
    </el-date-picker>
      <el-button @click="searchBill">搜索账单</el-button>
      <el-button @click="getTableData" type="primary" style="float: right">查看所有账单</el-button>
    </div>

    <!--账单信息管理表格-->
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
            label="账单ID">
          </el-table-column>
          <el-table-column
            sortable
            prop="roomId"
            label="房间ID">
          </el-table-column>
          <el-table-column
            sortable
            prop="housing"
            label="入住人">
          </el-table-column>
          <el-table-column
            sortable
            label="入住时间">
            <template slot-scope="scope">
              {{ baseJs.formatDate.format(new Date(scope.row.checkinTime), 'yyyy-MM-dd hh:mm:ss') }}
            </template>
          </el-table-column>
          <el-table-column
            sortable
            label="退房时间">
            <template slot-scope="scope">
              {{ baseJs.formatDate.format(new Date(scope.row.checkoutTime), 'yyyy-MM-dd hh:mm:ss') }}
            </template>
          </el-table-column>
          <el-table-column
            sortable
            prop="consume"
            label="产生费用">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="text" size="small" style="margin-left: 10px;">编辑</el-button>
              <el-button @click="handleDetail(scope.row)" type="text" size="small" style="margin-left: 10px;color: #67C23A;">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-row>

    <!--详情弹窗-->
    <el-dialog title="查看客房信息详情" :visible.sync="showDetail">
      <div class="dialogDetail">
        <div class="row">
          <span class="label">客房ID：</span>
          <span class="text">{{ detail.id }}</span>
        </div>
        <div class="row">
          <span class="label">房间号：</span>
          <span class="text">{{ detail.room }}</span>
        </div>
        <div class="row">
          <span class="label">房间类型：</span>
          <span class="text">{{ detail.type }}</span>
        </div>
        <div class="row">
          <span class="label">是否有效：</span>
          <span class="text">
            <template v-if="detail.status === '1'">是</template>
            <template v-else-if="detail.status === '2'">否</template>
          </span>
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
  import { Bill_api } from "../../../api";

  export default {
    name: "index",
    data() {
      return {
        // 表格数据
        tableData: [],
        // 表格的loading
        tableLoading: false,

        // 搜索数据
        searchTime: null,

        // 是否显示详情弹窗
        showDetail: false,
        // 详情弹窗的数据
        detail: {},
      }
    },
    // 一进来页面就调用
    mounted() {
      // 获取表格数据
      this.getTableData()
    },
    methods: {
      // 获取表格数据
      async getTableData() {
        // 打开loading动画
        this.tableLoading = true
        // 调用后台api，进行交互
        const res = await Bill_api.getBill()
        if (res.data.code === 0) {
          this.tableData = res.data.data
        } else {
          this.$message.warning(res.data.data)
        }
        // 关闭loading动画
        this.tableLoading = false;
      },

      // 点击某一行里的查看详情
      handleDetail(data) {
        // console.log(data)
        this.detail = data;
        // 打开弹窗
        this.showDetail = true;
      },

      // 根据时间段搜账单
      async searchBill() {
        const params = {
          startTime: this.searchTime[0],
          endTime: this.searchTime[1]
        }
        // 调用后台api，进行交互
        const res = await Bill_api.getDateBill(params)
        if (res.data.code === 0) {
          this.tableData = res.data.data
        } else {
          this.$message.warning(res.data.data)
        }
      }
    }
  }
</script>

<style scoped>

</style>
