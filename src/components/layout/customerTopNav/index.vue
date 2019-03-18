<template>
    <div class="top">
      <span style="float: left;margin-left: 20px;color: #fff;cursor: pointer" @click="toRoom">xxx酒店</span>
      <el-dropdown class="item" @command="handleCommand">
        <span class="el-dropdown-link">
          个人中心<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="update">更新个人信息</el-dropdown-item>
          <el-dropdown-item command="book">我要预约房间</el-dropdown-item>
          <el-dropdown-item command="my">我的预定列表</el-dropdown-item>
          <el-dropdown-item command="exit">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "index",
    data() {
      return {
      };
    },
    computed: {
      ...mapGetters([
        'userName'
      ]),
    },
    methods: {
      handleCommand(command) {
        if(command === "exit") {
          this.$store.commit('REMOVE_USERINFO')
          this.$notify({
            title: '退出登录成功',
            message: '请重新登录',
            type: 'success'
          });
          this.$router.push({path: '/login'});
        }
        else if (command === "update") {
          this.$router.push({path: '/customer/updateInformation'});
        }
        else if (command === "my") {
          this.$router.push({path: '/customer/my'});
        }
        else if (command === "book") {
          this.$router.push({path: '/customer/room'});
        }
      },
      // 点击了酒店首页
      toRoom() {
        this.$router.push({ path: '/customer/room'})
      }
    }
  }
</script>

<style scoped>
  .top {
    display: inline-block;
    height: 68px;
    line-height: 68px;
    border-bottom: solid 1px #e6e6e6;
    background-color: rgb(67, 74, 80);
  }
  .item {
    float: right;
    margin-right: 30px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #fff;
  }
</style>
