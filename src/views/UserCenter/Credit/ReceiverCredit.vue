<template>
    <div>
    <el-container class="add-credit">
        <el-header height="33px">
            <item-header :status="status" :headerInfo="headerInfo"></item-header>
        </el-header>
        <el-main>
            <div class="content">
                <div class="introduction">
                    <div class="text">
                        * A debit card with VISA, MasterCard or American Express logo can be accepted as a credit card.
                    </div>
                    <div class="img-wrapper">
                        <img src="@/assets/AmEx.png">
                        <img src="@/assets/mastercard.png">
                        <img src="@/assets/visa.png">
                    </div>
                </div>
                <div class="form-wrapper">
                    <div class="info">
                        <img src="@/assets/safety.png">
                        <span>Your payment details are secure</span>
                    </div>
                    <div class="info-list">
                        <el-form :model="ruleForm" 
                                :rules="rules" 
                                ref="ruleForm" 
                                label-width="100px" 
                                class="demo-ruleForm"
                                label-position="top">
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="Card Holder Name:" prop="holderName">
                                        <el-tooltip placement="bottom" effect="light">
                                            <div slot="content">Card Holder Name is<br>typically the name of the
                                                <br> person on the front of the <br>credit card.</div>
                                            <div class="el-icon-warning" id="icon-tip"></div>
                                        </el-tooltip>
                                        <el-input v-model="ruleForm.holderName" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Card Number:" prop="cardNumber">
                                        <el-input v-model="ruleForm.cardNumber" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="6">
                                    <el-form-item label="Type:" prop="type">
                                        <el-select v-model="ruleForm.type" @change="selectType">
                                            <el-option 
                                                    v-for="item in types"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="Expiration:" prop="month">
                                        <el-select v-model="ruleForm.month" @change="expiration">
                                            <el-option 
                                                    v-for="item in months"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="Years" prop="year">
                                        <el-select v-model="ruleForm.year" @change="selectYear">
                                            <el-option 
                                                    v-for="item in years"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="CVV:" prop="CVV">
                                        <el-tooltip placement="bottom" effect="light">
                                            <div slot="content"> Flip your card over and look at the<br> signature
                                                 box. You should see either<br> the
                                                 entire 16-digit credit card number<br> or
                                                 just the last four digits followed by a<br> special
                                                 3-digit code. This 3-digit code<br> is
                                                 your Card Security Code.</div>
                                            <div class="el-icon-warning" id="icon-tip2"></div>
                                        </el-tooltip>
                                        <el-input v-model="ruleForm.CVV" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <div class="middle"></div>
                            <h2 class="card-address">Billing Address (address where you are receiving the statements for your credit card)</h2>
                            <el-form-item label="Street:" prop="street">
                                <el-input v-model="ruleForm.street" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label=" City:" prop="city">
                                <el-input v-model="ruleForm.city" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <el-form-item label="State:" prop="state">
                                        <el-select v-model="ruleForm.state" v-show="stateChange">
                                            <el-option 
                                                    v-for="item in statesOptions"
                                                    :key="item.value"
                                                    :label="item.text"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <el-input v-show="!stateChange" v-model="ruleForm.state" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="16">
                                    <el-form-item label="Zipcode:" prop="zipcode">
                                        <el-tooltip placement="bottom" effect="light">
                                            <div slot="content">Some countries do not have zip <br> codes.
                                                 You can put '00000' instead of<br> a
                                                 number. And, you will be able to<br> complete
                                                 the booking without any<br> problem. </div>
                                            <div class="el-icon-warning" id="icon-tip3"></div>
                                        </el-tooltip>
                                        <el-input v-model="ruleForm.zipcode" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="24">
                                    <el-form-item label="Country/Region:" prop="country">
                                        <el-select v-model="ruleForm.country" style="width: 100%" @change="selectCountry">
                                            <el-option 
                                                    v-for="item in countryOptions"
                                                    :key="item.value"
                                                    :label="item.text"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row> 
                            <el-row>
                                <el-col :span="24">
                                    <el-switch
                                        class="isDefault"
                                        v-model="showDefault"
                                        inactive-text="Default payment method:"
                                        @change="selectDefault">
                                    </el-switch>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <el-button class="cancel-btn" @click="goBack">Cancel</el-button>
                                    <el-button class="save-btn" @click.native.prevent="submitForm('ruleForm')">Save</el-button>
                                </el-col>
                            </el-row>
                            <!-- <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                            </el-form-item> -->
                        </el-form>
                    </div>
                </div>
            </div>
        </el-main>   
    </el-container>    
    </div>
    </template>
    
    <script>
        import ItemHeader from '@/components/ItemHeader'
        import countryOptions from '@/configs/country.json'
        import statesOptions from '@/configs/states.json';
        export default{
            components: {
                ItemHeader
            },
            name: 'ReceiverCredit',
            data(){
                var checkCardNum = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('Card number is required.'));
                    } else {
                        console.log(this.ruleForm.type)
                        if (this.ruleForm.type =='AmEx') {
                            if(this.ruleForm.cardNumber.length!=15){
                                callback(new Error('Your card number must be 15 characters long.'));
                            }
                            // console.log(this.ruleForm.cardNumber.length);
                        }else if (this.ruleForm.type =='VISA' || this.ruleForm.type =='Master'){
                            if(this.ruleForm.cardNumber.length!=16){
                                callback(new Error('Your card number must be 16 characters long.'));
                            }
                        }
                        if (this.ruleForm.type =='3') {
                            if(this.ruleForm.cardNumber.length!=15){
                                callback(new Error('Your card number must be 15 characters long.'));
                            }
                            // console.log(this.ruleForm.cardNumber.length);
                        }else if (this.ruleForm.type =='2' || this.ruleForm.type =='1'){
                            if(this.ruleForm.cardNumber.length!=16){
                                callback(new Error('Your card number must be 16 characters long.'));
                            }
                        }
                        callback();
                    }
                };
                return{
                    status: 1,
                    headerInfo: [
                        ['Add Credit Card'],
                        { description: '', path: '',title:'My Account' }
                    ],
                    ruleForm: {
                        holderName: '',
                        cardNumber: '',
                        CVV: '',
                        type: '',
                        month: '',
                        year: '',
                        street: '',
                        city: '',
                        state:'',
                        zipcode:'',
                        country:'us'
                    },
                    rules: {
                        holderName: [{required: true, trigger: 'blur',message: 'Please enter holder name.'}],
                        cardNumber: [{required: true, trigger: 'blur',validator: checkCardNum }],
                        // message: 'Please enter cardNumber.'
                        type: [{required: true, trigger: 'blur' ,message: 'Please choose a type.'}],
                        month: [{required: true, trigger: 'blur' }],
                        CVV: [{required: true, trigger: 'blur' ,message: 'Please enter CVV.'}],
                        street: [{required: true, trigger: 'blur' ,message: 'Please enter street.'}],
                        city: [{required: true, trigger: 'blur' ,message: 'Please enter city.'}],
                        zipcode: [{required: true, trigger: 'blur' ,message: 'Please enter zipcode.'}],
                        country: [{required: true, trigger: 'blur' ,message: 'Please enter Country.'}]
                    },
                    types:[
                        // {value: '3',label: 'AmEx'},
                        // {value: '2',label: 'VISA'},
                        // {value: '1',label: 'Master'}
                        {value: 'AmEx',label: 'AmEx'},
                        {value: 'VISA',label: 'VISA'},
                        {value: 'Master',label: 'Master'}
                    ],
                    months:[],
                    selectMonths: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                    years:[],
                    selectYears: ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029',
                    '2030', '2031', '2032', '2033', '2034', '2035', '2036', '2037', '2038', '2039'],
                    countryOptions,
                    statesOptions,
                    stateChange:'true',
                    showDefault:true,
                    selectNum:'',//选择数字
                    infos:{},//编辑的具体信息
                    creditName:'',//具体操作
                    creditId:''
                }
            },
            created(){
                this.months = this.selectMonths.map(item => {
                    return { value: item, label: item };
                });
                this.years = this.selectYears.map(item => {
                    return { value: item, label: item };
                });
                //判断编辑或添加
                // console.log(this.$route.query.ccid);
                if(this.$route.query.ccid==undefined){
                    this.creditName = 'add';
                    this.expiration();
                    this.selectYear();
                }else{
                    this.creditName = 'edit';
                    this.getCreditInfo();
                }
            },
            methods:{
                getId(name){//ccid
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                    var r = window.location.search.substr(1).match(reg);
                    if(r != null) return unescape(r[2]);
                    return null;
                },
                selectType(val){
                    console.log(val);
                },
                expiration(val){//选择月份
                    var date=new Date;
                    var year=date.getFullYear(); 
                    var month=date.getMonth();
                    if(val == undefined){
                        this.ruleForm.month = this.months[month].label;
                    }
                    if(parseInt(val)<=month && this.ruleForm.year<=year){
                        this.ruleForm.year = year+1;
                    }
                },
                selectYear(val){//选择年份
                    var date=new Date;
                    var year=date.getFullYear(); 
                    // var month=date.getMonth()+1;
                    var month=date.getMonth();
                    // console.log(val)
                    if(val == undefined){
                        this.ruleForm.year = year;
                    }else{
                        if(Number(val)<=year && parseInt(this.ruleForm.month)<=month){
                            this.ruleForm.month = this.months[month].label;
                        }
                        // if(Number(val)>year){
                        //     this.months = this.selectMonths.map(item => {
                        //         return { value: item, label: item };
                        //     });
                        // }else{
                        //     if(parseInt(this.ruleForm.month)<=month){
                        //         this.ruleForm.month = this.months[month].label;
                        //     }
                            
                        // }
                    }
                },
                selectCountry(val){//选择国家
                    if(val == 'us'){
                        this.stateChange = true;
                    }else{
                        this.stateChange = false;
                    }
                },
                selectDefault(val){
                    console.log(val);
                    this.showDefault = val;
                },
                goBack(){
                    this.$router.go(-1);
                },
                getCreditInfo(){
                    this.creditId = this.getId("ccid");
                    console.log(this.creditId);
                    // this.$http.get(`${this.$api.creditDetail}/${this.creditId}`,{headers:{'Authorization':`Bearer ${sessionStorage.getItem('IvyCustomer_LoginToken')}`}})
                    this.$http.get(`${this.$api.creditDetail}/${this.creditId}`)
                        .then((res)=>{
                            if(res.data.code==200){
                                console.log(res);
                                this.infos = res.data.data;
                                this.ruleForm.holderName = this.infos.nameOnCard;
                                this.ruleForm.cardNumber = this.infos.cardNumber;
                                if(this.infos.cardType == 3){
                                    this.ruleForm.type = 'AmEx';
                                }else if(this.infos.cardType == 2){
                                    this.ruleForm.type = 'VISA';
                                }else if(this.infos.cardType == 1){
                                    this.ruleForm.type = 'Master';
                                }
                                //将月份转换成字符串
                                if(this.infos.expireMonth>9){
                                    this.ruleForm.month = this.infos.expireMonth.toString();
                                }else{
                                    this.ruleForm.month = '0'+this.infos.expireMonth.toString();
                                }
                                this.ruleForm.year = this.infos.expireYear;
                                this.ruleForm.CVV = this.infos.xCardCode;
                                this.ruleForm.street = this.infos.billingAddress.street;
                                this.ruleForm.city = this.infos.billingAddress.city;
                                this.ruleForm.state = this.infos.billingAddress.state;
                                this.ruleForm.zipcode = this.infos.billingAddress.zipcode;
                                this.ruleForm.country = this.infos.billingAddress.country;
                                this.showDefault = this.infos.isDefault;
                            }
                        })   
                },
                submitForm(formName) {
                    if(this.ruleForm.type == 'VISA'){
                        this.selectNum = 2;
                    }else if(this.ruleForm.type == 'AmEx'){
                        this.selectNum = 3;
                    }else if(this.ruleForm.type == 'Master'){
                        this.selectNum = 1;
                    }
                    if(this.creditName=='add'){
                        this.$refs[formName].validate((valid) => {
                            if (valid) {
                                console.log(JSON.stringify(this.ruleForm));
                                this.$http.post(this.$api.creditAdd,
                                    {nameOnCard:this.ruleForm.holderName,
                                        cardNumber:this.ruleForm.cardNumber,
                                        // cardType:parseInt(this.ruleForm.type),
                                        cardType: this.selectNum,
                                        expireMonth:this.ruleForm.month,
                                        expireYear:this.ruleForm.year,
                                        xCardCode:this.ruleForm.CVV,
                                        billingAddress:{
                                        street:this.ruleForm.street,
                                        city:this.ruleForm.city,
                                        state:this.ruleForm.state,
                                        zipcode:this.ruleForm.zipcode,
                                        country:this.ruleForm.country},
                                        isDefault:this.showDefault})
                                        // {headers:{'Authorization':sessionStorage.getItem('IvyCustomer_LoginToken')}})
                                    .then((res)=>{
                                        console.log(res);
                                        if(res.data.code==200) {
                                            this.$message({
                                                message: 'Added successfully',
                                                type: 'success',
                                                showClose: true,
                                                center: true
                                            })
                                            // 添加成功后，默认都设置为空
                                            this.ruleForm = {
                                                holderName: '',
                                                cardNumber: '',
                                                CVV: '',
                                                type: 'null',
                                                month: '01',
                                                year: '2019',
                                                street: '',
                                                city: '',
                                                state: '',
                                                zipcode: '',
                                                country: 'us'
                                            }
                                            this.$router.push({name:'CreditList'});
                                            // this.$router.push({path: '/render/user/credit'});
                                        }
                                    })
                            } else {
                                return false;
                            }
                        });
                    }else if(this.creditName=='edit'){
                        console.log(this.ruleForm.type);
                        this.$refs[formName].validate((valid) =>{
                            if (valid){
                                console.log(JSON.stringify(this.ruleForm));
                                this.$http.patch(`${this.$api.creditUpdate}/${this.infos.ccid}`,
                                    {nameOnCard: this.ruleForm.holderName,
                                        cardNumber: this.ruleForm.cardNumber,
                                        cardType: this.selectNum,
                                        expireMonth: this.ruleForm.month, 
                                        expireYear: this.ruleForm.year,
                                        xCardCode: this.ruleForm.CVV,
                                        isDefault: this.showDefault,
                                        billingAddress:{
                                        street: this.ruleForm.street,
                                        city: this.ruleForm.city,
                                        state: this.ruleForm.state,
                                        zipcode: this.ruleForm.zipcode,
                                        country: this.ruleForm.country}})
                                        // {headers:{'Authorization':`Bearer ${sessionStorage.getItem('IvyCustomer_LoginToken')}`}})
                                    .then((res)=>{
                                        console.log(res);
                                        if(res.data.code==200){
                                            this.$message({
                                                message: 'Saved successfully.',
                                                type: 'success',
                                                showClose: true,
                                                center: true
                                            });
                                            this.$router.push({name:'CreditList'});
                                        }
                                    })
                            }
                        })
                    }
                    
                },
            }
    
        }
    </script>
    
    <style scoped>
      .add-credit {
        flex: 1;
      }
      .introduction::before, .introduction::after {
        display: table;
        content: '';
      }
      .introduction::after {
        clear: both;
      }
      .introduction {
        padding-left: 15px;
        padding-top: 4px;
        padding-bottom: 24px;
      }
      .introduction>.text {
        width: 540px;
        height: 38px;
        line-height: 19px;
        font-size: 16px;
        float: left;
        margin-right: 30px;
        color: #002E63;
      }
      .introduction>.img-wrapper {
        float: left;
      }
      .introduction>.img-wrapper>img {
        margin-right: 15px;
      }
      .form-wrapper {
        background-color: #FCFCFC;
        padding-top: 32px;
        padding-bottom: 20px;
        width: 814px;
      }
      .form-wrapper>.info {
        height: 30px;
        margin-bottom: 30px;
        margin-left: 124px;
        margin-right: 124px;
      }
      .form-wrapper>.info>img {
        width: 30px;
        height: 30px;
        margin-right: 20px;
        vertical-align: middle;
      }
      .form-wrapper>.info>span {
        color: #1CAD78;
        font-size: 16px;
        font-weight: bold;
      }
      .info-list{
          padding-left: 124px;
          padding-right: 114px;
      }
      >>> .el-form-item__label{
        padding: 0;
      }
      >>> .el-form-item {
        margin-bottom: 12px;
      }
      #icon-tip{
        position: absolute;
        top: -26px;
        left: 134px;
      }
      #icon-tip2{
        position: absolute;
        top: -26px;
        left: 46px;
      }
      #icon-tip3{
        position: absolute;
        top: -26px;
        left: 69px;
      }
      .middle {
        border-top: 1px dashed #E5EFFA;
        margin-top: 36px;
        margin-bottom: 36px;
      }
      .card-address{
        font-size:14px;
      }
      .cancel-btn{
          width: 72px;
          height: 30px;
          padding: 7px 10px;
      }
      .save-btn{
          width: 72px;
          height: 30px;
          padding: 7px 10px;
        background:#FF9A0D;
        color:rgba(255,255,255,1);
        border: none;
      }
      .isDefault{
        margin-bottom: 15px;
        margin-top: 10px;
      }
      >>> .el-switch__label.is-active{
        color: #303133;
      }
    </style>