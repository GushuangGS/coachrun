<template>
    <div class="register-bg">
        <div class="login">
           <h3 class="login-title">Register</h3>
           <el-form class="login-form" :model="loginInfo" :rules="rules" ref="loginForm" label-width="0px">
                <el-form-item prop="email">
                    <el-input class="email-register" v-model="loginInfo.email" placeholder="Email"></el-input>
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
                <el-form-item prop="phone">
                    <template>
                        <VuePhoneNumberInput v-model="loginInfo.phone" 
                        default-country-code="US" 
                        @update="onUpdate"
                        :clearable="true"
                        />
                    </template>
                </el-form-item> 
                <el-form-item prop="password" :error="err">
                    <el-input @input="inputPas" class="password-register" type="password" v-model="loginInfo.password" placeholder="Password"></el-input>
                </el-form-item>
                <el-button @click.native.prevent="register" class="login-btn">Create My Account</el-button>
           </el-form>
           <div class="hr"></div>
           <div class="register">
               <span class="register-info">Already a member?</span>
               <span class="to-register" @click="gotoLogin">Log In</span>
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
        import VuePhoneNumberInput from 'vue-phone-number-input'
        export default{
            name:'Register',
            components: {VuePhoneNumberInput},
            data(){
                let validatePas = (rule, value, callback) => {
                    // var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
                    var reg = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))(?!^.*[\u4E00-\u9FA5].*$)^\S{6,12}$/;
                    if (value == '') {
                        callback(new Error('Please enter your password.'));
                    }else{
                       if(!reg.test(value)){
                            callback(new Error('Use 6-12 characters with a mix of letters, numbers & symbols.'));
                       }
                        callback();
                    }
                }
                let validatePhone = (rule, value, callback) => {
                    if (value == '') {
                        callback(new Error('Please enter a phone number.'));
                    }else{
                        if(this.canSave==false){
                            callback(new Error('Please enter a right phone number.'));
                        }
                        callback();
                    }
                }
                return{
                    loginInfo: {
                        email: '',
                        phone:'',
                        password: '',
                    },
                    rules: {
                        email: [{ required: true, trigger: 'blur' ,message: 'Please enter your full email address.'},
                        { type: 'email', message: 'Please enter a valid email address.', trigger: 'blur'}],
                        // phone: [{ required: true, trigger: 'blur' ,message: 'Please enter a phone number.'}],
                        phone: [
                            { required: true, trigger: 'blur',validator: validatePhone}
                        ],
                        // password: [{ required: true, trigger: 'blur',message: 'Please enter your password.' },
                        // { min: 6, message: 'Please enter more than 6 characters.', trigger: 'blur' }]
                        password: [{ required: true,trigger: 'blur',validator: validatePas}]
                    },
                    options: [
                        {value: '8088',label: 'United States'},
                        {value: '9999',label: 'USA'},
                        {value: '6866',label: 'China'},
                        
                    ],
                    selectValue: '999',//赋值选中国家的值
                    selectLabel:'USA',//默认为一个国家
                    yourValue:'',
                    results: {},
                    canSave:false,
                    err:''
                }
            },
            methods:{
                inputPas(){
                    console.log(this.loginInfo.password)
                    let reg = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))(?!^.*[\u4E00-\u9FA5].*$)^\S{6,12}$/;
                    if(this.loginInfo.password!=''){
                        if(!reg.test(this.loginInfo.password)){
                            this.err = 'Use 6-12 characters with a mix of letters, numbers & symbols.';
                        }else{
                            this.err = '';
                        }
                    }else{
                        this.err = 'Please enter your password.'
                    }
                },
                onUpdate(payload) {
                    console.log(payload);
                    this.canSave = payload.isValid;
                    this.results = payload;
                    console.log(payload);
                },
                register(){
                    this.$refs.loginForm.validate((valid)=>{
                        if (valid){
                            this.$http.post(this.$api.register,
                                { username: this.loginInfo.email,mobilePhone:this.results.formatInternational ,password:this.loginInfo.password,acceptNewsletter:'true'})
                                .then((data) => {
                                    console.log(data);
                                    if(data.data.code == 200){
                                        this.logIn();
                                    }else{
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
                logIn(){
                    console.log(this.loginInfo.email,this.loginInfo.password)
                    this.$http.post(this.$api.login,
                            { username: this.loginInfo.email, password:this.loginInfo.password})
                            .then((data) => {
                                console.log(data);
                                if(data.data.code==200){
                                    let loginCookie = decodeURI(VueCookie.get('IvyCustomer_LoginCookie'));
                                    if(loginCookie == undefined) return
                                        let token = loginCookie.split('+|+')[2]
                                    if (process.env.NODE_ENV === 'production'){
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
                                    if (process.env.NODE_ENV === 'development'){
                                        localStorage.setItem("IvyCustomer_LoginToken", data.data.data.token);
                                        localStorage.setItem("loginName", data.data.data.user.email);
                                    }
                                    this.$cookie.set('front-sessionId', data.data.data.user.id);
                                    this.$store.commit('login'); 
                                    this.$router.push({name: 'MyOrders'});
                                }else{
                                    this.$message({
                                        message: data.data.msg,
                                        type: 'warning',
                                        center: true
                                    });
                                }
                            });
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
    
    <style lang="scss" scoped>
        .hr{
            width: 330px;
            height: 1px;
            background: #EFEFEF;
            border: 0.5px solid #EFEFEF;
            margin-top: 30px;
            margin-left: 35px;
        }
        .register-bg{
            width: 100%;
            height: 100%;
            background: #F5F5F5;
            /* margin-top: 20px; */
            padding: 50px;
        }
        .login{
            width: 448px;
            height:532px;
            background:rgba(255,255,255,1);
            /* background: skyblue; */
            border-radius:2px;
            margin: 0 auto;
            padding: 20px 30px 30px 30px;
        }
        .login-form{
            width: 100%;
            padding: 0 20px 0 20px;
        }
        .login-title{
            margin-left: 20px;
            font-size: $HeadlineSize;
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
            width: 100%;
            height: 56px;
            font-size: $HeadlineSize;
            margin-top: 20px;
            /* background:rgba(254,179,71,1); */
            background: #FF9A0D;
            color:rgba(255,255,255,1);
            border: none;
        }
        .register{
            margin-top: 30px;
            text-align: center;
            /* font-weight: 600; */
        }
        .register-info{
            font-size:$Body2Size;
            color:rgba(51,51,51,1);
        }
        .to-register{
            font-size:$Body2Size;         
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
    </style>
    <style scoped>
        >>> .el-form-item__label{
            font-size: 16px;
        }
        >>> .el-form-item__content{
            line-height:normal;
        }
        >>> .field.vue-input-ui{
          left: 1px;
        }
        >>> .field-input::-webkit-input-placeholder{
            font-size: 14px;
            color:rgba(102,102,102,1);
        }
        >>> .el-input__inner::-webkit-input-placeholder{
            font-size: 14px;
            color:rgba(102,102,102,1);
        }
        >>> .field.vue-input-ui .field-input{
            cursor: default;
        }
        >>> .field.vue-input-ui .field-clear>span:not(.field-clear__effect){
            top: -1px;
            left: 1px;
        }
        >>> .field.vue-input-ui .field-clear__effect{
            width: 25px;
            border-radius: 50%;
        }
    </style>