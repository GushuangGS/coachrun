<template>
    <div class="login-bg">
    <div class="login">
       <h3 class="login-title">Log In</h3>
       <el-form :model="loginInfo" :rules="rules" ref="loginForm" label-width="90px">
            <el-form-item prop="email" label="Email:">
                <el-input v-model="loginInfo.email"></el-input>
            </el-form-item> 
            <el-form-item label="Password:" prop="password">
                <el-input type="password" v-model="loginInfo.password"></el-input>
            </el-form-item>
            <div class="forget-pass" @click="forgetPass">Forgot Password?</div>
            <!-- <div class="check">
                <input id="chkAdmin" type="checkbox" v-model="item"> 
                <label for="chkAdmin" class="rem-me">Remember me</label>
            </div> -->
            <el-button @click.native.prevent="login" class="login-btn">Log In</el-button>
       </el-form>
       <div class="register">
           <span class="register-info">Not a CoachRun member?</span>
           <span class="to-register" @click="gotoRegister">Register Now</span>
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
                    email: [{ required: true, trigger: 'blur' ,message: 'Enter your full email address.'},
                            { type: 'email', message: 'Please enter the correct email address', trigger: ['blur', 'change']}],
                    password: [{ required: true, trigger: 'blur' ,message: 'Please enter your password.'},
                            { min: 6, message: 'Please enter more than 6 characters.', trigger: 'blur' }],
                }
            }
        },
        //页面加载调用获取cookie值
        mounted() {
            this.getCookie();
        },
        methods:{
            //忘记密码
            forgetPass(){
                this.$router.push({name: 'PasswordRetrieval'});
            },
            login(){
                // console.log(this.item);//true 则选择记住密码
                this.$refs.loginForm.validate((valid)=>{
                    if (valid){
                        this.$http.post(this.$api.login,
                            { username: this.loginInfo.email, password:this.loginInfo.password})
                            .then((data) => {
                                console.log(data);
                                // if (this.item == true) {
                                //     //传入账号名，密码，和保存天数3个参数
                                //     this.setCookie(this.loginInfo.email, this.loginInfo.password, 7);
                                // }else {
                                //     //清空Cookie
                                //     this.clearCookie();
                                // }
                                sessionStorage.setItem("IvyCustomer_LoginToken", data.data.data.token);
                                sessionStorage.setItem("userLogin_id", data.data.data.user.id); 
                                this.$router.push({name: 'MyOrders'});
                                this.$store.commit('login'); 
                                this.$store.commit('loginName',data.data.data.user.email);
                                this.$cookie.set('front-sessionId', data.data.data.user.id);
                            });
                    }
                })
            },
            gotoRegister(){
                this.$router.push({name: 'Register'});
            },
            //设置cookie
            setCookie(c_name, c_pwd, exdays) {
                var exdate = new Date(); //获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
                //字符串拼接cookie
                window.document.cookie = "email" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
                window.document.cookie = "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
            },
            //读取cookie
            getCookie: function() {
                if (document.cookie.length > 0) {
                    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                    for (var i = 0; i < arr.length; i++) {
                        var arr2 = arr[i].split('='); //再次切割
                        //判断查找相对应的值
                        if (arr2[0] == 'email') {
                            //  console.log(arr2[1])
                            this.loginInfo.email = arr2[1]; //保存到保存数据的地方
                        } else if (arr2[0] == 'password') {
                            // console.log(arr2[1])
                            this.loginInfo.password = arr2[1];
                        }
                    }
                    this.checked = true;
                }
            },
            //清除cookie
            clearCookie: function() {
                this.setCookie("", "", -1); //修改2值都为空，天数为负1天
            }
        }
    }
</script>

<style scoped>
    .login-bg{
        width: 100%;
        height: 100%;
        background: #F5F5F5;
        margin-top: 20px;
        padding: 50px;
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
    }
    >>> .el-form-item__label{
        font-size: 16px;
    }
    .login-btn{
        width: 334px;
        height: 56px;
        margin-left: 30px;
        font-size: 20px;
        margin-top: 20px;
        background:rgba(254,179,71,1);
        color:rgba(255,255,255,1);
    }
    .forget-pass{
        font-size:14px;
        color:rgba(0,162,255,1);
        text-align: end;
        cursor: pointer;
        margin-left: 260px;
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
        font-size:16px;
        color:rgba(51,51,51,1);
    }
    .to-register{
        font-size:16px;         
        color:rgba(0,162,255,1);
        margin-left: 25px;
        cursor: pointer;
    }


    .bot-info{
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
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
</style>