<template>
    <div class="wrap-bg">
        <div class="wrap">
            <span class="title">Password Retrieval</span>
            <span class="discrib">
                Forgot your password? Enter your
                email address for us to email you the 
                instructions to reset your password.
            </span>
            <el-form class="form-rule" :model="ruleForm" :rules="rules" ref="ruleForm" :show-message="showErr" label-width="auto">
                <el-form-item
                    prop="email"
                    label="Login Email:"
                >
                    <el-input v-model="ruleForm.email" @input="focus" @blur="blurInput"></el-input>
                </el-form-item>
                <el-button id="submit" type="warning" class="btn" :disabled="canClick" v-show="sendAuthCode" @click="resetPass">
                    Reset login password
                </el-button>
                <el-button class="btn2" type="info" plain disabled v-show="!sendAuthCode">
                    {{auth_time}} seconds countdown
                </el-button>
            </el-form>
            <!-- <div class="email">
                <span class="email-discrib">Login Email:</span>
                <input v-model="value" id="field" class="email-input" type="email">
            </div> -->
            <vue-recaptcha 
                    ref="invisibleRecaptcha"
                    sitekey="6LcENLIUAAAAAFfPgVMwchP85uhnY0RaCqml6Y6p" 
                    :loadRecaptchaScript="true"
                    @verify="onVerify"
                    @expired="onExpired"
                    size="invisible">
            </vue-recaptcha>
            <!-- 6LcENLIUAAAAAFfPgVMwchP85uhnY0RaCqml6Y6p -->
            <!-- 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI -->
            <!-- <el-button id="submit" class="btn" v-show="sendAuthCode" @click="resetPass">
                    Reset login password
            </el-button>
            <el-button class="btn2" type="info" plain disabled v-show="!sendAuthCode">
                {{auth_time}} seconds countdown
            </el-button> -->
            
        </div>
    </div>
</template>

<script>
    import VueRecaptcha from 'vue-recaptcha';
    export default {
        name:'PasswordRetrieval2',
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
                value: '',
                sendAuthCode: true, //布尔值，通过v-show控制显示‘发送按钮’还是‘倒计时’ 
                auth_time: 0, //倒计时 计数器
                isClick:false,
                verify:'',
                canClick:true,
                showErr:true
            }
        },
        created(){
            
        },
        methods:{
            focus(){
                this.showErr = false;
                this.$refs.ruleForm.validate((valid)=>{
                    if (valid){
                        this.canClick=false;
                    }else{
                        this.canClick=true;
                    }
                })
            },
            blurInput(){
                this.showErr = true;
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
                // this.sendAuthCode = false;
                // //设置倒计时秒
                // this.auth_time = 30;
                // var auth_timetimer = setInterval(() => {
                //     this.auth_time--;
                //     if (this.auth_time <= 0) {
                //         this.sendAuthCode = true;
                //         clearInterval(auth_timetimer);
                //     }
                // }, 1000);
                this.$http.post(this.$api.forgotPassword,
                    {email:this.ruleForm.email,token:this.verify})
                    .then((res)=>{
                        console.log(res)
                        if(res.data.code == 200){
                            this.sendAuthCode = false;
                            //设置倒计时秒
                            this.auth_time = 30;
                            var auth_timetimer = setInterval(() => {
                                this.auth_time--;
                                if (this.auth_time <= 0) {
                                    this.sendAuthCode = true;
                                    clearInterval(auth_timetimer);
                                }
                            }, 1000);
                            this.$store.commit('sendEmail',this.ruleForm.email);
                            this.$router.push({name: 'RemindEmail'});
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
            // resetPass(event){
            //     event.preventDefault();
            //     if (!this.value) {
            //         this.$message({
            //             message: 'You must add text to the required field',
            //             type: 'warning',
            //             showClose: true,
            //             center: true
            //         })
            //     } else {
            //         this.getToken();
            //     }
            // }
            resetPass(){
                this.getToken();
            }
        }
    }

</script>

<style scoped>
    .wrap-bg{
        width: 100%;
        /* height: 100%; */
        min-height: 525px;
        background: #F5F5F5;
        margin-top: 20px;
        padding: 50px;
    }
    .wrap{
        margin: 50px auto;
        background:rgba(255,255,255,1);
        width: 380px;
        height: 280px;
        padding: 28px 40px 0 40px;
    }
    .title{
        display: block;
        color: #333333;
        font-weight: bold;
        font-size: 16px;
    }
    .discrib{
        display: block;
        color: #333333;
        width: 286px;
        margin-top: 20px;
        font-size: 13px;
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
        margin-top: 15px;
    }
    .btn{
        width: 70%;
        height: 48px;
        margin-left: 15%;
        font-size: 14px;
        border: none;
    }
    .btn2{
        width: 70%;
        height: 48px;
        margin-left: 15%;
        font-size: 14px;
        font-weight: bold;
    }
    >>> .el-form-item__label:before{
        display: none;
    }
    >>> .el-form-item__label{
        color: #333333;
    }
    >>> .el-input__inner{
        color: #333333;
        font-size: 14px;
    }
    
    >>> .el-button--warning{
        background-color: #FEB347;
        color: #ffffff;
    }
    >>> .el-button--warning.is-disabled:hover{
        background-color: #FEB347;
        color: #ffffff;
    }
</style>
