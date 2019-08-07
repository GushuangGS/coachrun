<template>
    <div class="login">
       <h3 class="login-title">Log In</h3>
       <el-form :model="loginInfo" :rules="rules" ref="loginForm" label-width="90px">
            <el-form-item prop="email" label="Email:">
                <el-input v-model="loginInfo.email"></el-input>
            </el-form-item> 
            <el-form-item label="Password:" prop="password">
                <el-input type="password" v-model="loginInfo.password"></el-input>
            </el-form-item>
            <div class="forget-pass">Forget password?</div>
            <div class="check">
                <input type="checkbox" v-model="item"> 
                <span class="rem-me">Remember me</span>
            </div>
            <el-button type="primary" @click.native.prevent="login" class="login-btn">Log In</el-button>
       </el-form>
       <div class="register">
           <span class="register-info">Not a CoachRun member?</span>
           <span class="to-register" @click="gotoRegister">Register Now</span>
       </div>
       <div class="bot-info">
           <div class="intro">
               <img class="intro-img" src="./img/offers.png" alt="">
               <span class="intro-info">Exclusive Offers</span>
           </div>
           <div class="intro">
                <img class="intro-img" src="./img/booking.png" alt="">
                <span class="intro-info">Manage Booking</span>
            </div>
            <div class="intro">
                <img class="intro-img" src="./img/chechkouts.png" alt="">
                <span class="intro-info">Faster Checkouts</span>
            </div>
       </div>
    </div>
</template>

<script>
    export default{
        name:'Login',
        data(){
            return{
                item:false,
                loginInfo: {
                    email: '',
                    password: '',
                },
                rules: {
                    email: [{ required: true, trigger: 'blur' }],
                    password: [{ required: true, trigger: 'blur' }],
                }
            }
        },
        methods:{
            login(){
                console.log(this.item);//true 则选择记住密码
                this.$refs.loginForm.validate((valid)=>{
                    if (valid){
                        this.$http.post(this.$api.login,
                            { username: this.loginInfo.email, password:this.loginInfo.password})
                            .then((data) => {
                                console.log(data);
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

<style scoped>
    .login{
        width: 448px;
        height:522px;
        background:rgba(255,255,255,1);
        /* background: skyblue; */
        border-radius:2px;
        margin: 50px auto;
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
    }
    .forget-pass{
        font-size:14px;
        color:rgba(0,162,255,1);
        text-align: end;
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
    }
    .register{
        margin-top: 30px;
        text-align: center;
        font-weight: 600;
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