<template>
  <div class="header">
    <div class="header-left">
      <!-- <div class="logo" @click="skip('http://testwww.coachrun.com/')"> -->
      <div class="logo" @click="toShopping">
        <a href="/">
          <img src="@/assets/coachrunlogo.png">
        </a>
      </div>
      <ul class="header-title">
        <li>
          <router-link to="/bus-stations">Bus Stations</router-link>
        </li>
        <li>
          <a href="https://www.gotocharter.com">
            Bus Rental
          </a>
        </li>
        <li>
          <a href="https://www.coachrun.com/hotels/">
            Hotels
          </a>
        </li>
        <li>
          <a href="https://www.coachrun.com/ticket-policy/">
            Ticket Policy
          </a>
        </li>
      </ul>
    </div>

    <div class="header-right">
      <div class="login-register" v-if="!$store.state.isLogin">
                <span @click="login">
                    Login
                </span>
      </div>
      <div class="show-name" v-if="$store.state.isLogin">
        <span class="user-name" @click="gotoMine">Hello, {{getUserName()}}</span>
        <span class="logout" @click="logout">Logout</span>
      </div>
      <div class="shopping-cart" @click="skip('/cgi-bin/ivyecom.fcgi?a=shopcart_view&nm=1350154')">
        <el-badge :value="shopNum" :max="99" id="bus_shopping_cart_nav" :hidden="shopNum==0?true:false">
          <a href="/cgi-bin/ivyecom.fcgi?a=shopcart_view&nm=1350154">
            <i class="icon-basket"></i>
          </a>
        </el-badge>
      </div>
      <div class="live-chat">
        <a href="javascript:void(window.open('http://live.coachrun.com/chat.php?v=2&group=CoachRun&hcgs=MQ__&htgs=MQ__&hfk=MQ__&eh=aHR0cDovL3d3dy5jb2FjaHJ1bi5jb20vY2xpZW50LXJlc291cmNlL2NvYWNoLXJ1bi9pbWFnZXMvbG9nby5wbmc=','','width=590,height=1010,left=0,top=0,resizable=yes,menubar=no,location=no,status=yes,scrollbars=yes'))">
          <i class="icon-chat"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import VueCookie from 'vue-cookie';
  export default{
    name:'MyHeader',
    data(){
      return{
        navLists:[
          {"text":"Bus Stations","src":"/bus-stations"},
          {"text":"Bus Rental","src":"https://www.gotocharter.com"},
          {"text":"Hotel","src":"https://www.coachrun.com/hotel/"},
          {"text":"Ticket Policy","src":"https://www.coachrun.com/ticket-policy/"}
        ],
        userName:'',
        shopNum:0
      }
    },
    created(){
      var name;
      if (process.env.NODE_ENV == 'development'){
        name = localStorage.getItem('IvyCustomer_LoginToken');
      }else{
        name = VueCookie.get('IvyCustomer_LoginCookie');
      }
      // console.log(name);
      if(name){
        this.$store.commit('login');
        this.isLogin = this.$store.state.isLogin;
        // this.$store.commit('loginName',name);
      }
    },
    mounted(){
      this.shopNum = VueCookie.get('IvyCustomer_ShoppingItems');
    },
    methods:{
      getUserName(){
        // console.log(this.$store.state.userName);
        // this.userName = this.$store.state.userName!=""?this.$store.state.userName:VueCookie.get('IvyCustomer_FirstName');
        // if(this.userName == null || this.userName== undefined){
        //     this.userName = VueCookie.get('IvyCustomer_LoginEmail');
        // }
        // // console.log(this.userName);
        //  return this.userName;
        this.userName = VueCookie.get('IvyCustomer_FirstName');
        if(this.userName == null || this.userName== undefined){
          this.userName = VueCookie.get('IvyCustomer_LoginEmail')!=null?VueCookie.get('IvyCustomer_LoginEmail'):localStorage.getItem("loginName");
        }
        return this.userName;
      },
      skip(url){
        window.location.href = url;
      },
      changeColor(index){
        // this.$router.push({name: this.navLists[index].link});
        window.location.href = this.navLists[index].src;
      },
      toShopping(){
        if(process.env.NODE_ENV === 'production'){
          window.location.href = 'https://www.coachrun.com/';
        }else{
          window.location.href = 'http://testwww.coachrun.com/';
        }
      },
      toLive(){
        window.open('http://live.coachrun.com/chat.php?v=2&group=CoachRun&hcgs=MQ__&htgs=MQ__&hfk=MQ__&eh=aHR0cDovL3d3dy5jb2FjaHJ1bi5jb20vY2xpZW50LXJlc291cmNlL2NvYWNoLXJ1bi9pbWFnZXMvbG9nby5wbmc=','','width=590,height=1010,left=0,top=0,resizable=yes,menubar=no,location=no,status=yes,scrollbars=yes',"_blank");
      },
      gotoMine(){
        if(VueCookie.get('IvyCustomer_role')>=3){
            window.location.href = 'https://www.coachrun.com/app/member/account';
        }else{
            this.$router.push({name: 'MyOrders'});
        }
      },
      login(){
        this.$router.push({name: 'Login'});
      },
      register(){
        this.$router.push({name: 'Register'});
      },
      logout(){
        // this.$http.delete(this.$api.logout,{headers:{'Authorization':sessionStorage.getItem('IvyCustomer_LoginToken')}})
        this.$http.delete(this.$api.logout)
          .then((data) => {
            console.log(data);
            if(data.data.code==200){
              if (process.env.NODE_ENV === 'development'){
                localStorage.removeItem("IvyCustomer_LoginToken");
                localStorage.removeItem("loginName");
              }
              VueCookie.delete('IvyCustomer_LoginCookie');
              VueCookie.delete('front-sessionId');
              this.$store.commit('logout');
              this.$router.push({name: 'Login'});
            }else if(data.data.code==500){
              this.$message({
                message: data.data.msg,
                type: 'warning',
                center: true
              });
            }

          });
      }
    }
  }
</script>

<style scoped>
  .header-left{
    display: flex;
    align-items: baseline;
    margin-top: 8px;
  }
  .header-right{
    display: flex;
    align-items: center;
  }

  .header{
    height: 80px;
    width: 1170px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    cursor: pointer;
    background:rgba(255,255,255,1);
    padding: 15px 0;
    justify-content: space-between;
  }
  .logo{
    width: 132px;
    height: 26px;
  }
  .right-menu{
    display: flex;
  }
  .login-register{
    height: 36px;
    line-height: 34px;
    padding: 0 15px;
    border:1px solid #cdcdcd;
    display: flex;
    font-size:14px;
    border-radius:4px;
    color:rgba(51,51,51,1);
  }
  .show-name{
    height: 34px;
    line-height: 34px;
    margin-left: 150px;
    padding: 0 0 0 15px;
    display: flex;
    font-size:14px;
    color:rgba(51,51,51,1);
  }
  .bgColor{
    color: #009FEA;
  }
  .user-name{
    color: #00A2FF;
    white-space: nowrap;
  }
  .logout{
    margin-left: 16px;
    font-size:14px;
    padding: 0 15px;
  }
  .logout:hover {
    color:#00A2FF;;
  }
  .login{
    margin-right: 5px;
  }
  .register{
    margin-left: 5px;
  }
  .shopping-cart{
    margin-left:16px;
    font-size: 18px;
  }
  .shopping-cart a,.live-chat a {
    color: inherit;
    text-decoration: none;
  }
  .live-chat{
    margin-left: 16px;
    font-size: 18px;
  }
  .header-title{
    display: flex;
    align-items: center;
    margin: 0;
    padding-left: 30px;
  }
  .header-title li{
    white-space: nowrap;
    margin-left: 30px;
    text-align: center;
    font-size:16px;
    color: #333;
    padding: 15px;
  }
  .header-title li:first-child{
    margin-left: 0;
  }
  .header-title li a{
    text-decoration: none;
    color: #333;
  }
</style>
<style>
  #bus_shopping_cart_nav sup{
    display: inline-block;
    background-color: #FF6600;
    color: #FFFFFF;
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
</style>
