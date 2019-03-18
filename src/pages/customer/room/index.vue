<template>
  <div>
    <!--标题行-->
    <div class="my-title">可预定客房列表</div>
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
    <!--客房信息管理表格-->
    <el-row class="aaa_table" :gutter="50">
      <template v-for="item in tableData">
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552920747185&di=d6074652565c62021979dd744beeaea4&imgtype=0&src=http%3A%2F%2Fdimg04.c-ctrip.com%2Fimages%2F3005050000000kx4w5EB1.jpg" class="card-image">
            <div style="padding: 14px;">
              <span>{{ item.typeName }}</span>
              <div class="bottom clearfix">
                <el-button @click="handleBook(item)" type="text" class="button">预定入住</el-button>
                <el-button @click="handleDetail(item)" type="text" style="margin-left: 10px;color: #67C23A;">查看详情</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </template>
      <!--<el-table-->
        <!--:data="tableData"-->
        <!--border-->
        <!--style="width: 100%">-->
        <!--<el-table-column-->
          <!--type="index"-->
          <!--width="80">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--sortable-->
          <!--prop="name"-->
          <!--label="房间号">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--sortable-->
          <!--prop="typeName"-->
          <!--label="房间类型">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--sortable-->
          <!--prop="nowStatus"-->
          <!--label="当前状态">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label="操作">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button @click="handleBook(scope.row)" type="text" size="small">预定入住</el-button>-->
            <!--<el-button @click="handleDetail(scope.row)" type="text" size="small" style="margin-left: 10px;color: #67C23A;">查看详情</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
    </el-row>

    <!--入住弹出框-->
    <el-dialog title="请确认预约客房信息" :visible.sync="showBook">
      <div class="dialogDetail">
        <div class="row">
          <span class="label">客房类型：</span>
          <span class="text">{{ bookData.bedType }}</span>
        </div>
        <div class="row">
          <span class="label">入住日期：</span>
          <span class="text">{{ baseJs.formatDate.format(bookData.planInTime, 'yyyy-MM-dd') }}</span>
        </div>
        <div class="row">
          <span class="label">退房日期：</span>
          <span class="text">{{ baseJs.formatDate.format(bookData.planOutTime, 'yyyy-MM-dd') }}</span>
        </div>
        <div slot="footer" class="dialog-footer" style="margin-top: 30px">
          <el-button type="warning" @click="submitBook">确定预定</el-button>
        </div>
      </div>
    </el-dialog>
    <!--详情弹窗-->
    <el-dialog title="查看客房信息详情" :visible.sync="showDetail">
      <div class="dialogDetail">
        <div class="row">
          <span class="label">当前状态：</span>
          <span class="text">{{ detail.nowStatus }}</span>
        </div>
        <div class="row">
          <span class="label">床型：</span>
          <span class="text">{{ detailDevice.bedType }}</span>
        </div>
        <div class="row">
          <span class="label">容纳人数：</span>
          <span class="text">{{ detailDevice.contain }}</span>
        </div>
        <div class="row">
          <span class="label">有无窗户：</span>
          <span class="text">
            <template v-if="detailDevice.casement === '1'">有</template>
            <template v-else-if="detailDevice.casement === '0'">无</template>
          </span>
        </div>
        <div class="row">
          <span class="label">有无wifi：</span>
          <span class="text">
            <template v-if="detailDevice.wifi === '1'">有</template>
            <template v-else-if="detailDevice.wifi === '0'">无</template>
          </span>
        </div>
        <div class="row">
          <span class="label">房间面积：</span>
          <span class="text">{{ detailDevice.size }}</span>
        </div>
        <div class="row">
          <span class="label">房间价格：</span>
          <span class="text">{{ detailDevice.price }}</span>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="warning" @click="showDetail = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { Hotel_api, Housing_api, User_api } from "../../../api/index";

  export default {
    name: "index",
    data() {
      return {
        // 搜索框中的日期区间
        searchDate: [],
        // 表格数据
        tableData: [],
        // 表格的loading
        tableLoading: false,

        // 房间类型选项
        options: [],

        // 是否显示详情弹窗
        showDetail: false,
        // 详情弹窗里的房间数据
        detail: {},
        // 详情弹窗里的房间类型
        detailDevice: {},

        // 是否显示预定弹窗
        showBook: false,
        // 预定弹窗里的数据
        bookData: {
          idCard: ''
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
          startTime: this.searchDate[0],
          endTime: this.searchDate[1]
        }
        // 调用后台api，进行交互
        const res = await Housing_api.searchHome(params)
        // console.log(res)
        if (res.data.code === 0) {
          // 过滤掉只剩下空闲的
          this.tableData = []
          for(let item of res.data.data) {
            if (item.nowStatus === '空闲') {
              this.tableData.push(item)
            }
          }
        } else {
          this.$message.warning(res.data.data)
        }
        // 关闭loading动画
        this.tableLoading = false;
      },

      // 点击某一行里的查看详情
      handleDetail(data) {
        this.detail = data
        // 房间类型的具体数据也显示
        for (let item of this.options) {
          if (data.typeName === item.name) {
            this.detailDevice = item
          }
        }
        // 打开弹窗
        this.showDetail = true;
      },


      // 点击某一行里的预约按钮
      handleBook(data) {
        console.log(data)
        // 把这一行的数据给到弹窗
        this.bookData = {
          bedType: data.typeName,
          idCard: this.$store.getters.idCard,
          planInTime: new Date(this.searchDate[0]),
          planOutTime: new Date(this.searchDate[1]),
        }
        // 打开弹窗
        this.showBook = true
      },
      // 点击弹窗里的确认预定按钮
      async submitBook() {
        if (!this.bookData.idCard) {
          this.$message.warning('请输入身份证号')
          return
        }
        const res = await Housing_api.bookRoom(this.bookData)
        if(res.data.code === 0) {
          this.$message.success("预定入住成功！")
          // this.getTableData()
          // 关闭弹窗
          this.showCheckIn = false
        } else {
          this.$message.warning(res.data.data)
        }
      }
    }
  }
</script>

<style scoped>
  .card-image {
    display: inline-block;
    width: 100%;
    height: 270px;
  }
</style>
