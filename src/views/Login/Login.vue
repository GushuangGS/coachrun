<template>
    <div class="login-bg">
    <div class="login">
       <h3 class="login-title">Log In</h3>
       <el-form class="login-form" :model="loginInfo" :rules="rules" ref="loginForm" label-width="0px">
            <el-form-item prop="email" :error="err">
                <el-input v-model="loginInfo.email" placeholder="Email" @input="blurInp"></el-input>
            </el-form-item> 
            <el-form-item prop="password">
                <el-input type="password" v-model="loginInfo.password" placeholder="Password"></el-input>
            </el-form-item>
            <div class="forget-pass" @click="forgetPass">Forgot Password?</div>
            <!-- <div class="check">
                <input id="chkAdmin" type="checkbox" v-model="item"> 
                <label for="chkAdmin" class="rem-me">Remember me</label>
            </div> -->
            <el-button @click.native.prevent="login" class="login-btn">Log In</el-button>
       </el-form>
       <div class="hr"></div>
       <div class="register">
           <span class="register-info">Not a CoachRun member?</span>
           <span class="to-register" @click="gotoRegister">Register</span>
       </div>
       <div class="bot-info">
           <div class="intro">
               <img class="intro-img" src="@/assets/offers.png" alt="">
               <span class="intro-info">Exclusive Offers</span>
           </div>
           <div class="intro">
                <img class="intro-img" src="@/assets/booking.png" alt="">
                <span class="intro-info">Manage Booking</span>
            </div>
            <div class="intro">
                <img class="intro-img" src="@/assets/chechkouts.png" alt="">
                <span class="intro-info">Faster Checkouts</span>
            </div>  
       </div>
    </div>
    </div>
</template>

<script>
    import VueCookie from 'vue-cookie';
    export default{
        name:'Login',
        data(){
            return{
                // item:false,
                loginInfo: {
                    email: '',
                    password: '',
                },
                rules: {
                    email: [{ required: true, trigger: 'blur' ,message: 'Please enter your full email address.'},
                            { type: 'email', message: 'Please enter a valid email address.', trigger: 'blur'}],
                    // email:[{required: true, message: 'Please enter your full email address.'}],
                    password: [{ required: true, trigger: 'blur' ,message: 'Please enter your password.'},
                            { min: 6, message: 'Please enter a valid password.', trigger: 'blur' }],
                },
                userId:'',
                pageUrl:'',
                err:'',
            }
        },
        created(){
            if(this.$route.path.indexOf('logout')!=-1){
                this.logout();
            }
        },
        methods:{
            blurInp(){
                // let reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
                // if(this.loginInfo.email!=''){
                //     if(!reg.test(this.loginInfo.email)){
                //         this.err = 'Please enter a valid email address.';
                //     }else{
                //         this.err = '';
                //     }
                // }
                // console.log(reg.test(this.loginInfo.email));
                // console.log(this.loginInfo.email)
            },
            //忘记密码
            forgetPass(){
                this.$router.push({name: 'PasswordRetrieval'});
            },
            getId(name){//aid
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if(r != null) return unescape(r[2]);
                return null;
            },
            logout(){
                let loginCookie = decodeURI(VueCookie.get('IvyCustomer_LoginCookie'));
                let token = loginCookie.split('+|+')[2];
                // console.log(token)
                if(token==undefined){
                    token = localStorage.getItem('IvyCustomer_LoginToken');
                }
                console.log(token);
                // if(token!=null){
                    this.$http.delete(this.$api.logout)
                    .then((data) => {
                        console.log(data);
                        if(data.data.code==200){
                            localStorage.removeItem("IvyCustomer_LoginToken");
                            localStorage.removeItem("loginName");
                            VueCookie.delete('IvyCustomer_LoginCookie');
                            this.$store.commit('logout');
                        }else if(data.data.code==500){
                            this.$message({
                                message: data.data.msg,
                                type: 'warning',
                                center: true
                            });
                        }
                        
                    });
                // }
            },
            login(){
                // console.log(this.item);//true 则选择记住密码
                this.$refs.loginForm.validate((valid)=>{
                    if (valid){
                        this.$http.post(this.$api.login,
                            { username: this.loginInfo.email, password:this.loginInfo.password})
                            .then((data) => {
                                console.log(data);
                                if(data.data.code==200){
                                    this.pageUrl = this.getId("pageUrl");

                                    // if(process.env.NODE_ENV === 'production'){
                                    //     if(VueCookie.get('IvyCustomer_role')>=3){
                                    //         this.$router.push({path:'/app/member/account'});
                                    //     }else{
                                    //         if(this.pageUrl){
                                    //             window.location.href = this.pageUrl;
                                    //         }else{
                                    //             this.$router.push({name: 'MyOrders'});
                                    //         }
                                    //     }
                                    // }
                                    
                                    let loginCookie = decodeURI(VueCookie.get('IvyCustomer_LoginCookie'));
                                    if(loginCookie == undefined) return
                                        let token = loginCookie.split('+|+')[2]
                                    if (process.env.NODE_ENV == 'production'){
                                        if(!token){
                                            this.$http.post(this.$api.authorization,{loginCookie:loginCookie})
                                                .then( res => {
                                                    let token = res.data.token;
                                                    let newLoginCookie = `${loginCookie}+|+${token}`
                                                    VueCookie.set('IvyCustomer_LoginCookie',newLoginCookie);
                                                    console.log(newLoginCookie);
                                                    console.log(res);
                                                })
                                        }
                                    }
                                    console.log(process.env.NODE_ENV);
                                    if (process.env.NODE_ENV == 'development'){
                                        localStorage.setItem("IvyCustomer_LoginToken", data.data.data.token);
                                        localStorage.setItem("loginName", data.data.data.user.email);
                                        if(this.pageUrl){
                                            window.location.href = this.pageUrl;
                                        }else{
                                            this.$router.push({name: 'MyOrders'});
                                        }
                                    }else{
                                        if(this.pageUrl){
                                            window.location.href = this.pageUrl;
                                        }else{
                                            if(VueCookie.get('IvyCustomer_role')>=3){
                                                this.$router.push({path:'/app/member/account'});
                                            }else{
                                                this.$router.push({name: 'MyOrders'});
                                            }
                                        }
                                    }
                                    this.$cookie.set('front-sessionId', data.data.data.user.id);
                                    this.$store.commit('login'); 

                                }else if(data.data.code==500){
                                    this.$message({
                                        message: data.data.msg,
                                        type: 'warning',
                                        center: true
                                    });
                                }
                            });
                    }
                })
            },
            gotoRegister(){
                this.$router.push({name: 'Register'});
            }
        }
    }
</script>

<style lang="scss" scoped>
    .hr{
        width: 330px;
        height: 1px;
        background: #EFEFEF;
        border: 0.5px solid #EFEFEF;
        margin-top: 30px;
        margin-left: 30px;
    }
    .login-bg{
        width: 100%;
        height: 100%;
        background: #F5F5F5;
        /* margin-top: 20px; */
        padding: 50px;
    }
    .login-form{
        width: 100%;
        padding: 0 20px 0 20px;
    }
    .login{
        width: 448px;
        min-height: 525px;
        background:rgba(255,255,255,1);
        /* background: skyblue; */
        border-radius:2px;
        margin: 0 auto;
        padding: 20px 30px 30px 30px;
    }
    .login-title{
        margin-left: 20px;
        font-size: 20px;
    }
    >>> .el-form-item__label{
        font-size: 16px;
    }
    .login-btn{
        width: 100%;
        height: 56px;
        font-size: 20px;
        margin-top: 20px;
        background:#FF9A0D;
        color:rgba(255,255,255,1);
        border: none;
    }
    .forget-pass{
        font-size:14px;
        color:rgba(0,162,255,1);
        text-align: end;
        cursor: pointer;
        margin-left: 220px;
        width: 120px;
    }
    .check{
        display: flex;
        align-items: center;
        margin-top: 20px;
    }
    .rem-me{
        font-size:14px;
        color:rgba(51,51,51,1);
        margin-left: 10px;
        cursor: pointer;
    }
    .register{
        margin-top: 30px;
        text-align: center;
        /* font-weight: 600; */
    }
    .register-info{
        font-size:14px;
        color:rgba(51,51,51,1);
    }
    .to-register{
        font-size:14px;         
        color:rgba(0,162,255,1);
        margin-left: 10px;
        cursor: pointer;
    }
    .bot-info{
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
        padding: 0 25px 0 25px;
    }
    .intro{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .intro-img{
        width:28px;
        height:28px;
    }
    .intro-info{
        font-size:12px;
        color:rgba(102,102,102,1);
        margin-top: 10px;
    }
    >>> .el-input__inner::-webkit-input-placeholder{
        font-size: 14px;
        color:rgba(102,102,102,1);
    }
</style>