<template>
    <div class="change-password">
      <el-container>
        <el-header height="33px">
          <div v-if="changeStatus" class="title">Change Password</div>
          <el-breadcrumb v-else separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/app/member/account' }">My Account</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/app/member/account/password' }">Change Password</el-breadcrumb-item>
          </el-breadcrumb>
        </el-header>
        <el-main class="content">
          <el-form :label-position="labelPosition" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
            <el-form-item label="Password type">
              <el-select v-model="ruleForm.passwordTypes[ruleForm.passwordTypeIndex].value" placeholder="">
                <el-option v-for="(passwordType, index) in ruleForm.passwordTypes" v-bind:key="index" :label="passwordType.label" :value="passwordType.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Current password" prop="pass">
              <el-input type="password" v-model="ruleForm.currentPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="New password" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Confirm password" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="save" @click="submitForm('ruleForm')">Save</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </div>
</template>

<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        changeStatus: 0,
        labelPosition: 'right',
        ruleForm: {
          passwordTypes: [{ label: 'Login', value: 'login' }, { label: 'Excution', value: 'Excution' }],
          passwordTypeIndex: 0,
          currentPass: '',
          pass: '',
          checkPass: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    },
    name: 'ChangePassword'
  }
</script>

<style scoped>
  .change-password {
    flex: 1;
  }
  .title {
    background-color: #E5EFFA;
    padding-left: 30px;
    line-height: 33px;
    font-size: 17px;
    color: #002E63;
    font-family: Arial;
    font-weight: bold;
  }
  >>> .el-breadcrumb {
    font-size: 17px;
    line-height: 33px;
  }
  >>> .el-breadcrumb__inner {
    color: #002E63;
    font-weight: normal;
  }
  >>> .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: #333333;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  >>> .el-form {
    width: 500px;
  }
  .save {
    background-color: #FF9A0D;
    color: #fff;
    border-radius: 4px;
    width: 72px;
    height: 30px;
    font-size: 16px;
    padding: 7px 17px;
  }
</style>
