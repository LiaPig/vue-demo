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

</style>
