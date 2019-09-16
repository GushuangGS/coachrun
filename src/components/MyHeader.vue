<template>
    <div class="header">
        <div class="logo" @click="skip('https://www.coachrun.com/')">
            <img src="@/assets/coachrunlogo.png" alt="">
        </div>
        <ul class="header-title">
            <li v-for="(list,index) in navLists" :key="index">
                <!-- <span :class="{ bgColor:changeBg == index}" @click="changeColor(index)"> -->
                <span @click="changeColor(index)">
                    {{list.text}}
                </span>
            </li>
        </ul>
        <div class="login-register" v-show="!$store.state.isLogin">
            <span class="login" @click="login">
                Login
            </span>|
            <span class="register" @click="register">
                Register
            </span>
        </div>
        <div class="show-name" v-show="$store.state.isLogin">
            <!-- <span class="user-name" @click="gotoMine">Hello, {{$store.state.loginName}}</span> -->
            <span class="user-name" @click="gotoMine">Hello, {{getUserName()}}</span>
            <span class="logot" @click="logout">Logout</span>
        </div>
        <div class="shopping-cart" @click="skip('/cgi-bin/ivyecom.fcgi?a=shopcart_view&nm=1350154')">
            <img src="@/assets/shoppingcart.png" alt="">
        </div>
        <div class="live-chat" @click="toLive">
            <img src="@/assets/livechat.png" alt="">
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
                    // {"text":"Bus Routes","link":"MyOrders","src":"https://www.baidu.com"},
                    {"text":"Bus Stations","src":"https://www.coachrun.com/bus-stations/"},
                    {"text":"Bus Rental","src":"https://www.gotocharter.com"},
                    {"text":"Hotel","src":"https://www.coachrun.com/hotel/"},
                    {"text":"Ticket Policy","src":"https://www.coachrun.com/ticket-policy/"}
                ],
                changeBg:0,
                userName:''
            }
        },
        created(){
            const name = localStorage.getItem('IvyCustomer_LoginToken');

            if(name){
                this.$store.commit('login');
                this.isLogin = this.$store.state.isLogin;
                // this.$store.commit('loginName',name);
            }
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
                this.changeBg = index;
                // this.$router.push({name: this.navLists[index].link});
                window.location.href = this.navLists[index].src;
            },
            toShopping(){
                window.location.href = 'testwww.coachrun.com/cgi-bin/ivyecom.cgi?a=shopcart_view&nm=1350154';
            },
            toLive(){
                // window.location.href = 'testwww.coachrun.com/cgi-bin/ivyecom.cgi?a=shopcart_view&nm=1350154';
                window.open='http://live.coachrun.com/chat.php?v=2&group=CoachRun&hcgs=MQ__&htgs=MQ__&hfk=MQ__&eh=aHR0cDovL3d3dy5jb2FjaHJ1bi5jb20vY2xpZW50LXJlc291cmNlL2NvYWNoLXJ1bi9pbWFnZXMvbG9nby5wbmc=','','width=590,height=1010,left=0,top=0,resizable=yes,menubar=no,location=no,status=yes,scrollbars=yes';
            },
            gotoMine(){
                this.$router.push({name: 'MyOrders'});
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
                        localStorage.removeItem("IvyCustomer_LoginToken");
                        localStorage.removeItem("loginName");
                        VueCookie.delete('IvyCustomer_LoginCookie');
                        this.$store.commit('logout');
                        this.$store.commit('loginName','');
                        this.$router.push({name: 'Login'});
                    });
            }
        }
    }
</script>

<style scoped>
.header{
    height: 80px;
    width: 1240px;
    margin: 0 auto;
    padding-left: 100px;
    display: flex;
    align-items: center;
    /* padding: 0 150px 0 350px; */
    cursor: pointer;
    background:rgba(255,255,255,1);
}
.logo{
    width: 132px;
    height: 26px;
}
.right-menu{
    display: flex;
}
.login-register{
    height: 35px;
    line-height: 35px;
    margin-left: 230px;
    padding: 0 15px;
    border:1px solid rgba(219,219,219,1);
    display: flex;
    font-size:14px;   
    border-radius:4px;      
    color:rgba(51,51,51,1);
}
.show-name{
    height: 35px;
    line-height: 35px;
    margin-left: 150px;
    /* margin: 23px 20px 22px 150px; */
    padding: 0 15px;
    display: flex;
    font-size:14px;   
    color:rgba(51,51,51,1);
}
.bgColor{
    color: #009FEA;
}
.user-name{
    white-space: nowrap;
}
.logot{
    margin-left: 20px;
    font-size:14px;
    color:rgba(0,159,234,1);
    font-weight: 600;
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
.header-title{
    display: flex;
    align-items: center;
    margin: 0;
}
.header-title li{
    white-space: nowrap;
    margin-left: 40px;
    text-align: center;
    font-weight: bold;
}
.header-title li a{
    text-decoration: none;
    color:rgba(35,35,35,1);
    font-weight: bold;
}
</style>