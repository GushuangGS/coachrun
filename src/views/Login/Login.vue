<template>
    <div class="login-bg">
    <div class="login">
       <h3 class="login-title">Log In</h3>
       <el-form class="login-form" :model="loginInfo" :rules="rules" ref="loginForm" label-width="0px">
            <el-form-item prop="email" :error="err">
                <el-input v-model="loginInfo.email" placeholder="Email" @input="changeInp" @blur="blurInp"></el-input>
            </el-form-item> 
            <el-form-item prop="password">
                <el-input type="password" v-model="loginInfo.password" placeholder="Password"></el-input>
            </el-form-item>
            <div class="forget-pass" @click="forgetPass">Forgot Password?</div>
            <!-- <div class="check">
                <input id="chkAdmin" type="checkbox" v-model="item"> 
                <label for="chkAdmin" class="rem-me">Remember me</label>
            </div> -->
            <el-button native-type="submit" @click.native.prevent="login" class="login-btn uiButtonBackground">Log In</el-button>
       </el-form>
       <div class="line">
           <span class="line-left"></span>
           <span class="line-title">or</span>
           <span class="line-right"></span>
       </div>
       <div class="other-login">
           <!-- <div class="facebook-login" @click="facebook_login">
               <i class="icon-facebook-official facebook-icon"></i>
               <span>Facebook</span>
           </div>
           <div class="google-login" @click="google_login">
                <img src="@/assets/google.png" alt="">
                <span>Google</span>
           </div> -->
           <el-button class="facebook-login" @click="facebook_login" :disabled="disabledFb">
               <i class="icon-facebook-official facebook-icon"></i>
               <span class="fb-font">Facebook</span>
           </el-button>
           <el-button class="google-login" @click="google_login" :disabled="disabledGg">
                <img class="googl-img" src="@/assets/google.png" alt="">
                <span class="gg-font">Google</span>
           </el-button>
       </div>
       <div class="register">
           <span class="register-info">Not a CoachRun member?</span>
           <span class="to-register" @click="gotoRegister">Register</span>
       </div>
       <!-- <div class="hr"></div>
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
       </div> -->
    </div>
    </div>
</template>

<script>
    import MobileDetect  from "mobile-detect"
    import Cookies from 'js-cookie'
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
                    // email: [{ required: true, trigger: 'blur' ,message: 'Please enter your full email address.'},
                    //         { type: 'email', message: 'Please enter a valid email address.', trigger: 'blur'}],
                    password: [{ required: true, trigger: 'blur' ,message: 'Please enter your password.'},
                            { min: 6, message: 'Please enter a valid password.', trigger: 'blur' }],
                },
                userId:'',
                pageUrl:'',
                err:'',
                loading:Object,
                disabledFb:false,
                disabledGg:false
            }
        },
        created(){
            if(this.$route.path.indexOf('logout')!=-1 && Cookies.get('IvyCustomer_LoginCookie')){
                this.logout();
            }
            var md = new MobileDetect(window.navigator.userAgent);
            var auth=this.firebase.auth();
            if(md.mobile()){
                auth.getRedirectResult().then((result)=> {
                    result.user.getIdToken(true).then((idToken)=> {
                        console.log(idToken,result);
                        if(result.additionalUserInfo.providerId == "google.com"){
                            this.httpLogin(1,idToken,result);
                        }else if(result.additionalUserInfo.providerId == "facebook.com"){
                            this.httpLogin(3,idToken,result);
                        }
                    }).catch((error)=> {
                    });
                }).catch((error)=> {       
                });
            }

        },
        methods:{
            blurInp(){
                if(this.loginInfo.email == ''){
                    this.err = 'Please enter your full email address.';
                }
            },
            changeInp(){
                let reg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                if(this.loginInfo.email!=''){
                    if(!reg.test(this.loginInfo.email)){
                        this.err = 'Please enter a valid email address.';
                    }else{
                        this.err = '';
                    }
                }else{
                    this.err = 'Please enter your full email address.'
                }
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
            logout(){
                // let loginCookie = decodeURI(Cookies.get('IvyCustomer_LoginCookie'));
                // let token = loginCookie.split('+|+')[2];
                // // console.log(token)
                // if(token==undefined){
                //     token = localStorage.getItem('IvyCustomer_LoginToken');
                // }
                // console.log(token);
                // if(token!=null){
                    this.$http.delete(this.$api.logout)
                    .then((data) => {
                        console.log(data);
                        if(data.data.code==200){
                            localStorage.removeItem("IvyCustomer_LoginToken");
                            localStorage.removeItem("loginName");
                            localStorage.clear();
                            // Cookies.remove('IvyCustomer_LoginCookie');
                            this.$store.commit('logout');
                            this.$store.commit("notifiyBtnHide");
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
                console.log('login')
                // console.log(this.item);//true 则选择记住密码
                this.$refs.loginForm.validate((valid)=>{
                    if (valid){
                        this.$http.post(this.$api.login,
                            { username: this.loginInfo.email, password:this.loginInfo.password})
                            .then((data) => {
                                console.log(data);
                                if(data.data.code==200){
                                    // this.pageUrl = this.getId("pageUrl");
                                    
                                    // let loginCookie = decodeURI(Cookies.get('IvyCustomer_LoginCookie'));
                                    // if(loginCookie == undefined) return
                                    //     let token = loginCookie.split('+|+')[2]
                                    // if (process.env.NODE_ENV == 'production'){
                                    //     if(!token && loginCookie){
                                    //         this.$http.post(this.$api.authorization,{loginCookie:loginCookie})
                                    //             .then( res => {
                                    //                 let token = res.data.token;
                                    //                 let newLoginCookie = `${loginCookie}+|++|+${token}`
                                    //                 // Cookies.set('IvyCustomer_LoginCookie',newLoginCookie);
                                    //             })
                                    //     }
                                    // }
                                    // Cookies.set('IvyCustomer_LoginCookie','null%2B%7C%undefined2B%2B%7C%2Bundefined');
                                    console.log(process.env.NODE_ENV);
                                    this.processEnv(data);

                                    // if (process.env.NODE_ENV == 'development'){
                                    //     localStorage.setItem("IvyCustomer_LoginToken", data.data.data.token);
                                    //     localStorage.setItem("loginName", data.data.data.user.email);
                                    //     if(this.pageUrl){
                                    //         window.location.href = this.pageUrl;
                                    //     }else{
                                    //         this.$router.push({name: 'MyOrders'});
                                    //     }
                                    // }else if(process.env.NODE_ENV == 'sandbox'){
                                    //     if(this.pageUrl){
                                    //         window.location.href = this.pageUrl;
                                    //     }else{
                                    //         this.$router.push({name: 'MyOrders'});
                                    //     }
                                    // }else{
                                    //     if(this.pageUrl){
                                    //         window.location.href = this.pageUrl;
                                    //     }else{
                                    //         if(Cookies.get('IvyCustomer_role')>=3){
                                    //             window.location.href = 'https://www.coachrun.com/app/member/account';
                                    //         }else{
                                    //             this.$router.push({name: 'MyOrders'});
                                    //         }
                                    //     }
                                    // }
                                    // this.$cookie.set('front-sessionId', data.data.data.user.id);
                                    // this.$store.commit('login'); 

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
            },
            facebook_login(){
                var md = new MobileDetect(window.navigator.userAgent);
                var provider = new this.firebase.auth.FacebookAuthProvider();
                provider.addScope('email');
                provider.addScope('public_profile');
                var auth=this.firebase.auth();
                if(md.mobile()){
                    this.openFullScreenFacebook();
                    this.disabledFb = true;
                    auth.signInWithRedirect(provider);
                }else{
                    this.openFullScreenFacebook();
                    this.disabledFb = true;
                    auth.signInWithPopup(provider).then((result)=> {
                        result.user.getIdToken(true).then((idToken)=> {
                            console.log(idToken,result);
                            this.disabledFb = false;
                            this.closeFullScreen();
                            this.httpLogin(3,idToken,result);
                        }).catch((error)=> {
                            this.disabledFb = false;
                            this.closeFullScreen();
                        });
                    }).catch((error)=> {
                        this.disabledFb = false;
                        this.closeFullScreen();
                    });
                }
            },

            google_login(){//gushuang0@gmail.com   https://www.coachrun.com/render  http://sandbox.gotobus.com/api/users/login-with-provider
                var md = new MobileDetect(window.navigator.userAgent);
                var provider = new this.firebase.auth.GoogleAuthProvider();
                var auth=this.firebase.auth();
                if(md.mobile()){
                    this.openFullScreenGoogle();
                    this.disabledGg = true;
                    auth.signInWithRedirect(provider);
                    // auth.getRedirectResult().then((result)=> {
                    //     result.user.getIdToken(true).then((idToken)=> {
                    //         console.log(idToken,result);
                    //         this.httpLogin(1,idToken,result);
                    //     }).catch((error)=> {
                    //     });
                    // }).catch((error)=> {                  
                    // });
                }else{
                    this.openFullScreenGoogle();
                    this.disabledGg = true;
                    auth.signInWithPopup(provider).then((result)=> {
                        result.user.getIdToken(true).then((idToken)=> {
                            console.log(idToken,result);
                            this.disabledGg = false;
                            this.closeFullScreen();
                            this.httpLogin(1,idToken,result);
                        }).catch((error)=> {
                            this.disabledGg = false;
                            this.closeFullScreen();
                        });
                    }).catch((error)=> {
                        this.disabledGg = false;
                        this.closeFullScreen();
                    });
                }
            },
            openFullScreenGoogle(){
                this.loading =this.$loading({
                    lock: true,
                    spinner: 'el-icon-loading',
                    background: '#fff',
                    target: document.querySelector('.google-login')
                });
                return this.loading;
            },
            openFullScreenFacebook(){
                this.loading =this.$loading({
                    lock: true,
                    spinner: 'el-icon-loading',
                    background: '#fff',
                    target: document.querySelector('.facebook-login')
                });
                return this.loading;
            },
            closeFullScreen(){
                this.loading.close();
            },
            httpLogin(linkType,idToken,result){
                this.$http.post(this.$api.loginWithProvider,
                    { linkType: linkType, firebaseToken:idToken,result:result})
                    .then((data)=>{
                        console.log(data);
                        if(data.data.code==200){
                            this.processEnv(data);
                        }else{
                            this.$message({
                                message: data.data.msg,
                                type: 'warning',
                                center: true
                            });
                        }
                    })
            },
            processEnv(data){
                this.pageUrl = this.getId("pageUrl");
                if (process.env.NODE_ENV == 'development'){
                    localStorage.setItem("IvyCustomer_LoginToken", data.data.data.token);
                    localStorage.setItem("loginName", data.data.data.user.email);
                    if(this.pageUrl){
                        window.location.href = this.pageUrl;
                    }else{
                        this.$router.push({name: 'MyOrders'});
                    }
                }else if(process.env.NODE_ENV == 'sandbox'){
                    if(this.pageUrl){
                        window.location.href = this.pageUrl;
                    }else{
                        this.$router.push({name: 'MyOrders'});
                    }
                }else{
                    if(this.pageUrl){
                        window.location.href = this.pageUrl;
                    }else{
                        if(Cookies.get('IvyCustomer_role')>=3){
                            window.location.href = 'https://www.coachrun.com/app/member/account';
                        }else{
                            this.$router.push({name: 'MyOrders'});
                        }
                    }
                }
                console.log(data.data.data.user.newNotificationCount)
                Cookies.set('IvyCustomer_NewNotificationCount', data.data.data.user.newNotificationCount?data.data.data.user.newNotificationCount:0 , { domain: process.env.VUE_APP_COOKIE_DOMAIN});
                Cookies.set('front-sessionId', data.data.data.user.id);
                this.$store.commit('login');
                this.$store.commit('notifiyBtnShow');
                this.$store.commit('showUserName',this.getIvyName());
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
        background: #eeeeee;
        /* margin-top: 20px; */
        padding: 100px;
    }
    .login-form{
        width: 100%;
        padding: 0 20px 0 20px;
    }
    .login{
        width: 448px;
        min-height: 475px;
        background:rgba(255,255,255,1);
        /* background: skyblue; */
        border-radius:2px;
        margin: 0 auto;
        padding: 20px 30px 30px 30px;
    }
    .login-title{
        margin-left: 20px;
        font-size: $HeadlineSize;
    }
    >>> .el-form-item__label{
        font-size: $Body1Size;
    }
    .login-btn{
        width: 100%;
        height: 56px;
        font-size: $HeadlineSize;
        margin-top: 20px;
        background:#FF9A0D;
        color:rgba(255,255,255,1);
        border: none;
    }
    .forget-pass{
        font-size:$Body2Size;
        color:rgba(0,162,255,1);
        text-align: end;
        cursor: pointer;
        text-align: right;
        // margin-left: 220px;
        // width: 120px;
    }
    .check{
        display: flex;
        align-items: center;
        margin-top: 20px;
    }
    .rem-me{
        font-size:$Body2Size;
        color:rgba(51,51,51,1);
        margin-left: 10px;
        cursor: pointer;
    }
    .register{
        margin-top: 30px;
        text-align: center;
        font-size:$Body2Size;
    }
    .register-info{
        color:rgba(51,51,51,1);
    }
    .to-register{        
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
        font-size:$CaptionSize;
        color:rgba(102,102,102,1);
        margin-top: 10px;
    }
    >>> .el-input__inner::-webkit-input-placeholder{
        font-size: $Body2Size;
        color:rgba(102,102,102,1);
    }

    .line{
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .line-left,.line-right{
        width: 40%;
        height: 1.1px;
        background: #efefef;
    }
    .line-title{
        width: 20%;
        text-align: center;
        font-size: $Body2Size;
        color: $fontColor2;
    }
    .other-login{
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
    }
    .google-login,.facebook-login{
        // width: 156px;
        width: 48%;
        height: 40px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
    }
    .google-login,.facebook-login{
        border:1px solid #DFDFDF;
    }
    .googl-img{
        margin-right: 11px;
        width: 18px;
        height: 18px;
    }
    .fb-font,.gg-font{
        color: #333;
        font-size: $Body2Size;
    }
    .facebook-icon{
        color: #3B5998;
        font-size: 18px;
        margin-right: 11px;
    }

    @media screen and (max-width: 768px){
        .login-bg{
            background: #fff;
            box-shadow: 0px 1px 2px 0px #333;
            padding: 20px 0 20px 0;
        }
        .login{
            width: 280px;
            max-width: 448px;
            padding: 20px 5px 30px 5px;
        }
        .login-form{
            padding: 0;
        }
        .line{
            padding: 20px 0;
        }
        .other-login{
            padding: 0;
        }
        .login-title{
            margin-left: 0;
        }
    }
</style>
<style scoped>
    >>> .google-login>span{
        display: flex;
        align-items: center;
    }
    >>> .el-loading-spinner{
        top: 90%;
    }
</style>