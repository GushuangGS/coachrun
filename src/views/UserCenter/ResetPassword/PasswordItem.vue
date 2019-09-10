<template>
        <div class="wrap-bg">
            <div class="wrap">
                <h3 class="title">Password Retrieval</h3>
                <span class="discrib">
                    Forgot your password? Enter your
                    email address for us to email you the 
                    instructions to reset your password.
                </span>
                <el-form class="form-rule" :model="ruleForm" :rules="rules" ref="ruleForm" :show-message="false" label-width="110px">
                    <el-form-item
                        prop="email"
                        :label="labelName"
                    >
                        <el-input class="input-email" v-model="ruleForm.email" @input="focus"></el-input>
                        <el-button id="submit" size="mini" type="primary" class="btn" :disabled="canClick" v-show="sendAuthCode" @click="resetPass">
                            Get Security Code
                        </el-button>
                        <el-button class="btn2" size="mini" type="primary" plain disabled v-show="!sendAuthCode">
                            ({{auth_time}}s Expires) 
                        </el-button>
                    </el-form-item>
                </el-form>
                <vue-recaptcha 
                        ref="invisibleRecaptcha"
                        sitekey="6LcENLIUAAAAAFfPgVMwchP85uhnY0RaCqml6Y6p" 
                        :loadRecaptchaScript="true"
                        @verify="onVerify"
                        @expired="onExpired"
                        size="invisible">
                </vue-recaptcha>
                <div class="click-tip">
                    {{tips}}
                </div>
                <el-form class="code-rule" :model="ruleCode" :rules="code" ref="ruleCode" label-width="110px">
                    <el-form-item
                        prop="code"
                        label="Security Code:"
                        :error="err"
                    >
                        <el-input v-model="ruleCode.code" @input="focusCode"></el-input>
                    </el-form-item>
                    <el-button @click="clickToPas" id="submit" size="medium" type="warning" class="btnCode" :disabled="codeClick">
                            Next
                    </el-button>
                </el-form>
            </div>
            <div class="right-tips" v-show="showRight">
                1 Order(s) has been added to your account! Please check <span class="right-tips-span">My Bookings.</span> 
            </div>
            <div class="error-tips" v-show="showError">
                Sorry, no purchase records under “haibara.yy@hotmail.com” within 100 days. 
            </div>
        </div>
    </template>
    
    <script>
        import VueRecaptcha from 'vue-recaptcha';
        export default {
            name:'PasswordItem',
            components: { VueRecaptcha },
            data() {
                return{
                    ruleForm: {
                        email: ''
                    },
                    rules: {
                        email: [{ required: true, trigger: 'blur' ,message: 'Enter your full email address.'},
                        { type: 'email', message: 'Please enter the correct email address', trigger: 'blur'}]
                    },
                    ruleCode: {
                        code: ''
                    },
                    code: {
                        // code: [{ required: true ,message: 'Security code is required.' }] 
                    },
                    value: '',
                    sendAuthCode: true, //布尔值，通过v-show控制显示‘发送按钮’还是‘倒计时’ 
                    auth_time: 0, //倒计时 计数器
                    isClick:false,
                    verify:'',
                    canClick:true,
                    codeClick:true,
                    tips:'Click “ Get Security Code ” for us to send a security code to your login email.',
                    showRight:false,
                    showError:false,
                    err:'',
                    labelName:'Login Email:',
                    msg:[{ResetPassword:'ResetPassword'},
                        {code:''}],
                    verCode:''
                }
            },
            created(){
                
            },
            methods:{
                focus(){
                    this.$refs.ruleForm.validate((valid)=>{
                        if (valid){
                            this.canClick=false;
                        }else{
                            this.canClick=true;
                        }
                    })
                },
                onVerify(response) {
                     this.verify = response;
                     this.forgotPas();
                    console.log(response);
                },
                onExpired() {
                    console.log('Expired')
                },
                getToken(){
                    this.$refs.invisibleRecaptcha.execute();
                },
                forgotPas(){
                    this.$http.post(this.$api.forgotPassword,
                        {email:this.ruleForm.email,token:this.verify})
                        .then((res)=>{
                            console.log(res);
                            if(res.data.code == 200){
                                this.sendAuthCode = false;
                                this.tips = 'A security code was sent to your login email.  This security code will expire after 30 minutes.';
                                //设置倒计时秒
                                this.auth_time = 30;
                                var auth_timetimer = setInterval(() => {
                                    this.auth_time--;
                                    if (this.auth_time <= 0) {
                                        this.sendAuthCode = true;
                                        this.tips = 'Click “ Get Security Code ” for us to send a security code to your login email.';
                                        clearInterval(auth_timetimer);
                                    }
                                }, 1000);
                                this.verCode = res.data.data.verificationCode;
                                // this.$store.commit('sendEmail',this.ruleForm.email);
                                // this.$router.push({name: 'RemindEmail'});
                            }else {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'warning',
                                    showClose: true,
                                    center: true
                                })
                                this.sendAuthCode = true;
                                clearInterval(auth_timetimer);
                            }
                        })
                },
                resetPass(){
                    this.getToken();
                },
                focusCode(){
                    this.err = '';
                    if(this.ruleCode.code){
                        this.codeClick=false;
                    }else{
                        this.codeClick=true;
                    }
                    // this.$refs.ruleCode.validate((valid)=>{
                    //     if (valid){
                    //         this.codeClick=false;
                    //     }else{
                    //         this.codeClick=true;
                    //     }
                    // })
                },
                clickToPas(){
                    if(this.ruleCode.code == this.verCode){
                        console.log(this.ruleCode.code);
                        this.msg[1].code = this.ruleCode.code;
                        this.$emit('ResPas',this.msg)
                    }else{
                        this.err = 'Your security code is incorrect.'
                    }
                    // this.$router.push({name: 'ResetPassword'});
                }
            }
        }
    
    </script>
    
    <style scoped>
        .wrap-bg{
            width: 100%;
            height: 100%;
            background: #F5F5F5;
            margin-top: 20px;
            padding: 50px;
        }
        .wrap{
            margin: 0px auto;
            background:rgba(255,255,255,1);
            width: 568px;
            min-height: 414px;
            padding: 20px 23px 30px 23px;
        }
        .title{
            font-size: 16px;
           color: #333333;
        }
        .discrib{
            font-size: 14px;
           color: #333333;
        }
        .email{
            margin-top: 20px;
        }
        .email-discrib{
            color: #333333;
            font-size: 14px;
        }
        .email-input{
            margin-left: 10px;
            width: 210px;
            height: 40px;
            font-size: 14px;
        }
        #recaptcha{
            margin-top: 20px;
        }
        .form-rule{
            margin-top: 50px;
        }
        .btn{
           height: 36px;
           position: relative;
           left: 205px;
           top: -41px;
           font-size: 12px;
           border-top-left-radius: 0;
           border-bottom-left-radius: 0;
        }
        .btn2{
            height: 36px;
           position: relative;
           left: 196px;
           top: -41px;
           font-size: 12px;
           border-top-left-radius: 0;
           border-bottom-left-radius: 0;
        }
        .btnCode{
            width: 25%;
            margin-left: 127px;
        }
        .click-tip{
            margin-top: -50px;
            width: 225px;
            font-size: 12px;
            color: #666666;
            margin-left: 106px;
       }
       .code-rule{
           margin-top: 30px;
       }
       .right-tips{
            width: 568px; 
            height: 59px;  
            margin: 40px auto;
            background:rgba(241,255,249,1);
            border-radius:4px;
            border:1px solid rgba(56,202,114,1);
            text-align: center;
            line-height: 59px;
            color: #333333;
            font-size: 14px;
       }
       .right-tips-span{
           color: #208291;
           font-weight: bold;
       }
       .error-tips{
            width: 568px; 
            height: 59px;  
            margin: 40px auto;
            background:rgba(255,252,243,1);
            border-radius:4px;
            border:1px solid rgba(255,204,50,1);
            text-align: center;
            line-height: 59px;
            color: #333333;
            font-size: 14px;
       }

        >>> .el-input__inner{
           width: 206px;
           height: 36px;
           border-top-right-radius: 0;
           border-bottom-right-radius: 0;
           color: #333333;
           font-size: 14px;
       }
       >>> .el-form-item__label{
           color: #333333;
       }
       >>> .el-button--primary{
            background-color:#099FE1;
            color: #FFFFFF;
       }
       >>> .el-button--primary.is-disabled{
            background-color:#099FE1;
            color: #FFFFFF;
       }
       >>> .el-button--primary.is-disabled:hover{
            background-color:#099FE1;
            color: #FFFFFF;
       }
       >>> .el-button--warning{
            background-color: #FEB347;
            color: #ffffff;
        }
        >>> .el-button--warning.is-disabled:hover{
            background-color: #FEB347;
            color: #ffffff;
        }
        >>> .el-form-item__label:before{
            display: none;
        }
    </style>
    