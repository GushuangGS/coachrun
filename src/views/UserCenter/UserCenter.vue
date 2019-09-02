<template>
    <div class="user-center">
      <div class="content">
        <el-container>
          <el-container>
            <el-aside width="200px">
              <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                text-color="#6F6F6F"
                active-text-color="#E38E16"
                :default-openeds="openeds"
                router
              >
                <el-menu-item index="/render/member/account/dashboard" :route="{name:'MyOrders'}">
                  <span slot="title">Dashboard</span>
                </el-menu-item>
                <el-submenu index="2">
                  <template slot="title">
                    <span>My Account</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="/render/member/account/booking-list" :route="{name:'MyBookings'}">My Bookings</el-menu-item>
                    <el-menu-item index="/render/member/account/contact-info-list" :route="{name:'ContactList'}">Contact Infomation</el-menu-item>
                    <el-menu-item index="/render/member/account/change-password" :route="{name:'ChangePassword'}">Change Password</el-menu-item>
                    <el-menu-item index="/render/member/account/credit-card-list" :route="{name:'CreditList'}">View/Edit Creditcard</el-menu-item>
                    <el-menu-item index="/render/member/account/view-point" :route="{name:'MyPoints'}">My Points</el-menu-item>
                    <el-menu-item index="/render/member/account/user-deals" :route="{name:'MyDeals'}">My Deals</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-aside>
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </el-container>
        </el-container>
      </div>
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
    
  }
}
</script>

<style scoped>
  .content {
    width: 1240px;
    min-height: 550px;
    margin: 0 auto;
  }
  >>> .el-menu-item{
    background: #F1F1F1;
  }
  >>> .el-menu-item-group__title{
    /* background: #F1F1F1; */
    display: none;
  }
  >>> .el-submenu{
    background: #F1F1F1;
  }
  >>> .el-menu-item-group>ul>li{
    background: #FBFBFB;
  }
</style>
