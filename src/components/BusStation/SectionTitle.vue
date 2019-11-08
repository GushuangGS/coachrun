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
    .el-header {
      padding: 0px!important;
    }
    ul{
      list-style: none;
      padding: 0px;
    }
    .title {
      display: flex;
      height: 20px!important;
      justify-content:space-between;
      align-items: center;
      height: 22px;
      margin-bottom: 30px;
    }
    .line-title {
      font-size:18px;
      font-weight:500;
      color:#333;
      height: 20px;
      line-height: 20px;
    }
    .line-left {
      width:30%;
      height:1.1px;
      background:linear-gradient(270deg,rgba(255,201,30,1) 0%,rgba(255,153,13,0) 100%);
    }
    .line-right {
      width:30%;
      height:1.1px;
      background:linear-gradient(90deg,rgba(255,201,30,1) 0%,rgba(255,153,13,0) 100%);
    }
  </style>
  <style scoped>
    @media screen and (max-width: 767px) {
      .line-title {
        font-size: 18px;
      }
      .line-left,.line-right{
        display: none;
      }
      .title{
        justify-content: center;
        margin-bottom: 20px;
      }
    }
    @media screen and (max-width: 991px){
      .line-left,.line-right{
        width:28%;
      }
    }

    @media screen and (max-width: 414px) {
      .title {
        margin-bottom: 15px;
      }
    }
  </style>
