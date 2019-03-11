<template>
  <div id="app">
    <top-nav class="top-nav"></top-nav>
    <left-nav class="left-nav"></left-nav>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
  // 引入顶栏组件
  import topNav from '../components/layout/topNav'
  // 引入左边菜单栏组件
  import leftNav from '../components/layout/leftNav'
  export default {
    name: 'App',
    // 声明一下引用的组件们
    components: {
      topNav, leftNav
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .left-nav {
    position: fixed;
    left: 0;
    top: 0;
    width: 200px;
    height: 100%;
    background-color: rgb(67, 74, 80);
  }
  .top-nav {
    position: absolute;
    left: 200px;
    width: calc(100% - 200px);
  }
  .content {
    position: absolute;
    left: 200px;
    top: 68px;
    width: calc(100% - 200px);
    height: calc(100% - 68px);
    background-color: #fff;
  }
  .my-title {
    padding-left: 20px;
    display: inline-block;
    width: calc(100% - 20px);
    height: 30px;
    line-height: 30px;
    text-align: left;
    background-color: #fff;
    border-bottom: 1px solid #d8dce5;
  }
  .el-pagination {
    margin-top: 50px;
  }
</style>
