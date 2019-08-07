<template>
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
            <input class="email-input" type="email">
        </div>
        <el-button class="btn">
                Reset login password
        </el-button>
    </div>

</template>

<script>
    export default{
        name:'PasswordRetrieval',
        data(){
            return{
                ruleForm: {
                    email: ''
                }
            }
        },
        methods:{

        }
    }

</script>

<style scoped>
    .wrap{
        margin: 50px auto 0;
        background: #F5F5F5;
        width: 380px;
        height: 420px;
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
    .btn{
        width: 200px;
        height: 48px;
        color: #FFFFFF;
        font-weight: bold;
        font-size: 14px;
        background: rgba(255,154,13,0.6);
        margin-top: 120px;
        margin-left: 50px;
    }
    >>> .el-form-item__label:before{
        display: none;
    }
</style>