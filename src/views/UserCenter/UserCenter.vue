<template>
    <div class="user-center">
      <div class="content">
        <el-container>
          <el-container>
            <el-aside width="200px">
              <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                text-color="#333"
                active-text-color="#009fea"
                :default-openeds="openeds"
                router
              >
                <el-menu-item index="/render/member/account/dashboard">
                  <router-link :to="{name:'MyOrders'}" style="color: inherit;" slot="title">Dashboard</router-link>
                </el-menu-item>
                <el-submenu index="2">
                  <template slot="title">
                    <span>My Account</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="/render/member/account/booking-list">
                      <router-link :to="{name:'MyBookings'}" style="color: inherit;">My Bookings</router-link>
                    </el-menu-item>
                    <el-menu-item index="/render/member/account/deals">
                      <router-link :to="{name:'MyDeals'}" style="color: inherit;">My Deals</router-link></el-menu-item>
                    <el-menu-item index="/render/member/account/view-point">
                      <router-link :to="{name:'MyPoints'}" style="color: inherit;">My Points</router-link>
                    </el-menu-item>
                    <el-menu-item index="/render/member/account/traveller-info-list">
                      <router-link :to="{name:'FrequentList'}" style="color: inherit;">Frequent Traveler Info</router-link>
                    </el-menu-item>
                    <el-menu-item index="/render/member/account/contact-info-list">
                      <router-link :to="{name:'ContactList'}" style="color: inherit;">My Contact Information</router-link>
                    </el-menu-item>
                    <el-menu-item index="/render/member/account/credit-card-list">
                      <router-link :to="{name:'CreditList'}" style="color: inherit;">My Credit Cards</router-link>
                    </el-menu-item>
                    <el-menu-item index="/render/member/account/change-password">
                      <router-link :to="{name:'ChangePassword'}" style="color: inherit;">Change Password</router-link>
                    </el-menu-item>
                    <el-menu-item index="/render/member/account/notification-center">
                      <router-link :to="{name:'NotificationCenter'}" style="color: inherit;">My Notifications</router-link>
                    </el-menu-item>
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
    width: 1160px;
    min-height: 615px;
    margin: 0 auto;
  }
  >>> .el-menu-item{
    background: #f2f2f2;
  }
  >>> .el-menu-item-group__title{
    display: none;
  }
  >>> .el-submenu{
    background: #f2f2f2;
  }
  >>> .el-menu-item-group>ul>li{
    background: #f9f9f9;
    color: #666666 !important;
  }
  .el-menu-item.is-active {
    color: #009fea !important;
  }
  .el-menu-item:hover{
      color: #009fea !important;
  }
  >>> .el-aside{
    overflow: hidden;
  }
</style>
