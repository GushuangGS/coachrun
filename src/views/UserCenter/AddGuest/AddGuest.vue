<template>
        <div class="container">
            <div class="wrap">
                <h3 class="wrap-title">Add Guest Booking</h3>
                <span class="wrap-tip">Please provide the booking email address for the guest bookings in the last 100 days.</span>
                <el-form class="form-rule" :model="ruleForm" :rules="rules" ref="ruleForm" :show-message="false" label-width="auto">
                    <el-form-item
                        prop="email"
                        label="Booking Email:"
                    >
                        <el-input v-model="ruleForm.email" @input="focus"></el-input>
                        <el-button @click="sendEmail" v-show="sendAuthCode" id="submit" size="mini" type="primary" class="btn" :disabled="canClick">
                                Get Security Code
                        </el-button>
                        <el-button id="submit" v-show="!sendAuthCode" size="mini" type="primary" class="btn-disable" :disabled="true">
                                ({{auth_time}}s Expires) 
                        </el-button>
                    </el-form-item>
                </el-form>
                <div class="click-tip" :class="{red:showRed==true}">
                    {{tips}}
                </div>
                <el-form class="code-rule" :model="ruleCode" :rules="code" ref="ruleCode" label-width="auto">
                    <el-form-item
                        prop="code"
                        label="Security Code:"
                        :error="err"
                    >
                        <el-input v-model="ruleCode.code" @input="focusCode"></el-input>
                    </el-form-item>
                    <el-button @click="addBookings" id="submit" size="medium" type="warning" class="btn2" :disabled="codeClick">
                            Add to My Bookings
                    </el-button>
                </el-form>
            </div>
            <div class="right-tips" v-show="showRight">
                1 Order(s) has been added to your account! Please check <span class="right-tips-span" @click="toBookings">My Bookings.</span> 
            </div>
            <div class="error-tips" v-show="showError">
                <img src="@/assets/iconsad.png" alt="" class="err-img">
                <span>
                    Sorry, no purchase records under “{{inputEmail}}” within 100 days. 
                </span>
            </div>
        </div>
    </template>
    
    <script>
        export default{
            name:'AddGuest',
            data(){
                return{
                    ruleForm: {
                        email: ''
                    },
                    rules: {
                        email: [{ type: 'email'}]
                    },
                    ruleCode: {
                        code: ''
                    },
                    code: {
                        // code: [{ required: true ,message: 'Security code is required.' }] 
                    },
                    canClick:true,
                    codeClick:true,
                    auth_time:0,//倒计时
                    sendAuthCode: true, //布尔值，通过v-show控制显示‘发送按钮’还是‘倒计时’ 
                    tips:'Click “ Get Security Code” for us to send a security code to your booking email.',
                    showRight:false,
                    showError:false,
                    err:'',
                    verCode:'',
                    showRed:false,
                    inputEmail:''
                }
            },
            //页面加载调用获取cookie值
            mounted() {
                
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
                    if(this.ruleForm.email==''){
                        this.showError = false;
                    }
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
                sendEmail(){
                    this.$http.post(this.$api.guestRequest,
                                {email:this.ruleForm.email})
                                // {headers:{'Authorization':sessionStorage.getItem('IvyCustomer_LoginToken')}})
                        .then((res)=>{
                            console.log(res);
                            if(res.data.code==200){
                                this.sendAuthCode = false;
                                this.showRed = true;
                                this.tips = 'A security code was sent to your booking email.  This security code will expire after 30 minutes.';
                                //设置倒计时秒
                                this.auth_time = 30;
                                var auth_timetimer = setInterval(() => {
                                    this.auth_time--;
                                    if (this.auth_time <= 0) {
                                        this.sendAuthCode = true;
                                        this.showRed = false;
                                        this.tips = 'Click “ Get Security Code” for us to send a security code to your booking email.';
                                        clearInterval(auth_timetimer);
                                    }
                                }, 1000);
                                this.verCode = res.data.data.verificationCode;
                                this.inputEmail = this.ruleForm.email;
                            }else{
                                this.$message({
                                    message: res.data.msg,
                                    type: 'warning',
                                    center: true
                                });
                            }
                        })
                },
                addBookings(){
                    console.log(this.ruleCode.code)
                    if(this.ruleCode.code == this.verCode){
                        this.$http.post(this.$api.guestSubmit,
                                    {verificationCode:this.ruleCode.code})
                                    // {headers:{'Authorization':sessionStorage.getItem('IvyCustomer_LoginToken')}})
                        .then((res)=>{
                            this.ruleCode.code = '';
                            console.log(res);
                            if(res.data.code==200){
                                this.showRight = true;
                            }else{
                                this.showError = true;
                            }
                        })
                    }else{
                        this.err = 'Your security code is incorrect.'
                    }
                },
                toBookings(){
                    this.$router.push({name: 'MyBookings'});
                }
            }
        }
    </script>
    
    <style scoped>
       .container{
        width: 100%;
        height: 100%;
        background: #F5F5F5;
        margin-top: 20px;
        padding: 50px;
       }
       .wrap{
        width: 568px;
        min-height: 414px;
        background:rgba(255,255,255,1);
        /* background: skyblue; */
        border-radius:2px;
        margin: 0 auto;
        padding: 20px 24px 30px 24px;
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
        font-size: 13px;
        display: flex;
        align-items: center;
       }
       .err-img{
           width: 16px;
           height: 16px;
           margin-left: 25px;
           margin-right: 12px;
       }
       .wrap-title{
           font-size: 16px;
           color: #333333;
       }
       .wrap-tip{
           font-size: 14px;
           color: #333333;
       }
       .form-rule{
           margin-top: 50px;
       }
       .btn{
           /* width: 114px; */
           height: 36px;
           position: relative;
           left: 205px;
           top: -41px;
           /* background: #099FE1;
           color: #FFFFFF; */
           font-size: 12px;
           border-top-left-radius: 0;
           border-bottom-left-radius: 0;
       }
       .btn-disable{
            height: 36px;
           position: relative;
           left: 196px;
           top: -41px;
           /* background: #099FE1;
           color: #FFFFFF; */
           font-size: 12px;
           border-top-left-radius: 0;
           border-bottom-left-radius: 0;
       }
       .btn2{
           margin-left: 103px;
       }
       .click-tip{
            margin-top: -50px;
            width: 225px;
            font-size: 12px;
            color: #666666;
            margin-left: 109px;
       }
       .red{
           color: #f56c6c;
       }
       .code-rule{
           margin-top: 30px;
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
            background-color: #FF9A0D;
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