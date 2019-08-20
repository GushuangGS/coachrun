<template>
    <div class="user-center">
      <div class="content">
        <el-container>
          <!-- <el-header height="50px"></el-header> -->
          <el-container>
            <el-aside width="200px">
              <!-- ----------- -->
              <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                text-color="#6F6F6F"
                active-text-color="#E38E16"
                :default-openeds="openeds"
                router
              >
                <el-menu-item index="/render/user/orders" :route="{name:'MyOrders'}">
                  <span slot="title">Dashboard</span>
                </el-menu-item>
                <el-submenu index="2">
                  <template slot="title">
                    <span>My Account</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="/render/user/bookings" :route="{name:'MyBookings'}">My Bookings</el-menu-item>
                    <el-menu-item index="/render/user/contact" :route="{name:'ContactList'}">Contact Infomation</el-menu-item>
                    <el-menu-item index="/render/user/password" :route="{name:'ChangePassword'}">Change Password</el-menu-item>
                    <el-menu-item index="/render/user/credit" :route="{name:'CreditList'}">View/Edit Creditcard</el-menu-item>
                    <el-menu-item index="/render/user/points" :route="{name:'MyPoints'}">My Points</el-menu-item>
                    <el-menu-item index="/render/user/deals" :route="{name:'MyDeals'}">My Deals</el-menu-item>
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
  created(){
    // console.log(this.$route);
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
    width: 1240px;
    min-height: 530px;
    margin: 0 auto;
  }
  >>> .el-menu-item{
    background: #F1F1F1;
  }
  >>> .el-menu-item-group__title{
    background: #F1F1F1;
  }
  >>> .el-submenu{
    background: #F1F1F1;
  }
  >>> .el-menu-item-group>ul>li{
    background: #FBFBFB;
  }
</style>
