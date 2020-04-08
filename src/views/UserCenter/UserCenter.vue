<template>
    <div class="user-center">
      <div class="content">
        <el-container>
          <el-container>
            <el-aside width="204px">
              <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                text-color="#333"
                active-text-color="#009fea"
                :default-openeds="openeds"
                router
              >
                <el-menu-item index="/render/member/account/dashboard">
                  <!-- <i class="icon-gauge"></i> -->
                  <router-link :to="{name:'MyOrders'}" style="color: inherit;" slot="title">Dashboard</router-link>
                </el-menu-item>
                <el-submenu index="2">
                  <template slot="title">
                    <!-- <i class="icon-user"></i> -->
                    <span>My Account</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="/render/member/account/booking-list">
                      <!-- <i class="icon-angle-right"></i> -->
                      <router-link :to="{name:'MyBookings'}" style="color: inherit;">My Bookings</router-link>
                    </el-menu-item>
                    <el-menu-item index="/render/member/account/notification-center">
                      <!-- <i class="icon-angle-right"></i> -->
                      <router-link :to="{name:'NotificationCenter'}" style="color: inherit;">My Notifications</router-link>
                    </el-menu-item>
                    <el-menu-item index="/render/member/account/deals">
                      <!-- <i class="icon-angle-right"></i> -->
                      <router-link :to="{name:'MyDeals'}" style="color: inherit;">My Deals</router-link>
                    </el-menu-item>
                    <el-menu-item index="/render/member/account/view-point">
                      <!-- <i class="icon-angle-right"></i> -->
                      <router-link :to="{name:'MyPoints'}" style="color: inherit;">My Available Points</router-link>
                    </el-menu-item>
                    <el-menu-item index="">  
                      <!-- <i class="icon-angle-right"></i> -->
                      <a @click="gotoWallet" style="color: inherit;">My Wallet</a>
                    </el-menu-item>
                    <el-menu-item index="/render/member/account/traveller-info-list">
                      <!-- <i class="icon-angle-right"></i> -->
                      <router-link :to="{name:'FrequentList'}" style="color: inherit;">Frequent Traveler Info</router-link>
                    </el-menu-item>
                    <el-menu-item index="/render/member/account/contact-info-list">
                      <!-- <i class="icon-angle-right"></i> -->
                      <router-link :to="{name:'ContactList'}" style="color: inherit;">My Contact Information</router-link>
                    </el-menu-item>
                    <el-menu-item index="/render/member/account/credit-card-list">
                      <!-- <i class="icon-angle-right"></i> -->
                      <router-link :to="{name:'CreditList'}" style="color: inherit;">My Credit Cards</router-link>
                    </el-menu-item>
                    <el-menu-item index="/render/member/account/change-password">
                      <!-- <i class="icon-angle-right"></i> -->
                      <router-link :to="{name:'ChangePassword'}" style="color: inherit;">Change Password</router-link>
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

  },
  methods:{
    gotoWallet(){
      window.location.href = process.env.NODE_ENV == 'production' ? '/cgi-bin/ce.fcgi?a=wallet_report' :'http://testwww.coachrun.com/cgi-bin/ce.cgi?a=wallet_report';
      // if(process.env.NODE_ENV == 'production'){
      //   window.location.href = '/cgi-bin/ce.fcgi?a=wallet_report';
      // }else{
      //   window.location.href = 'http://testwww.coachrun.com/cgi-bin/ce.cgi?a=wallet_report';
      // }
    }
  }
}
</script>

<style scoped>
  .content {
    width: 1160px;
    min-height: 615px;
    margin: 0 auto;
  }
  /* >>> .el-menu-vertical-demo{
    border: 1px solid #ddd;
  } */
  >>> .el-menu-item{
    background: #f2f2f2;
    /* height: 32px;
    line-height: 32px;
    border-bottom: 1px solid #ddd;
    padding-left: 30px !important; */
  }
  /* >>> .el-submenu__title{
    height: 32px;
    line-height: 32px;
    background: #f5f5f5;
    border-bottom: 1px solid #ddd;
  } */
  /* >>> .el-submenu.is-active .el-submenu__title{
    border-bottom: 1px solid #ddd;
  } */
  >>> .el-menu-item-group__title{
    display: none;
  }
  >>> .el-submenu{
    background: #f2f2f2;
    /* background: #f5f5f5; */
  }
  >>> .el-menu-item-group>ul>li{
    background: #f9f9f9;
    /* background: #f8f8f8; */
    color: #666666 !important;
  }
  .el-menu-item.is-active {
    color: #009fea !important;
    /* padding-left: 20px !important; */
  }
  .el-menu-item:hover{
      color: #009fea !important;
  }
  >>> .el-aside{
    overflow: hidden;
  }
</style>
