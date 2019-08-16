<template>
    <div class="register-bg">
        <div class="login">
           <h3 class="login-title">Register</h3>
           <el-form :model="loginInfo" :rules="rules" ref="loginForm" label-width="90px">
                <el-form-item prop="email" label="Email:">
                    <el-input v-model="loginInfo.email"></el-input>
                </el-form-item> 
                <!-- <el-form-item class="phone" prop="phone" label="Phone:">
                    <el-select class="select" v-model="selectLabel" @change="select">
                        <el-option v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                    <el-input class="phone-num" type="phone" v-model="loginInfo.phone"></el-input>
                </el-form-item> -->
                <el-form-item prop="phone" label="Phone:">
                    <template>
                            <VuePhoneNumberInput v-model="loginInfo.phone" />
                    </template>
                </el-form-item> 
                <el-form-item label="Password:" prop="password">
                    <el-input type="password" v-model="loginInfo.password"></el-input>
                </el-form-item>
                <el-button type="primary" @click.native.prevent="register" class="login-btn">Create My Account</el-button>
           </el-form>
           <div class="register">
               <span class="register-info">Already a member?</span>
               <span class="to-register" @click="gotoLogin">Log In</span>
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
    </div>
</template>
    
    <script>
        import VuePhoneNumberInput from 'vue-phone-number-input'
        export default{
            name:'Register',
            components: {VuePhoneNumberInput},
            data(){
                return{
                    loginInfo: {
                        email: '',
                        phone:'',
                        password: '',
                    },
                    rules: {
                        email: [{ required: true, trigger: 'blur' }],
                        phone: [{ required: true, trigger: 'blur' }],
                        password: [{ required: true, trigger: 'blur' },
                        { min: 6, max: 12, message: 'Please enter value between 6 and 12 characters long', trigger: 'blur' }]
                    },
                    options: [
                        {value: '8088',label: 'United States'},
                        {value: '9999',label: 'USA'},
                        {value: '6866',label: 'China'},
                        
                    ],
                    selectValue: '999',//赋值选中国家的值
                    selectLabel:'USA',//默认为一个国家
                    yourValue:''
                }
            },
            methods:{
                register(){
                    console.log(this.selectValue);
                    this.$refs.loginForm.validate((valid)=>{
                        if (valid){
                            this.$http.post(this.$api.register,
                                { username: this.loginInfo.email,mobilePhone:this.loginInfo.phone ,password:this.loginInfo.password,acceptNewsletter:'true'})
                                .then((data) => {
                                    console.log(data);
                                });
                        }
                    })
                },
                select(value) {//选择器选中的value
                    this.selectValue = value;
                    console.log(value);
                },
                gotoLogin(){
                    this.$router.push({name: 'Login'});
                }
            }
        }
    </script>
    
    <style scoped>
        .register-bg{
            width: 100%;
            height: 100%;
            background: #F5F5F5;
            margin-top: 20px;
            padding: 50px;
        }
        .login{
            width: 448px;
            height:522px;
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
        >>> .el-form-item__content{
            line-height:normal;
        }
        .phone{
            /* display: flex;
            flex-direction: row; */
        }
        .select{
            width: 130px;
        }
        .phone-num{
            width: 165px;
        }
        .login-btn{
            width: 334px;
            height: 56px;
            margin-left: 30px;
            font-size: 20px;
            margin-top: 20px;
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