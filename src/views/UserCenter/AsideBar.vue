<template>
    <div class="aside-bar">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item index="1">
          <span slot="title">Dashboard</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <span>My Account</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">My Bookings</el-menu-item>
            <el-menu-item index="2-2">Contact Infomation</el-menu-item>
            <el-menu-item index="2-3">Change Password</el-menu-item>
            <el-menu-item index="2-4">View/Edit Creditcard</el-menu-item>
            <el-menu-item index="2-5">My points</el-menu-item>
            <el-menu-item index="2-6">Exch Points Record</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      }
    },
    name: 'AsideBar'
  }
</script>

<style scoped>
  >>> .el-menu-item {
    text-align: center;
    background-color: #F1F1F1;
  }
  >>> .el-menu-item>span {
    font-size: 17px;
  }
</style>
