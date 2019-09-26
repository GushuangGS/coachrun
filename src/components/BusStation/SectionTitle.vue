<template>
  <el-header class="title">
    <span class="line-left"></span>
    <span class="line-title routers-title">{{this.titleName}}</span>
    <span class="line-right"></span>
  </el-header>
</template>
<script>
  export default {
    props:{
      titleName:{
        type:String,
        default:""
      }
    },
    name:"SectionTitle"
  }
</script>
<style lang="scss" scoped>
  .section {
    margin: 0 auto 90px;
  }
  .ellipsis{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  ul{
    list-style: none;
    padding: 0px;
  }
  body {
    padding: 0px;
  }
  .flex {
    display: flex;
  }

  .el-header {
    padding: 0px!important;
  }
  ul{
    list-style: none;
    padding: 0px;
  }
  .title {
    display: flex;
    justify-content:space-between;
    align-items: center;
    height: 22px;
    margin-bottom: 10px;
  }
  .line-title {
    font-size:18px;
    font-family:Arial-BoldMT;
    font-weight:normal;
    color:#333;
    height: 20px;
    line-height: 20px;
  }
  .line-left {
    width:400px;
    height:1.1px;
    background:linear-gradient(270deg,rgba(255,201,30,1) 0%,rgba(255,153,13,0) 100%);
  }
  .line-right {
    width:400px;
    height:1.1px;
    background:linear-gradient(90deg,rgba(255,201,30,1) 0%,rgba(255,153,13,0) 100%);
  }
</style>
