<template>
    <div class="wrap-bg">
        <div class="wrap">
            <span class="title">Password Retrieval</span>
            <span class="discrib">
                Forgot your password? Enter your
                email address for us to email you the 
                instructions to reset your password.
            </span>
            <!-- <el-form :model="ruleForm" ref="ruleForm" label-width="auto">
                <el-form-item
                    prop="email"
                    label="Login Email:"
                    :rules="[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ]"
                >
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
            </el-form> -->
            <form>
                <div class="email">
                    <span class="email-discrib">Login Email:</span>
                    <input v-model="value" id="field" class="email-input" type="email">
                </div>
                <div id='recaptcha'
                    class="g-recaptcha"
                    data-sitekey="6LcENLIUAAAAAFfPgVMwchP85uhnY0RaCqml6Y6p"
                    data-callback="onSubmit"
                    data-size="invisible"
                    >
                    <!-- data-size="invisible" -->
                </div>
                <el-button class="btn" v-show="sendAuthCode" @click="resetPass">
                        Reset login password
                </el-button>
            </form>
            <!-- 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI -->
            <!-- <el-button id="submit" class="btn" v-show="sendAuthCode" @click="resetPass">
                    Reset login password
            </el-button> -->
            <el-button class="btn2" type="info" plain disabled v-show="!sendAuthCode">
                Reset login password
            </el-button>
            <!-- <el-button class="btn2" type="info" plain disabled v-show="!sendAuthCode">
                {{auth_time}} seconds countdown
            </el-button> -->
        </div>
    </div>
</template>

<script>
    function onSubmit(token) {
        console.log(token);
    }
    

    export default {
        name:'PasswordRetrieval',
        data() {
            return{
                ruleForm: {
                    email: ''
                },
                value: '',
                sendAuthCode: true, //布尔值，通过v-show控制显示‘发送按钮’还是‘倒计时’ 
                auth_time: 0, //倒计时 计数器
                isClick:false
            }
        },
        created(){
            // this.onload()
        },
        methods:{
            // onSubmit(data) {
            //     console.log(data);
            // },
            onload(){
                // grecaptcha.execute();
                // .then((token)=> {
                //     console.log(token);
                // })
            },
            resetPass(event){
                event.preventDefault();
                if (!this.value) {
                    alert("You must add text to the required field");
                } else {
                    grecaptcha.execute();
                }
            }
            // resetPass() {
            //     event.preventDefault();
            //     if (!this.value) {
            //         this.$message({
            //             message: 'You must add text to the required field',
            //             type: 'warning',
            //             showClose: true,
            //             center: true
            //         })
            //     } else {
            //         // grecaptcha.execute()
            //     }
            //     //---------------------------------------------------------
            //     if (this.value != ''){
            //         this.$store.commit('sendEmail',this.value);
            //         this.$router.push({name: 'RemindEmail'});
            //         ///--------------------------
            //         this.sendAuthCode = false;
            //         //设置倒计时秒
            //         this.auth_time = 30;
            //         var auth_timetimer = setInterval(() => {
            //             this.auth_time--;
            //             if (this.auth_time <= 0) {
            //                 this.sendAuthCode = true;
            //                 clearInterval(auth_timetimer);
            //             }
            //         }, 1000);
            //         //-----------------------------
            //         this.$http.post(this.$api.forgotPassword,
            //             {email:this.value,token:'111'},
            //             {headers:{Authorization: `Bearer ${sessionStorage.getItem('IvyCustomer_LoginToken')}`} })
            //                 .then((res)=>{
            //                     console.log(res)
            //                 })
            //     }                
            // }
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
        margin: 50px auto;
        background:rgba(255,255,255,1);
        width: 380px;
        height: 380px;
        padding: 28px 0 0 40px;
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
    .btn{
        width: 200px;
        height: 48px;
        color: #FFFFFF;
        font-weight: bold;
        font-size: 14px;
        background: rgba(255,154,13,0.6);
        margin-top: 20px;
        margin-left: 50px;
    }
    .btn2{
        width: 200px;
        height: 48px;
        font-weight: bold;
        font-size: 14px;
        margin-top: 20px;
        margin-left: 50px;
    }
    >>> .el-form-item__label:before{
        display: none;
    }
</style>
