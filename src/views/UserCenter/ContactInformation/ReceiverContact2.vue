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
                                        <el-input v-model.number="ruleForm.email"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="24">
                                    <el-form-item class="phone" label="Contact Phone:" prop="phone">
                                        <VuePhoneNumberInput v-model="ruleForm.phone" 
                                        :default-country-code="countryFir"
                                        :error="canSave" 
                                        @update="onUpdate"
                                        />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="24">
                                    <el-form-item class="phone2" label="Alternate Phone:" prop="phone2">
                                            <VuePhoneNumberInput v-model="ruleForm.phone2" 
                                            :default-country-code="countrySec" 
                                            @update="onUpdateAgain"
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
                                        <el-button @click="goBack">Cancel</el-button>
                                        <el-button type="warning" @click="submitForm('ruleForm')">Save</el-button>
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
                        { required: true, trigger: 'blur' ,message: 'Please enter your full email address.'}
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
            console.log(this.$store.state.contactName)
            this.whereName = this.$store.state.contactName!=""?this.$store.state.contactName:localStorage.getItem("contactName");
            this.whereName = this.$store.state.contactName!=""?this.$store.state.contactName:'';
            console.log(this.$store.state.contactName);
            if(this.whereName=='edit'){
                this.ruleForm = this.$store.state.contactInfo==""?this.$store.state.contactInfo:JSON.parse(localStorage.getItem("contactInfo"));
                console.log(this.ruleForm.phone)
                const phoneNumber = parsePhoneNumberFromString(this.ruleForm.phone);
                console.log(phoneNumber);
                if(phoneNumber !== undefined){
                    this.ruleForm.phone = phoneNumber.nationalNumber;
                    this.countryFir = phoneNumber.country;
                }
                if(this.ruleForm.phone2){
                    console.log(this.ruleForm.phone2)
                    const phoneNumber2 = parsePhoneNumberFromString(this.ruleForm.phone2);
                    console.log(phoneNumber2);
                    if(phoneNumber2 !== undefined){
                        this.ruleForm.phone2 = phoneNumber2.nationalNumber;
                        this.countrySec = phoneNumber2.country;
                    }
                }
                this.showDefault = this.ruleForm.isDefault;
            }else if(this.whereName=='add'){
                this.ruleForm={
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone:'',
                    phone2:''
                }
            }else if(this.whereName==''){
                this.userId = this.getId("aid");
                console.log(this.userId);
                var countryOne;
                this.$http.get(`${this.$api.contactUpdate}/${this.userId}`,
                            {headers:{'Authorization':`Bearer ${sessionStorage.getItem('IvyCustomer_LoginToken')}`}})
                            .then((res)=>{
                                console.log(res);
                                if(res.data.code==200){
                                    console.log(res);
                                    this.showDefault = this.ruleForm.isDefault;
                                    this.ruleForm = res.data.data;
                                    const searchPhone1 = parsePhoneNumberFromString(this.ruleForm.phone);
                                    console.log(searchPhone1)
                                    if(searchPhone1 !==undefined){
                                        // this.countryFir = searchPhone1.country;
                                        this.countryFir = 'CN';
                                        console.log(this.countryFir)
                                        this.ruleForm.phone = searchPhone1.nationalNumber;
                                    }
                                    
                                }
                            })   
            }
        },
        methods: {
            getId(name){
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if(r != null) return unescape(r[2]);
                return null;
            },
            intStr(val){
                return val.slice(val.indexOf(' ') + 1);
            },
            onUpdate(payload) {
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
                            phone:this.sendPhone1,email:this.ruleForm.email,phone2:this.sendPhone2,isDefault:this.showDefault},
                            {headers:{'Authorization':sessionStorage.getItem('IvyCustomer_LoginToken')}})
                            .then((res)=>{
                                console.log(res);
                                if(res.data.code==200){
                                        this.$message({
                                            message: 'Added successfully',
                                            type: 'success',
                                            showClose: true,
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
                            {firstName:this.ruleForm.firstName,lastName:this.ruleForm.lastName,email:this.ruleForm.email,phone:this.sendPhone1,phone2:this.sendPhone2,isDefault:this.showDefault},
                            {headers:{'Authorization':`Bearer ${sessionStorage.getItem('IvyCustomer_LoginToken')}`}})
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
}
.content {
    background-color: #FCFCFC;
    padding-top: 30px;
    padding-left: 160px;
    padding-bottom: 30px;
}
.form-wrapper {
    width: 500px;
    height: 420px;
    font-size: 16px;
    /* position:relative; */
}
/* >>> .el-form-item__label{
    padding: 0;
}
.first-name,.last-name{
    width: 237px;
    position: absolute;
}
>>> .demo-ruleForm{
    width:600px;
}
.first-name{
    left: 0;
}
.last-name{
    right: 0;
}
.email{
    width: 500px;
    position: absolute;
    top: 90px;
}
.phone{
    width: 500px;
    position: absolute;
    top: 180px;
}
.phone2{
    width: 500px;
    position: absolute;
    top: 270px;
}
>>> .country-selector.has-value .field-label{
    top: -10px;
}
>>> .country-selector-arrow{
    top: 0;
}
>>> .field.vue-input-ui.has-value .field-label{
    top: -10px;
}
>>> .el-switch__label.is-active{
    color: #303133;
  }
.btns{
    position: absolute;
    top: 405px;
}
.isDefault{
    position: absolute;
    top: 370px;
} */

  >>> .country-selector.has-value .field-label{
    top: -10px;
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
  >>> .field.vue-input-ui.has-value .field-label{
    top: -10px;
  }
  >>> .el-switch__label.is-active{
    color: #303133;
  }
  .btns{
      margin-top: 15px;
  }
  .isDefault{
    margin-top: 10px;
  } 
</style>