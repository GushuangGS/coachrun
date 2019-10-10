<template>
    <div class="header">
        <div class="header-left">
            <div class="logo" @click="skip('http://testwww.coachrun.com/')">
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
        </div>

        <div class="header-right">
            <div class="login-register" v-if="!$store.state.isLogin">
                <span @click="login">
                    Login
                </span>
            </div>
            <div class="show-name" v-if="$store.state.isLogin">
                <span class="user-name" @click="gotoMine">Hello, {{getUserName()}}</span>
                <span class="logot" @click="logout">Logout</span>
            </div>
            <div class="shopping-cart" @click="skip('/cgi-bin/ivyecom.fcgi?a=shopcart_view&nm=1350154')">
                <!-- <img src="@/assets/shoppingcart.png" alt=""> -->
                <i class="icon-basket"></i>
            </div>
            <div class="live-chat" @click="toLive">
                <!-- <img src="@/assets/livechat.png" alt=""> -->
                <i class="icon-chat"></i>
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
                userName:''
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
                window.location.href = 'testwww.coachrun.com/cgi-bin/ivyecom.cgi?a=shopcart_view&nm=1350154';
            },
            toLive(){
                window.open('http://live.coachrun.com/chat.php?v=2&group=CoachRun&hcgs=MQ__&htgs=MQ__&hfk=MQ__&eh=aHR0cDovL3d3dy5jb2FjaHJ1bi5jb20vY2xpZW50LXJlc291cmNlL2NvYWNoLXJ1bi9pbWFnZXMvbG9nby5wbmc=','','width=590,height=1010,left=0,top=0,resizable=yes,menubar=no,location=no,status=yes,scrollbars=yes',"_blank");
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
    color: #009fea;
    white-space: nowrap;
}
.logot{
    margin-left: 20px;
    font-size:14px;
    color:rgba(0,159,234,1);
    font-weight: 600;
    border: 1px solid;
    padding: 0 15px;
    border-radius: 4px;
}
.login{
    margin-right: 5px;
}
.register{
margin-left: 5px;
}
.shopping-cart{
    margin-left:30px;
    font-size: 18px;
}
.live-chat{
    margin-left: 28px;
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
    font-weight: bold;
}
</style>
