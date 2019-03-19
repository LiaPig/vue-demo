<template>
  <div>
    <!--标题行-->
    <div class="my-title">房间类型管理</div>
    <!--房间类型管理表格-->
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
            label="房间类型ID">
          </el-table-column>
          <el-table-column
            sortable
            prop="name"
            label="房间类型名字">
          </el-table-column>
          <el-table-column
            sortable
            prop="bedType"
            label="床型">
          </el-table-column>
          <el-table-column
            sortable
            prop="contain"
            label="容纳人数">
          </el-table-column>
          <el-table-column
            sortable
            label="有无窗户">
            <template slot-scope="scope">
              <template v-if="scope.row.casement === '1'">有</template>
              <template v-else-if="scope.row.casement === '0'">无</template>
            </template>
          </el-table-column>
          <el-table-column
            sortable
            label="有无wifi">
            <template slot-scope="scope">
              <template v-if="scope.row.wifi === '1'">有</template>
              <template v-else-if="scope.row.wifi === '0'">无</template>
            </template>
          </el-table-column>
          <el-table-column
            sortable
            prop="size"
            label="房间面积(平方米)">
          </el-table-column>
          <el-table-column
            sortable
            prop="price"
            label="房间价格">
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
    <el-dialog title="编辑房间类型信息" :visible.sync="showDialog" width="65%">
      <el-form :model="form" ref="form" label-width="120px" :rules="formRules">
        <!--房间类型名字-->
        <el-row>
          <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
            <el-form-item label="房间类型名字：" prop="name">
              <el-input v-model="form.name" style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--床型-->
        <el-row>
          <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
            <el-form-item label="床型：" prop="bedType">
              <el-input v-model="form.bedType" style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--卫浴类型-->
        <el-row>
          <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
            <el-form-item label="房间头图：" prop="bathroom">
              <el-input v-model="form.bathroom" style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--容纳人数-->
        <el-row>
          <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
            <el-form-item label="容纳人数：" prop="contain">
              <el-input v-model="form.contain" type="number" style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--有无窗户-->
        <el-row>
          <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
            <el-form-item label="有无窗户：" prop="casement">
              <el-select v-model="form.casement" placeholder="请选择有无窗户" style="width: 100%">
                <el-option label="有" value="1"></el-option>
                <el-option label="无" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--有无wifi-->
        <el-row>
          <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
            <el-form-item label="有无wifi：" prop="wifi">
              <el-select v-model="form.wifi" placeholder="请选择有无wifi" style="width: 100%">
                <el-option label="有" value="1"></el-option>
                <el-option label="无" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--有wifi才显示-->
        <template v-if="form.wifi === '1'">
          <el-row>
            <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
              <el-form-item label="wifi名：" prop="wifiName">
                <el-input v-model="form.wifiName" style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
              <el-form-item label="wifi密码：" prop="wifiPassword">
                <el-input v-model="form.wifiPassword" style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>


        </template>
        <!--房间面积-->
        <el-row>
          <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
            <el-form-item label="房间面积：" prop="size">
              <el-input v-model="form.size" type="number" style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--房间价格-->
        <el-row>
          <el-col :span="12" :offset="6" style="height: 40px;margin-bottom: 20px;">
            <el-form-item label="房间价格：" prop="price">
              <el-input v-model="form.price" type="number" style="width: 100%"></el-input>
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
    <el-dialog title="查看房间类型详情" :visible.sync="showDetail">
      <div class="dialogDetail">
        <div class="row">
          <span class="label">房间类型ID：</span>
          <span class="text">{{ detail.id }}</span>
        </div>
        <div class="row">
          <span class="label">房间类型名字：</span>
          <span class="text">{{ detail.name }}</span>
        </div>
        <div class="row">
          <span class="label">床型：</span>
          <span class="text">{{ detail.bedType }}</span>
        </div>
        <div class="row">
          <span class="label">容纳人数：</span>
          <span class="text">{{ detail.contain }}</span>
        </div>
        <div class="row">
          <span class="label">有无窗户：</span>
          <span class="text">
            <template v-if="detail.casement === '1'">有</template>
            <template v-else-if="detail.casement === '0'">无</template>
          </span>
        </div>
        <div class="row">
          <span class="label">有无wifi：</span>
          <span class="text">
            <template v-if="detail.wifi === '1'">有</template>
            <template v-else-if="detail.wifi === '0'">无</template>
          </span>
        </div>
        <template v-if="detail.wifi === '1'">
          <div class="row">
            <span class="label">wifi名：</span>
            <span class="text">{{ detail.wifiName }}</span>
          </div>
          <div class="row">
            <span class="label">wifi密码：</span>
            <span class="text">{{ detail.wifiPassword }}</span>
          </div>
        </template>
        <div class="row">
          <span class="label">房间面积：</span>
          <span class="text">{{ detail.size }}</span>
        </div>
        <div class="row">
          <span class="label">房间价格：</span>
          <span class="text">{{ detail.price }}</span>
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
            { required: true, message: '请填写房间头图url', trigger: 'blur' }
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
      // 获取表格数据
      this.getTableData();
    },
    methods: {
      // 获取表格数据
      async getTableData() {
        // 打开loading动画
        this.tableLoading = true
        // 调用后台api，进行交互
        const res = await Hotel_api.getDevice()
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
          id: data.id,
          name: data.name,
          bedType: data.bedType,
          bathroom: data.bathroom,
          contain: data.contain,
          casement: data.casement,
          wifi: data.wifi,
          wifiName: data.wifiName,
          wifiPassword: data.wifiPassword,
          size: data.size,
          price: data.price
        }
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
      handleDelete(data) {
        this.$confirm('此操作将删除该房间类型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const params = {
            id: data.id
          }
          const res = await Hotel_api.deleteDevice(params)
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
      }
    }
  }
</script>

<style scoped>

</style>
