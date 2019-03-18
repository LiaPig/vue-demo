<template>
  <div id="customer">
    <top-nav class="top-nav"></top-nav>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
  // 引入顶栏组件
  import topNav from '../../components/layout/customerTopNav'
  export default {
    name: 'App',
    // 声明一下引用的组件们
    components: {
      topNav
    }
  }
</script>

<style>
  #customer {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #customer .top-nav {
    position: absolute;
    left: 0;
    width: 100%;
  }
  #customer .content {
    padding: 20px;
    position: absolute;
    left: 0;
    top: 68px;
    width: calc(100% - 40px);
    height: calc(100% - 68px - 40px);
    overflow-y: auto;
    background-color: #fff;
  }
</style>
