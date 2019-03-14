<template>
    <div class="top">
      <el-dropdown class="item" @command="handleCommand">
        <span class="el-dropdown-link">
          欢迎您，{{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
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
