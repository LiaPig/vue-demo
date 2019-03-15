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
              <el-button @click="handleDelete(scope.row)" type="text" size="small" style="color: #F56C6C;">删除</el-button>
              <el-button @click="handleEdit(scope.row)" type="text" size="small" style="margin-left: 10px;">编辑</el-button>
              <el-button @click="handleDetail(scope.row)" type="text" size="small" style="margin-left: 10px;color: #67C23A;">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-row>

    <!--编辑弹出框-->
    <el-dialog title="编辑客房信息" :visible.sync="showDialog" width="65%">
      <el-form :model="form" ref="form" label-width="100px" :rules="formRules">
        <!--房间号-->
        <el-row>
          <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
            <el-form-item label="房间号：" prop="room">
              <el-input v-model="form.room" placeholder="请输入房间号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--房间类型-->
        <el-row>
          <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
            <el-form-item label="房间类型：" prop="type">
              <el-select v-model="form.type" placeholder="请选择房间类型" style="width: 100%">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--当前状态-->
        <el-row>
          <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
            <el-form-item label="当前状态：" prop="nowStatus">
              <el-select v-model="form.nowStatus" placeholder="请选择当前状态" style="width: 100%">
                <el-option label="空闲" value="空闲"></el-option>
                <el-option label="预定" value="预定"></el-option>
                <el-option label="入住" value="入住"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
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
  import { Hotel_api } from "../../../api";

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
        form: {
          hotel_id: 1,
          room: null,
          type: null,
          status: null,
          nowStatus: null
        },
        // 表单验证
        formRules: {
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
      // 获取表格数据
      this.getTableData()
      // 获取房间类型选项
      this.getDeviceOptions()
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
      // 点击某一行里的编辑按钮
      handleEdit(data) {
        // 打开弹窗
        this.showDialog = true
        // 把这一行的数据给到表单
        this.form = {
          hotel_id: 1,
          id: data.id,
          room: data.name,
          type: data.typeId,
          status: '1',
          nowStatus: data.nowStatus
        }
      },
      // 点击弹窗里的确认按钮
      formSubmit() {
        this.$refs["form"].validate(async(valid) => {
          if (valid) {
            const res = await Hotel_api.updateRoom(this.form)
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
      handleDelete(data) {
        this.$confirm('此操作将删除该客房, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const params = {
            id: data.id
          }
          const res = await Hotel_api.deleteRoom(params)
          if (res.data.code === 0) {
            this.$message.success('删除成功！')
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
      },
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
    }
  }
</script>

<style scoped>

</style>
