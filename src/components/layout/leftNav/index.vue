<template>
    <div>
      <div class="title">后台管理系统</div>
      <el-menu
        router
        default-active="/home"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <!--首页，index属性填路由地址-->
        <el-menu-item index="/home">
          <i class="el-icon-menu"></i>
          <span slot="title">&nbsp;&nbsp;&nbsp;&nbsp;首页&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </el-menu-item>
        <!--遍历渲染其他路由-->
        <template v-for="item in menuList">
          <el-submenu :index="item.path">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="children in item.children">
              <el-menu-item-group>
                <el-menu-item :index="children.path">{{ children.title }}</el-menu-item>
              </el-menu-item-group>
            </template>
          </el-submenu>
        </template>
      </el-menu>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "index",
    data() {
      return {
        // 管理员菜单
        adminMenu: [
          // 员工信息管理
          // {
          //   path: '/admin/staff',
          //   title: '员工信息管理',
          //   icon: 'el-icon-setting',
          //   children: [
          //     {
          //       path: '/admin/staff',
          //       title: '员工信息管理',
          //     },
          //     {
          //       path: '/admin/staff/add',
          //       title: '新增员工信息',
          //     }
          //   ]
          // },
        ],
        // 员工菜单
        staffMenu: [],
        // 客户菜单
        customerMenu: [],
        // 显示的菜单
        menuList: []
      }
    },
    computed: {
      ...mapGetters([
        // 角色
        'role'
      ]),
    },
    // 进入这个页面就调用的函数
    mounted() {
      // 会根据角色来判断实际上显示哪一个菜单
      // driver驾驶员，admin管理员，approver审批员
      if (this.role === 'staff') {
        this.menuList = this.staffMenu
      } else if (this.role === 'admin') {
        this.menuList = this.adminMenu
      } else if (this.role === 'customer') {
        this.menuList = this.customerMenu
      }
    }
  }
</script>

<style scoped>
  .title {
    margin: 0;
    height: 68px;
    line-height: 68px;
    font-size: 14px;
    color: #fff;
    background-color: rgb(84, 92, 100);
    border-bottom: solid 1px #e6e6e6;
    border-right: solid 1px #e6e6e6;
  }
</style>
