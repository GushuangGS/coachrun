<template>
  <div class="header">
    <i class="icon-menu menu" style="font-size: 26px" @click="clickMenu"></i>
    <el-drawer :size="'70%'" :visible.sync="showMenu" :direction="'ltr'" :show-close="false" :before-close="handleClose" custom-class="show-drawer">
      <nav class="navbar">
        <div class="user-header-box">
          <div class="nav-not-login" v-if="!$store.state.isLogin">
            <img src="@/assets/sidebar-notlogin.png">
            <p><a href="/render/user/login" style="color: #232323;">Login | Register</a></p>
          </div>
          <div class="nav-login" v-else>
            <div class="row">
              <img class="headImg" src="@/assets/home_head.png" />
              <div class="userDisplay" v-if="getUserName()">
                <span class="userName">{{getUserName()}}</span>
                <span class="userEmail">{{getUserEmail()}}</span>
              </div>
              <div class="userDisplay" v-else>
                <span class="userName">{{getUserEmail()}}</span>
              </div>
            </div>
            <div class="row">
              <button class="accountButton" @click="gotoAcount">Account</button>
              <button class="bookingButton" @click="gotoBooking">Bookings</button>
            </div>
          </div>
        </div>
        <div class="sidebar">
          <div class="sidebar-cell" @click="toShopping">
            <div class="sidebar-content">
              <a>
                <img src="@/assets/sidebar-home.png">
                <span>Home</span>
              </a>
            </div>
          </div>
          <div class="sidebar-cell">
            <div class="sidebar-content">
              <a href="/bus-stations">
                <img src="@/assets/sidebar-bus-station.png">
                <span>Bus Stations</span>
              </a>
            </div>
          </div>
          <div class="sidebar-cell">
            <div class="sidebar-content">
              <a href="https://www.gotocharter.com">
                <img src="@/assets/sidebar-bus-rental.png">
                <span>Bus Rental</span>
              </a>
            </div>
          </div>
          <div class="sidebar-cell">
            <div class="sidebar-content">
              <a href="https://www.coachrun.com/track-bus-status/">
                <img src="@/assets/sidebar-track-bus-status.png">
                <span>Track Bus Status</span>
              </a>
            </div>
          </div>
          <div class="sidebar-cell">
            <div class="sidebar-content">
              <a href="https://www.coachrun.com/hotels/">
                <img src="@/assets/sidebar-hotel.png">
                <span>Hotels</span>
              </a>
            </div>
          </div>
          <div class="sidebar-cell">
            <div class="sidebar-content">
              <a href="https://www.coachrun.com/ticket-policy/">
                <img src="@/assets/sidebar-ticket-policy.png">
                <span>Ticket Policy</span>
              </a>
            </div>
          </div>
          <div class="sidebar-cell" v-if="$store.state.isLogin">
            <div class="sidebar-content" @click="logout">
              <a>
                <img src="@/assets/sidebar-logout.png">
                <span>Log Out</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </el-drawer>

    <div class="header-left">
      <!-- <div class="logo" @click="skip('http://testwww.coachrun.com/')"> -->
      <div class="logo" @click="toShopping">
        <a href="/">
          <img src="@/assets/coachrunlogo.png" />
        </a>
      </div>
      <ul class="header-title hidden">
        <li>
          <router-link to="/bus-stations">Bus Stations</router-link>
        </li>
        <li>
          <a href="https://www.gotocharter.com">Bus Rental</a>
        </li>
        <li>
          <a href="https://www.coachrun.com/hotels/">Hotels</a>
        </li>
        <li>
          <a href="https://www.coachrun.com/ticket-policy/">Ticket Policy</a>
        </li>
        <!-- <li class="show-tour">
          <a href="https://www.taketours.com">
            Tours
            <div class="tour-list-box" ref="tourList" v-html="tourHtml"></div>
          </a>
        </li> -->
      </ul>
    </div>

    <div class="header-right xs-hidden">
      <div class="login-register" v-if="!$store.state.isLogin">
        <span @click="login">Login</span>
      </div>
      <div class="show-name" v-else>
        <span class="user-name subThemeStyle" @click="gotoMine">
          <i class="icon-user-circle backgr"></i>
          {{getUserName()}}
        </span>
        <span class="logout" @click="logout">Logout</span>
      </div>
      <div class="shopping-cart" @click="skip('/cgi-bin/ivyecom.fcgi?a=shopcart_view&nm=1350154')">
        <el-badge
          :value="shopNum"
          :max="99"
          id="bus_shopping_cart_nav"
          :hidden="shopNum==0?true:false"
        >
          <a href="/cgi-bin/ivyecom.fcgi?a=shopcart_view&nm=1350154">
            <i class="icon-basket"></i>
          </a>
        </el-badge>
      </div>
    </div>
    <a href="/cgi-bin/ivyecom.fcgi?a=shopcart_view&nm=1350154" class="basket">
      <i class="icon-basket" style="font-size: 26px;color:#333;"></i>
    </a>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
// "element-ui": "^2.4.5",
export default {
  name: "MyHeader",
  data() {
    return {
      navLists: [
        { text: "Bus Stations", src: "/bus-stations" },
        { text: "Bus Rental", src: "https://www.gotocharter.com" },
        { text: "Hotel", src: "https://www.coachrun.com/hotel/" },
        {
          text: "Ticket Policy",
          src: "https://www.coachrun.com/ticket-policy/"
        }
      ],
      userName: "",
      shopNum: 0,
      showMenu: false,
      userEmail: "",
      loginFlag:false,
      tourHtml:"",
    };
  },
  created() {
    console.log("header created")
    var name;
    if (process.env.NODE_ENV == "development") {
      name = localStorage.getItem("IvyCustomer_LoginToken");
    } else {
      name = Cookies.get("IvyCustomer_LoginCookie");
    }
    if (name) {
      this.$store.commit("login");
      this.isLogin = this.$store.state.isLogin;
    };
    // this.$http.get("http://testwww.coachrun.com/api/pages/toolbars",
    //   {
    //     params:{
    //       ids:1
    //     }
    //   }
    // ).then((res) => {
    //   if (res.data.code==200) {
    //     this.tourHtml = res.data.data[1];
    //   }
    //   console.log(res)
    // })
  },
  mounted() {
    this.shopNum = Cookies.get("IvyCustomer_ShoppingItems");
    // this.userEmail = Cookies.get("IvyCustomer_LoginEmail");
  },
  methods: {
    handleClose() {
      this.showMenu = false;
    },
    clickMenu(){
      this.showMenu = true;
    },
    getUserEmail(){
      if(process.env.NODE_ENV !== "development"){
        // return this.userEmail = Cookies.get("IvyCustomer_LoginEmail");
        return safe;
      }
    },
    getUserName() {
      // this.userName = Cookies.get("IvyCustomer_FirstName");
      // if (this.userName == null || this.userName == undefined) {
      //   // this.userName =Cookies.get("IvyCustomer_LoginEmail") != null? Cookies.get("IvyCustomer_LoginEmail"): localStorage.getItem("loginName");
      //   if(Cookies.get("IvyCustomer_LoginEmail") != null || Cookies.get("IvyCustomer_LoginEmail") != undefined){
      //      this.userName = Cookies.get("IvyCustomer_LoginEmail");
      //   }else{
      //     this.userName =localStorage.getItem("loginName");
      //   }
      // }
      // return this.userName;

      if(process.env.NODE_ENV === "development"){
        return  this.userName =localStorage.getItem("loginName");
      }else{
        this.userName = Cookies.get("IvyCustomer_FirstName");
        if(this.userName == null || this.userName == undefined){
          this.userName = Cookies.get("IvyCustomer_LoginEmail");
        }
        return this.userName;
      }
    },
    skip(url) {
      window.location.href = url;
    },
    // changeColor(index) {
    //   // this.$router.push({name: this.navLists[index].link});
    //   window.location.href = this.navLists[index].src;
    // },
    toShopping() {
      if (process.env.NODE_ENV === "production") {
        window.location.href = "https://www.coachrun.com/";
      } else {
        window.location.href = "http://testwww.coachrun.com/";
      }
    },
    toLive() {
      window.open(
        "http://live.coachrun.com/chat.php?v=2&group=CoachRun&hcgs=MQ__&htgs=MQ__&hfk=MQ__&eh=aHR0cDovL3d3dy5jb2FjaHJ1bi5jb20vY2xpZW50LXJlc291cmNlL2NvYWNoLXJ1bi9pbWFnZXMvbG9nby5wbmc=",
        "",
        "width=590,height=1010,left=0,top=0,resizable=yes,menubar=no,location=no,status=yes,scrollbars=yes",
        "_blank"
      );
    },
    gotoMine() {
      if (Cookies.get("IvyCustomer_role") >= 3) {
        window.location.href = "https://www.coachrun.com/app/member/account";
      } else {
        this.$router.push({ name: "MyOrders" });
      }
    },
    login() {
      this.$router.push({ name: "Login" });
    },
    register() {
      this.$router.push({ name: "Register" });
    },
    logout() {
      this.$http.delete(this.$api.logout).then(data => {
        console.log(data);
        if (data.data.code == 200) {
          if (process.env.NODE_ENV === "development") {
            localStorage.removeItem("IvyCustomer_LoginToken");
            localStorage.removeItem("loginName");
          }
          Cookies.remove("IvyCustomer_LoginCookie");
          Cookies.remove("front-sessionId");
          this.$store.commit("logout");
          this.$router.push({ name: "Login" });
        } else if (data.data.code == 500) {
          this.$message({
            message: data.data.msg,
            type: "warning",
            center: true
          });
        }
      });
    },
    gotoAcount() {
      if (Cookies.get("IvyCustomer_role") >= 3) {
        window.location.href = "https://www.coachrun.com/app/member/account";
      } else {
        this.$router.push({ name: "MyOrders" });
      }
    },
    gotoBooking() {
      if (Cookies.get("IvyCustomer_role") >= 3) {
        window.location.href = "https://www.coachrun.com/app/member/account";
      } else {
        this.$router.push({ name: "MyBookings" });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.header-left {
  display: flex;
  align-items: baseline;
  margin-top: 4px;
}

.header-right {
  display: flex;
  align-items: center;
}

.header {
  height: 80px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  cursor: pointer;
  background: rgba(255, 255, 255, 1);
  padding: 15px 20px;
  justify-content: space-between;
}
.logo {
  width: 132px;
  height: 26px;
}

.right-menu {
  display: flex;
}

.login-register {
  height: 36px;
  line-height: 34px;
  padding: 0 15px;
  border: 1px solid #cdcdcd;
  display: flex;
  font-size: $Body2Size;
  border-radius: 4px;
  color: rgba(51, 51, 51, 1);
}

.show-name {
  height: 34px;
  line-height: 34px;
  // margin-left: 150px;
  padding: 0 0 0 15px;
  display: flex;
  font-size: $Body2Size;
  color: rgba(51, 51, 51, 1);
}

.bgColor {
  color: #009fea;
}

.user-name {
  // color: #00a2ff;
  white-space: nowrap;
  display: flex;
  align-items: center;
}

.user-name i {
  margin-right: 5px;
}

.logout {
  margin-left: 16px;
  font-size: $Body2Size;
  padding: 0 15px;
}

.logout:hover {
  color: #00a2ff;
}

.login {
  margin-right: 5px;
}

.register {
  margin-left: 5px;
}

.shopping-cart {
  margin-left: 16px;
  font-size: $SubheadlineSize;
}

.shopping-cart a,
.live-chat a {
  color: inherit;
  text-decoration: none;
}

.live-chat {
  margin-left: 16px;
  font-size: $SubheadlineSize;
}

.header-title {
  display: flex;
  align-items: center;
  margin: 0px 0px 0px 20px ;
}

.header-title li {
  white-space: nowrap;
  margin-top: 12px;
  padding: 10px;
  text-align: center;
  font-size: $Body1Size;
  color: #333;
}

.header-title li a {
  text-decoration: none;
  color: #333;
  font-weight: 700;
}

.backgr {
  color: #333;
  font-size: $SubheadlineSize;
}

@media screen and (max-width: 992px) {
  .header-left{
    margin-top:0px;
  }

  .hidden {
    display: none;
  }
}

@media screen and (max-width: 767px) {
  .xs-hidden {
    display: none;
  }

  .basket,
  .menu {
    display: block !important;
  }
  .header{
    height: 44px;
    padding: 0 7px;
  }
  .logo {
    height: 20px;
    width: auto;
  }
  .logo img {
    height: 20px;
  }
  html{
    overflow-y: hidden !important;
  }
}

/* ------------------------------ */
.basket {
  display: none;
  // margin-right: -40px;
}

.menu {
  // margin-left: -40px;
  display: none;
}

nav {
  a {
    text-decoration: none;
  }

  .user-header-box {
    background-color: #f2f2f2;
    font-size: $SubheadlineSize;
    color: #232323;

    .nav-not-login {
      padding: 32px 0px 32px 6%;
      display: flex;
      align-items: center;
      height: 100%;
    }

    .nav-login {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-content: center;
      padding: 20px 0px 0px 6%;
      .row {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        img {
          height: 24px!important;
          width: 24px!important;
        }
        .userDisplay {
          display: flex;
          flex-direction: column;
          padding-left: 8px;

          .userName {
            height: 18px;
            font-size: 16px;
            font-weight: bold;
            color: #333333;
          }

          .userEmail {
            height: 14px;
            font-size: 14px;
            color: #999999;
          }
        }

        .accountButton {
          width: 40%;
          height: 28px;
          font-size: 14px;
          color: white;
          margin: 15.5px 0px;
          background-color: #00a2ff;
          border-radius: 4px;
          border-width: 0;
        }

        .bookingButton {
          width: 40%;
          height: 28px;
          background-color: #fff;
          font-size: 14px;
          margin: 15.5px 0px 15.5px 21px;
          border-radius: 4px;
          border-width: 0;
          color: #00a2ff;
        }
      }
    }

    img {
      width: 44px;
      height: 44px;
    }

    p {
      padding-left: 8px;
      margin: 0px!important;
    }
  }

  .sidebar {
    .sidebar-content a {
      display: flex;
      height: 50px;
      align-items: center;
      padding-left: 6%;

      span {
        color: #2c3e50;
        text-decoration: none;
        font-size: $Body1Size;
        margin-left: 13px;
        height: 16px;
      }

      img {
        width: 18px;
        height: 18px;
      }
    }
  }
}

.show-tour {
  position: relative;
}
.show-tour div {
  position: absolute;
  top: 35px;
  display: none;
}
.show-tour:hover .tour-list-box {
  display: block;
  z-index: 20;
}
</style>
<style>
.el-drawer__header {
  display: none !important;
}
#bus_shopping_cart_nav sup {
  display: inline-block;
  background-color: #ff6600;
  color: #ffffff;
  border-radius: 50%;
  text-align: center;
  width: 12px;
  height: 12px;
  line-height: 12px;
  position: absolute;
  top: -3px;
  left: 12px;
  font-size: 11px;
  right: 0px;
  transform: none;
  padding: 0px;
  border: 0px;
}
.show-drawer{
  max-width: 300px;
}
</style>
<style lang="scss">
  .dropdown-menu {
    padding: 10px;
    border: 1px solid rgba(0,0,0,.15);
    background-color: white;
    box-shadow: 0 6px 12px rgba(0,0,0,.175);
    font-size: 14px;
    text-align: left;
    list-style: none;
    float: left;
    z-index: 1000;
    .sublist {
      padding: 5px;
      margin-right: 0;
      margin-left: 14px;
      float: left;
      padding-bottom: 0;
    }
    li {
      height: 30px;
      a {
        color: #2344a8;
        font-weight: normal;
        padding: 6px 0px;
      }
    }
    .more {
      background-color: #eee;
      clear: both;
      a {
        text-align: right;
        display: block;
        padding: 3px 20px;
        clear: both;
        font-weight: 400;
        line-height: 24px;
        white-space: nowrap;
      }
    }
  }
</style>
