<template>
    <div class="wrap">
        <div class="box">
            <p class="title">Set a New Password</p>
            <!-- <div class="email">
                <span class="emali-lab">Registered Email:</span>
                <span class="email-name">{{userEmail}}</span>
            </div> -->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" class="reset-form">
                <el-form-item prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" clearable placeholder="New Password"> 
                    </el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" clearable placeholder="Re-type Password">
                    </el-input>
                </el-form-item>
                <el-button type="primary" @click.native.prevent="save" class="login-btn">
                    Save
                </el-button>
            </el-form>
        </div>
       
    </div>
</template>

<script>
    export default{
        props:['userInfo'],
        name:'ResetPassword',
        data(){
            // var validatePass = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('Please enter your password.'));
            //     } else {
            //         if (this.ruleForm.checkPass !== '') {
            //             this.$refs.ruleForm.validateField('checkPass');
            //         }
            //         callback();
            //     }
            // };
            var validatePass = (rule, value, callback)=>{
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

            var validatePass2 = (rule, value, callback) => {
                var reg = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))(?!^.*[\u4E00-\u9FA5].*$)^\S{6,12}$/;
                if (value === '') {
                    callback(new Error('Please enter your password again.'));
                } else {
                    if(!reg.test(value)){
                        callback(new Error('Use 6-12 characters with a mix of letters, numbers & symbols.'));
                    }else if(value !== this.ruleForm.pass){
                        callback(new Error('Please enter the same password.'));
                    }
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
                        // { min: 6, max: 12, message: 'Please enter value between 6 and 12 characters long', trigger: 'blur' }
                    ],
                    checkPass: [
                        { required: true, validator: validatePass2, trigger: 'blur' }
                    ],
                },
                userEmail:'',
                code:''
            }
        },
        created(){
            this.code = this.userInfo[1].code;
            // this.userEmail = this.getEmail("email");
            // this.code = this.getEmail("verificationCode");
        },
        methods:{
            getEmail(name){
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if(r != null) return unescape(r[2]);
                return null;
            },
            save(){
                this.$refs.ruleForm.validate((valid)=>{
                    if(valid){
                        this.$http.post(this.$api.resetPassword,
                            {verificationCode:this.code,password:this.ruleForm.pass,rePassword:this.ruleForm.checkPass})
                            .then((res)=>{
                                console.log(res);
                                if(res.data.code!=200){
                                    this.$message({
                                        message: res.data.msg,
                                        type: 'warning',
                                        center: true
                                    })
                                }else{
                                    this.$router.push({name: 'Login'});
                                    this.$message({
                                        message: 'Reset successfully',
                                        type: 'success',
                                        center: true
                                    })
                                }
                            })
                    }
                });
            }
        }
    }

</script>

<style lang="scss" scoped>
    .wrap{
        width: 100%;
        height: 100%;
        background: #eeeeee;
        margin-top: 20px;
        padding: 50px;
        height: 593px;
        padding: 85px;
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
        font-size: $Body1Size;
        font-weight: bold;
        margin-left: 12px;
    }
    .reset-form{
        padding: 0 13px 0 13px;
    }
    .email{
        margin-bottom: 10px;
        margin-left: 13px;
    }
    .emali-lab{
        color: #666666;
        font-size: $Body3Size;
    }
    .email-name{
        color: #333333;
        font-size: $Body2Size;
        margin-left: 13px;
    }
    .login-btn{
        width: 200px;
        height: 36px;
        background: #FF9A0D;
        border-radius:4px;
        margin-top: 10px;
        margin-bottom: 20px;
        margin-left: 67px;
        border: none;
    }
    
    .el-button{
        padding: 10px 20px;
    }

    @media screen and (max-width: 768px){
        .wrap{
            background: #fff;
            box-shadow: 0px 1px 2px 0px #333;
            padding: 85px 0;
        }
        .box{
            width: 280px;
            max-width: 448px;
            padding: 20px 5px 30px 5px;
        }
        .login-btn{
            margin-left: 48px;
            width: 140px;
        }
    }
</style>
<style scoped>
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