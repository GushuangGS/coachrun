<template>
  <div>
      <ivy-coachrun-header
        :isLogin="$store.state.isLogin" 
        :showUserName="$store.state.showUserName" 
        :showUserEmail="getUserEmail()"
        :apiDomain="apiDomain"
        :apiKey="apiKey"
        :loginUrl="loginUrl"
        :notificationCenterUrl="notificationCenterUrl"
        :tourHtml="tourHtml"
        @logout="logout"
        @toShopping="toShopping"
        @gotoMine="gotoMine"
        @login="login"
        @gotoAcount="gotoAcount"
        @gotoBooking="gotoBooking"
      ></ivy-coachrun-header>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: "MyHeader",
  data() {
    return {
      apiDomain:process.env.VUE_APP_API_DOMAIN,
      apiKey:'7:1350154:0:1',
      loginUrl:`${process.env.VUE_APP_API_DOMAIN}render/user/login`,
      notificationCenterUrl:`${process.env.VUE_APP_API_DOMAIN}render/member/account/notification-center`,
      tourHtml:""
    };
  },
  created() {
    var name;
    if (process.env.NODE_ENV == "development") {
      name = localStorage.getItem("IvyCustomer_LoginToken");
    } else {
      name = Cookies.get("IvyCustomer_LoginCookie");
    }
    if (name) {
      this.$store.commit("login");
      this.$store.commit("notifiyBtnShow");
      this.$store.commit('showUserName',this.getIvyName());
      console.log(this.$store.state.showUserName);
    };

    this.$http.get(`${process.env.VUE_APP_API_DOMAIN}api/pages/toolbars`,
      {
        params:{
          ids:1
        }
      }
    ).then((res) => {
      if (res.data.code==200) {
        this.tourHtml = res.data.data[1];
      }
    })
  },
  mounted() {
    this.shopNum = Cookies.get("IvyCustomer_ShoppingItems");
  },
  methods: {
    getUserEmail(){
      if(process.env.NODE_ENV !== "development"){
        return this.userEmail = Cookies.get("IvyCustomer_LoginEmail");
      }
    },
    getIvyName(){
      let ivyName = null;
      if(process.env.NODE_ENV === "development"){
        return localStorage.getItem("loginName");
      }else{
        ivyName = Cookies.get("IvyCustomer_FirstName");
        if(!ivyName){
          ivyName = Cookies.get("IvyCustomer_Uid");
          if(!ivyName || ivyName.indexOf('_auto_')>-1){
            ivyName = Cookies.get("IvyCustomer_LoginEmail");
          }
        }
        return ivyName;
      }
    },
    logout() {
      this.$http.delete(this.$api.logout).then(data => {
        console.log(data);
        if (data.data.code == 200) {
          if (process.env.NODE_ENV === 'development') {
            localStorage.removeItem('IvyCustomer_LoginToken');
            localStorage.removeItem('loginName');
          }
          localStorage.clear();
          Cookies.remove('IvyCustomer_LoginCookie');
          Cookies.remove('front-sessionId');
          this.$store.commit('logout');
          this.$store.commit('notifiyBtnHide');

          let that = this;
          var auth = this.firebase.auth();
          auth.signOut().then(
            function() {
                var provider = new that.firebase.auth.GoogleAuthProvider();
                var faceBookProvider = new that.firebase.auth.FacebookAuthProvider();
                provider.setCustomParameters({ prompt: 'select_account' });
                faceBookProvider.setCustomParameters({ prompt: 'select_account' });
                that.$router.push({ name: 'Login' });
            }
          );
        } else if (data.data.code == 500) {//eslint-disable-line
          this.$message({
            message: data.data.msg,
            type: 'warning',
            center: true
          });
        }
      });
    },
    toShopping() {
      if (process.env.NODE_ENV === "production") {
        window.location.href = "https://www.coachrun.com/";
      } else {
        window.location.href = "http://testwww.coachrun.com/";
      }
    },
    gotoMine() {
      if (Cookies.get('IvyCustomer_role') >= 3) {
        window.location.href = `${process.env.VUE_APP_WEBSITE_DOMAIN}/app/member/account`;
      } else {
        this.$router.push({ name: 'MyOrders' });
      }
    },
    login(){
        this.$router.push({ name: 'Login' });
    },
    gotoAcount() {
      if (Cookies.get('IvyCustomer_role') >= 3) {
        window.location.href = 'https://www.coachrun.com/app/member/account';
      } else {
        this.$router.push({ name: 'MyOrders' });
      }
    },
    gotoBooking() {
      if (Cookies.get('IvyCustomer_role') >= 3) {
        window.location.href = 'https://www.coachrun.com/app/member/account';
      } else {
        this.$router.push({ name: 'MyBookings' });
      }
    }

  }
};
</script>

<style scoped lang="scss">

</style>
