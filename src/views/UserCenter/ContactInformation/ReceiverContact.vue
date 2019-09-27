<template>
        <div class="edit-contact">
            <el-container>
                <el-header height="33px">
                    <item-header :status="status" :headerInfo="headerInfo"></item-header>
                </el-header>
                <el-main>
                    <div class="content">
                        <div class="form-wrapper">
                            <el-form :model="ruleForm" 
                            :rules="rules" 
                            ref="ruleForm" 
                            label-width="100px" 
                            class="demo-ruleForm"
                            label-position="top"> 
                                <!-- <el-form-item class="first-name" label="First Name:" prop="firstName">
                                    <el-input  v-model="ruleForm.firstName"></el-input>
                                </el-form-item>
                                <el-form-item class="last-name" label="Last Name:" prop="lastName">
                                    <el-input  v-model="ruleForm.lastName"></el-input>
                                </el-form-item>
                                <el-form-item class="email" label="Contact Email:" prop="email">
                                    <el-input v-model.number="ruleForm.email"></el-input>
                                </el-form-item>
                                <el-form-item class="phone" label="Contact Phone:" prop="phone">
                                        <VuePhoneNumberInput v-model="ruleForm.phone" 
                                        :default-country-code="countryFir" 
                                        @update="onUpdate"
                                        />
                                </el-form-item>
                                <el-form-item class="phone2" label="Alternate Phone:" prop="phone2">
                                        <VuePhoneNumberInput v-model="ruleForm.phone2" 
                                        :default-country-code="countrySec" 
                                        @update="onUpdateAgain"
                                        />
                                </el-form-item>
                                <el-switch
                                    class="isDefault"
                                    v-model="showDefault"
                                    inactive-text="Default information："
                                    @change="selectDefault">
                                </el-switch>
                                <el-form-item class="btns">
                                    <el-button @click="goBack">Cancel</el-button>
                                    <el-button type="warning" @click="submitForm('ruleForm')">Save</el-button>
                                </el-form-item> -->
                                <el-row :gutter="20">
                                    <el-col :span="12">
                                        <el-form-item class="first-name" label="First Name:" prop="firstName">
                                            <el-input  v-model="ruleForm.firstName"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item class="last-name" label="Last Name:" prop="lastName">
                                            <el-input  v-model="ruleForm.lastName"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="24">
                                        <el-form-item class="email" label="Contact Email:" prop="email">
                                            <el-input v-model="ruleForm.email"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="24">
                                        <el-form-item class="phone" label="Contact Phone:" prop="phone">
                                            <VuePhoneNumberInput v-model="ruleForm.phone" 
                                            :default-country-code="countryFir"
                                            @update="onUpdate"
                                            ref="phone_number"
                                            clearable="true"
                                            />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="24">
                                        <el-form-item class="phone2" label="Alternative Phone:" prop="phone2">
                                                <VuePhoneNumberInput v-model="ruleForm.phone2" 
                                                :default-country-code="countrySec" 
                                                @update="onUpdateAgain"
                                                ref="phone2_number"
                                                clearable="true"
                                                />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="24">
                                        <el-switch
                                            class="isDefault"
                                            v-model="showDefault"
                                            inactive-text="Default information："
                                            @change="selectDefault">
                                        </el-switch>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="24">
                                        <el-form-item class="btns">
                                            <el-button class="cancel-btn" @click="goBack">Cancel</el-button>
                                            <el-button class="save-btn" @click="submitForm('ruleForm')">Save</el-button>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </div>
    </template>    
    
    <script>
        import ItemHeader from '@/components/ItemHeader';
        import VuePhoneNumberInput from 'vue-phone-number-input';
        import { parsePhoneNumberFromString } from 'libphonenumber-js'
        export default{
            components: {
                ItemHeader,
                VuePhoneNumberInput
            },
            name: 'ReceiverContact',
            data(){
                let validatePhone = (rule, value, callback) => {
                    if (value == '') {
                        callback(new Error('Please enter a phone number.'));
                    }else{
                        if(this.canSave==false){
                            callback(new Error('Please enter a right phone number.'));
                        }
                        callback();
                    }
                }
                let validatePhone2 = (rule, value, callback) => {
                    if (value == '') {
                        callback();
                    }else{
                        if(this.canSave2==false){
                            callback(new Error('Please enter a right phone number.'));
                        }
                        callback();
                    }
                }
                return{
                    status: 1,
                    headerInfo: [
                        ['Edit Contact Information'],
                        { description: '', path: '',title:'My Account' }
                    ],
                    ruleForm: {
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone:'',
                        phone2:''
                    },
                    rules: {
                        firstName: [
                            { required: true, trigger: 'blur' ,message: 'Please enter your first name.'}
                        ],
                        lastName: [
                            { required: true, trigger: 'blur' ,message: 'Please enter your last name.'}
                        ],
                        email: [
                            { required: true, trigger: 'blur' ,message: 'Please enter your full email address.'},
                            { type: 'email', message: 'Please enter the correct email address', trigger: 'blur'}
                        ],
                        phone: [
                            { required: true, trigger: 'blur',validator: validatePhone}
                        ],
                        phone2: [
                            { validator: validatePhone2}
                        ]
                    },
                    showDefault:true,
                    whereName:'',
                    countryFir:'US',
                    countrySec:'US',
                    sendPhone1:'',
                    sendPhone2:'',
                    canSave:false,
                    canSave2:false,
                    userId:''
                }
            },
            created(){
                console.log(this.$route.query.aid);
                if(this.$route.query.aid==undefined){
                    this.whereName = 'add';
                }else{
                    this.whereName = 'edit';
                    this.getUserInfo();
                }
                console.log(this.whereName)
            },
            methods: {
                getId(name){//aid
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                    var r = window.location.search.substr(1).match(reg);
                    if(r != null) return unescape(r[2]);
                    return null;
                },
                getUserInfo(){//获取用户信息
                    this.userId = this.getId("aid");
                    console.log(this.userId);
                    // this.$http.get(`${this.$api.contactDetail}/${this.userId}`,{headers:{'Authorization':`Bearer ${sessionStorage.getItem('IvyCustomer_LoginToken')}`}})
                    this.$http.get(`${this.$api.contactDetail}/${this.userId}`)
                            .then((res)=>{
                                if(res.data.code==200){
                                    console.log(res);
                                    this.ruleForm = res.data.data;
                                    this.showDefault = this.ruleForm.isDefault;
                                    const searchPhone1 = parsePhoneNumberFromString(this.ruleForm.phone);
                                    console.log(searchPhone1)
                                    if(searchPhone1 !==undefined){
                                        this.countryFir = searchPhone1.country;
                                        console.log(this.countryFir)
                                        this.$refs.phone_number.countryCode = this.countryFir;
                                        this.$refs.phone_number.phoneNumber = searchPhone1.nationalNumber;
                                    }
                                    console.log(this.ruleForm.phone2!='')
                                    if(this.ruleForm.phone2!=undefined){
                                        if(this.ruleForm.phone2!='' && this.ruleForm.phone2 !='null'){
                                            const searchPhone2 = parsePhoneNumberFromString(this.ruleForm.phone2);
                                            console.log(searchPhone2)
                                            this.countrySec = searchPhone2.country;
                                            console.log(this.countrySec)
                                            this.$refs.phone2_number.countryCode = this.countrySec;
                                            this.$refs.phone2_number.phoneNumber = searchPhone2.nationalNumber;
                                        }else{
                                            this.$refs.phone2_number.phoneNumber='';
                                        }
                                    }else{
                                        this.$refs.phone2_number.phoneNumber='';
                                    }
                                }
                            })   
                },
                intStr(val){
                    return val.slice(val.indexOf(' ') + 1);
                },
                onUpdate(payload) {
                    console.log(payload);
                    this.canSave = payload.isValid;
                    if(payload.formatInternational !== undefined){
                        const addPhoneFir = parsePhoneNumberFromString(payload.formatInternational);
                        this.sendPhone1 = "+"+ addPhoneFir.countryCallingCode+ " " + addPhoneFir.nationalNumber;
                    }
                },
                onUpdateAgain(payload){
                  this.canSave2 = payload.isValid;
                  if(payload.formatInternational !== undefined){
                    const addPhoneSec = parsePhoneNumberFromString(payload.formatInternational);
                    this.sendPhone2 = "+"+ addPhoneSec.countryCallingCode+ " " + addPhoneSec.nationalNumber;
                  }else{
                      this.sendPhone2 = "";
                  }
                },
                selectDefault(val){
                  this.showDefault = val;
                },
                goBack(){
                    this.$router.go(-1);
                },
                submitForm(formName) {
                    if(this.whereName=='add'){
                        this.$refs[formName].validate((valid) => {
                            if (valid) {
                                this.$http.post(this.$api.contactAdd,
                                { firstName:this.ruleForm.firstName,lastName:this.ruleForm.lastName,
                                // phone:this.sendPhone1,email:this.ruleForm.email,phone2:this.sendPhone2,isDefault:this.showDefault},{headers:{'Authorization':sessionStorage.getItem('IvyCustomer_LoginToken')}})
                                phone:this.sendPhone1,email:this.ruleForm.email,phone2:this.sendPhone2,isDefault:this.showDefault})
                                .then((res)=>{
                                    console.log(res);
                                    if(res.data.code==200){
                                        this.$message({
                                            message: 'Added successfully',
                                            type: 'success',
                                            center: true
                                        });
                                        //添加成功后，默认都设置为空
                                        this.form = {
                                            firstName:'',
                                            lastName:'',
                                            email:'',
                                            phone:'',
                                            phone2:''
                                        }
                                        this.$router.push({name:'ContactList'});
                                    }else{
                                        this.$message({
                                            message: res.data.msg,
                                            type: 'warning',
                                            center: true
                                        });
                                    }
                                })
                            } else {
                                return false;
                            }
                        });
                    }else if(this.whereName=='edit'){
                        console.log(this.showDefault);
                        this.$refs[formName].validate((valid) => {
                            if (valid) {
                                this.$http.patch(`${this.$api.contactUpdate}/${this.ruleForm.aid}`,
                                // {firstName:this.ruleForm.firstName,lastName:this.ruleForm.lastName,email:this.ruleForm.email,phone:this.sendPhone1,phone2:this.sendPhone2,isDefault:this.showDefault},{headers:{'Authorization':`Bearer ${sessionStorage.getItem('IvyCustomer_LoginToken')}`}})
                                {firstName:this.ruleForm.firstName,lastName:this.ruleForm.lastName,email:this.ruleForm.email,phone:this.sendPhone1,phone2:this.sendPhone2,isDefault:this.showDefault})
                                .then((res)=>{
                                    console.log(res);
                                    if(res.data.code==200){
                                        this.$message({
                                            message: 'Saved successfully.',
                                            type: 'success',
                                            showClose: true,
                                            center: true
                                        });
                                        //添加成功后，默认都设置为空
                                        this.$router.push({name:'ContactList'});
                                        this.form = {
                                        firstName:'',
                                        lastName:'',
                                        email:'',
                                        phone:'',
                                        phone2:''
                                        }
                                    }else{
                                        this.$message({
                                            message: data.data.msg,
                                            type: 'warning',
                                            center: true
                                        });
                                    }
                                })
                            } else {
                                return false;
                            }
                        });
                    }
                }
            }
        }
    
    </script>
    
    <style scoped>
    .edit-contact {
        flex: 1;
    }
    >>> .el-main {
        padding-top: 0;
        padding-left: 20px;
        padding-right: 20px;
        height: 620px;
    }
    .content {
        background-color: #FCFCFC;
        padding-top: 30px;
        padding-left: 160px;
        padding-bottom: 30px;
        height: 540px;
    }
    .form-wrapper {
        width: 500px;
        height: 420px;
        font-size: 16px;
    }
    
      >>> .country-selector.has-value .field-label{
        line-height: normal;
        pointer-events: none;
      }
      >>> .el-form-item__label{
        padding: 0;
      }
      >>> .el-form-item {
        margin-bottom: 12px;
      }
      >>> .country-selector-arrow{
        top: 0;
      }
      >>> .el-switch__label{
        color: #606266;
      }
      >>> .el-switch__label.is-active{
        color: #606266;
      }
      .btns{
          margin-top: 15px;
      }
      .cancel-btn{
        width:72px;
          height: 30px;
          padding: 7px 10px;
      }
      .save-btn{
          width:72px;
          height: 30px;
          padding: 7px 10px;
        background:#FF9A0D;
        color:rgba(255,255,255,1);
        border: none;
      }
      .isDefault{
        margin-top: 10px;
      } 
      >>> .field.vue-input-ui{
          left: 1px;
      }
      >>> .field.vue-input-ui .field-label{
        line-height: normal;
        pointer-events: none;
      }
      >>> .field.vue-input-ui .field-input{
          cursor: default;
      }
      >>> .field.vue-input-ui .field-clear>span[data-v-4039a700]:not(.field-clear__effect){
            top: -1px;
            left: 1px;
        }
        >>> .field.vue-input-ui .field-clear__effect[data-v-4039a700]{
            width: 25px;
            border-radius: 50%;
        }
    </style>