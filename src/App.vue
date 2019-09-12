<template>
  <div id="app">
    <my-header></my-header>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader'
import MyFooter from '@/components/MyFooter'

export default {
  name: 'app',
  components: {
    MyHeader,
    MyFooter
  }
}
</script>

<style>
 @import "./styles/fonts/css/a.css";
body{
    padding: 0;
    margin: 0;
    overflow: auto;
  }
  ul li {
    list-style: none;
  }
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
