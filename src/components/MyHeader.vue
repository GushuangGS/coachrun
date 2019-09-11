<template>
    <el-header style="height: 80px;">
      <el-container>
        <div class="header-left">
          <div class="logo" @click="skip('https://www.coachrun.com/')">
            <img src="@/assets/coachrunlogo.png" alt="">
          </div>
          <ul class="title">
            <li v-for="(item,index) in navLists" :key="index">
              <a :href="item.src">
                {{item.text}}
              </a>
            </li>
          </ul>
        </div>
        <div class="header-right">
          <!-- <div class="login-register" v-show="!$store.state.isLogin"> -->
          <div class="login-register" v-show="!loginSuc">
            <span class="login" @click="login">
                Login
            </span>|
            <span class="register" @click="login">
                Register
            </span>
          </div>
          <!-- <div class="show-name" v-show="$store.state.isLogin"> -->
          <div class="show-name" v-show="loginSuc">
            <span class="user-name" @click="gotoMine">Hello, {{getUserName()}}</span>
            <span class="logout" @click="logout">Logout</span>
          </div>
          <div class="header-icon">
            <div class="shopping-cart">
              <img src="@/assets/shoppingcart.png" alt="" @click="skip('/cgi-bin/ivyecom.fcgi?a=shopcart_view&nm=1350154')">
            </div>
            <div class="live-chat">
              <a href="javascript:void(window.open('http://live.coachrun.com/chat.php?v=2&group=CoachRun&hcgs=MQ__&htgs=MQ__&hfk=MQ__&eh=aHR0cDovL3d3dy5jb2FjaHJ1bi5jb20vY2xpZW50LXJlc291cmNlL2NvYWNoLXJ1bi9pbWFnZXMvbG9nby5wbmc=','','width=590,height=1010,left=0,top=0,resizable=yes,menubar=no,location=no,status=yes,scrollbars=yes'))">
                <img src="@/assets/livechat.png">
              </a>
            </div>
          </div>
        </div>
      </el-container>
    </el-header>
</template>

<script>
    import VueCookie from 'vue-cookie';
    export default{
        name:'MyHeader',
        data(){
            return{
                navLists:[
                    {"text":"Bus Stations","link":"stations","src":"/bus-stations"},
                    {"text":"Bus Rental","link":"Login","src":"https://www.gotocharter.com"},
                    {"text":"Hotel","link":"MyOrders","src":"https://www.coachrun.com/hotel/"},
                    {"text":"Ticket Policy","link":"Register","src":"https://www.coachrun.com/ticket-policy/"}
                ],
                changeBg:0,
                userName:'',
                loginSuc:false
                // changeBg:this.$route.name
            }
        },
        created(){
            const name = localStorage.getItem('IvyCustomer_LoginToken');
            if(name){
              this.loginSuc = true;
            }

            // if(name){
            //     this.$store.commit('login');
            //     this.isLogin = this.$store.state.isLogin;
            //     // this.$store.commit('loginName',name);
            // }
        },
        methods:{
            getUserName(){
                // console.log(this.$store.state.userName);
                // this.userName = this.$store.state.userName!=""?this.$store.state.userName:VueCookie.get('IvyCustomer_FirstName');
                // if(this.userName == null || this.userName== undefined){
                //     this.userName = VueCookie.get('IvyCustomer_LoginEmail');
                // }
                // console.log(this.userName);
                this.userName = VueCookie.get('IvyCustomer_FirstName');
                if(this.userName == null || this.userName== undefined){
                    this.userName = VueCookie.get('IvyCustomer_LoginEmail')!=null?VueCookie.get('IvyCustomer_LoginEmail'):sessionStorage.getItem("loginName");
                }
                 return this.userName;
            },
            skip(url){//页面跳转
              window.location.href = url
            },
            changeColor(link){
              this.changeBg = link;
                // this.$router.push({name: this.navLists[index].link});
                // window.location.href = this.navLists[index].src;
            },
            gotoMine(){
                this.$router.push({name: 'MyOrders'});
            },
            login(){
                this.$router.push({name: 'Login'});
            },
            logout(){
                this.$http.delete(this.$api.logout)
                    .then((data) => {
                        console.log(data);
                        // sessionStorage.removeItem("IvyCustomer_LoginToken");
                        // sessionStorage.removeItem("loginName");
                        localStorage.removeItem("IvyCustomer_LoginToken");
                        // this.$store.commit('logout');
                        this.loginSuc = false;
                        this.$store.commit('loginName','');
                        this.$router.push({name: 'Login'});
                    });
            }
        }
    }
</script>
<style scoped>
  .el-container {
    word-spacing: normal;
    flex-direction: row;
  }
  .el-header {
    /* position: fixed; */
    width: 100%;
    z-index: 9999;
    height: 80px;
    margin: 0 auto;
    padding: 0px;
    background: white;
    /* box-shadow: 0 1px 4px 0 rgba(0,0,0,.25);
    -moz-box-box-shadow: 0 1px 4px 0 rgba(0,0,0,.25);
    -webkit-box-box-shadow: 0 1px 4px 0 rgba(0,0,0,.25); */
  }
  .el-header .el-container {
    padding: 15px 10px;
    margin: 0 auto;
    height: 100%;
    width: 1170px;
    display: flex;
    justify-content: space-between;
  }
  .header-left {
    display: flex;
    align-items: center;
  }
  .title{
        margin-left: 30px;
        padding: 15px;
  }
  .title a{
    font-size:16px;
        font-family:ArialMT;
        color:rgba(35,35,35,1);
        line-height:20px;
        display: block;
        height: 20px;
  }
  .header-right {
    display: flex;
    align-items: center;
  }
  .header-icon {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
.logo{
    width: 132px;
    height: 26px;
    cursor: pointer;
    /* margin-top: 27px; */
}
.right-menu{
    display: flex;
}
.login-register{
    cursor: pointer;
    height: 35px;
    line-height: 33px;
    padding: 0 15px;
    border:1px solid rgba(219,219,219,1);
    display: flex;
    font-size:14px;
    border-radius:4px;
    color:rgba(51,51,51,1);
}
.bgColor{
    color: #009FEA!important;
}
.user-name{
  white-space: nowrap;
  color:rgba(0,159,234,1);
  cursor: pointer;
}
.logout{
    margin-left: 10px;
    font-size:14px;
    color:rgba(0,159,234,1);
    font-weight: 600;
  cursor: pointer;
}
.login{
    margin-right: 5px;
}
.register{
margin-left: 5px;
}
.shopping-cart{
    margin-left:30px;
}
.live-chat{
    margin-left: 28px;
}
.shopping-cart,.live-chat{
    /* margin-top: 32px; */
}
.title{
    display: flex;
    align-items: center;
    margin: 0px;
}
.title li{
    white-space: nowrap;
    margin-left: 40px;
    text-align: center;
    font-weight: bold;
}
.title li a{
  text-decoration: none;
  color:rgba(35,35,35,1);
  font-weight: normal;
}
.nav {
  font-weight: bold;
}
</style>
