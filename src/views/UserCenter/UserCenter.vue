<template>
    <div class="user-center">
      <div class="content">
        <el-container>
          <!-- <el-header height="50px"></el-header> -->
          <el-container>
            <el-aside width="200px">
              <!-- ----------- -->
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="#F1F1F1"
                text-color="#6F6F6F"
                active-text-color="#E38E16"
                :default-openeds="openeds"
                router
              >
                <el-menu-item index="/app/member/account/orders">
                  <span slot="title">Dashboard</span>
                </el-menu-item>
                <el-submenu index="2">
                  <template slot="title">
                    <span>My Account</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="/app/member/account/bookings">My Bookings</el-menu-item>
                    <el-menu-item index="/app/member/account/contact">Contact Infomation</el-menu-item>
                    <el-menu-item index="/app/member/account/password">Change Password</el-menu-item>
                    <el-menu-item index="/app/member/account/credit">View/Edit Creditcard</el-menu-item>
                    <el-menu-item index="/app/member/account/points">My Points</el-menu-item>
                    <el-menu-item index="/app/member/account/deals">My Deals</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
              <!-- ----------- -->
            </el-aside>
            <!-- <el-main> -->
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
            <!-- </el-main> -->
          </el-container>
        </el-container>
      </div>
      <!-- <div class="my-footer-wrapper">
      </div> -->
    </div>
</template>

<script>
export default {
  name: 'UserCenter',
  data(){
    return{
      openeds: ['2']
    }
  },
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style scoped>
  .content {
    width: 1140px;
    margin: 0 auto;
  }
</style>
