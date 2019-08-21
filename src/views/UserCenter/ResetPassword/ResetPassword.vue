<template>
    <div class="wrap">
        <div class="box">
            <p class="title">Set a New Password</p>
            <div class="email">
                <span class="emali-lab">Registered Email:</span>
                <span class="email-name">selinaquzhou@gmail.com</span>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto">
                <el-form-item prop="pass" label="New Password:">
                    <el-input type="password" v-model="ruleForm.pass" clearable>
                    </el-input>
                </el-form-item>
                <el-form-item prop="checkPass" label="Re-type Password:">
                    <el-input type="password" v-model="ruleForm.checkPass" clearable>
                    </el-input>
                </el-form-item>
                <el-button type="primary" @click.native.prevent="save" class="login-btn">
                    Save and Log in
                </el-button>
            </el-form>
        </div>
       
    </div>
</template>

<script>
    //获取url地址里面的参数
    // function getQueryString(name) {
    //     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    //     var r = window.location.search.substr(1).match(reg);
    //     if(r != null) return unescape(r[2]);
    //     return null;
    // }
    // var name = getQueryString("user_id");
    
    export default{
        name:'ResetPassword',
        data(){
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter your password.'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };

            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter your password again.'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('The password must be the same.'));
                } else {
                    callback();
                }
            };
            return{
                ruleForm: {
                    pass: '',
                    checkPass:''
                },
                rules: {
                    pass: [
                        { required: true, validator: validatePass, trigger: 'blur' },
                        { min: 6, max: 12, message: 'Please enter value between 6 and 12 characters long', trigger: 'blur' }
                    ],
                    checkPass: [
                        { required: true, validator: validatePass2, trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            save(){
                this.$refs.ruleForm.validate((valid) => {
                    if(valid){
                        this.$http.post(this.$api.resetPassword,
                        {verificationCode:'1',password:this.ruleForm.pass,rePassword:this.ruleForm.checkPass})
                            .then((res)=>{
                                console.log(res);
                            })
                    }
                });
            }
        }
    }

</script>

<style scoped>
    .wrap{
        width: 100%;
        height: 100%;
        background: #F5F5F5;
        margin-top: 20px;
        padding: 50px;
    }
    .box{
        margin: 50px auto;
        background:rgba(255,255,255,1);
        width: 420px;
        height: auto;
        padding: 20px 30px;
    }
    .title{
        color: #333333;
        font-size: 16px;
        font-weight: bold;
        margin-left: 13px;
    }
    .email{
        margin-bottom: 10px;
        margin-left: 13px;
    }
    .emali-lab{
        color: #666666;
        font-size: 13px;
    }
    .email-name{
        color: #333333;
        font-size: 14px;
        margin-left: 30px;
    }
    .login-btn{
        width: 200px;
        height: 48px;
        background: #FF9A0D;
        border-radius:4px;
        margin-top: 10px;
        margin-bottom: 20px;
        margin-left: 80px;
    }
    >>> .el-form-item__label:before{
        display: none;
    }
    >>> .el-form-item__label-wrap .el-form-item__label{
        font-size: 13px;
        color: #666666;
    }
    >>> .el-form-item__error{
        position: inherit;
    }
</style>