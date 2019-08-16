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
            <div class="email">
                <span class="email-discrib">Login Email:</span>
                <input v-model="value" class="email-input" type="email">
            </div>
            <div id='recaptcha'
                class="g-recaptcha"
                data-sitekey="your_site_key"
                data-callback="onSubmit">
            </div>
            <el-button class="btn" @click="resetPass">
                    Reset login password
            </el-button>
        </div>
    </div>
</template>

<script>
    export default{
        name:'PasswordRetrieval',
        data(){
            return{
                ruleForm: {
                    email: ''
                },
                value:''
            }
        },
        methods:{
            resetPass(){
                this.$http.post(this.$api.forgotPassword,
                {email:this.value,recaptchaResponse:'1313'})
                    .then((res)=>{
                        console.log(res);
                    })
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
    >>> .el-form-item__label:before{
        display: none;
    }
</style>