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
        <!--员工信息管理，index属性填路由地址-->
        <el-submenu index="/staff">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>员工信息管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/staff">员工信息管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/staff/add">新增员工信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!--宠物管理，index属性填路由地址-->
        <!--
        <el-submenu index="/pet">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>宠物管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/pet">宠物管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/pet/add">新增宠物</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        -->
        <!--订单管理，index属性填路由地址-->
        <!--
        <el-submenu index="/order">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>订单管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/order">订单管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        -->
      </el-menu>
    </div>
</template>

<script>
  export default {
    name: "index",
    methods: {
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
