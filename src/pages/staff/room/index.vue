<template>
  <div>
    <!--标题行-->
    <div class="my-title">客房信息管理</div>
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
  import { Hotel_api } from "../../../api";

  export default {
    name: "index",
    data() {
      return {
        // 表格数据
        tableData: [],
        // 表格的loading
        tableLoading: false,

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
        const res = await Hotel_api.getRoom({ hotelId: 1 })
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
      }
    }
  }
</script>

<style scoped>

</style>
