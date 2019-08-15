<template>
    <div class="header">
        <!-- <el-button @click="login">login</el-button> -->
        <div class="logo" @click="toHome">
            <img src="@/assets/coachrunlogo.png" alt="">
        </div>
        <ul class="title">
            <li v-for="(list,index) in navLists" :key="index">
                <span class="nav" :class="{ bgColor:changeBg == index}" @click="changeColor(index)">
                    {{list.text}}
                </span>
                <!-- <router-link :to="{name:'UserCenter'}">
                    {{list.text}}
                </router-link> -->
            </li>
            <!-- <li>
                <router-link :to="{name:'UserCenter'}">Bus Routes</router-link>
            </li>
            <li>
                <router-link :to="{name:'UserCenter'}">Bus Stations</router-link>
            </li>
            <li>
                <router-link :to="{name:'UserCenter'}">Bus Rental</router-link>
            </li>
            <li>
                <router-link :to="{name:'UserCenter'}">Hotel</router-link>
            </li>
            <li>
                <router-link :to="{name:'UserCenter'}">Ticket Policy</router-link>
            </li> -->
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
            <!-- <span class="user-name">Hello, {{getName()}}</span> -->
            <span class="user-name" @click="gotoMine">Hello, {{$cookie.get('display')}}</span>
            <span class="logot" @click="logout">Logout</span>
        </div>
        <div class="shopping-cart">
            <img src="@/assets/shoppingcart.png" alt="">
        </div>
        <div class="live-chat">
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
                    {"text":"Bus Routes","link":"MyOrders","src":"https://www.baidu.com"},
                    {"text":"Bus Stations","link":"MyBookings","src":"https://element.eleme.cn"},
                    {"text":"Bus Rental","link":"Login","src":"https://bootstrap-vue.js.org"},
                    {"text":"Bus Hotel","link":"MyOrders","src":"https://lanhuapp.com"},
                    {"text":"Ticket Policy","link":"Register","src":"https://www.baidu.com"}
                ],
                changeBg:0
            }
        },
        created(){
            const name = VueCookie.get('display');
            if(name){
                this.$store.commit('login');
                this.isLogin = this.$store.state.isLogin;
                this.$store.commit('loginName',name);
            }
        },
        methods:{
            toHome(){
                alert("go to home");
            },
            changeColor(index){
                this.changeBg = index;
                // this.$router.push({name: this.navLists[index].link});
                // window.location.href = this.navLists[index].src;
            },
            gotoMine(){
                // this.$router.push({name: 'MyOrders'});
            },
            login(){
                this.$router.push({name: 'Login'});
            },
            register(){
                this.$router.push({name: 'Register'});
            },
            logout(){
                this.$confirm('是否确认退出？', '登出', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '取消'
                }).then(() => {
                    this.$http.delete(this.$api.logout)
                                .then((data) => {
                                    console.log(data);
                                    this.$cookie.delete('display');
                                    this.$store.commit('logout');
                                    this.$router.push({name: 'MyBookings'});
                                });
                });
            },
            getName(){
                return this.$store.state.loginName;
            }
        }
    }
</script>

<style scoped>
.header{
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 150px 0 350px;
    cursor: pointer;
    background:rgba(255,255,255,1);
}
.logo{
    width: 132px;
    height: 26px;
    /* margin-top: 27px; */
}
.right-menu{
    display: flex;
}
.login-register{
    height: 35px;
    line-height: 35px;
    /* margin: 23px 20px 22px 250px; */
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
    margin: 23px 20px 22px 150px;
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
.shopping-cart,.live-chat{
    /* margin-top: 32px; */
}
.title{
    display: flex;
    align-items: center;
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
    font-weight: bold;
}

</style>