<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
  }
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    /*background: url(assets/bg1.jpg) center !important;
        background-size: cover;*/
    background: #e9e9e9;

    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;

  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0;
  }

  .el-table th {
    background-color: #eef1f6;
    text-align: left;
    color: black;
  }
  .top_row {
    width: 100%;
    height: 100px;
    line-height: 100px;
    background-color: #ffffff;
    border-bottom: 1px solid #DCDFE6;
    margin-bottom: 10px;
  }
  .search {
    float: left;
    margin-left: 20px;
    width: calc(100% - 40px);
    height: 60px;
    line-height: 60px;
    font-size: 14px;
  }
  .title1 {
    float: left;
    margin-left: 20px;
    width: calc(100% - 40px);
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #000000;
    text-align: left;
    border-bottom: 1px solid #DCDFE6;
  }
  .aaa_table {
    margin-top: 20px;
    width: 94%;
    height: 500px;
    padding: 10px 10px 10px 10px;
    overflow: auto;
    margin-left: 3%;
    background-color: #ffffff;
  }
  .dialogDetail {
    font-size: 14px;
  }
  .dialogDetail .row {
    margin: 10px 0;
    display: inline-block;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .dialogDetail .row  .label {
    display: inline-block;
    width: 300px;
    text-align: right;
  }
  .dialogDetail .text {
    margin-left: 5px;
    display: inline-block;
    width: 300px;
    color: #909399;
    text-align: left;
  }
</style>
