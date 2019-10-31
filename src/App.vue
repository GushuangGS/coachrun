<template>
  <div id="app">
    <my-header></my-header>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <chat></chat>
    <my-footer></my-footer>
  </div>
</template>
<script>
import $ from 'jquery'
import MyHeader from '@/components/MyHeader'
import MyFooter from '@/components/MyFooter'
import chat from '@/components/chat'
export default {
  name: 'app',
  components: {
    MyHeader,
    MyFooter,
    chat
  }
}
</script>

<style lang="scss">
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
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.el-message.is-center{
  top: 120px !important;
}
.el-message__closeBtn{
  right: 8px;
}
/*包含以下四种的链接*/
a {
    text-decoration: none;
    color: #606266;
}
/*正常的未被访问过的链接*/
a:link {
    text-decoration: none;
}
/*已经访问过的链接*/
a:visited {
    text-decoration: none;
}
/*鼠标划过(停留)的链接*/
a:hover {
    text-decoration: none;
}
/* 正在点击的链接*/
a:active {
    text-decoration: none;
}
button, input, select, textarea {font-family:inherit;}
</style>
