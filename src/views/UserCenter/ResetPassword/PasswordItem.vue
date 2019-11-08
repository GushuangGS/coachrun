<template>
        <div class="wrap-bg">
            <div class="wrap">
                <div class="title">Password Retrieval</div>
                <span class="discrib">
                    Forgot your password? Enter your
                    email address for us to email you the 
                    instructions to reset your password.
                </span>
                <el-form class="form-rule" :model="ruleForm" :rules="rules" ref="ruleForm" :show-message="false">
                    <el-form-item
                        prop="email"
                    >
                    <!-- :label="labelName" -->
                        <el-input class="input-email" placeholder="Login Email" v-model="ruleForm.email" @input="focus"></el-input>
                        <el-button id="submit" size="mini" type="primary" class="btn" :disabled="canClick" v-show="sendAuthCode" @click="resetPass">
                            Send Email
                        </el-button>
                        <el-button class="btn2" size="medium" type="primary" plain disabled v-show="!sendAuthCode">
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
                        size="invisible"
                        :recaptchaHost="host">
                </vue-recaptcha>
                <div class="click-tip" :class="{red:showRed==true}">
                    {{tips}}
                </div>
                <el-form class="code-rule" :model="ruleCode" :rules="code" ref="ruleCode">
                    <el-form-item
                        prop="code"
                        :error="err"
                    >
                    <!-- label="Verfication Code:" -->
                        <el-input v-model="ruleCode.code" placeholder="Verfication Code" @input="focusCode"></el-input>
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
                    tips:'Click “ Send Email ” for us to send a code to your login email.',
                    showRight:false,
                    showError:false,
                    err:'',
                    labelName:'Login Email:',
                    msg:[{ResetPassword:'ResetPassword'},
                        {code:''}],
                    verCode:'',
                    showRed:false,
                    host:'www.recaptcha.net'
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
                                this.showRed = true;
                                this.tips = 'A verfication code was sent to your login email.  This verfication code will expire after 30 minutes.';
                                //设置倒计时秒
                                this.auth_time = 30;
                                var auth_timetimer = setInterval(() => {
                                    this.auth_time--;
                                    if (this.auth_time <= 0) {
                                        this.sendAuthCode = true;
                                        this.showRed = false;
                                        this.tips = 'Click “ Send Email ” for us to send a code to your login email.';
                                        clearInterval(auth_timetimer);
                                    }
                                }, 1000);
                                this.verCode = res.data.data.verificationCode;
                                // this.$store.commit('sendEmail',this.ruleForm.email);
                                // this.$router.push({name: 'RemindEmail'});
                            }else{
                                this.$message({
                                    message: res.data.msg,
                                    type: 'warning',
                                    center: true
                                });
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
                        this.err = 'Please enter a valid verification code.'
                    }
                    // this.$router.push({name: 'ResetPassword'});
                }
            }
        }
    
    </script>
    
    <style lang="scss" scoped>
        .wrap-bg{
            width: 100%;
            height: 100%;
            background: #eeeeee;
            /* margin-top: 20px; */
            padding: 50px;
            height: 610px;
            padding: 85px;
        }
        .wrap{
            margin: 0px auto;
            background:rgba(255,255,255,1);
            // width: 568px;
            width: 448px;
            // min-height: 414px;
            padding: 20px 50px 30px 50px;
        }
        .title{
            font-size: $Body1Size;
            color: #333333;
            font-weight: 600;
            margin-bottom: 10px;
            margin-top: 10px;
        }
        .discrib{
            font-size: $Body2Size;
           color: #333333;
        }
        .email{
            margin-top: 20px;
        }
        .email-discrib{
            color: #333333;
            font-size: $Body2Size;
        }
        .email-input{
            margin-left: 10px;
            width: 210px;
            height: 40px;
            font-size: $Body2Size;
        }
        #recaptcha{
            margin-top: 20px;
        }
        .form-rule{
            margin-top: 20px;
        }
        .btn{
           height: 40px;
           position: relative;
           left: 266px;
           top: -41px;
           font-size: 12px;
           border-top-left-radius: 0;
           border-bottom-left-radius: 0;
           padding: 6px 10px;
           border-top-right-radius: 4px;
           border-bottom-right-radius: 4px;
        }
        .btn2{
            height: 40px;
           position: relative;
           left: 196px;
           top: -41px;
           font-size: $CaptionSize;
           border-top-left-radius: 0;
           border-bottom-left-radius: 0;
           padding: 6px 10px;
           border-top-right-radius: 4px;
           border-bottom-right-radius: 4px;
        }
        .btnCode{
            width: 200px;
            height: 36px;
            margin-left: 74px;
            // margin-left: 120px;
        }
        .click-tip{
            margin-top: -50px;
            width: 225px;
            font-size: $CaptionSize;
            color: #666666;
            // margin-left: 120px;
       }
       .red{
           color: #f56c6c;
       }
       .code-rule{
           margin-top: 22px;
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
            font-size: $Body2Size;
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
            font-size: $Body2Size;
       }
        @media screen and (max-width: 768px){
            .wrap-bg{
                background: #fff;
                box-shadow: 0px 1px 2px 0px #333;
                padding: 20px 0 20px 0;
            }
            .wrap{
                padding: 20px 5px 20px 5px;
                width: 300px;
                max-width: 448px;
            }
            .btn{
                width: 120px;
                display: flex;
                justify-content: center;
                left: 175px;
            }
            .btnCode{
                margin-left: 45px;
            }
        }
    </style>
    <style scoped>
        >>> .el-input__inner{
           width: 348px;
           height: 40px;
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
            border: none;
       }
       >>> .el-button--primary.is-disabled:hover{
            background-color:#099FE1;
            color: #FFFFFF;
       }
       >>> .el-button--warning{
            background-color: #FF9A0D;
            color: #ffffff;
            border: none;
        }
        >>> .el-button--warning.is-disabled:hover{
            background-color: #FEB347;
            color: #ffffff;
        }
        >>> .el-form-item__label:before{
            display: none;
        }

        @media screen and (max-width: 768px){
            >>> .el-input__inner{
                width: 290px;
            }
        }
    </style>
    