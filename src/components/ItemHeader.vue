<template>
  <el-header height="33px" :class="{'header-bg': status}">
    <div v-if="status" class="title">{{headerInfo[0][0]}}</div>
    <el-breadcrumb v-else separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item>Home</el-breadcrumb-item> -->
      <!-- <el-breadcrumb-item :to="{ path: '/render/user' }">{{headerInfo[1].title}}</el-breadcrumb-item> -->
      <!-- <el-breadcrumb-item v-if="notDefault" :to="{ path: headerInfo[1].path }">{{headerInfo[1].description}}</el-breadcrumb-item> -->
      <el-breadcrumb-item>{{headerInfo[1].title}}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="notDefault">{{headerInfo[1].description}}</el-breadcrumb-item>
    </el-breadcrumb>
  </el-header>
</template>

<script>
  export default {
    props: {
      status: {
        type: Number,
        default: 0 // 0 => 面包屑， 非0 => 一段描述文字
      },
      headerInfo: {
        type: Array,
        default: new Array([ [''], { description: '', path: '' } ])
      },
      notDefault: {
        type: Boolean,
        default: true
      }
    },
    name: 'ItemHeader'
  }
</script>

<style scoped>
  .header-bg {
    background-color: #E5EFFA;
  }
  >>> .el-breadcrumb {
    font-size: 17px;
    line-height: 33px;
  }
  >>> .el-breadcrumb__inner {
    color: #002E63;
    font-weight: normal;
  }
  >>> .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: #333333;
  }
  .title {
    padding-left: 30px;
    line-height: 33px;
    font-size: 16px;
    color: #002E63;
    font-family: Arial;
    font-weight: bold;
  }
</style>
