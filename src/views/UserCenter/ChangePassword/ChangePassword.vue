<template>
  <!-- 修改密码 -->
    <div class="change-password">
      <el-container>
        <!-- <el-header height="33px">
          <item-header :status="changeStatus" :headerInfo="headerInfo"></item-header>
        </el-header> -->
        <el-main class="content">
          <div class="chapas-title UIFontTextStyleTitle1">Change Password</div>
          <div class="info" v-if="changeStatus != 1">
            <div class="success-wrapper" v-if="changeStatus == 0">
              <success-box text="Your password has been reset successfully!"></success-box>
              <el-button @click="clickFinshed" class="finished">Finished</el-button>
            </div>
            <div class="failure-wrapper" v-if="changeStatus == 2">
              <div class="failure">
                <div class="failure-content">
                  <p>Current password invalid!</p>
                </div>
              </div>
            </div>
          </div>
          <div class="form-wrapper" v-if="changeStatus !=0">
            <el-form :show-message="showMessage" :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px">
              <el-form-item label="Password Type:">
                <!-- <el-select v-model="ruleForm.passwordType"  @change="selectGet">
                  <el-option v-for="(passwordType, index) in passwordTypes" 
                      v-bind:key="index" 
                      :label="passwordType.label" 
                      :value="passwordType.value">
                  </el-option> -->
                  <div class="login-name">Login</div>
                </el-select>
              </el-form-item>
              <el-form-item label="Current Password:" prop="currentPass" :error="err">
                <el-input type="password" v-model="ruleForm.currentPass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="New Password:" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="Re-type Password:" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <!-- <el-button class="save" @click="submitForm('ruleForm')">Save</el-button> -->
                <el-button class="save" @click="submitForm('ruleForm')">Reset Password</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-main>
      </el-container>
      <!-- <my-date-picker></my-date-picker> -->
      <!-- <my-button width="200px" height="100px" btnBgc="red" btnBrds="10px" btnColor="#ffffff" fontSize="20px"></my-button> -->
    </div>
</template>

<script>
  import ItemHeader from '@/components/ItemHeader'
  import SuccessBox from '@/components/SuccessBox'

  import MyDatePicker from '@/components/DatePicker'
  import MyButton from '@/components/MyButton'

  export default {
    data() {
      let validatePass = (rule, value, callback) => {
        var reg = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))(?!^.*[\u4E00-\u9FA5].*$)^\S{6,12}$/;
        if (value == '') {
          callback(new Error('Please enter current password.'));
        }else{
          if(!reg.test(value)){
              callback(new Error('Please enter a valid password.'));
          }
          callback();
        }
      }
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter new password.'));
        } else {
          // 判断密码的格式是否符合要求
          let reg = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))(?!^.*[\u4E00-\u9FA5].*$)^\S{6,12}$/;
          if (value.match(reg)) {
            callback()
          } else {
            callback(new Error('Use 6-12 characters with a mix of letters, numbers & symbols.'))
          }
          // 判断两次输入密码不一致
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback()
        }
      }
      let validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter password again.'))
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('Please enter the same password.'))
        } else {
          callback()
        }
      }
      return {
        status: 0,
        headerInfo: [
          ['Change Password'],
          { description: 'Change Password', path: '/app/member/account/password',title:'My Account' }
        ],
        changeStatus: 1, // 1 => 未点击Save按钮，0 => 修改密码成功，2 => 修改密码失败
        labelPosition: 'right',//表单位置
        passwordTypes: [{ label: 'Login', value: '1' }, { label: 'Excution', value: '2' }],
        ruleForm: {
          passwordType: 'Login',
          currentPass: '',
          pass: '',
          checkPass: ''
        },
        rules: {
          currentPass: [
            {required: true, validator: validatePass, trigger: 'blur' }
          ],
          pass: [
            {required: true, validator: validatePass2, trigger: 'blur' }
          ],
          checkPass: [
            {required: true, validator: validatePass3, trigger: 'blur' }
          ]
        },
        getVal:'1',//默认选中值为login
        showMessage:true,
        err:''
      }
    },
    methods: {
      selectGet(val){
        // this.showMessage = false;
        // this.rules = {};
        console.log(val);
        this.getVal = val;
        this.ruleForm.currentPass = '';
        this.ruleForm.pass = '';
        this.ruleForm.checkPass = '';
        
      },
      submitForm(formName) {
        // this.rules= {
        //   currentPass: [
        //     {required: true, validator: validatePass, trigger: 'blur' }
        //   ],
        //   pass: [
        //     {required: true, validator: validatePass2, trigger: 'blur' }
        //   ],
        //   checkPass: [
        //     {required: true, validator: validatePass3, trigger: 'blur' }
        //   ]
        // },
        this.$refs[formName].validate((valid) => {
          if(valid){
            console.log(this.ruleForm);
            console.log(this.getVal);
              this.$http.post(this.$api.changePassword,
              // {passwordType:this.getVal,password:this.ruleForm.currentPass,newPassword:this.ruleForm.pass,reNewPassword:this.ruleForm.checkPass},{headers:{'Authorization':sessionStorage.getItem('IvyCustomer_LoginToken')}})
              {passwordType:this.getVal,password:this.ruleForm.currentPass,newPassword:this.ruleForm.pass,reNewPassword:this.ruleForm.checkPass})
                  .then((res)=>{
                      console.log(res);
                      if(res.data.code==200){
                        this.changeStatus = 0;
                        // this.$cookie.set('password', this.ruleForm.pass);
                      }else{
                        this.err = 'Current password invalid!'
                        // this.changeStatus = 2;
                      }
                  })
          }
        })
      },
      clickFinshed(){
        this.changeStatus = 1;
        this.ruleForm= {
          passwordType: 'Login',
          currentPass: '',
          pass: '',
          checkPass: ''
        }
      }
    },
    components: {
      ItemHeader,
      SuccessBox,
      MyDatePicker,
      MyButton
    },
    name: 'ChangePassword'
  }
</script>

<style lang="scss" scoped>
  .change-password {
    flex: 1;
  }
  .content {
    display: flex;
    flex-direction: column;
    font-size: $Body1Size;
    align-items: stretch;
    margin-left: 20px;
  }
  .chapas-title{
    font-size: $SubheadlineSize;
    font-weight: bold;
  }
  .info {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .success-wrapper {
    padding-left: 60px;
  }
  .form-wrapper {
    background-color: #FCFCFC;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  
  .save {
    background-color: #FF9A0D;
    color: #fff;
    border-radius: 4px;
    width: 138px;
    height: 30px;
    font-size: $Body2Size;
    padding: 7px 16px;
    text-align: center;
    border: none;
  }
  .failure {
    display: flex;
    align-items: center;
    padding-top: 32px;
    padding-bottom: 32px;
    padding-left: 36px;
  }
 /* .success {
    display: flex;
    align-items: center;
    padding-top: 32px;
    padding-bottom: 32px;
    padding-left: 36px;
  }
  .success {
    border: 2px solid #08A66C;
    border-radius: 4px;
    width: 690px;
    height: 92px;
    box-sizing: border-box;
    line-height: 1;
  }
  .success>img {
    width: 26px;
    height: 26px;
    margin-right: 20px;
  }
  .success-content>h2 {
    margin-top: 0;
    color: #08A66C;
    font-size: 20px;
  }
  .success-content>p {
    margin: 0;
    font-size: 17px;
  }*/
  .login-name{
    font-size: $Body2Size;
    color: #333333;
  }
  .finished {
    font-size: $Body1Size;
    background-color: #FF9A0D;
    color: #fff;
    width: 90px;
    height: 30px;
    padding: 7px 16px;
    outline: none;
    text-align: center;
    margin-top: 30px;
    margin-left: 78px;
  }
  .failure {
    box-sizing: border-box;
    border-radius: 4px;
    border: 2px solid #F84C4C;
    width: 290px;
    height: 37px;
    background-color: #FEF3F3;
    color: #F84C4C;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    font-size: $Body1Size;
    font-weight: bold;
    line-height: 1;
  }
  .failure>img {
    width: 17px;
    height: 17px;
    margin-right: 16px;
  }
  .failure-content>p {
    margin-top: 0;
    margin-bottom: 0;
  }
  
  .failure-wrapper {
    display: flex;
    justify-content: center;
    padding-right: 60px;
  }
</style>
<style scoped>
  >>> .el-input {
    width: 190px;
  }
  >>> .el-input>.el-input__inner {
    width: 190px;
  }
  >>> .el-form {
    width: 520px;
    margin-top: 30px;
    margin-bottom: 15px;
  }
</style>
